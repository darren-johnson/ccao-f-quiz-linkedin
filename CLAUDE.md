# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

A static, offline practice quiz for the Claude Certified Associate Foundations (CCAO-F) exam. No build step, no server, no npm dependencies. README.md covers features and modes in detail.

## Commands

- Run the app: open `index.html` in a browser.
- All checks: `PYTHON=python3.9 sh tests/run.sh` (run from this folder; bare `run.sh` fails in zsh). Plain `sh tests/run.sh` also works but skips the browser test when `python3` has no Playwright.
- Single suites: `node tests/bank.test.js`, `node tests/logic.test.js`, `python3 tests/browser.test.py [--shots DIR]`.
- The browser test needs Playwright installed for the same Python that runs it (`python3 -m pip install playwright`, or `PYTHON=python3.9 sh tests/run.sh`). It uses installed Chrome; set `CHROME_PATH` if not found. `run.sh` skips it when Playwright is missing.

## Architecture

- `questions.js` defines the globals `QUESTIONS`, `DOMAINS` and `DOMAIN_WEIGHTS`, loaded by a plain `<script>` tag (not a module).
- `index.html` holds all CSS, markup and app logic. The logic is the **last** inline `<script>` block. Rendering is string-based: `render()` dispatches to `renderStart`, `renderQuestion`, `renderSummary`, `renderResults` and `renderPaused`, then `attachHandlers()` rebinds events. `render()` also fills the top bar's `#topbar-actions` (the Reset button, only while a quiz is in progress) through `renderTopbarActions()`; the theme button is static markup beside it. In the mock exam, the countdown and Pause Timer button are rendered together by `timerRowHtml()`, so do not add Reset or Pause buttons to the question or summary markup.
- State is one global `state` object saved to `localStorage` under `STORAGE_KEY`. The theme uses a separate `THEME_KEY`, so Reset does not clear it.
- Mock exam: `MOCK_COUNTS` (per-domain draw), `MOCK_MINUTES`, `MAX_PAUSES`. The clock is deadline-based (`state.deadline`, `pausedAt`) so it survives page close and auto-submits on timeout. Questions are drawn with a Fisher-Yates `shuffle` via `pickQuestions` / `pickMock`.
- `tests/logic.test.js` slices the last `<script>\n` ... `</script>` out of `index.html` and runs it in a Node `vm` context with a stubbed DOM and fake `Date.now`. Keep the app script as the final script block, and if you use a new DOM API in the app, add it to the stub's `document`/element object in that test.
- `tests/browser.test.py` drives the real page. `tests/bank.test.js` validates `questions.js`.
- Quizzes in the browser test start with random questions, so any question can be multi-select (2 picks needed). Tests that submit an answer must keep picking options until Submit Answer enables (see the loop near `tests/browser.test.py:185`), not assume one click is enough.

## Question bank rules (enforced by `tests/bank.test.js`)

- Ids are 1..N in order; `ref` is `"<domain>.<n>"` and starts with the question's domain.
- Single answer: 4 options, `correctAnswer` is a letter. Multiple response (`multi: true`): 5 options, `correctAnswer` is an array of 2 or 3 letters, and the question text says "Select TWO" or "Select THREE" to match.
- Explanation must include `Why not the others:` and must not contain a stray `Domain N:` heading.
- No em or en dashes anywhere in question text, options or explanations.
- Questions with numbered steps (1. to 5.) put each step on its own line using `\n` in the question text. `.question-text` and `.result-qtext` use `white-space: pre-line` so the line breaks show.
- Single-answer correct letters must stay balanced (18 to 28 each).
- The questions come from Matthew Purcell's two PDFs on LinkedIn; the README credits him with a link to https://www.linkedin.com/in/purcellmatthew. Keep that credit.

## Coupled numbers

The figures 120 questions, 29 multi-select, per-domain counts (16/26/14/20/14/18/12), the 60-question mock and the 75% domain flag are hard-coded in `questions.js` (header), `index.html`, all three test files and README.md. Adding or removing questions means updating all of them together, including `MOCK_COUNTS`. When retargeting to another exam, follow the README section "Making a quiz for another exam or technology", and change `STORAGE_KEY` so old saved progress is not offered for resume.
