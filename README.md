# CCAO-F Practice Quiz

A practice quiz for the Claude Certified Associate Foundations (CCAO-F) exam, built on a bank of 120 questions from Matthew Purcell's two excellent practice-question PDFs on LinkedIn. Runs entirely in the browser, with no install and no server.

**Questions:** the questions and explanations come from Matthew Purcell's two excellent PDFs, shared on LinkedIn: the CCAO-F Practice Question Set and the Practice Exam Question Set Version 2 (60 questions each). Follow him and read the originals at [linkedin.com/in/purcellmatthew](https://www.linkedin.com/in/purcellmatthew). Thank you, Matthew.

**Origins:** the quiz engine, meaning the page layout, the question and answer flow and the results screen, started from [maro-v1/CCA-quiz](https://github.com/maro-v1/CCA-quiz). This version extends it with a 120-question bank, a timed 60-question mock exam with a limited number of pauses, domain and question-count selection with random draws, marking questions for review, striking out answer options, a results view that defaults to incorrect answers, a dark and light theme, and an automated test suite.

## How to run

Open `index.html` in a browser. Everything is local.

## Question bank

120 questions, spread across the seven domains at the exam guide's blueprint weights:

| Domain                                     | Weight | Questions | Mock exam draw |
| ------------------------------------------ | ------ | --------- | -------------- |
| 1 Prompting and Task Execution             | 14%    | 16        | 8              |
| 2 Output Evaluation and Validation         | 21%    | 26        | 13             |
| 3 Product and Model Selection              | 12%    | 14        | 7              |
| 4 Workflow Integration and Solution Design | 16%    | 20        | 10             |
| 5 Configuration and Knowledge Management   | 12%    | 14        | 7              |
| 6 Governance, Risk, and Responsible Use    | 15%    | 18        | 9              |
| 7 Troubleshooting and Optimization         | 10%    | 12        | 6              |

- 91 multiple choice (including 13 ordering) and 29 multiple response (select two) questions; each states how many to select
- Every explanation gives the correct answer, the reasoning, and why each other option is wrong
- The mock exam draws 60 of the 120 questions at random, at the blueprint mix
- Ordering questions list their numbered steps one per line

## Modes

- **Immediate Feedback** shows the correct answer and explanation after each question
- **Review at End** lets you answer everything, then submit for a full results breakdown
- **Mock Exam** draws 60 questions at the blueprint weights, shuffles them, and gives you 120 minutes, as in the real exam. Results appear at the end. The clock keeps running if you close the page, and the quiz submits itself when time runs out
- **Pause Timer** (mock exam only): the button sits to the right of the "Time left" countdown, on the question and review screens. It stops the clock and hides the questions until you resume. It can be used 4 times in total per mock exam; after that the button reads "No Pauses Left" and is disabled. A paused exam stays paused if you close the page
- **Reset**: a red button at the top left of the page while a quiz is in progress (all modes). It is not shown on the start, paused or results screens
- The first two modes can show questions in domain order or shuffled
- **Domains to include**: in the first two modes, tick any combination of domains on the start screen and the quiz uses only those. The mock exam always draws from all seven domains
- **Number of questions**: in the first two modes, enter how many questions you want, up to the number available in the ticked domains. Leave it blank for all of them
- **Random selection**: when you ask for fewer questions than are available, they are drawn at random from the ticked domains (an unbiased Fisher-Yates shuffle, then the first N), so each run gives a different set. "Domain order" then shows that random set grouped by domain; "Shuffled" shows it in random order. The mock exam draws its questions at random within each domain and shuffles the order
- Score by domain, with domains under 75% flagged
- **Mark for review**: every question has a "Mark for review" button (all modes). Marked questions show a flag in the Review Your Answers list, which also has a "Go to first marked" button, and they carry a flag tag in the results. Once every question is either answered or marked, a "Next marked" button appears on each question and jumps straight to the next marked question (wrapping to the first), so you can review only those without paging through the rest. Once every question has an answer, a "Back to Review" button appears on each question and returns you to the review list. Marks are saved with your progress
- **Next is blocked on blank questions**: in Review at End and Mock Exam, Next (and Review Answers on the last question) will not move on until the question is answered or marked for review. A yellow message above the buttons says "Select an answer or mark this question for review before moving on." It clears when you answer or mark. You can still jump around with Prev, the review list and Next marked
- **Strike out answers**: every option has a strikethrough button (the "ab" icon with a line through it, as in Word) inside its answer box, at the right edge (all modes). Click it to cross the option out while you narrow down the answer, and click it again to restore it. Striking a selected option deselects it, picking a struck option restores it, and strikes are saved with your progress. They lock once the answer is submitted
- **Results breakdown**: opens on incorrect and unanswered questions only. Switch to "Marked for review" or "All" with the buttons above the list. Question numbers stay as they were in the quiz
- **Dark / light mode**: the button at the top right ("Light Mode" while dark, "Dark Mode" while light) switches theme. Dark is the default, and your choice is remembered separately from quiz progress, so Reset does not clear it
- Progress is saved to `localStorage` and survives page refresh

## Tests

Run these after changing `questions.js` or `index.html`. In Terminal, `cd` into this folder first, and include the `tests/` part of the path. Typing just `run.sh` fails with "command not found", because zsh does not look in the current folder for commands:

```
sh tests/run.sh
```

(`./tests/run.sh` works too.)

- `tests/bank.test.js` (Node only): checks the 120 questions, such as unique ids, valid answers, the "Select TWO/THREE" wording matching the answer count, domain counts, balanced answer letters, explanation format, numbered steps on separate lines, and no dashes
- `tests/logic.test.js` (Node only): checks the app logic with a stubbed page and a fake clock, covering modes, domain and number-of-questions selection, randomness, pause limits, auto-submit on timeout, the top bar and timer row buttons, Next being blocked on blank questions, marking for review, strike out, Next marked, the results filter, multi-select, immediate feedback and the theme
- `tests/browser.test.py` (Python, Playwright and Chrome): clicks through the real page, covering the start screen, resume after reload, Next marked, strike out in every mode, the mock exam timer and pauses, the button layout, and the dark and light themes at desktop and phone widths. Install with `pip install playwright`; it uses your installed Chrome. Add `--shots some-folder` to save screenshots. Set `CHROME_PATH` if Chrome is not found

`run.sh` skips the browser test if Playwright is not installed for the Python it uses (`python3` by default). `pip` and `python3` can point at different Pythons, so install with `python3 -m pip install playwright`, or run `PYTHON=python3.9 sh tests/run.sh` to pick the Python that has it.

## Project structure

| File           | Purpose                                                                    |
| -------------- | -------------------------------------------------------------------------- |
| `index.html`   | App UI, styles, and all application logic                                  |
| `questions.js` | Globals `QUESTIONS`, `DOMAINS` and `DOMAIN_WEIGHTS` loaded by `index.html` |
| `tests/`       | Bank, logic and browser checks, run with `sh tests/run.sh`                 |
| `CLAUDE.md`    | Guidance for Claude Code when working in this folder                       |

## Notes on accuracy

Answers and explanations are as written in Matthew Purcell's PDFs, with em dashes rewritten, stray page headings removed, and a few terse rationales lightly reworded so they read as sentences. They have not been re-checked against current product documentation, and product details change. If an answer looks out of date, check the Claude Help Center.

## Making a quiz for another exam or technology

The quiz engine has no exam-specific logic of its own. Everything about CCAO-F lives in a few places, so you can point it at a different exam by supplying that exam's guide and your own study notes, and letting Claude regenerate the bank.

### What you need

- **The exam guide**, ideally the official skills outline or blueprint. It supplies the domain names, domain weights, number of questions, time limit, pass mark and question types, which the quiz uses to weight the bank and size the mock exam
- **Your study notes**, as Word, PDF or text files. The questions are written from these, so they should cover each domain. Notes you wrote or took yourself are best
- **This folder**, so Claude can replace the questions and update the app and tests in place

Then open the folder in Claude (Claude Code, or Claude with the folder connected), attach or point to your material, and paste the prompt below.

### What has to change

| Where          | What                                                                                                                                                                                                                                                                                         |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `questions.js` | The `QUESTIONS` list, `DOMAINS` (names), `DOMAIN_WEIGHTS` (percentages) and the header comment                                                                                                                                                                                               |
| `index.html`   | The page `<title>` and heading, the start-screen subtitle (number of domains, mock size, the 75% target), the mock exam card text, `STORAGE_KEY`, `MOCK_MINUTES` and `MOCK_COUNTS` (questions per domain in the mock), the scaled-score note on the mock results, and the disclaimer wording |
| `tests/`       | The numbers tied to the current bank: `bank.test.js` has the question count, per-domain counts, multi-select count near the top. `logic.test.js` and `browser.test.py` use figures such as 120 questions and the 60-question mock                    |
| `README.md`    | The bank table, mock exam numbers and accuracy notes                                                                                                                                                                                                                                         |

Change `STORAGE_KEY` for every new quiz. Browsers can share saved progress between local files, so a copy that keeps the old key may offer to resume someone else's quiz.

The question format stays the same, so the app, the modes and the tests keep working:

```js
{ "id": 1, "ref": "1.1", "domain": 1, "multi": false,
  "question": "...", "options": ["...", "...", "...", "..."],
  "correctAnswer": "B",           // a letter, or ["D", "E"] for select-two or three
  "explanation": "Correct: B. ... Why not the others: A: ...; C: ...; D: .... Source: Study notes 04: ..." }
```

### The prompt this quiz started from

```text
Look at Claude Certified Associate – Foundations Exam Guide.pdf and the word documents from 01 to 12. Then create a bank of 120 questions that will be tested in the exam. Replace the questions in ccao-f-quiz-exam-pdf folder with these new questions. The answers must be accurate and have full explanations. Ask me questions before starting.
```

It worked because it named the inputs, the output and the quality bar, and asked for questions first. The version below keeps all of that and adds what turned out to matter: which parts of the app must change, concrete question-quality rules, a check against official documentation, and a definition of done.

### An optimised prompt for a new exam

This quiz was built with Claude Cowork, which was given access to the folder containing the exam guide and the study notes. Do the same for a new exam: give Claude access to the folder holding your documents, and to this quiz folder, before you paste the prompt below.

Fill in the square brackets. Delete any line that does not apply.

```text
Turn the practice quiz in this folder into a quiz for [EXAM NAME AND CODE, e.g. "AZ-104 Azure Administrator"].

INPUTS
- Exam guide: [file name]. It contains the domains, weights, question count, time limit and pass mark.
- Study notes: [file names or folder].
- This folder holds the existing quiz engine: index.html, questions.js, tests/ and README.md. Keep the engine and the question format. Replace the content.

BEFORE YOU START
Read the exam guide first and extract the domain names and weights, the number of questions, the time limit, the pass mark and the question types. Then read all the notes and map each one to a domain.
Then ask me every clarifying question in one batch, as multiple choice where you can, and wait for my answers. Cover at least: how many questions to write, whether to follow the exam's domain weights, how large the mock exam should be, whether to check the notes against official documentation, and the spelling convention. If I do not answer, use these defaults: [120 questions; blueprint weights; mock sized to the real exam; check notes against official docs; British English].

WHAT TO PRODUCE
1. questions.js: replace QUESTIONS, DOMAINS, DOMAIN_WEIGHTS and the header comment.
2. index.html: update everything exam-specific: the title and heading, the subtitle, the mock exam card text, STORAGE_KEY (make it unique), MOCK_MINUTES, MOCK_COUNTS, the scaled-score note on the mock results, and the disclaimer.
3. tests/: update the numbers tied to the old bank so that "sh tests/run.sh" passes.
4. README.md: update the bank table, mock exam numbers and accuracy notes.

QUESTION RULES
- Questions are new and original, written from my notes and the exam guide. Do not reproduce real exam questions or copy sentences from the notes.
- Spread questions across the domains at the exam weights.
- Mostly scenario-based, testing judgement rather than recall of wording.
- Single answer: four options, exactly one correct. Multiple response: five options, with "Select TWO" or "Select THREE" in the question. About 15% should be multiple response, if the exam uses them.
- Distractors must be plausible and similar in length and detail to the correct option. The correct option must not be the longest or most specific one. Avoid "all of the above" and "none of the above".
- Spread the correct letters evenly.
- Every explanation follows this shape: "Correct: X. <reasoning>. Why not the others: A: ...; B: .... Source: <note name>."

ACCURACY
Check every factual claim against the notes, and check anything that changes over time (features, limits, prices, versions, policies) against current official documentation. Where the notes and the documentation disagree, do not test the disputed detail. Test the underlying principle instead, and list the disagreement for me.

DONE WHEN
- "sh tests/run.sh" passes, and you have opened the page in a browser and clicked through a quiz, a mock exam and the results screen.
- Your final message gives the questions per domain, the notes-versus-documentation disagreements you found, and anything you could not verify.
```

### After it finishes

- Run `sh tests/run.sh`, then open `index.html` and take a short quiz and a mock exam
- Read a sample of explanations against your notes, especially for any detail that changes with new releases
- If the exam guide gives a scoring scheme, update the note on the mock results screen so it does not suggest a percentage maps to the real score

## Disclaimer

This is an unofficial study tool. Questions are not actual exam content. Use for study purposes only.
