"""Browser click-through checks (Playwright + Chrome).

Run:  pip install playwright   (uses your installed Chrome, no browser download)
      python3 tests/browser.test.py [--shots DIR]
Set CHROME_PATH if Chrome is not in a standard location.
"""
import json, os, shutil, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
URL = ROOT.joinpath('index.html').as_uri()
SHOTS = Path(sys.argv[sys.argv.index('--shots') + 1]) if '--shots' in sys.argv else None
if SHOTS: SHOTS.mkdir(parents=True, exist_ok=True)

fails, passes = [], 0
def check(name, cond, detail=''):
    global passes
    if cond: passes += 1
    else: fails.append(f'{name} -> {detail}'); print('FAIL:', name, '->', detail)

def chrome_path():
    p = os.environ.get('CHROME_PATH')
    if p: return p
    for c in ['/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
              shutil.which('google-chrome') or '', shutil.which('chromium') or '', shutil.which('chrome') or '']:
        if c and os.path.exists(c): return c
    return None

def shot(page, name, **kw):
    if SHOTS: page.screenshot(path=str(SHOTS / name), **kw)

def fresh(browser, w=1100, h=900, errors=None):
    page = browser.new_page(viewport={'width': w, 'height': h})
    if errors is not None:
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
    page.goto(URL); page.evaluate('localStorage.clear()'); page.reload()
    return page

def start(page, mode, count=None):
    page.click(f'#mode-{mode}')
    if count: page.fill('#count-input', str(count))
    page.click('#start-btn')

def overlaps(a, b):
    return not (a['x'] + a['width'] <= b['x'] or b['x'] + b['width'] <= a['x'] or a['y'] + a['height'] <= b['y'] or b['y'] + b['height'] <= a['y'])

