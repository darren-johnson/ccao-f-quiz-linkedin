// Question bank integrity checks. Run: node tests/bank.test.js
const fs = require('fs'), vm = require('vm'), path = require('path'), assert = require('assert');
const root = path.resolve(__dirname, '..');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'questions.js'), 'utf8') + ';globalThis.D={Q:QUESTIONS,DOM:DOMAINS,W:DOMAIN_WEIGHTS}', ctx);
const { Q, DOM, W } = ctx.D;
let fails = 0, passes = 0;
const check = (name, cond, detail) => { if (cond) passes++; else { fails++; console.log('FAIL: ' + name + (detail !== undefined ? ' -> ' + detail : '')); } };

check('120 questions', Q.length === 120, Q.length);
check('ids are 1..120 and unique', Q.every((q, i) => q.id === i + 1));
check('refs unique', new Set(Q.map(q => q.ref)).size === Q.length);
const expectedByDomain = { 1: 16, 2: 26, 3: 14, 4: 20, 5: 14, 6: 18, 7: 12 };
const byDomain = {}; Q.forEach(q => byDomain[q.domain] = (byDomain[q.domain] || 0) + 1);
check('questions per domain match the blueprint mix', JSON.stringify(byDomain) === JSON.stringify(expectedByDomain), JSON.stringify(byDomain));
check('every domain has a name and weight', Object.keys(expectedByDomain).every(d => DOM[d] && W[d]));
check('weights sum to 100', Object.values(W).reduce((a, b) => a + b, 0) === 100);

const singleLetters = { A: 0, B: 0, C: 0, D: 0 };
Q.forEach(q => {
  const tag = 'Q' + q.id;
  ['question', 'explanation'].forEach(f => check(tag + ' has ' + f, typeof q[f] === 'string' && q[f].trim().length > 20));
  check(tag + ' domain is valid', DOM[q.domain] !== undefined);
  check(tag + ' ref starts with its domain', String(q.ref).split('.')[0] === String(q.domain), q.ref);
  check(tag + ' options are unique and non-empty', new Set(q.options).size === q.options.length && q.options.every(o => o.trim()));
  const letters = 'ABCDE'.slice(0, q.options.length).split('');
  const ans = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
  check(tag + ' answers are valid letters', ans.every(a => letters.includes(a)), ans);
  check(tag + ' answers are unique', new Set(ans).size === ans.length);
  if (q.multi) {
    check(tag + ' multi has 5 options', q.options.length === 5, q.options.length);
    check(tag + ' multi answer is an array of 2 or 3', Array.isArray(q.correctAnswer) && [2, 3].includes(q.correctAnswer.length));
    const word = { 2: 'TWO', 3: 'THREE' }[ans.length];
    check(tag + ' says "Select ' + word + '"', q.question.includes('Select ' + word), q.question.slice(-30));
  } else {
    check(tag + ' single has 4 options and a string answer', q.options.length === 4 && typeof q.correctAnswer === 'string');
    singleLetters[q.correctAnswer]++;
    check(tag + ' does not say "Select TWO/THREE"', !/Select (TWO|THREE)/.test(q.question));
  }
  check(tag + ' explanation has "Why not the others"', q.explanation.includes('Why not the others:'));
  const text = [q.question, q.explanation, ...q.options].join(' ');
  check(tag + ' has no em or en dashes', !/[–—]/.test(text));
  check(tag + ' explanation has no stray domain heading', !/Domain \d:/.test(q.explanation));
  check(tag + ' numbered steps are on separate lines', !/ [1-5]\. /.test(q.question) || /\n[1-5]\. /.test(q.question));
});
const counts = Object.values(singleLetters);
check('single-answer letters are balanced (18 to 28 each)', counts.every(n => n >= 18 && n <= 28), JSON.stringify(singleLetters));
check('29 multi-select questions', Q.filter(q => q.multi).length === 29);

console.log(`bank: ${passes} passed, ${fails} failed`);
process.exit(fails ? 1 : 0);
