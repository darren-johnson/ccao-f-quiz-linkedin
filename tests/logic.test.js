// App logic checks in Node with a stubbed page and a controllable clock. Run: node tests/logic.test.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.slice(html.lastIndexOf('<script>\n') + 9, html.lastIndexOf('</script>'));
const store = {}, els = {}, attrs = {}, clock = { t: 1.8e12 };
const el = () => ({ classList: { add() {}, toggle() {}, remove() {} }, style: {}, innerHTML: '', textContent: '' });
const ctx = {
  store, clock, console, Math, JSON, String, Object, Set, Array, parseInt, isNaN,
  Date: { now: () => clock.t },
  document: { getElementById: id => (els[id] = els[id] || el()), documentElement: { getAttribute: k => attrs[k] ?? null, setAttribute: (k, v) => attrs[k] = v } },
  localStorage: { getItem: k => store[k] ?? null, setItem: (k, v) => store[k] = v, removeItem: k => delete store[k] },
  sessionStorage: { getItem: () => null, setItem() {} }, setInterval: () => 0, confirm: () => true,
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'questions.js'), 'utf8') + '\n' + script, ctx);
const out = vm.runInContext(`(() => {
const C = []; const ck = (n, c, d) => C.push([n, !!c, d]);
const go = (mode, order, count, doms) => { clearState(); selectedMode = mode; selectedOrder = order || 'exam'; selectedDomains = new Set(doms || ALL_DOMAINS); selectedCount = count || null; startQuiz(); };
const answer = (right, only) => state.questionIds.forEach((id, i) => { if (only && !only(i)) return; const q = getQuestion(id); state.answers[id] = right ? (q.multi ? q.correctAnswer.slice() : q.correctAnswer) : undefined; });
const doms = () => [...new Set(state.questionIds.map(id => String(getQuestion(id).domain)))].sort().join(',');
const asc = a => a.every((v, i) => !i || a[i - 1] < v);
const nums = h => [...h.matchAll(/<strong>Q(\\d+)<\\/strong>/g)].map(m => +m[1]);

// ---- modes
go('immediate'); ck('immediate: all 120, unique', state.questionIds.length === 120 && new Set(state.questionIds).size === 120);
go('later', 'shuffled'); ck('shuffled order differs from bank order', !asc(state.questionIds));
go('mock'); const byD = {}; state.questionIds.forEach(id => { const d = getQuestion(id).domain; byD[d] = (byD[d] || 0) + 1; });
ck('mock: 60 questions at blueprint counts', state.questionIds.length === 60 && JSON.stringify(byD) === JSON.stringify(MOCK_COUNTS), JSON.stringify(byD));
answer(true); submitAll(); ck('mock results show 60/60 and mock line', renderResults().includes('60/60') && renderResults().includes('Mock exam:'));

// ---- domains and number of questions
clearState(); selectedMode = 'later'; toggleAllDomains(false); startQuiz(); ck('no domain ticked: cannot start', state === null && document.getElementById('start-btn').disabled === true);
toggleDomain('2', true); toggleDomain('6', true); ck('pool for domains 2 and 6 is 44', poolSize() === 44, poolSize());
setCount('10'); go('immediate', 'exam', 10, ['2', '6']);
ck('10 questions, only domains 2 and 6, unique', state.questionIds.length === 10 && doms().split(',').every(d => d === '2' || d === '6') && new Set(state.questionIds).size === 10);
ck('domain order shows the random set ascending', asc(state.questionIds));
ck('saved-quiz label names the domains', /Domains 2, 6 only/.test(renderStart()));
selectedDomains = new Set(['2', '6']); setCount('999'); ck('count above pool is capped', selectedCount === 44, selectedCount);
setCount(''); ck('blank count means all', selectedCount === null); setCount('0'); ck('zero count means all', selectedCount === null);
selectedDomains = new Set(ALL_DOMAINS); setCount('40'); toggleDomain('1', false); toggleDomain('2', false); toggleDomain('3', false); toggleDomain('4', false); toggleDomain('5', false);
ck('count is clamped when domains are unticked', selectedCount === poolSize() && poolSize() === 30, selectedCount + ' / ' + poolSize());
selectedDomains = new Set(ALL_DOMAINS); selectedCount = null;

// ---- randomness
selectedOrder = 'exam'; const N = 20000, freq = {}, sets = new Set();
for (let i = 0; i < N; i++) { const ids = pickQuestions(new Set(), 10); ids.forEach(id => freq[id] = (freq[id] || 0) + 1); if (i < 200) sets.add(ids.join('-')); }
const f = Object.values(freq), exp = N * 10 / 120; let chi = 0; f.forEach(x => chi += (x - exp) * (x - exp) / exp);
ck('random draw reaches all 120 questions', f.length === 120, f.length);
ck('random draw is uniform (chi-square, 119 df, limit 200)', chi < 200, chi.toFixed(1));
ck('first 200 draws are almost all distinct sets', sets.size >= 195, sets.size);
selectedOrder = 'shuffled'; const first = new Set(); for (let i = 0; i < 4000; i++) first.add(pickQuestions(new Set(), 120)[0]);
ck('shuffled first slot sees every question', first.size === 120, first.size);
const mf = {}; for (let i = 0; i < 2000; i++) pickMock().forEach(id => mf[id] = (mf[id] || 0) + 1);
ck('mock draw reaches all 120 and is near expected rates', Object.keys(mf).length === 120 && QUESTIONS.every(q => Math.abs(mf[q.id] / 2000 - MOCK_COUNTS[q.domain] / domainCount(q.domain)) < 0.05));
selectedOrder = 'exam';

// ---- pause (fake clock)
go('mock'); const d0 = state.deadline;
for (let k = 1; k <= 4; k++) { pauseExam(); const paused = !!state.pausedAt; clock.t += 30 * 60000; resumeExam();
  ck('pause ' + k + ' stops the clock for 30 minutes', paused && state.deadline === d0 + k * 30 * 60000 && state.pausesUsed === k); }
pauseExam(); ck('fifth pause is refused', !state.pausedAt && state.pausesUsed === 4);
ck('pause button disabled and labelled when none left', /No Pauses Left/.test(pauseBtnHtml()));
go('immediate'); ck('no pause button outside the mock exam', pauseBtnHtml() === '');
go('mock'); pauseExam(); ck('paused exam hides the questions', (render(), renderPaused().includes('Exam paused')));
go('mock'); clock.t = state.deadline + 1; tick(); ck('time running out auto-submits', state.screen === 'results' && state.timedOut === true && renderResults().includes('time expired'));

// ---- mark for review
go('later', 'exam', 12); const ids = state.questionIds;
ck('no next-marked button when nothing is marked', !/Next marked/.test(renderQuestion()));
toggleFlag(ids[0]); ck('marked button reflects state', /Marked for review/.test(renderQuestion()) && /aria-pressed="true"/.test(renderQuestion()));
ck('no next-marked when only this one is marked', !/Next marked/.test(renderQuestion()));
state.currentIndex = 5; toggleFlag(ids[5]); toggleFlag(ids[9]); toggleFlag(ids[9]);
ck('toggling twice unmarks', flaggedCount() === 2 && JSON.parse(store[STORAGE_KEY]).flagged[ids[5]] === true && !JSON.parse(store[STORAGE_KEY]).flagged[ids[9]]);
ck('next-marked is hidden while questions are neither answered nor marked', !/Next marked/.test(renderQuestion()));
ck('and Back to Review is hidden too', !/Back to Review/.test(renderQuestion()));
answer(true, i => i !== 0 && i !== 5); // every question now answered or marked, the two marked ones left unanswered
ck('next-marked appears once everything is answered or marked', (state.currentIndex = 1, /Next marked \\(2\\)/.test(renderQuestion())));
ck('Back to Review stays hidden while a marked question is unanswered', !/Back to Review/.test(renderQuestion()));
answer(true);
ck('Back to Review appears once every question is answered', /Back to Review/.test(renderQuestion()));
backToReview(); ck('Back to Review opens the review list', state.screen === 'summary' && /Review Your Answers/.test(renderSummary()));
state.screen = 'question'; state.currentIndex = 0; const path = []; for (let k = 0; k < 3; k++) { goToNextMarked(); path.push(state.currentIndex + 1); }
ck('next marked wraps round (6, 1, 6)', path.join() === '6,1,6', path.join());
state.currentIndex = 8; goToNextMarked(); ck('next marked from the end wraps to the first', state.currentIndex === 0);
state.screen = 'summary'; const sm = renderSummary();
ck('review list flags marked rows and offers a jump', (sm.match(/summary-flag" title="Marked/g) || []).length === 2 && /Go to first marked \\(2\\)/.test(sm) && /2 marked for review/.test(sm));
state.currentIndex = 7; goToFirstMarked(); ck('go to first marked', state.currentIndex === 0 && state.screen === 'question');

// ---- results filter
state.answers = {}; answer(true, i => i < 4); submitAll(); let rs = renderResults();
const wrong = ids.map((id, i) => i + 1).filter(n => n > 4);
ck('results default to incorrect only', state.resultsFilter === 'incorrect' && nums(rs).join() === wrong.join(), nums(rs).join());
ck('filter counts shown', /Incorrect \\(8\\)/.test(rs) && /Marked for review \\(2\\)/.test(rs) && /All \\(12\\)/.test(rs));
setResultsFilter('marked'); rs = renderResults(); ck('marked view keeps original numbers', nums(rs).join() === '1,6' && (rs.match(/tag flag">/g) || []).length === 2);
setResultsFilter('all'); rs = renderResults(); ck('all view shows every question', nums(rs).join() === '1,2,3,4,5,6,7,8,9,10,11,12');
go('later'); submitAll(); rs = renderResults(); ck('first page of 20 with a count of the rest', nums(rs).length === 20 && /Load More \\(100 remaining\\)/.test(rs));
loadMoreResults(); ck('load more adds 20', nums(renderResults()).length === 40);
setResultsFilter('all'); ck('changing filter resets to the first page', state.resultsOffset === 0 && nums(renderResults()).length === 20);
setResultsFilter('marked'); ck('empty marked view has a message', /No questions were marked/.test(renderResults()) && !/results-list/.test(renderResults()));
go('later', 'exam', 5); answer(true); submitAll(); ck('perfect score: incorrect view has a message', /No incorrect answers/.test(renderResults()) && !/results-list/.test(renderResults()));
const old = JSON.parse(JSON.stringify(state)); delete old.flagged; delete old.resultsFilter; state = old;
ck('quiz saved before these features still renders', renderResults().includes('Showing incorrect and unanswered'));
state.screen = 'question'; state.submitted = false; state.currentIndex = 0; ck('and can be marked', renderQuestion().includes('Mark for review') && (toggleFlag(state.questionIds[0]), flaggedCount() === 1));

// ---- multi-select, immediate feedback
go('later', 'exam'); const mi = state.questionIds.findIndex(id => getQuestion(id).multi); // full bank, so a multi-select question is always present
ck('bank contains a multi-select question to test', mi >= 0);
if (mi >= 0) { state.currentIndex = mi; const q = getQuestion(state.questionIds[mi]), need = q.correctAnswer.length;
  ['A', 'B', 'C', 'D'].slice(0, need + 1).forEach(l => selectAnswer(l));
  ck('multi-select keeps only the allowed number, dropping the oldest', asArray(state.answers[q.id]).length === need && !state.answers[q.id].includes('A'), state.answers[q.id]); }
go('immediate', 'exam', 5); const q0 = getQuestion(state.questionIds[0]);
['A', 'B', 'C'].slice(0, q0.correctAnswer.length).forEach(l => selectAnswer(l));
ck('immediate: Next disabled until submitted', /nextQuestion\\(\\)" disabled/.test(renderQuestion()));
submitAnswer(); ck('immediate: answer locks and the explanation shows', state.locked[q0.id] === true && /explanation visible/.test(renderQuestion()));
const before = JSON.stringify(state.answers[q0.id]); selectAnswer('C'); selectAnswer('D'); ck('immediate: a locked answer cannot be changed', JSON.stringify(state.answers[q0.id]) === before);

// ---- Next is blocked until answered or marked
go('later', 'exam'); { const i0 = state.currentIndex, id0 = state.questionIds[0];
  nextQuestion(); ck('next with no answer and no mark stays put and shows a hint', state.currentIndex === i0 && /next-hint/.test(renderQuestion()) && /Select an answer or mark this question for review/.test(renderQuestion()));
  selectAnswer('A'); ck('answering clears the hint', !/next-hint/.test(renderQuestion())); nextQuestion(); ck('next works once answered', state.currentIndex === i0 + 1);
  nextQuestion(); ck('hint again on the next unanswered question', state.currentIndex === i0 + 1 && /next-hint/.test(renderQuestion()));
  toggleFlag(state.questionIds[i0 + 1]); ck('marking for review clears the hint', !/next-hint/.test(renderQuestion())); nextQuestion(); ck('next works once marked for review', state.currentIndex === i0 + 2);
  nextQuestion(); prevQuestion(); nextQuestion(); ck('hint does not carry over after moving to another question and back', state.currentIndex === i0 + 2 && !/next-hint/.test(renderQuestion()));
  state.currentIndex = state.questionIds.length - 1; nextQuestion(); ck('last question: Review Answers also blocked when unanswered', state.screen === 'question' && /next-hint/.test(renderQuestion())); }
go('mock'); nextQuestion(); ck('mock: next blocked when unanswered', state.currentIndex === 0 && /next-hint/.test(renderQuestion()));

// ---- strike out options (all modes)
['immediate', 'later', 'mock'].forEach(m => { go(m, 'exam'); const sid = state.questionIds[0];
  ck(m + ': every option has a strike button', (renderQuestion().match(/class="strike-btn/g) || []).length === getQuestion(sid).options.length);
  ck(m + ': strike button is inside the option label showing ab', /<label class="option-label[^>]*>(?:(?!<\\/label>)[\\s\\S])*class="strike-btn(?:(?!<\\/label>)[\\s\\S])*class="strike-ab"[^>]*>ab<\\/span>(?:(?!<\\/label>)[\\s\\S])*<\\/label>/.test(renderQuestion()));
  toggleStrike('B'); ck(m + ': strike marks option and persists', state.struck[sid].includes('B') && /option-label struck/.test(renderQuestion()) && JSON.parse(store[STORAGE_KEY]).struck[sid][0] === 'B');
  toggleStrike('B'); ck(m + ': strike toggles off', !state.struck[sid] && !/option-label struck/.test(renderQuestion())); });
go('later', 'exam'); { const sid = state.questionIds[0]; selectAnswer('A'); toggleStrike('A');
  ck('striking a selected option deselects it', state.answers[sid] === undefined && state.struck[sid].includes('A'));
  selectAnswer('A'); ck('selecting a struck option restores it', state.answers[sid] === 'A' && !state.struck[sid]); }
go('immediate', 'exam'); { const sid = state.questionIds[0], q = getQuestion(sid); selectAnswer(q.correctAnswer[0]); submitAnswer(); toggleStrike('D');
  ck('locked question cannot be struck', !state.struck[sid] && /strike-btn" disabled/.test(renderQuestion())); }

// ---- theme
ck('theme defaults to dark', currentTheme() === 'dark');
toggleTheme(); ck('toggle switches to light and saves it', currentTheme() === 'light' && store.ccao_quiz_theme === 'light');
go('later'); confirmReset(); ck('reset keeps the theme', currentTheme() === 'light' && store.ccao_quiz_theme === 'light'); toggleTheme();
ck('toggle returns to dark', currentTheme() === 'dark');
updateThemeButton(); ck('dark mode: button offers Light Mode in title case', document.getElementById('theme-toggle').textContent.includes('Light Mode'));
toggleTheme(); ck('light mode: button offers Dark Mode in title case', document.getElementById('theme-toggle').textContent.includes('Dark Mode')); toggleTheme();

// ---- top bar buttons and the timer row
go('mock'); ck('mock: Reset is in the top bar, Pause Timer is not', /Reset/.test(renderTopbarActions()) && !/Pause Timer/.test(renderTopbarActions()));
ck('mock: Pause Timer sits after the countdown in the same row', /class="timer-row"><span id="timer"[^>]*>Time left [^<]*<\\/span><button[^>]*>Pause Timer \\(4 of 4 Left\\)/.test(timerRowHtml()));
ck('mock: question page has the timer row and no bottom Reset', renderQuestion().includes('timer-row') && !/onclick="confirmReset\\(\\)"/.test(renderQuestion()));
state.screen = 'summary'; ck('mock: review page has the timer row, Reset only in the top bar', renderSummary().includes('timer-row') && !/onclick="confirmReset\\(\\)"/.test(renderSummary()) && /Reset/.test(renderTopbarActions()));
state.screen = 'question'; pauseExam(); ck('paused: top bar buttons are hidden', renderTopbarActions() === ''); resumeExam();
go('immediate'); ck('non-mock: Reset in top bar, no timer row or Pause Timer', /Reset/.test(renderTopbarActions()) && timerRowHtml() === '' && !renderQuestion().includes('Pause Timer'));
clearState(); ck('start screen: no top bar buttons', renderTopbarActions() === '');
go('mock'); answer(true); submitAll(); ck('results screen: no top bar buttons', renderTopbarActions() === '' && timerRowHtml() === '');
return C; })()`, ctx);
let fails = 0; out.forEach(([n, ok, d]) => { if (!ok) { fails++; console.log('FAIL: ' + n + (d !== undefined ? ' -> ' + d : '')); } });
console.log(`logic: ${out.length - fails} passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