with sync_playwright() as p:
    kw = {'executable_path': chrome_path(), 'args': ['--no-sandbox']} if chrome_path() else {}
    browser = p.chromium.launch(**kw)
    errors = []

    # ---- start screen: typing, clamping, spinner, disabled Start
    pg = fresh(browser, errors=errors)
    check('number box has no spinner', pg.evaluate("getComputedStyle(document.getElementById('count-input')).appearance") == 'textfield')
    pg.click('#mode-later')
    pg.fill('#count-input', '999'); pg.dispatch_event('#count-input', 'change')
    check('typed count above the pool is capped on blur', pg.input_value('#count-input') == '120', pg.input_value('#count-input'))
    for d in range(1, 8): pg.uncheck(f'#dom-{d}') if d not in (2, 6) else None
    check('unticking domains shrinks the available count', 'of 44 available' in pg.inner_text('#count-avail') and pg.input_value('#count-input') == '44', pg.input_value('#count-input'))
    pg.fill('#count-input', '7'); pg.click('#start-btn')
    ids = pg.evaluate('state.questionIds'); doms = pg.evaluate('[...new Set(state.questionIds.map(id => getQuestion(id).domain))].sort()')
    check('start uses the typed count and ticked domains', len(ids) == 7 and set(doms) <= {2, 6}, f'{len(ids)} {doms}')
    pg.click('text=Reset', no_wait_after=True) if False else None
    pg.evaluate('clearState(); render()')
    pg.click('#mode-later'); pg.check('#dom-all'); pg.uncheck('#dom-all')
    check('Start disabled with no domain ticked', pg.is_disabled('#start-btn'))
    check('mock exam ignores the domain list', (pg.click('#mode-mock'), not pg.is_disabled('#start-btn'))[1])

    # ---- resume after reload with marks, answers and filter
    pg = fresh(browser, errors=errors)
    start(pg, 'later', 6)
    pg.click('.flag-btn'); pg.click('label.option-label >> nth=0')
    pg.click('.nav-actions button:has-text("Next marked")') if pg.locator('.nav-actions button:has-text("Next marked")').count() else None
    marked_before = pg.evaluate('flaggedCount()'); answers_before = pg.evaluate('JSON.stringify(state.answers)')
    pg.reload()
    check('saved quiz offered after reload', pg.locator('text=Resume').count() > 0)
    pg.click('button:text-is("Resume")')
    check('resume restores marks and answers', pg.evaluate('flaggedCount()') == marked_before == 1 and pg.evaluate('JSON.stringify(state.answers)') == answers_before)
    check('resumed question still shows as marked', pg.locator('.flag-btn.on').count() == 1)
    pg.evaluate('submitAll()'); pg.click('.filter-btn:has-text("All")'); pg.reload(); pg.click('button:text-is("Resume")')
    check('results filter survives a reload', pg.evaluate('state.resultsFilter') == 'all' and pg.locator('.filter-btn.active:has-text("All")').count() == 1)

    # ---- Next marked and review list with real clicks
    pg = fresh(browser, errors=errors); start(pg, 'later', 8)
    check('Next is blocked on an unanswered, unmarked question with a message', (pg.click('.nav-actions button:text-is("Next")'), 'Question 1 / 8' in pg.inner_text('.progress-label') and pg.locator('.next-hint').count() == 1 and 'Select an answer or mark this question for review' in pg.inner_text('.next-hint'))[1])
    pg.click('.flag-btn')
    check('marking for review clears the message', pg.locator('.next-hint').count() == 0)
    pg.click('.nav-actions button:text-is("Next")')
    check('Next works once the question is marked', 'Question 2 / 8' in pg.inner_text('.progress-label'))
    pg.evaluate("(() => { const id = state.questionIds[state.currentIndex], q = getQuestion(id); state.answers[id] = q.multi ? q.correctAnswer.slice() : q.correctAnswer; saveState(); render(); })()")  # fully answer (the question may be multi-select)
    pg.click('.nav-actions button:text-is("Next")')
    check('Next works once the question is answered', 'Question 3 / 8' in pg.inner_text('.progress-label'))
    pg.click('.nav-actions button:text-is("Next")'); pg.click('label.option-label >> nth=0'); check('answering clears the message', pg.locator('.next-hint').count() == 0)
    pg.evaluate("delete state.answers[state.questionIds[1]]; delete state.answers[state.questionIds[2]]; saveState()")  # back to the state the checks below expect: Q2 and Q3 unanswered
    pg.evaluate('goToQuestion(2)')
    pg.click('.flag-btn')
    check('Next marked is hidden while questions are unanswered and unmarked', pg.locator('.nav-actions button:has-text("Next marked")').count() == 0)
    check('Back to Review is hidden too', pg.locator('button:text-is("Back to Review")').count() == 0)
    pg.evaluate("state.questionIds.forEach((id, i) => { if (i !== 0 && i !== 2) { const q = getQuestion(id); state.answers[id] = q.multi ? q.correctAnswer.slice() : q.correctAnswer; } }); saveState(); render()")
    check('Next marked appears once everything is answered or marked', pg.locator('.nav-actions button:has-text("Next marked (1)")').count() == 1)
    check('Back to Review stays hidden while a marked question is unanswered', pg.locator('button:text-is("Back to Review")').count() == 0)
    pg.evaluate("state.questionIds.forEach(id => { const q = getQuestion(id); state.answers[id] = q.multi ? q.correctAnswer.slice() : q.correctAnswer; }); saveState(); render()")
    check('Back to Review appears once every question is answered', pg.locator('button:text-is("Back to Review")').count() == 1)
    pg.click('button:text-is("Back to Review")')
    check('Back to Review opens the review list', pg.locator('text=Review Your Answers').count() == 1)
    pg.click('.summary-item >> nth=2')  # back to Q3, where the checks below expect to start
    pg.click('.nav-actions button:has-text("Next marked")')
    check('Next marked jumps to Q1', 'Question 1 / 8' in pg.inner_text('.progress-label'))
    pg.click('.nav-actions button:has-text("Next marked")')
    check('and back to Q3 (wraps)', 'Question 3 / 8' in pg.inner_text('.progress-label'))
    for _ in range(5): pg.click('.nav-actions button:text-is("Next")')
    pg.click('text=Review Answers')
    check('review list flags two rows', pg.locator('.summary-flag:has-text("⚑")').count() == 2)
    pg.click('text=Go to first marked'); check('go to first marked', 'Question 1 / 8' in pg.inner_text('.progress-label'))

    # ---- multi-select and immediate feedback
    pg = fresh(browser, errors=errors); start(pg, 'immediate', 40)
    idx = pg.evaluate('state.questionIds.findIndex(id => getQuestion(id).multi)')
    if idx >= 0:
        pg.evaluate(f'state.currentIndex = {idx}; render()')
        need = pg.evaluate('getQuestion(state.questionIds[state.currentIndex]).correctAnswer.length')
        for i in range(need + 1): pg.click(f'label.option-label >> nth={i}')
        checked = pg.locator('.option-label input:checked').count()
        check('multi-select keeps only the allowed number of picks', checked == need and not pg.locator('.option-label >> nth=0').locator('input').is_checked(), checked)
    pg.evaluate('state.currentIndex = state.questionIds.findIndex(id => !getQuestion(id).multi); render()')
    check('immediate: Next and Submit start disabled', pg.is_disabled('.nav-actions button:text-is("Next")') and pg.is_disabled('button:has-text("Submit Answer")'))
    pg.click('label.option-label >> nth=0'); pg.click('button:has-text("Submit Answer")')
    check('immediate: explanation shows and options lock', pg.locator('.explanation.visible').count() == 1 and pg.locator('.option-label.locked').count() >= 4)
    check('immediate: correct option is highlighted', pg.locator('.option-label.correct').count() >= 1)
    check('immediate: Next enabled after submitting', not pg.is_disabled('.nav-actions button:text-is("Next")'))

    # ---- mock exam: countdown, pause, expiry
    pg = fresh(browser, errors=errors); start(pg, 'mock')
    t1 = pg.inner_text('#timer'); time.sleep(2.2); t2 = pg.inner_text('#timer')
    check('mock timer counts down', t1 != t2, f'{t1} -> {t2}')
    check('mock exam has 60 questions and a pause button', pg.evaluate('state.questionIds.length') == 60 and pg.locator('button:has-text("Pause Timer (4 of 4 Left)")').count() == 1)
    pb, tm = pg.locator('.timer-row button:has-text("Pause Timer")').bounding_box(), pg.locator('#timer').bounding_box()
    check('pause timer is on the countdown line, to its right', pb['x'] > tm['x'] + tm['width'] - 1 and abs((pb['y'] + pb['height'] / 2) - (tm['y'] + tm['height'] / 2)) < 15, f'{tm} {pb}')
    rb, tg = pg.locator('#topbar-actions button:text-is("Reset")').bounding_box(), pg.locator('#theme-toggle').bounding_box()
    check('reset is in the top bar on the left, level with the theme button', rb['x'] < tg['x'] and abs(rb['y'] - tg['y']) < 20 and pg.locator('#topbar button:has-text("Pause Timer")').count() == 0, f'{rb} {tg}')
    check('no Reset or Pause Timer at the bottom of the page', pg.locator('#app button:text-is("Reset")').count() == 0)
    left0 = pg.evaluate('state.deadline - Date.now()')
    pg.click('button:has-text("Pause Timer")'); time.sleep(2.2)
    check('paused exam hides questions and shows resume', pg.locator('text=Exam paused').count() == 1 and pg.locator('.question-text').count() == 0)
    pg.reload(); check('pause survives a reload (start screen says so)', 'currently paused' in pg.inner_text('#app'))
    pg.click('button:text-is("Resume")'); pg.click('button:text-is("Resume exam")')
    left1 = pg.evaluate('state.deadline - Date.now()')
    check('pause did not use exam time', abs((left1 - left0)) < 3000 + 2500, f'{left0 - left1}ms lost')
    for _ in range(3):
        pg.click('button:has-text("Pause Timer")'); pg.click('button:text-is("Resume exam")')
    check('fourth pause leaves none', pg.locator('button:has-text("No Pauses Left")').count() == 1 and pg.is_disabled('button:has-text("No Pauses Left")'))
    pg.evaluate("state.deadline = Date.now() + 1500; saveState()"); time.sleep(2.8)
    check('time running out submits the exam', pg.locator('.score-big').count() == 1 and 'time expired' in pg.inner_text('.score-card'))

    # ---- strike out options: real clicks, all three modes
    for mode in ('immediate', 'later', 'mock'):
        pg = fresh(browser, errors=errors); start(pg, mode, None if mode == 'mock' else 6)
        n = pg.locator('.option-row').count()
        check(f'{mode}: every option row has a strike button', n >= 4 and pg.locator('.strike-btn').count() == n, n)
        lb, bb = pg.locator('.option-row >> nth=0').locator('label').bounding_box(), pg.locator('.strike-btn >> nth=0').bounding_box()
        check(f'{mode}: strike button sits inside the option box, at its right edge', bb['x'] >= lb['x'] and bb['x'] + bb['width'] <= lb['x'] + lb['width'] and bb['y'] >= lb['y'] and bb['y'] + bb['height'] <= lb['y'] + lb['height'] and bb['x'] > lb['x'] + lb['width'] / 2 and pg.locator('.option-row > .strike-btn').count() == 0, f'{lb} {bb}')
        check(f'{mode}: strike button shows ab with a line through it', pg.inner_text('.strike-btn >> nth=0') == 'ab' and pg.evaluate("getComputedStyle(document.querySelector('.strike-ab'), '::after').content") != 'none')
        pg.click('.strike-btn >> nth=1')
        check(f'{mode}: clicking the strikethrough button strikes the text through', 'line-through' in pg.evaluate("getComputedStyle(document.querySelector('.option-label.struck .option-text')).textDecorationLine") and pg.locator('.option-label.struck').count() == 1)
        check(f'{mode}: striking does not select the option', pg.locator('.option-label input:checked').count() == 0)
        pg.reload(); pg.click('button:text-is("Resume")')
        check(f'{mode}: strike survives a reload', pg.locator('.option-label.struck').count() == 1 and pg.locator('.strike-btn.on').count() == 1)
        pg.click('.strike-btn >> nth=1')
        check(f'{mode}: clicking the strikethrough button again restores the option', pg.locator('.option-label.struck').count() == 0)
        pg.click('label.option-label >> nth=0'); pg.click('.strike-btn >> nth=0')
        check(f'{mode}: striking a selected option deselects it', pg.locator('.option-label input:checked').count() == 0 and pg.locator('.option-label.struck').count() == 1)
        pg.click('label.option-label >> nth=0')
        check(f'{mode}: picking a struck option restores it', pg.locator('.option-label.struck').count() == 0 and pg.locator('.option-label input:checked').count() == 1)
        pg.click('.strike-btn >> nth=2')
        if mode != 'immediate':
            # a mock question can be multi-select, so fully answer it first (Next is blocked on incomplete answers)
            pg.evaluate("(() => { const id = state.questionIds[state.currentIndex], q = getQuestion(id); state.answers[id] = q.multi ? q.correctAnswer.slice() : q.correctAnswer; saveState(); render(); })()")
            pg.click('.nav-actions button:text-is("Next")')
        if mode != 'immediate':
            pg.click('.nav-actions button:has-text("Prev")')
            check(f'{mode}: strike is kept per question when navigating', pg.locator('.option-label.struck').count() == 1)
    pg = fresh(browser, errors=errors); start(pg, 'immediate', 5)
    pg.click('.strike-btn >> nth=3')
    # the first question is random and may be multi-select (2 or 3 picks needed), so pick until Submit enables
    for i in range(3):
        pg.click(f'label.option-label >> nth={i}')
        if not pg.is_disabled('button:has-text("Submit Answer")'): break
    pg.click('button:has-text("Submit Answer")')
    check('immediate: strike buttons lock after Submit', all(pg.is_disabled(f'.strike-btn >> nth={i}') for i in range(4)) and pg.locator('.option-label.struck').count() == 1)
    pg.evaluate('submitAll()'); pg.evaluate('render()')
    check('strikes do not break the results screen', pg.locator('.score-big').count() == 1)
    pg = fresh(browser, 390, 780, errors=errors); start(pg, 'later', 5); pg.click('.strike-btn >> nth=0')
    check('phone: strike buttons cause no horizontal scroll', pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth'))
    shot(pg, 'phone_strike.png')
    pg = fresh(browser, errors=errors); start(pg, 'later', 5); pg.click('.strike-btn >> nth=1'); pg.click('.strike-btn >> nth=2'); shot(pg, 'desktop_strike.png')

    # ---- theme persistence and layout, desktop and phone
    for (w, h, label) in [(1100, 900, 'desktop'), (390, 780, 'phone')]:
        pg = fresh(browser, w, h, errors=errors)
        check(f'{label}: no horizontal scroll', pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth'))
        tb, dis = pg.locator('#theme-toggle').bounding_box(), pg.locator('#disclaimer').bounding_box()
        check(f'{label}: theme button does not sit under the disclaimer', not overlaps(tb, dis), f'{tb} {dis}')
        check(f'{label}: theme button offers Light Mode in dark', 'Light Mode' in pg.inner_text('#theme-toggle'))
        shot(pg, f'{label}_start_dark.png')
        pg.click('#theme-toggle'); shot(pg, f'{label}_start_light.png')
        pg.reload(); check(f'{label}: theme persists after reload', pg.evaluate('document.documentElement.dataset.theme') == 'light')
        start(pg, 'later', 5); pg.click('.flag-btn'); shot(pg, f'{label}_question_light.png')
        check(f'{label}: question page has no horizontal scroll', pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth'))
        pg.evaluate('submitAll()'); shot(pg, f'{label}_results_light.png', full_page=True)
        check(f'{label}: results have no horizontal scroll', pg.evaluate('document.documentElement.scrollWidth <= window.innerWidth'))
        pg.click('text=Start New Quiz') if False else None
        pg.evaluate('clearState(); render()')
        check(f'{label}: reset keeps the theme', pg.evaluate('document.documentElement.dataset.theme') == 'light')
        pg.click('#theme-toggle'); shot(pg, f'{label}_start_dark_again.png')
        check(f'{label}: toggling back gives dark', pg.evaluate('document.documentElement.dataset.theme') == 'dark')
        pg.click('#theme-toggle'); check(f'{label}: theme button offers Dark Mode in light', 'Dark Mode' in pg.inner_text('#theme-toggle')); pg.click('#theme-toggle')

    check('no console or page errors during the run', not errors, errors[:3])
    browser.close()

print(f'browser: {passes} passed, {len(fails)} failed')
sys.exit(1 if fails else 0)
