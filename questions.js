// Questions from Matthew Purcell's CCAO-F practice PDFs on LinkedIn (two practice sets, 120 items across 7 domains).
// https://www.linkedin.com/in/purcellmatthew
// correctAnswer is a letter for single-select, or an array of letters for multiple response.
const QUESTIONS = [
  {
    "id": 1,
    "ref": "1.1",
    "domain": 1,
    "multi": false,
    "question": "A marketing associate types “write something about our new product” and is disappointed with the generic result. Which revision best reflects effective prompting for a business task?",
    "options": [
      "“Write something better about our new product.”",
      "“Write a 150-word LinkedIn post announcing our scheduling app to small-business owners; friendly, professional tone; end with a waitlist call to action.”",
      "“Write about our product” repeated three times in a row so the model understands the request is serious and takes it seriously.",
      "“You are the world’s greatest copywriter, with decades of award-winning experience. Write something about our product that really captures how great it is.”"
    ],
    "correctAnswer": "B",
    "explanation": "Effective prompts supply the ingredients the model cannot guess: the deliverable, its length, the audience, the tone, and the goal. The revision specifies all five, so the output can actually match intent. Why not the others: A adds pressure without information; C repeats the same missing context; D adds a persona but still omits audience, format, and purpose, the details that determine the result."
  },
  {
    "id": 2,
    "ref": "1.2",
    "domain": 1,
    "multi": false,
    "question": "An operations lead must produce a quarterly review covering budget variance, project status, staffing, and next-quarter risks. A single prompt asking for the whole document produces shallow, uneven coverage. Which technique addresses this?",
    "options": [
      "Ask for the whole document again, but double the requested word count so every section has enough room to be covered in proper depth",
      "Ask Claude to try harder on the weak sections",
      "Switch to bullet points only, so gaps are less visible",
      "Decompose it: work through each section as its own request, review each one, then ask for a combined, consistent draft"
    ],
    "correctAnswer": "D",
    "explanation": "Task decomposition turns one overloaded request into a sequence of focused ones. Each section gets full attention, errors are caught at the step where they occur, and the final assembly starts from verified parts. Why not the others: A produces longer shallow coverage, not deeper; B is not an instruction the model can act on; C hides the problem instead of fixing it."
  },
  {
    "id": 3,
    "ref": "1.3",
    "domain": 1,
    "multi": false,
    "question": "Claude’s first draft of a client email is too formal and buries the key request in the final paragraph. What is the most effective way to iterate?",
    "options": [
      "Give specific feedback: “Make it warmer and more conversational, and move the request to reschedule into the opening two sentences”",
      "Send the identical prompt again without any changes and hope the natural variation between responses produces a better draft",
      "Start a brand-new conversation and retype the original prompt",
      "Accept the draft as it stands and edit everything manually yourself, since iterating with the model rarely improves anything much"
    ],
    "correctAnswer": "A",
    "explanation": "Iteration works when feedback is specific and actionable: name what is wrong and what “better” looks like. The model can then revise deliberately rather than regenerate blindly. Why not the others: B and C rely on luck: the same input tends to produce the same shortcomings; D forfeits the fastest path to a good draft when one targeted instruction would fix it."
  },
  {
    "id": 4,
    "ref": "1.4",
    "domain": 1,
    "multi": false,
    "question": "A project manager wants to use Claude for two different tasks: brainstorming names for an internal program, and drafting the program’s formal charter. How should the prompting strategy differ between the two?",
    "options": [
      "Both tasks should use identical prompts, since prompting principles are universal",
      "The brainstorm should specify exact formatting rules and strict limits; the charter should ask for maximum creativity and give the model complete freedom over structure",
      "For the brainstorm, ask for many varied options and defer judgment; for the charter, provide structure, required sections, tone, and constraints",
      "Brainstorming should be avoided, as models cannot generate original ideas"
    ],
    "correctAnswer": "C",
    "explanation": "Adapting strategy to task type means matching the prompt to the goal: divergent tasks want volume, variety, and loose constraints; convergent drafting wants explicit structure, tone, and requirements. Why not the others: A ignores that the two tasks have opposite goals; B applies each strategy to the wrong task; D is simply false: idea generation is one of the strongest use cases."
  },
  {
    "id": 5,
    "ref": "1.5",
    "domain": 1,
    "multi": false,
    "question": "An analyst pastes a table of regional sales figures and asks Claude to “analyze this.” The response is a bland restatement of the numbers. Which revised request produces genuinely useful analysis?",
    "options": [
      "“Take another look at this data and analyze it again, but this time go much deeper and be far more thorough about it.”",
      "“Identify the three regions with the largest quarter-over-quarter decline, suggest explanations to investigate, and flag anything unusual; we’re deciding where to focus retention next quarter.”",
      "“Analyze this table exactly the way a world-class data scientist would: bring the full weight of statistical expertise, professional intuition, and years of hard-won industry experience to bear on it.”",
      "“Summarize this table in half the length.”"
    ],
    "correctAnswer": "B",
    "explanation": "Analysis prompts work when they state the questions to answer, the criteria that matter, and the decision the analysis feeds. That converts “describe the data” into “help me decide.” Why not the others: A and C restyle the request without telling the model what to look for; D asks for compression, which is the opposite of analysis."
  },
  {
    "id": 6,
    "ref": "1.6",
    "domain": 1,
    "multi": false,
    "question": "A communications officer has a detailed technical incident report and must brief the executive team. Which prompt element matters most for getting a usable result on the first pass?",
    "options": [
      "Asking Claude to keep every technical detail from the report in the briefing so that absolutely nothing is lost in translation",
      "Requesting the longest possible output to demonstrate thoroughness",
      "Asking for the briefing to be written in a language the executive team does not speak, so that confidentiality of the incident details is fully preserved",
      "Stating the audience and needs: “for non-technical executives, one page, lead with customer impact and cost, end with the three decisions we need”"
    ],
    "correctAnswer": "D",
    "explanation": "Audience is the highest-leverage instruction in adaptation tasks. Naming who will read it, what they care about, and what they must do converts a technical artifact into a decision-ready briefing. Why not the others: A recreates the original problem: executives drowning in detail; B confuses length with value; C is a nonsensical control that defeats the purpose of a briefing."
  },
  {
    "id": 7,
    "ref": "1.7",
    "domain": 1,
    "multi": true,
    "question": "Which TWO elements most improve a prompt for drafting a customer-facing announcement? (Select TWO.)",
    "options": [
      "Leaving the request deliberately vague so the model can be creative",
      "Naming the audience and the purpose the announcement must achieve",
      "Writing the entire prompt in capital letters for emphasis",
      "Specifying format, length, and tone requirements for the deliverable",
      "Asking the model to guess what the company probably wants to say"
    ],
    "correctAnswer": [
      "B",
      "D"
    ],
    "explanation": "Audience-plus-purpose and concrete deliverable constraints are the two ingredients that let the model aim at the right target and land in the right shape, the difference between generic text and a usable draft. Why not the others: A and E withhold exactly the information quality depends on; C changes emphasis, not understanding."
  },
  {
    "id": 8,
    "ref": "1.8",
    "domain": 1,
    "multi": false,
    "question": "An operations associate must turn a 60-page vendor audit into a board-ready one-page summary, using Claude throughout. The work involves five activities:\n1. Review the extracted findings against the source report for accuracy\n2. Upload the report and have Claude extract the key findings for each audit area\n3. Define the summary’s audience, purpose, and required structure\n4. Have Claude draft the one-page summary from the verified findings\n5. Refine the draft’s tone and emphasis through targeted feedback\n\nIn which order should the activities be carried out?",
    "options": [
      "2 → 3 → 1 → 4 → 5",
      "3 → 2 → 1 → 4 → 5",
      "3 → 2 → 4 → 1 → 5",
      "2 → 4 → 5 → 1 → 3"
    ],
    "correctAnswer": "B",
    "explanation": "Requirements first, verification before dependence: define what the summary must achieve (3) so the extraction is aimed at it, extract (2), verify the intermediate output before anything builds on it (1), draft from verified findings (4), and refine last (5). Each step’s output is checked before the next step consumes it. Why not the others: A extracts before the purpose is defined, so the extraction has no target; C drafts from unverified findings, letting errors flow downstream into the board paper; D leaves both accuracy checking and purpose-setting until after the draft exists, backwards on both counts."
  },
  {
    "id": 9,
    "ref": "1.9",
    "domain": 1,
    "multi": false,
    "question": "A communications officer wants Claude to draft an all-staff email announcing a change to the office entry system. Her first prompt was “Write an email about the new door access cards” and the draft was generic. Which revision is most likely to produce a usable first draft?",
    "options": [
      "“Draft a 200-word all-staff email from Facilities: new access cards replace the keypads from 1 March; reassuring tone; close with where to collect a card.”",
      "“Write a professional, reassuring email about the new door access cards that staff across all our offices will find easy to read and act on.”",
      "“Write three different emails about the new door access cards, each in a different tone, so that I can choose the strongest one to send.”",
      "“You are an award-winning corporate communicator with decades of experience writing for large organisations. Write an email about the new door access cards.”"
    ],
    "correctAnswer": "A",
    "explanation": "An effective business prompt states the sender, audience, length, the specific facts to convey, the tone and the closing action. Claude can only be specific when the prompt is. Why not the others: B adds tone but still omits the facts, sender and call to action; C multiplies a vague request rather than improving it; D assigns a role without saying what the email must contain."
  },
  {
    "id": 10,
    "ref": "1.10",
    "domain": 1,
    "multi": false,
    "question": "A policy analyst uses the same prompt structure for every task: a role, the task and a word limit. It works well for summaries, but brainstorming requests keep returning a short, safe list of ideas. Which adjustment best reflects adapting the prompting strategy to the task type?",
    "options": [
      "Raise the word limit so that Claude has room to explain each idea in more depth and justify it.",
      "Drop the word limit, ask for many varied ideas, and judge quality only once the list exists.",
      "Ask Claude for the single best idea with a full justification, so that quality replaces quantity.",
      "Add “be creative” to the role description and keep the task line and the word limit exactly as they are."
    ],
    "correctAnswer": "B",
    "explanation": "Brainstorming rewards breadth and deferred judgement; summarising rewards compression. A template tuned for one task type will constrain the other, so the constraints need to change with the task. Why not the others: A produces longer explanations of the same few ideas; C narrows the output further when the problem is too little range; D changes a label, not the constraints that are suppressing range."
  },
  {
    "id": 11,
    "ref": "1.11",
    "domain": 1,
    "multi": false,
    "question": "An operations lead asks Claude, in one prompt, to review 40 supplier contracts, extract the renewal dates, flag unfavourable terms and draft renegotiation emails. The output covers some contracts thoroughly and skips others. Which change is most likely to fix the problem?",
    "options": [
      "Resubmit the same prompt with “make sure that every one of the 40 contracts is covered” added at the end.",
      "Switch to a more capable model so that the single prompt can handle the full workload in one pass.",
      "Split the request into stages (dates, then terms, then emails) and check each stage before moving on.",
      "Ask Claude to work through the contracts in alphabetical order and number each one so that none are overlooked."
    ],
    "correctAnswer": "C",
    "explanation": "Skipping items on a large multi-part request is a sign of a decomposition problem. Sequenced sub-tasks give each step a focused context and an output that can be checked before the next step depends on it. Why not the others: A restates the demand without changing the structure that caused the gaps; B treats capability as the limit when the request’s structure is; D changes the order but not the size of the task in one context."
  },
  {
    "id": 12,
    "ref": "1.12",
    "domain": 1,
    "multi": false,
    "question": "A grants officer asked Claude to rewrite a funding application summary. The draft is accurate, but the tone is too informal and it omits the project’s $240,000 budget. Which follow-up prompt best reflects effective iteration?",
    "options": [
      "“That is not quite right for a funding application. Please try again and produce a better, more polished version.”",
      "“Rewrite the whole summary from scratch, and this time make it formal enough for a government assessor to read.”",
      "“Which parts of the summary do you think are too informal, and what would you change about them before I send it?”",
      "“Keep the content, make the tone formal for a government assessor, and add the $240,000 budget to the first paragraph.”"
    ],
    "correctAnswer": "D",
    "explanation": "Good iteration keeps what worked and names exactly what must change. Both gaps (tone and the missing budget) are specific, so the follow-up should address both specifically. Why not the others: A gives Claude nothing to act on; B discards the accurate content and still does not mention the budget; C asks for diagnosis when the officer already knows what needs to change."
  },
  {
    "id": 13,
    "ref": "1.13",
    "domain": 1,
    "multi": true,
    "question": "A sales coordinator is drafting a prompt for Claude to turn her notes from a client meeting into a follow-up email. Which two elements should the prompt include? (Select TWO.)",
    "options": [
      "An instruction to make the email as long as necessary to cover everything discussed.",
      "Every email the coordinator has sent this year, so that the writing style is reproduced exactly.",
      "The meeting notes themselves, clearly separated from the instructions.",
      "A request for Claude to rate how confident it is in the accuracy of the email.",
      "The intended reader and the outcome the email should achieve, such as confirming next steps and securing a demonstration date."
    ],
    "correctAnswer": [
      "C",
      "E"
    ],
    "explanation": "A drafting prompt needs the purpose and audience, and it needs the source material presented so that Claude can tell instructions from content. Why not the others: A: a follow-up email should be short; length should be constrained, not opened up; B: one or two example emails would help, but a year of them bloats the context; D: a self-reported confidence rating is not a reliable accuracy signal."
  },
  {
    "id": 14,
    "ref": "1.14",
    "domain": 1,
    "multi": true,
    "question": "A project manager is decomposing “prepare the quarterly board pack” into tasks that Claude can help with. Which two sub-tasks are well formed for a single prompt each? (Select TWO.)",
    "options": [
      "Summarise the attached risk register into five bullet points for a non-technical audience.",
      "Review all of the attachments and point out anything the board might want to know.",
      "Produce the entire board pack, including financials, risks and recommendations, in one pass.",
      "Convert the attached project status table into a short narrative paragraph for each project.",
      "Decide which projects the board should cancel, based on the status table."
    ],
    "correctAnswer": [
      "A",
      "D"
    ],
    "explanation": "A well-formed sub-task has one clear input, one clear output and a defined audience. Both correct options can be completed, checked and reused independently. Why not the others: B has no defined output and no criteria for what matters; C is the undecomposed task; E is a decision for the board, not a drafting task."
  },
  {
    "id": 15,
    "ref": "1.15",
    "domain": 1,
    "multi": true,
    "question": "Claude’s first draft of a product FAQ is accurate, but each answer runs to three paragraphs and the language is too technical for first-time customers. Which two refinements would most improve the draft? (Select TWO.)",
    "options": [
      "Resubmit the original prompt and ask Claude to try harder this time to keep the answers short.",
      "Provide one example answer in the style the team wants and ask Claude to match it.",
      "Ask Claude to explain why the answers came out so long and technical before it makes any changes.",
      "Specify two sentences per answer at most, and a reading level suited to first-time customers.",
      "Remove the attached product specification so that Claude has less material to expand on in each answer."
    ],
    "correctAnswer": [
      "B",
      "D"
    ],
    "explanation": "Explicit constraints and a concrete example both give Claude a target it can hit. Each targets a diagnosed weakness: length and register. Why not the others: A changes nothing about the prompt; C produces commentary, not a better draft; E removes the source that keeps the answers accurate."
  },
  {
    "id": 16,
    "ref": "1.16",
    "domain": 1,
    "multi": false,
    "question": "You are a marketing coordinator preparing a prompt for a research-style task: a comparison of three competitors’ loyalty programmes.\n1. Write the prompt, referring to the attached sources and stating the task, the comparison criteria and the output format.\n2. Define the question the comparison must answer and who will read it.\n3. Refine the prompt to address the gaps and run it again.\n4. Review the output against the sources and note the gaps.\n5. Gather and attach the source material on each programme.\n\nWhich is the correct order of steps?",
    "options": [
      "2 → 1 → 5 → 4 → 3",
      "1 → 5 → 2 → 4 → 3",
      "2 → 5 → 1 → 4 → 3",
      "5 → 2 → 1 → 3 → 4"
    ],
    "correctAnswer": "C",
    "explanation": "Research-style prompts work best when the question and audience are fixed first, the sources are in hand before the prompt is written, and iteration follows a review against those sources. Why not the others: A writes the prompt before the sources are available to reference; B writes the prompt before the question is defined; D refines before reviewing, so there is nothing to refine against."
  },
  {
    "id": 17,
    "ref": "2.1",
    "domain": 2,
    "multi": false,
    "question": "Claude produces a market summary that includes a precise statistic, “the sector grew 14.2% in 2025, according to the annual industry report”, which will appear in a board paper. What must happen before this is used?",
    "options": [
      "Nothing: the precision of the number and the named source together indicate that the claim is reliable enough for the paper",
      "Ask Claude whether it is sure, and proceed if it confirms",
      "Verify the figure against the actual industry report, or another authoritative source, before it goes in the board paper",
      "Round the number to 14% so any error is smaller"
    ],
    "correctAnswer": "C",
    "explanation": "Precise-looking statistics and named citations are exactly what hallucinations look like. Any factual claim bound for a high-stakes document is checked against the authoritative source, full stop. Why not the others: A mistakes specificity for reliability: fabricated details are often the most specific; B asks the potentially wrong source to grade itself; D shrinks the error without checking whether there is one."
  },
  {
    "id": 18,
    "ref": "2.2",
    "domain": 2,
    "multi": false,
    "question": "An associate asks Claude to summarize a spreadsheet. The narrative says “headcount grew in every region,” but the accompanying table Claude produced shows one region declining. What does this signal, and what should the associate do?",
    "options": [
      "An internal inconsistency: a reliability warning. Check both claims against the source spreadsheet and correct the output before use",
      "Trust the narrative, since prose reflects the model’s more considered overall reading of the data than a mechanically produced table does",
      "Trust the table, since numbers are always more reliable than prose",
      "Average the two claims and move on"
    ],
    "correctAnswer": "A",
    "explanation": "When an output contradicts itself, at least one part is wrong, and the only arbiter is the source data. Internal inconsistency is one of the most useful signals that an output needs correction, not polish. Why not the others: B and C pick a winner arbitrarily when either could be the error; D is not a meaningful operation on contradictory claims."
  },
  {
    "id": 19,
    "ref": "2.3",
    "domain": 2,
    "multi": false,
    "question": "HR asks Claude to draft a job advertisement, and the result describes the ideal candidate as a “young, energetic digital native.” What is the appropriate response?",
    "options": [
      "Publish it: AI-generated text is neutral by definition",
      "Ask Claude to make the ad more exciting",
      "Keep the wording but add a prominent disclaimer stating that the company is an equal-opportunity employer welcoming applicants of all ages, then publish otherwise unchanged",
      "Recognize the age-biased framing, revise the ad to describe skills and competencies, and review AI-drafted HR content for bias as standard practice"
    ],
    "correctAnswer": "D",
    "explanation": "Models can reproduce biases present in everyday language, and hiring content is where that carries legal and ethical consequences. Evaluating outputs for bias, and fixing framing at the source, is part of the associate’s review job. Why not the others: A is false: generated text inherits bias from patterns in language; B polishes the problem; C contradicts the ad’s own wording rather than correcting it."
  },
  {
    "id": 20,
    "ref": "2.4",
    "domain": 2,
    "multi": false,
    "question": "Claude drafts a supplier contract clause covering liability caps. The draft reads well and the associate cannot see anything wrong with it. What determines the next step?",
    "options": [
      "Send it to the supplier: if nothing looks wrong, it is fine",
      "The stakes: legally binding language requires review by qualified legal counsel before use, however polished the draft appears",
      "Ask Claude to double-check its own clause carefully against common contract pitfalls and rely on its confirmation that the wording is sound",
      "Shorten the clause so there is less that could be wrong"
    ],
    "correctAnswer": "B",
    "explanation": "Determining when human expert review is required is a judgment about consequences, not confidence. Contract language creates enforceable obligations: that category goes to counsel, and “it reads well” is not a substitute. Why not the others: A confuses fluency with legal soundness: the associate is not positioned to catch what is missing; C is the drafter grading its own work; D reduces word count, not risk."
  },
  {
    "id": 21,
    "ref": "2.5",
    "domain": 2,
    "multi": false,
    "question": "An associate wants to fact-check the key claims in a Claude-generated research brief. Which approach constitutes genuine validation?",
    "options": [
      "Asking Claude to confirm that its brief is accurate",
      "Regenerating the brief a second time and checking whether the new version says substantially the same thing as the first one did",
      "Checking each material claim against independent, authoritative sources (official publications or primary data)",
      "Reading the brief carefully for spelling and grammar errors"
    ],
    "correctAnswer": "C",
    "explanation": "Validation means comparison against ground truth the model did not generate. Independent authoritative sources are that ground truth; nothing produced inside the same conversation can play the role. Why not the others: A asks the claim’s author to referee the claim; B tests consistency, not truth: a model can repeat the same error twice; D checks polish, which is orthogonal to accuracy."
  },
  {
    "id": 22,
    "ref": "2.6",
    "domain": 2,
    "multi": false,
    "question": "Claude summarizes a 30-page policy document into one page. Before circulating it, the associate wants to confirm the summary is complete, not just accurate. What is the practical check?",
    "options": [
      "Confirm the summary is exactly one page as requested, since meeting the length requirement is what the instruction actually asked for",
      "Compare coverage against the source: check the document’s section headings and key provisions are each represented or consciously omitted",
      "Ask Claude whether it left anything out",
      "Count the words in the summary and the source document and confirm the compression ratio stays consistent from section to section throughout"
    ],
    "correctAnswer": "B",
    "explanation": "Completeness is checked against the source’s structure: walk the headings and material provisions and confirm the summary accounts for them. Omissions are invisible in the summary itself: you have to look where they came from. Why not the others: A and D measure length, not coverage; C asks the summarizer to notice what it didn’t notice: the gap it missed is the gap it will miss again."
  },
  {
    "id": 23,
    "ref": "2.7",
    "domain": 2,
    "multi": false,
    "question": "Claude produces an accurate but dense, jargon-heavy analysis. It must now go to a customer advisory panel of non-specialists. What does good output adaptation look like?",
    "options": [
      "Ask Claude to rewrite it for the panel (plain language, defined terms, lead with customer impact), then review the rewrite for accuracy",
      "Send the original: accuracy is all that matters",
      "Delete the technical sections so nothing needs explaining",
      "Keep the original dense version fully intact and add a comprehensive glossary appendix defining every technical term for the panel members to consult"
    ],
    "correctAnswer": "A",
    "explanation": "Editing and adapting for the intended audience is a core evaluation skill: same substance, reshaped for the reader, followed by a fresh accuracy check, because rewriting can introduce new errors. Why not the others: B delivers something the audience cannot use; C removes substance instead of translating it; D makes the reader do the adaptation the author should have done."
  },
  {
    "id": 24,
    "ref": "2.8",
    "domain": 2,
    "multi": false,
    "question": "During one working session an associate gets three things from Claude: a quick factual answer, a comparison of four vendors across six criteria, and a polished one-page brief that colleagues will edit and reuse. Which output formats fit?",
    "options": [
      "Everything as artifacts, since artifacts are the premium format",
      "Everything inline, to keep the conversation in one place",
      "The polished brief inline in the chat, the vendor comparison as a separate chat message, and the quick factual answer as its own artifact",
      "The quick fact inline; the vendor comparison as a structured table; the reusable brief as an artifact to refine and share from"
    ],
    "correctAnswer": "D",
    "explanation": "Format selection follows use: transient answers live inline, comparative data belongs in structure, and content that will be iterated, polished, and reused belongs in an artifact. Why not the others: A and B force one format onto three different jobs; C assigns each output to the format that suits it least."
  },
  {
    "id": 25,
    "ref": "2.9",
    "domain": 2,
    "multi": false,
    "question": "An associate has two Claude-drafted versions of a sensitive customer apology and must choose one. What is the soundest way to compare them?",
    "options": [
      "Choose the longer one, since it covers more",
      "Define what the message must achieve (acknowledge the failure, take responsibility, state the remedy, match company voice) and assess both drafts against those criteria",
      "Ask Claude to weigh its own two drafts against each other, explain in detail which it considers the stronger piece of writing and why, and then send whichever draft the model selects",
      "Merge both drafts in full so nothing is lost"
    ],
    "correctAnswer": "B",
    "explanation": "Comparing outputs is criteria work: name what success looks like, then judge both candidates against it. Claude can help critique against the criteria, but the accountable human makes the call on a sensitive communication. Why not the others: A uses length as a proxy for quality; C outsources a judgment the associate is accountable for; D doubles the length and blends two tones into neither."
  },
  {
    "id": 26,
    "ref": "2.10",
    "domain": 2,
    "multi": false,
    "question": "After a long research conversation, the useful findings are scattered across dozens of messages mixed with dead ends. The material is needed next week by three colleagues. What should the associate do?",
    "options": [
      "Forward the entire conversation transcript to the three colleagues so they can read through everything and find the useful parts themselves",
      "Rely on memory and re-ask Claude next week",
      "Curate it: have Claude consolidate the validated findings into one organized document, review and correct it, and share that",
      "Copy every message into a spreadsheet row by row"
    ],
    "correctAnswer": "C",
    "explanation": "Organizing and curating is the step that turns a conversation into a work product: consolidate what survived scrutiny, structure it for the reader, verify it once, and share a single authoritative version. Why not the others: A ships the mess, dead ends included, to three people who must each mine it; B gambles on regenerating what already exists; D preserves the disorder in a different container."
  },
  {
    "id": 27,
    "ref": "2.11",
    "domain": 2,
    "multi": false,
    "question": "An associate asks Claude how to configure a setting in their company’s internal, custom-built expense tool. Claude confidently provides step-by-step instructions. What should the associate recognize?",
    "options": [
      "Claude cannot know the internals of a private company tool; the confident steps are likely plausible invention and should be checked against internal documentation",
      "The confidence of the instructions indicates Claude has genuine knowledge of the tool",
      "Claude can see the associate’s screen and is describing the actual tool",
      "Internal business tools follow universal design standards and conventions, so generic step-by-step instructions of this kind are dependable for any company’s software"
    ],
    "correctAnswer": "A",
    "explanation": "A key evaluation skill is asking “could the model actually know this?” Private, internal specifics are outside any model’s knowledge: fluent instructions about them are pattern-matched guesses wearing a confident tone. Why not the others: B mistakes fluency for knowledge; C attributes a capability that does not exist in a chat; D is wishful: custom tools differ in exactly the details that matter."
  },
  {
    "id": 28,
    "ref": "2.12",
    "domain": 2,
    "multi": true,
    "question": "Which TWO characteristics of a Claude output most strongly signal that extra verification is needed before use? (Select TWO.)",
    "options": [
      "The response is well formatted, with clear headings, bullet points, and a professional document structure throughout",
      "The response contains specific figures, quotations, or citations that will be relied upon",
      "The response runs longer than two paragraphs, suggesting the model had to work harder to produce it",
      "The response uses a warm, professional tone",
      "The response makes claims about very recent events or specialized facts the associate cannot confirm themselves"
    ],
    "correctAnswer": [
      "B",
      "E"
    ],
    "explanation": "Risk concentrates where claims are specific, load-bearing, and beyond the reviewer’s own ability to sanity-check: exact numbers, quotes, and citations, and assertions about recent or specialized territory. Why not the others: A, C, and D are presentation qualities: they carry no information about accuracy in either direction."
  },
  {
    "id": 29,
    "ref": "2.13",
    "domain": 2,
    "multi": true,
    "question": "A team is defining its standard validation practice for Claude-assisted work. Which TWO practices belong in it? (Select TWO.)",
    "options": [
      "Check high-stakes factual claims against authoritative external sources before publication",
      "Ask Claude to rate its own confidence in each output and treat consistently high self-ratings as sufficient verification",
      "Regenerate each output twice and accept it if the versions agree",
      "Route specialized content (legal, medical, financial) to a qualified human reviewer before it is relied upon",
      "Treat any output that survives a spelling check as validated"
    ],
    "correctAnswer": [
      "A",
      "D"
    ],
    "explanation": "The two pillars of validation: independent sources for factual claims, and qualified human expertise for specialized, consequential content. Both compare the output against something outside the model. Why not the others: B and C recycle the model’s own signal: self-confidence and self-agreement are not evidence; E validates spelling, which was never the risk."
  },
  {
    "id": 30,
    "ref": "2.14",
    "domain": 2,
    "multi": false,
    "question": "A communications officer asked Claude to summarise a 30-page annual report. The summary includes a direct quote attributed to the chief executive that the officer does not recognise. What is the most appropriate first step?",
    "options": [
      "Search the report for the quote; if it is absent, remove it and tell Claude to use only wording from the document.",
      "Keep the quote, since Claude had the full 30-page report available and is unlikely to invent a direct quotation from it.",
      "Paraphrase the quote and attribute it loosely, so that it no longer has to be reproduced word for word.",
      "Ask Claude whether the quote is genuine and where it appears, and keep it if Claude confirms that it is real."
    ],
    "correctAnswer": "A",
    "explanation": "A specific-looking detail that cannot be located in the source is the classic sign of a fabrication. Checking against the source is quick and decisive, and the instruction prevents a repeat. Why not the others: B assumes availability of the source prevents fabrication, which it does not; C hides the problem rather than resolving it; D asks the model to verify itself."
  },
  {
    "id": 31,
    "ref": "2.15",
    "domain": 2,
    "multi": false,
    "question": "An HR adviser asked Claude to list every type of leave mentioned in the enterprise agreement. The list looks right, but she needs to be sure that it is complete. Which check is most effective?",
    "options": [
      "Ask the same question again in a new chat and accept the list if both answers match.",
      "Search the agreement for the word “leave” and compare each occurrence with Claude’s list.",
      "Ask Claude to confirm that the list is complete and add anything that was missed.",
      "Count the items in Claude’s list against the number of leave clauses in the table of contents."
    ],
    "correctAnswer": "B",
    "explanation": "Completeness can only be confirmed against the source. A keyword sweep of the agreement is a direct, repeatable test that catches anything the model skipped. Why not the others: A: two consistent answers can both be incomplete; C relies on the model to find its own omissions; D: the table of contents may not list every leave type."
  },
  {
    "id": 32,
    "ref": "2.16",
    "domain": 2,
    "multi": false,
    "question": "A recruiter asked Claude to draft a shortlisting rationale for a graduate programme. The draft notes that applicants from two named universities “tend to be stronger communicators”. Which response from the recruiter is most appropriate?",
    "options": [
      "Keep the statement, since it reflects a pattern the selection panel has also noticed informally over several intakes.",
      "Keep the rankings but delete the rationale, so that the statement is not visible to the panel when it meets.",
      "Add a sentence noting that the observation may not apply to every applicant, and keep the rest of the rationale as it is.",
      "Remove the generalisation and have Claude justify each ranking from the evidence in that applicant’s application."
    ],
    "correctAnswer": "D",
    "explanation": "A group-level generalisation applied to individuals is a bias in the output. The fix is to replace it with evidence specific to each applicant, not to caveat it or hide it. Why not the others: A: an informal impression does not make a generalisation fair or evidence-based; B conceals the reasoning instead of correcting it, and the rankings may still rest on it; C leaves the biased reasoning in place with a disclaimer."
  },
  {
    "id": 33,
    "ref": "2.17",
    "domain": 2,
    "multi": false,
    "question": "A finance analyst at Brightmere Energy used Claude to draft a reply to a customer disputing a $3,200 invoice. The draft offers a partial credit. Which factor most strongly indicates that a person should review the reply before it is sent?",
    "options": [
      "The reply was produced in a single pass, without any of the prompt iteration the team normally applies.",
      "The reply commits the organisation to a credit that the analyst may not have the authority to offer.",
      "The draft is written in a more formal register than the analyst usually uses with this customer.",
      "The customer’s original email was considerably longer and more detailed than the drafted reply."
    ],
    "correctAnswer": "B",
    "explanation": "Human review is required when an output commits the organisation to something with consequences: money, legal position or reputation. Authority to make the concession is the issue. Why not the others: A: the number of iterations says nothing about the stakes; C: register is a style preference, not a reason for sign-off; D: length is not a risk signal."
  },
  {
    "id": 34,
    "ref": "2.18",
    "domain": 2,
    "multi": false,
    "question": "A policy officer has a Claude-drafted briefing written for the executive team and now needs a version for frontline staff. Which approach is most effective?",
    "options": [
      "Ask Claude to adapt it for frontline staff: what they must do differently, minus the budget and strategy detail.",
      "Ask Claude to cut the briefing to half its length, since frontline staff have less time to read than executives do.",
      "Send the executive briefing unchanged with a covering note saying that staff may skip any sections that do not apply.",
      "Ask Claude to replace the technical terms with simpler words and keep the structure and content otherwise unchanged."
    ],
    "correctAnswer": "A",
    "explanation": "Adapting for an audience means changing what is included and what the reader is asked to do, not just the length or vocabulary. Why not the others: B shortens without reconsidering what the audience needs; C pushes the adaptation work onto the reader; D changes words while keeping content written for a different audience."
  },
  {
    "id": 35,
    "ref": "2.19",
    "domain": 2,
    "multi": false,
    "question": "A project coordinator has asked Claude to compile a comparison of four venue quotes. The team will sort and filter the comparison by price, capacity and available dates. Which output format should she request?",
    "options": [
      "A table with a row per venue and a column per criterion, in a format she can open in a spreadsheet.",
      "A slide for each venue so that the comparison can be presented and discussed at the next team meeting.",
      "A narrative summary of each venue’s strengths and weaknesses in prose, with a recommendation at the end.",
      "An inline bulleted list grouped by venue, with the price, capacity and dates for each shown in bold."
    ],
    "correctAnswer": "A",
    "explanation": "When the next step is sorting and filtering, structured data is the right format. Prose and bullets have to be re-keyed before they can be used that way. Why not the others: B: slides suit presenting, not comparing on criteria; C: prose cannot be sorted or filtered; D: bullets are readable but not structured."
  },
  {
    "id": 36,
    "ref": "2.20",
    "domain": 2,
    "multi": false,
    "question": "Claude’s summary of a competitor’s media release includes three specific figures: revenue, headcount and number of stores. The marketing manager has the media release open in another window. Which validation approach is most appropriate?",
    "options": [
      "Check one of the three figures at random; if it is correct, the other two are very likely to be correct as well.",
      "Compare the figures with the competitor’s reported figures from last year to see whether they look reasonable.",
      "Ask Claude to re-read the media release carefully and confirm whether each of the three figures is accurate.",
      "Check each figure against the release and ask Claude to quote the source sentence for any it cannot find."
    ],
    "correctAnswer": "D",
    "explanation": "Specific figures with the source at hand should each be checked directly. Asking for the supporting sentence exposes any figure that was inferred rather than extracted. Why not the others: A sampling one of three figures is not validation; B plausibility is not accuracy; C asks the model to mark its own work."
  },
  {
    "id": 37,
    "ref": "2.21",
    "domain": 2,
    "multi": true,
    "question": "A procurement officer is reviewing a Claude-drafted market analysis before it goes to the tender committee. Which two signs most strongly suggest that the analysis may contain hallucinated material? (Select TWO.)",
    "options": [
      "A cited industry report has a title and publication date, but the officer cannot locate it anywhere.",
      "The analysis is written in a confident tone with few hedging phrases or qualifications.",
      "The analysis uses Australian spelling throughout, while most of the source material uses American spelling.",
      "Two paragraphs give different figures for the size of the same market without noting the discrepancy.",
      "The analysis is noticeably shorter than the officer expected for a topic of this breadth and complexity."
    ],
    "correctAnswer": [
      "A",
      "D"
    ],
    "explanation": "Unlocatable citations and internal inconsistency are two of the most reliable indicators of fabricated content. Why not the others: B: confident tone is normal for the model and not a sign either way; C: spelling convention is a style matter; E: length is not an accuracy signal."
  },
  {
    "id": 38,
    "ref": "2.22",
    "domain": 2,
    "multi": true,
    "question": "A customer-support team leader is deciding which Claude-drafted outputs may be sent without a second reviewer. Which two outputs most clearly require human review before release? (Select TWO.)",
    "options": [
      "An internal summary of the week’s most common support topics for the team meeting.",
      "An apology email that offers a refund outside the published refund policy.",
      "A reply to a routine password-reset request that follows the standard template.",
      "A plain-language rewording of an existing approved help-centre article.",
      "A response to a complaint that explains the customer’s rights under consumer law."
    ],
    "correctAnswer": [
      "B",
      "E"
    ],
    "explanation": "Legal statements to customers and commitments outside policy both carry consequences if wrong. These are the outputs a person must own before they leave the organisation. Why not the others: A is internal and low stakes; C is routine and templated; D is grounded in approved content and easily checked."
  },
  {
    "id": 39,
    "ref": "2.23",
    "domain": 2,
    "multi": true,
    "question": "A communications officer asked Claude for two versions of a media statement and must choose one. Which two criteria are the most useful basis for the comparison? (Select TWO.)",
    "options": [
      "Which version Claude recommends when asked to pick its own best effort.",
      "Which version is longer, since a longer statement covers more ground.",
      "Whether each version’s tone matches what the intended readers, local journalists, expect.",
      "Which version Claude produced first, since the first attempt is usually closest to the original intent.",
      "Whether each version includes the three facts the organisation has agreed to disclose."
    ],
    "correctAnswer": [
      "C",
      "E"
    ],
    "explanation": "Comparison should be against the purpose: required content and audience fit. Everything else is incidental. Why not the others: A: the model’s preference is not the audience’s; B: length is not quality; D: order of generation is irrelevant."
  },
  {
    "id": 40,
    "ref": "2.24",
    "domain": 2,
    "multi": true,
    "question": "An education coordinator wants Claude’s help turning 80 free-text survey comments into something useful for a staff meeting. Which two outputs are appropriate for the purpose? (Select TWO.)",
    "options": [
      "A summary that emphasises the positive comments so that the meeting ends on a high note.",
      "All 80 comments rewritten in a consistent tone so that they read smoothly when projected.",
      "A short list of recurring themes, each with a count and one or two illustrative quotes.",
      "A single overall sentiment score, presented without the supporting comments or detail.",
      "A table of comments tagged by theme and sentiment that staff can filter after the meeting."
    ],
    "correctAnswer": [
      "C",
      "E"
    ],
    "explanation": "Curating information means reducing it to what the audience needs while keeping a path back to the evidence. Themes with counts and quotes, plus a filterable table, do both. Why not the others: A misrepresents the data; B preserves the volume and alters the respondents’ words; D removes all the detail the meeting needs."
  },
  {
    "id": 41,
    "ref": "2.25",
    "domain": 2,
    "multi": false,
    "question": "You are an analyst validating a Claude-generated summary of a government consultation paper before it goes to your director.\n1. Locate each highlighted claim in the consultation paper.\n2. Choose between fixing the summary yourself, re-running the prompt with the paper, or raising it with your director.\n3. Read the summary and highlight every claim, figure and citation that can be checked.\n4. Add a note to the summary saying what has been checked and what was changed.\n5. Note any claim you could not find, and how much it matters.\n\nWhich is the correct order of steps?",
    "options": [
      "3 → 1 → 5 → 2 → 4",
      "1 → 3 → 5 → 2 → 4",
      "3 → 1 → 2 → 5 → 4",
      "3 → 5 → 1 → 2 → 4"
    ],
    "correctAnswer": "A",
    "explanation": "Validation runs from identifying claims, to checking them, to recording findings, to deciding, to documenting. Each step depends on the one before it. Why not the others: B looks for claims in the paper before they have been identified in the summary; C chooses a course of action before the findings have been weighed; D notes missing claims before any have been looked for."
  },
  {
    "id": 42,
    "ref": "2.26",
    "domain": 2,
    "multi": false,
    "question": "You are a marketing coordinator adapting a Claude-drafted internal product briefing into a customer-facing article.\n1. Ask Claude to rewrite for that audience with the stated tone and length.\n2. Send the article to the product owner for approval before publishing.\n3. Identify the audience and what they need from the article.\n4. Check the rewrite for accuracy against the original briefing.\n5. Strip internal-only content, such as pricing strategy and the product roadmap, from the briefing before it is used as the source.\n\nWhich is the correct order of steps?",
    "options": [
      "3 → 1 → 5 → 4 → 2",
      "3 → 5 → 1 → 4 → 2",
      "5 → 3 → 1 → 2 → 4",
      "3 → 5 → 4 → 1 → 2"
    ],
    "correctAnswer": "B",
    "explanation": "Audience first, then strip what the audience must not see, then rewrite, then verify, then approve. Removing internal content before the rewrite stops it leaking into the new draft. Why not the others: A rewrites before internal content is removed, so it may be carried into the article; C sends for approval before the accuracy check; D checks accuracy before there is a rewrite to check."
  },
  {
    "id": 43,
    "ref": "3.1",
    "domain": 3,
    "multi": false,
    "question": "Every month, an operations associate produces a supplier scorecard using the same 12 reference documents, the same formatting rules, and the same evaluation rubric, currently re-uploading and re-explaining everything each time. Which feature removes this overhead?",
    "options": [
      "Research mode, so Claude finds the documents on the web",
      "A longer first message each month containing everything",
      "A Claude Project holding the reference documents as knowledge and the rules and rubric as instructions, so every monthly chat starts equipped",
      "Asking Claude at the start of each month to remember the documents and rules from last month’s conversation and simply carry on from there"
    ],
    "correctAnswer": "C",
    "explanation": "Projects exist for recurring work with a stable foundation: knowledge and instructions are configured once and apply to every conversation in the project, eliminating repeated setup. Why not the others: A searches the public web for private documents; B rebuilds the setup manually every month: the problem itself; D relies on cross-chat recall that should not be assumed for a controlled monthly process."
  },
  {
    "id": 44,
    "ref": "3.2",
    "domain": 3,
    "multi": false,
    "question": "A strategy associate needs a comprehensive overview of a market: competitor moves, pricing trends, and recent regulatory changes, drawn from many current sources with citations. Which approach fits?",
    "options": [
      "A quick chat question with no tools, relying on training knowledge",
      "Use the research capability, which searches and synthesizes multiple current sources into a cited report",
      "Ask for the answer as a haiku to force conciseness",
      "Upload last year’s market report and ask Claude to infer what has probably changed across competitors, pricing, and regulation since it was written"
    ],
    "correctAnswer": "B",
    "explanation": "Feature selection means matching depth to tooling: multi-source, current, citation-backed research is what the research capability is for: a plain chat answer cannot see recent developments or cite live sources. Why not the others: A produces a potentially outdated, uncited answer for a task that demands currency; C is a format gag, not a method; D asks the model to invent the very information being researched."
  },
  {
    "id": 45,
    "ref": "3.3",
    "domain": 3,
    "multi": false,
    "question": "An associate is developing a client proposal with Claude and expects many rounds of revision (restructuring sections, tightening language, adjusting tone) before it is shared with colleagues. Which way of working fits best?",
    "options": [
      "Keep each revision as a new pasted block in the chat and scroll to compare",
      "Retype the full proposal into every message when requesting changes",
      "Ask for the proposal one paragraph per conversation, in separate chats",
      "Develop the proposal as an artifact, so there is one evolving document to revise, review, and ultimately share"
    ],
    "correctAnswer": "D",
    "explanation": "Artifacts are the right home for substantial content under iteration: one canonical version that revisions apply to directly, easy to review as a document and hand off when done. Why not the others: A buries versions in scrollback with no single source of truth; B is manual duplication of what the artifact does automatically; C fragments one document across disconnected contexts."
  },
  {
    "id": 46,
    "ref": "3.4",
    "domain": 3,
    "multi": false,
    "question": "An associate has two tasks today: (1) a nuanced synthesis of three conflicting analyst reports into a strategy recommendation, and (2) reformatting 200 addresses into a standard layout. How should model choice differ?",
    "options": [
      "The most capable model for the synthesis, where reasoning quality dominates; a fast, low-cost model for the mechanical reformatting",
      "Use the fastest model for both, since speed always wins",
      "Use the most capable model for both, since quality always wins",
      "The fast model for the synthesis and the most capable model for the address reformatting, so that spending balances out across the two tasks over the day"
    ],
    "correctAnswer": "A",
    "explanation": "Model tiers exist so the work can be matched to the need: complex judgment justifies the strongest model’s cost and latency; routine transformation does not: the small model does it faster and cheaper at the same quality. Why not the others: B underpowers the task where reasoning is the product; C overpays where a light model is equivalent; D inverts the logic on both tasks."
  },
  {
    "id": 47,
    "ref": "3.5",
    "domain": 3,
    "multi": false,
    "question": "A support team drafts hundreds of short, routine replies daily. Response speed and cost-per-reply drive the business case; the replies require no complex reasoning. Which model tier fits, and what should confirm the choice?",
    "options": [
      "The most capable, highest-cost tier: anything customer-facing always justifies maximum capability, regardless of how simple the individual replies are",
      "Alternate tiers by day of week to spread the cost",
      "A fast, low-cost tier (such as Haiku-class) suited to high-volume work, confirmed by spot-checking a sample of drafts before standardizing",
      "Whichever tier was used most recently, for consistency"
    ],
    "correctAnswer": "C",
    "explanation": "This is the textbook high-volume/low-complexity profile for the fast tier. The professional touch is verification: sample the output quality first, then commit, selection plus confirmation, not assumption. Why not the others: A pays a premium the task cannot use, at latency the workload cannot afford; B and D are not selection logic at all."
  },
  {
    "id": 48,
    "ref": "3.6",
    "domain": 3,
    "multi": false,
    "question": "Midway through a long planning conversation, several key decisions have been made that will matter for future work over the coming weeks. What is the right way to make those decisions durable?",
    "options": [
      "Trust that Claude will remember them whenever asked in future chats",
      "Persist them deliberately: have Claude produce a decision summary, verify it, and save it somewhere durable, such as the Project’s knowledge",
      "Keep the conversation permanently open in a browser tab and treat that tab as the team’s system of record whenever the decisions need to be consulted",
      "Repeat the entire conversation from scratch whenever the decisions are needed"
    ],
    "correctAnswer": "B",
    "explanation": "Managing memory considerations means knowing what persists and what does not, and acting on it: important outcomes get captured, verified, and stored where future work will actually find them. Why not the others: A assumes recall that should not carry a multi-week process; C makes a browser tab the single point of failure; D pays the full cost of the work again each time."
  },
  {
    "id": 49,
    "ref": "3.7",
    "domain": 3,
    "multi": true,
    "question": "Which TWO situations most clearly call for setting up a Claude Project rather than using standalone chats? (Select TWO.)",
    "options": [
      "A recurring task where every conversation should draw on the same reference documents and instructions",
      "A single, one-off question that needs a quick factual answer",
      "Making the model respond noticeably faster to every request by giving it a dedicated space of its own to work within",
      "A team wanting consistent behavior (shared context, tone, and rules) across everyone’s conversations",
      "Removing the model’s context limits altogether by giving it somewhere to store an unlimited amount of conversation history"
    ],
    "correctAnswer": [
      "A",
      "D"
    ],
    "explanation": "Projects shine where context is stable and reused: recurring individual work on a fixed foundation, and team workstreams that need everyone’s conversations grounded in the same knowledge and instructions. Why not the others: B needs no setup at all; C and E attribute powers Projects do not have: they organize context, they do not accelerate models or abolish context limits."
  },
  {
    "id": 50,
    "ref": "3.8",
    "domain": 3,
    "multi": false,
    "question": "A grants officer prepares a similar assessment report every fortnight using the same scoring rubric and report template. Which Claude feature best fits this pattern of work?",
    "options": [
      "A single long-running chat that is never closed, so that the rubric and the earlier reports stay in context.",
      "A fresh chat each fortnight with the rubric and template pasted in, which keeps the context small and current.",
      "Research mode, so that Claude can look up each applicant organisation before applying the rubric.",
      "A Project with the rubric and template as knowledge and instructions, so that each new chat starts with them."
    ],
    "correctAnswer": "D",
    "explanation": "Projects exist for recurring work with stable reference material: the rubric and template are set once and inherited by every chat. Why not the others: A: a never-ending chat accumulates unrelated context and eventually degrades; B works, but repeats the setup every fortnight and invites inconsistency; C: research mode gathers external information; the task is applying a known rubric."
  },
  {
    "id": 51,
    "ref": "3.9",
    "domain": 3,
    "multi": false,
    "question": "A customer-service manager wants Claude to tag 5,000 short feedback comments with one of eight topic labels. Speed and cost matter, and the judgement needed per comment is light. Which model choice best aligns with the task?",
    "options": [
      "Sonnet, because the mid-tier model is the safe default whenever accuracy and cost both matter.",
      "Alternate between the three models so that no single model’s weaknesses affect the whole batch.",
      "Haiku, because the per-item reasoning is simple and the volume rewards speed and low cost.",
      "Opus, because the most capable model gives the highest accuracy on any labelling task."
    ],
    "correctAnswer": "C",
    "explanation": "High volume, light judgement and a fixed label set is the profile the fastest, lowest-cost tier is designed for. Check a sample, then run the batch. Why not the others: A: a reasonable fallback, but not the best fit when the task is simple; B mixes models without a reason and complicates checking; D pays for reasoning depth the task does not use."
  },
  {
    "id": 52,
    "ref": "3.10",
    "domain": 3,
    "multi": false,
    "question": "A business analyst has been working in one long chat with Claude for three days, covering four unrelated pieces of work. Claude has started mixing details from the different pieces. What is the most appropriate action?",
    "options": [
      "Start a new chat per piece of work, seeded with a short summary of the decisions made so far.",
      "Paste the whole chat history into a new chat so that no detail from the three days is lost.",
      "Switch to a more capable model within the same chat so that it can keep track of more context at once.",
      "Continue in the same chat but tell Claude to ignore everything before today and treat each request as new."
    ],
    "correctAnswer": "A",
    "explanation": "Long, mixed conversations degrade. The remedy is a fresh context per task, seeded with a concise summary of what still matters. Why not the others: B recreates the problem in a new chat; C: a bigger model inherits the same tangled context; D: the earlier context is still present and still interfering."
  },
  {
    "id": 53,
    "ref": "3.11",
    "domain": 3,
    "multi": false,
    "question": "A policy officer needs an up-to-date overview of how five Australian states regulate short-term rental accommodation, with sources she can cite. Which feature is the best fit?",
    "options": [
      "An artifact, because the final output will be a structured document.",
      "Research mode, because the task needs current information gathered from multiple sources with citations.",
      "A Project containing her existing policy notes, because the answer should be grounded in the organisation’s documents.",
      "A standard chat, because Claude’s training knowledge already covers Australian regulation."
    ],
    "correctAnswer": "B",
    "explanation": "Current, multi-source, citable information is exactly the case for research mode. Why not the others: A: an artifact is an output surface, not a way of gathering information; C: her notes are not the source of current regulation; D: training knowledge may be out of date and gives no citations."
  },
  {
    "id": 54,
    "ref": "3.12",
    "domain": 3,
    "multi": true,
    "question": "A legal operations lead is choosing a model for reviewing complex contract clauses. A missed nuance could be costly, and the volume is low: around ten documents a week. Which two statements support a sound selection? (Select TWO.)",
    "options": [
      "The cost of a missed nuance outweighs the speed advantage of a lighter model.",
      "The fastest model is the best choice because lawyers need quick turnaround.",
      "All models produce the same results on text analysis, so the cheapest should be chosen.",
      "The mid-tier model should always be used for legal content because it is the recommended default.",
      "The low volume means the higher cost of the most capable model has little effect on the overall budget."
    ],
    "correctAnswer": [
      "A",
      "E"
    ],
    "explanation": "Model selection balances cost, speed and quality against the task. Here quality dominates and cost is immaterial at ten documents a week. Why not the others: B: speed is not the binding requirement; C: models differ materially in reasoning depth; D: there is no fixed rule by content type."
  },
  {
    "id": 55,
    "ref": "3.13",
    "domain": 3,
    "multi": true,
    "question": "A communications manager uses Claude for a long campaign-planning conversation that runs over several weeks. Which two practices help manage context limitations well? (Select TWO.)",
    "options": [
      "Keep all of the team’s campaigns in one chat so that Claude can draw connections between them over time.",
      "Paste every related email thread into the chat so that Claude has the complete history of the campaign to draw on.",
      "Avoid asking follow-up questions where possible, since each one uses up some of the available context.",
      "Ask Claude for a summary of decisions so far and use it to start a fresh chat when the conversation grows long.",
      "Keep stable material such as the brand guidelines and campaign brief in a Project instead of re-pasting it."
    ],
    "correctAnswer": [
      "D",
      "E"
    ],
    "explanation": "Summarise-and-restart and keeping stable material in a Project are the two standard ways of keeping context focused over a long piece of work. Why not the others: A mixes unrelated work and degrades quality; B fills the context with mostly irrelevant material; C follow-ups are how outputs improve; avoiding them defeats the purpose."
  },
  {
    "id": 56,
    "ref": "3.14",
    "domain": 3,
    "multi": false,
    "question": "You are an operations lead choosing a Claude model for a new recurring task.\n1. Test on a representative sample and compare the results with the requirement.\n2. Define the task’s requirements: the accuracy needed, volume, turnaround and budget.\n3. Confirm the choice, or move up a tier and test again.\n4. Choose the lightest model that is likely to satisfy that requirement.\n5. Identify which requirement matters most.\n\nWhich is the correct order of steps?",
    "options": [
      "2 → 4 → 5 → 1 → 3",
      "5 → 2 → 4 → 1 → 3",
      "2 → 5 → 1 → 4 → 3",
      "2 → 5 → 4 → 1 → 3"
    ],
    "correctAnswer": "D",
    "explanation": "Requirements come first, then the priority among them, then the lightest candidate, then evidence, then the decision. Why not the others: A chooses a model before knowing which requirement is the priority; B prioritises requirements before they have been defined; C tests before any model has been chosen to test."
  },
  {
    "id": 57,
    "ref": "4.1",
    "domain": 4,
    "multi": false,
    "question": "A business analyst has 40 pages of raw stakeholder interview notes for a new intranet project. How can Claude best support the requirements-analysis stage?",
    "options": [
      "Have Claude analyze the notes and decide the project’s final requirements itself, so stakeholders do not need to be consulted or bothered for input a second time",
      "Have Claude organize the notes into themes, extract needs and pain points, and draft a structured requirements list for the analyst to validate with stakeholders",
      "Skip the notes and ask Claude what intranets usually require",
      "Use Claude only to fix the grammar in the notes"
    ],
    "correctAnswer": "B",
    "explanation": "Claude excels at the labor-intensive middle of requirements work: structuring raw qualitative input into themes and candidate requirements. The analyst keeps the judgment steps: validation and prioritization with the people who own the needs. Why not the others: A removes stakeholders from decisions about their own needs; C substitutes generic patterns for what these stakeholders actually said; D uses a synthesis engine as a spell-checker."
  },
  {
    "id": 58,
    "ref": "4.2",
    "domain": 4,
    "multi": false,
    "question": "A project manager is kicking off an office relocation and wants help getting from a blank page to a credible plan. What is an effective use of Claude at this stage?",
    "options": [
      "Ask Claude for the final, approved project plan and circulate it unedited",
      "Avoid using Claude, since planning requires human intuition only",
      "Avoid involving Claude until after the plan has been finished by the team, and then use it only to turn the completed plan into a polished set of presentation slides",
      "Ask Claude to draft a first-pass plan (workstreams, sequencing, risks, stakeholders) then refine it with knowledge of the actual organization and budget"
    ],
    "correctAnswer": "D",
    "explanation": "Research and planning support means using Claude to beat the blank page: a structured first draft that human context then corrects and completes. The draft accelerates; the manager's knowledge decides. Why not the others: A publishes a plan that has never met the organization's reality; B forfeits hours of acceleration out of principle; C reserves Claude for decoration after the hard work is done."
  },
  {
    "id": 59,
    "ref": "4.3",
    "domain": 4,
    "multi": false,
    "question": "An operations team suspects their invoice-approval process is inefficient but cannot articulate where. How can Claude support process optimization here?",
    "options": [
      "Describe the process step by step and ask Claude to identify likely bottlenecks, redundant approvals, and questions to investigate, then verify against real data",
      "Ask Claude to approve the invoices itself from now on",
      "Have Claude generate a motivational memo about efficiency",
      "Retire the current process immediately and replace it wholesale with whatever alternative process Claude describes as industry best practice for invoice approval workflows"
    ],
    "correctAnswer": "A",
    "explanation": "Claude is a strong analytical partner for process work: it can interrogate a described process, spot structural smells, and generate hypotheses. The discipline is treating those as hypotheses to verify with data, not conclusions. Why not the others: B jumps from analysis to unsupervised execution of a financial control; C is theater; D swaps a diagnosed-nothing for a generic template without evidence."
  },
  {
    "id": 60,
    "ref": "4.4",
    "domain": 4,
    "multi": false,
    "question": "A content team's workflow is: research → outline → first draft → expert review → publish. The first-draft stage is the chronic bottleneck; expert review works well. How should Claude be integrated?",
    "options": [
      "Replace the entire workflow (research, outlining, drafting, and the expert review stage included) with a single consolidated Claude step that does it all",
      "Insert Claude at the publishing stage, since that is the final step",
      "Augment the bottleneck: use Claude to produce structured first drafts from the outlines, keeping research direction and expert review where they are",
      "Use Claude to time each stage more precisely"
    ],
    "correctAnswer": "C",
    "explanation": "Good integration is surgical: aim Claude at the stage that is actually constraining throughput and leave the stages that work, especially the human quality gate, intact. The workflow gets faster without getting riskier. Why not the others: A removes the safeguard that makes the output trustworthy; B optimizes a stage that wasn't the problem; D measures the bottleneck instead of relieving it."
  },
  {
    "id": 61,
    "ref": "4.5",
    "domain": 4,
    "multi": false,
    "question": "A team lead wants to integrate Claude into the department’s weekly client-reporting workflow. Five activities are planned:\n1. Scale the approach across the whole team as the standard process\n2. Map the current workflow and baseline how long each stage takes today\n3. Pilot Claude on the chosen stage for several reporting cycles\n4. Select the stage where Claude can add the most value at the lowest risk\n5. Evaluate the pilot’s results against the baseline measures\n\nIn which order should the activities be carried out?",
    "options": [
      "4 → 3 → 2 → 5 → 1",
      "3 → 2 → 4 → 5 → 1",
      "2 → 4 → 3 → 1 → 5",
      "2 → 4 → 3 → 5 → 1"
    ],
    "correctAnswer": "D",
    "explanation": "Understand before changing, prove before scaling: map and baseline the workflow (2), choose the target stage on evidence (4), pilot it (3), evaluate against the baseline (5), and only then make it the standard (1). The baseline taken in step 2 is what makes step 5’s evaluation meaningful. Why not the others: A selects the stage before understanding the workflow, and the late baseline can’t measure what the pilot changed; B pilots before deciding where Claude belongs; C scales to the whole team before the evaluation says whether the pilot worked."
  },
  {
    "id": 62,
    "ref": "4.6",
    "domain": 4,
    "multi": true,
    "question": "A knowledge worker’s typical week includes: triaging a shared inbox into action categories, negotiating contract terms in supplier meetings, condensing project updates into a weekly status report, approving invoices for payment, and mentoring a junior colleague. Which TWO parts of this week are the strongest candidates for integrating Claude as day-to-day support? (Select TWO.)",
    "options": [
      "Inbox triage: Claude drafts the categorisation and suggested actions, which the worker reviews and confirms",
      "Supplier negotiations: Claude attends the meetings and negotiates the contract terms",
      "The status report: Claude drafts it from the collected project updates, for the worker’s review and edit",
      "Invoice approval: Claude reviews and approves the payments autonomously each week, removing the approval bottleneck entirely",
      "Mentoring: Claude replaces the one-on-one sessions with generated career advice"
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": "Frequent, language-heavy work with a human checking the result is exactly where Claude integrates well: triage drafts and report drafts are high-volume text tasks, easy to verify, with the worker keeping final judgment. Why not the others: B and E are relationship work: negotiation and mentoring depend on human presence, trust, and accountability that the tool cannot carry; D hands an autonomous financial control decision to the tool, wrong on both risk and oversight grounds."
  },
  {
    "id": 63,
    "ref": "4.7",
    "domain": 4,
    "multi": false,
    "question": "After a successful pilot using Claude for proposal drafting, an associate must present the results to skeptical leadership. Which presentation approach is right?",
    "options": [
      "Report concrete outcomes (drafting time cut from six hours to two, quality maintained per reviewer scores) alongside honest limitations",
      "Claim the tool is flawless to secure the budget quickly",
      "Present only the limitations to appear rigorous and cautious",
      "Keep the presentation deliberately free of specific numbers and measurements, so that leadership has nothing concrete to challenge or pick apart"
    ],
    "correctAnswer": "A",
    "explanation": "Communicating value means evidence plus honesty: measured benefits and clearly stated limitations. That combination earns durable trust, and protects the initiative when the limitations inevitably show up. Why not the others: B sets expectations reality will break; C buries a genuine result under performative caution; D trades credibility for unfalsifiability."
  },
  {
    "id": 64,
    "ref": "4.8",
    "domain": 4,
    "multi": false,
    "question": "An associate's team loves their Claude-assisted triage workflow and now wants it to run automatically: connected to the CRM via API, triggered on every new ticket, with no one initiating chats. What should the associate do?",
    "options": [
      "Build the CRM API integration personally over the weekend, using code generated by Claude, so the team doesn’t have to wait for anyone",
      "Tell the team automation of this kind is impossible",
      "Recognize this has crossed into technical implementation (API integration and automated triggering) and escalate to a developer or Architect resource",
      "Simulate the automation by hand: personally copy every new ticket from the CRM into Claude throughout the day and paste the triage results back into the CRM"
    ],
    "correctAnswer": "C",
    "explanation": "Knowing the boundary is an Associate competency: platform features, workflows, and Projects are in scope; API integrations and autonomous triggering are engineering work that goes to the technical track, with the associate contributing the validated workflow design. Why not the others: A takes production engineering outside the role's scope and safety net; B is false: it's feasible, just not the associate's build; D converts one person into a manual API."
  },
  {
    "id": 65,
    "ref": "4.9",
    "domain": 4,
    "multi": true,
    "question": "An associate is designing the pilot for their department's first Claude workflow. Which TWO practices give the pilot the best chance of producing a trustworthy result? (Select TWO.)",
    "options": [
      "Roll it out across the entire organization at once, so the pilot sample is as large as it can possibly be",
      "Choose a frequent, low-risk task where outputs are easy to check against reality",
      "Pick the department's highest-stakes process so the pilot proves maximum value",
      "Define success measures (time saved, quality maintained, adoption) before the pilot starts",
      "Avoid measuring the current process, to keep the comparison unbiased"
    ],
    "correctAnswer": [
      "B",
      "D"
    ],
    "explanation": "Sound pilots pair a sensible proving ground (frequent enough to generate evidence, low-risk enough to contain mistakes) with success criteria fixed in advance, so the result is a measurement rather than an impression. Why not the others: A and C maximize blast radius before anything is proven; E removes the baseline that gives the pilot's numbers any meaning."
  },
  {
    "id": 66,
    "ref": "4.10",
    "domain": 4,
    "multi": true,
    "question": "A research associate is preparing a competitive-landscape briefing. Which TWO uses of Claude add genuine value to this workflow? (Select TWO.)",
    "options": [
      "Synthesizing a stack of collected articles and reports into organized themes and points of disagreement between sources",
      "Serving as the final authority on which competitor claims are true",
      "Producing a structured comparison of competitors across chosen dimensions as a reviewable starting draft",
      "Eliminating the need for anyone to check any of the briefing’s claims before it is circulated to the wider leadership group",
      "Deciding the company's competitive strategy autonomously from the briefing"
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": "Claude's contribution to research workflows is structure and synthesis at speed: turning source material into organized themes and reviewable comparative drafts that a human then verifies and builds judgment on. Why not the others: B, D, and E all move Claude from accelerating the work to owning the truth and the decision, the parts that stay human."
  },
  {
    "id": 67,
    "ref": "4.11",
    "domain": 4,
    "multi": false,
    "question": "A project manager has notes from six stakeholder interviews about a new leave-request process and wants to use Claude for requirements analysis. Which use of Claude is most appropriate?",
    "options": [
      "Ask Claude to write the final process design directly from the interview notes, so that analysis and design happen in one step.",
      "Ask Claude to extract requirements into a list, noting the source stakeholder for each and where they conflict.",
      "Ask Claude to generate the requirements for a leave-request process from general knowledge, then compare them with the notes.",
      "Ask Claude to decide which stakeholders’ requirements take priority, based on their seniority and job titles."
    ],
    "correctAnswer": "B",
    "explanation": "Requirements analysis is extraction with traceability: every requirement tied to its source, and conflicts surfaced for people to resolve. Why not the others: A skips analysis and jumps to design; C invents requirements instead of deriving them from the stakeholders; D delegates a judgement that belongs to the project’s governance."
  },
  {
    "id": 68,
    "ref": "4.12",
    "domain": 4,
    "multi": false,
    "question": "A finance team’s month-end process has twelve steps. One step, writing the variance commentary from a spreadsheet of figures, takes an analyst two days. Which integration approach is most sensible?",
    "options": [
      "Wait until Claude can perform the full month-end process before changing anything, to avoid a half-done redesign.",
      "Use Claude to produce the spreadsheet of figures, since that is the input to the slow step and the figures drive the commentary.",
      "Use Claude to draft the commentary from the spreadsheet, with the analyst reviewing and finalising it.",
      "Redesign all twelve steps around Claude so that the whole month-end process benefits at the same time."
    ],
    "correctAnswer": "C",
    "explanation": "Augment the step where the time goes, keep a person on review, and leave a working process alone elsewhere. That is the lowest-risk way to integrate. Why not the others: A forgoes an available gain for no reason; B targets the wrong step and introduces a calculation risk; D: a wholesale redesign for a single bottleneck."
  },
  {
    "id": 69,
    "ref": "4.13",
    "domain": 4,
    "multi": false,
    "question": "An operations manager at Kerrigan Freight is presenting a Claude-assisted invoice-triage workflow to the executive team. Which statement best communicates Claude’s value and its limitations?",
    "options": [
      "“Claude handles invoice triage from end to end, so the team can be redeployed to higher-value work from the start of next quarter.”",
      "“Claude sorts and drafts replies for the 70 per cent of invoices that are routine; exceptions and approvals over $5,000 go to a person.”",
      "“Claude is a tool like any other; the results depend entirely on how well our people use it, so training is the priority.”",
      "“Claude will make occasional mistakes, so we recommend that the executive team reviews a sample of its output at the weekly meeting.”"
    ],
    "correctAnswer": "B",
    "explanation": "Stakeholders need to know what Claude does, what it does not do, and where people remain in control, in concrete terms. Why not the others: A overstates the capability and removes the human role; C: so general that it says nothing about the workflow; D names a limitation but assigns review to the wrong people and omits the value."
  },
  {
    "id": 70,
    "ref": "4.14",
    "domain": 4,
    "multi": false,
    "question": "A community-engagement officer has to plan a six-week public consultation and has a clear brief: objectives, constraints and a stakeholder list. Which use of Claude best supports the planning?",
    "options": [
      "Ask Claude to draft a week-by-week plan from the brief, then refine the plan with the team.",
      "Ask Claude only to format the plan the officer has already written, since planning needs human judgement.",
      "Ask Claude to produce the plan and adopt it as final to save time.",
      "Ask Claude to run the consultation sessions so that the officer can concentrate on the analysis."
    ],
    "correctAnswer": "A",
    "explanation": "Claude is strong at turning a brief into a structured first plan; the team then applies local knowledge. That is the division of labour the objective describes. Why not the others: B forgoes the planning help that is the point of the exercise; C skips the human refinement that catches what the brief did not say; D is not something Claude can do and misplaces the officer’s role."
  },
  {
    "id": 71,
    "ref": "4.15",
    "domain": 4,
    "multi": false,
    "question": "A training coordinator is using Claude to design a new onboarding checklist. After the first draft, the HR manager raises two concerns about the sequence of steps; the rest is accepted. What is the most effective way to iterate?",
    "options": [
      "Fix the sequence issues and also ask Claude to improve the wording throughout, since the document is open anyway.",
      "Ask Claude to regenerate the whole checklist with the two concerns included, since a fresh draft will be more coherent.",
      "Accept the checklist as it stands and address the sequence concerns in a later version once it has been in use.",
      "Ask Claude to revise only the sequence issues raised, keep the accepted content as it is, and record what changed."
    ],
    "correctAnswer": "D",
    "explanation": "Targeted iteration preserves what has been approved, makes the change traceable and keeps the next review short. Why not the others: A bundles unrequested changes with the requested ones, so the reviewer must re-read everything; B reopens content that was already accepted; C ships a known problem."
  },
  {
    "id": 72,
    "ref": "4.16",
    "domain": 4,
    "multi": true,
    "question": "The customer-service lead at Marlow Shire Council is identifying where Claude could help the team. Which two use cases are the strongest candidates for a first pilot? (Select TWO.)",
    "options": [
      "Drafting replies to common enquiries from the published fees and opening-hours information, for staff to check and send.",
      "Deciding which development applications to approve, based on the planning rules.",
      "Summarising long resident complaints into a short issue statement for the case officer.",
      "Calculating the rates notice for every property, since the formula is published.",
      "Replacing the phone line with Claude so that residents no longer need to speak to staff."
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": "Good first pilots are drafting and summarising tasks with a person in the loop and low consequences if a draft is wrong. Why not the others: B: a regulated decision with legal consequences; D: exact calculation at scale belongs in the rating system, not a language model; E removes the human role entirely."
  },
  {
    "id": 73,
    "ref": "4.17",
    "domain": 4,
    "multi": true,
    "question": "An HR team wants to integrate Claude into its existing position-description workflow without disrupting it. Which two actions reflect sound integration practice? (Select TWO.)",
    "options": [
      "Roll Claude out to the whole team on day one so that everyone benefits at once.",
      "Ask each team member to find their own way of using Claude so that adoption is organic.",
      "Replace the existing approval step with Claude’s own quality check to remove a bottleneck.",
      "Trial Claude on that step with three team members and compare the time taken with the current baseline.",
      "Map the current workflow first to find the step where drafting takes the most time."
    ],
    "correctAnswer": [
      "D",
      "E"
    ],
    "explanation": "Integration starts with understanding the existing workflow and proving the change on a small scale against a baseline. Why not the others: A skips the pilot; B produces inconsistent practice and no measurable result; C removes a human control."
  },
  {
    "id": 74,
    "ref": "4.18",
    "domain": 4,
    "multi": true,
    "question": "A project lead is writing a one-page note to stakeholders about a new Claude-assisted reporting process. Which two points belong in the note? (Select TWO.)",
    "options": [
      "Which parts of the report Claude drafts and which parts a person writes and signs off.",
      "A statement that stakeholders no longer need to review the report, since Claude checks it.",
      "The known limitations, such as the need to verify figures before the report is circulated.",
      "A commitment that the process will not produce errors once it is fully configured.",
      "A detailed description of how the model was trained, so that stakeholders can trust it."
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": "Honest stakeholder communication describes where Claude assists, where people decide, and what can go wrong. Why not the others: B removes the human review the process depends on; D: an impossible promise; E: irrelevant detail that does not build warranted trust."
  },
  {
    "id": 75,
    "ref": "4.19",
    "domain": 4,
    "multi": false,
    "question": "You are an operations analyst using Claude to improve a slow purchase-order approval process.\n1. Identify the step causing the most delay.\n2. Roll out and document the new process.\n3. Ask Claude to propose options for that step, given the constraints.\n4. Document the current process, who owns each step and how long each step takes.\n5. Pilot the chosen option with one team and measure it against the baseline.\n\nWhich is the correct order of steps?",
    "options": [
      "4 → 3 → 1 → 5 → 2",
      "1 → 4 → 3 → 5 → 2",
      "4 → 1 → 3 → 2 → 5",
      "4 → 1 → 3 → 5 → 2"
    ],
    "correctAnswer": "D",
    "explanation": "Process optimisation is measure, locate, propose, test, then roll out. The baseline from the first step is what the pilot is measured against. Why not the others: A asks for options before the bottleneck is known; B identifies the bottleneck before the process has been measured; C rolls out before the pilot."
  },
  {
    "id": 76,
    "ref": "4.20",
    "domain": 4,
    "multi": false,
    "question": "You are a learning designer using Claude to develop a new induction module.\n1. Ask Claude to draft a module outline against the outcomes and the policy documents.\n2. Gather the existing policy documents the module must reflect.\n3. Review the outline with the expert and note the changes.\n4. Agree the learning outcomes and the audience with the subject-matter expert.\n5. Ask Claude to revise the outline and draft the content for each section.\n\nWhich is the correct order of steps?",
    "options": [
      "4 → 2 → 1 → 5 → 3",
      "4 → 2 → 1 → 3 → 5",
      "1 → 4 → 2 → 3 → 5",
      "4 → 1 → 2 → 3 → 5"
    ],
    "correctAnswer": "B",
    "explanation": "Design follows outcomes and sources; drafting follows design; content follows an approved outline. Why not the others: A drafts full content before the outline has been reviewed; C drafts before the outcomes have been agreed; D drafts the outline before the source documents are gathered."
  },
  {
    "id": 77,
    "ref": "5.1",
    "domain": 5,
    "multi": false,
    "question": "An associate begins every conversation in their reporting Project by pasting the same three paragraphs: the team's tone rules, the report structure, and formatting requirements. What is the correct configuration fix?",
    "options": [
      "Keep pasting the paragraphs at the start of every conversation: the repetition helps the model learn the rules permanently over time",
      "Shorten the three paragraphs so pasting is faster",
      "Attach the three paragraphs as a knowledge file in the Project and hope Claude notices and applies it in every conversation",
      "Move the standing rules into the Project’s custom instructions, where they apply to every conversation automatically"
    ],
    "correctAnswer": "D",
    "explanation": "Standing behavioral rules (tone, structure, format) are what project instructions are for: configured once, applied to every chat, impossible to forget to paste. Why not the others: A misunderstands the mechanics: nothing is learned between chats, and manual repetition invites omission; B optimizes the workaround instead of removing it; C puts behavioral rules where reference content belongs, weakening their force."
  },
  {
    "id": 78,
    "ref": "5.2",
    "domain": 5,
    "multi": false,
    "question": "Setting up a Project for contract-renewal support, an associate wonders what to upload as knowledge. The team drive holds ~2,000 files; about 15 are actually relevant: current templates, the pricing sheet, and negotiation guidelines. What should be uploaded?",
    "options": [
      "The entire team drive of roughly 2,000 files, so that no piece of information could ever be missing when it turns out to be needed",
      "The 15 relevant, current documents: a curated knowledge base of what the work draws on, maintained as things change",
      "Nothing: knowledge uploads are unnecessary if prompts are good",
      "Only the oldest documents on the drive, since they carry the most accumulated history of how the work has been done"
    ],
    "correctAnswer": "B",
    "explanation": "Knowledge curation beats knowledge volume: a focused set of current, relevant sources makes retrieval precise and answers grounded. The upload defines what the Project treats as true: curate it like it matters. Why not the others: A buries 15 signal documents under 1,985 of noise and stale versions; C forces every chat to re-supply what the Project should already hold; D optimizes for exactly the wrong property."
  },
  {
    "id": 79,
    "ref": "5.3",
    "domain": 5,
    "multi": false,
    "question": "A team's status-report documents live in Google Drive and are updated by several colleagues throughout the week. The associate wants Claude to work from the latest versions without manual re-uploading. What is the right approach, and what should be checked first?",
    "options": [
      "Use the Google Drive connector so Claude accesses the current files directly, after confirming the connection complies with data and access policies",
      "Re-upload every file into the Project each morning before starting work, treating the routine as a useful discipline-building ritual for the whole team",
      "Ask colleagues to stop updating the documents so versions stay stable",
      "Have Claude guess what probably changed since the last upload"
    ],
    "correctAnswer": "A",
    "explanation": "Connectors exist for exactly this: live access to working files instead of stale snapshots. The professional step is the governance check: confirming what the connector can reach and that this access is policy-compliant. Why not the others: B is the manual overhead the feature eliminates; C bends the team's process around a tooling gap that has a solution; D invites invention where the real data is one connector away."
  },
  {
    "id": 80,
    "ref": "5.4",
    "domain": 5,
    "multi": false,
    "question": "Which of the following is the most effective set of system-level instructions for a customer-communications Project?",
    "options": [
      "“Be consistently helpful and professional, always do a good job, use sound judgment at all times, communicate clearly, and make every customer as happy as possible.”",
      "“Never make mistakes.”",
      "“You draft customer-service replies for a software company. Tone: warm, plain English, no jargon. Always: acknowledge the issue, state next steps. Never: promise refunds (escalate instead) or exceed 200 words.”",
      "The company’s complete 30-page policy and procedures manual, pasted in as the instructions in full (every policy, exception, and historical amendment since 2015) so that no conceivable situation is left uncovered"
    ],
    "correctAnswer": "C",
    "explanation": "Effective instructions are specific, structured, and behavioral: who Claude is acting as, the tone, what must always happen, what must never happen, and hard constraints. Every line is actionable in every reply. Why not the others: A and B are aspirations, not instructions: they change nothing about behavior; D drowns the operative rules in archive material that belongs (curated) in knowledge, if anywhere."
  },
  {
    "id": 81,
    "ref": "5.5",
    "domain": 5,
    "multi": false,
    "question": "An associate is configuring a Project and has two assets: (1) rules about how Claude should behave (tone, structure, escalation triggers); and (2) reference material Claude should draw on (the product catalog and policy documents). Where does each belong?",
    "options": [
      "Both pasted into the first message of every chat",
      "Behavioral rules in the Project’s custom instructions; reference material as Project knowledge",
      "Both uploaded as knowledge files, keeping instructions empty",
      "Behavioral rules uploaded as knowledge documents, with the product catalog written into the custom instructions field instead"
    ],
    "correctAnswer": "B",
    "explanation": "The two configuration surfaces have distinct jobs: instructions govern behavior on every turn; knowledge is the reference library consulted when relevant. Putting each asset in its own home makes both work as designed. Why not the others: A abandons configuration for manual repetition; C demotes standing rules to documents Claude may or may not consult; D inverts the two surfaces entirely."
  },
  {
    "id": 82,
    "ref": "5.6",
    "domain": 5,
    "multi": false,
    "question": "Sales reps report that the quoting Project keeps citing superseded prices. Investigation shows the Project knowledge contains “pricing_2024.xlsx”, while current prices took effect in January. What does proper knowledge maintenance look like?",
    "options": [
      "Add a chat instruction each time: “ignore the old prices you may have seen”",
      "Upload the new pricing file into the Project knowledge alongside the old one, so that both versions remain available for reference",
      "Tell the reps to mentally adjust the quoted figures",
      "Remove the outdated file, upload the current pricing document, and put knowledge sources on a review cycle"
    ],
    "correctAnswer": "D",
    "explanation": "Maintaining configurations means the knowledge base tracks reality: stale sources are removed, not merely supplemented, and a review cadence keeps time-sensitive material like pricing from silently rotting. Why not the others: A treats a configuration defect as a per-chat incantation; B leaves two contradictory sources competing for retrieval; C institutionalizes wrong numbers in customer quotes."
  },
  {
    "id": 83,
    "ref": "5.7",
    "domain": 5,
    "multi": false,
    "question": "An associate is setting up a Claude Project to support the team’s proposal-writing process. Five setup activities are involved:\n1. Test the Project with a realistic sample task and review the output\n2. Write the Project’s custom instructions: tone, structure, and escalation rules\n3. Upload the curated reference documents as Project knowledge\n4. Create the Project\n5. Refine the instructions and knowledge based on what the test revealed\n\nIn which order should the activities be carried out?",
    "options": [
      "4 → 1 → 2 → 3 → 5",
      "2 → 3 → 4 → 5 → 1",
      "4 → 2 → 3 → 1 → 5",
      "4 → 2 → 3 → 5 → 1"
    ],
    "correctAnswer": "C",
    "explanation": "The Project must exist before it can be configured (4), configuration, meaning the instructions and knowledge (2, 3), comes before evaluation, and refinement (5) only makes sense once a test (1) has produced something to learn from. Configure, test, refine is the same loop good prompting follows. Why not the others: A tests an unconfigured Project, so the test reveals nothing about the setup; B configures a Project that doesn’t exist yet and refines before testing; D refines before running the test that would show what needs refining."
  },
  {
    "id": 84,
    "ref": "5.8",
    "domain": 5,
    "multi": false,
    "question": "A communications team is setting up a Project for drafting media releases. Which combination best configures the Project?",
    "options": [
      "Instructions describing the organisation’s history, structure and values in detail, so that Claude understands the context.",
      "Every media release the organisation has issued in the last five years added as knowledge, with no instructions at all.",
      "Role, house style and release structure in the instructions; the style guide and three approved releases as knowledge.",
      "Instructions giving Claude’s role only, with the style guide pasted into each chat as and when it is needed for a particular release."
    ],
    "correctAnswer": "C",
    "explanation": "A well-configured Project pairs concise instructions (role, style, structure) with a small set of authoritative knowledge files. Why not the others: A: background without any instruction on what to produce; B: volume without guidance; old releases will contain superseded style; D: the style guide belongs in the Project, not re-pasted."
  },
  {
    "id": 85,
    "ref": "5.9",
    "domain": 5,
    "multi": false,
    "question": "An HR team’s Project instructions read, in full, “Be helpful and accurate.” Outputs vary widely in format and tone. Which revision is most likely to improve consistency?",
    "options": [
      "Add “be consistent in format and tone” to the existing instruction, so that both requirements are explicit.",
      "Remove the instructions altogether so that Claude can use its own judgement about what each request needs.",
      "Replace the instruction with a detailed description of the HR team’s responsibilities and the services it provides.",
      "State the audience, tone, standard output structure, and what to do when information is missing."
    ],
    "correctAnswer": "D",
    "explanation": "System-level instructions work when they define the audience, tone, structure and behaviour under uncertainty. Vague virtues produce vague results. Why not the others: A: another vague virtue; B removes the only lever for consistency; C describes the team, not the output."
  },
  {
    "id": 86,
    "ref": "5.10",
    "domain": 5,
    "multi": false,
    "question": "A sales enablement manager at Orlo Office Supplies built a Project in February with the product catalogue as knowledge. In August, Claude is still quoting prices that changed in June. What is the most appropriate action?",
    "options": [
      "Replace the catalogue in the Project with the current version and have Claude state the catalogue date in each answer.",
      "Add the new price list alongside the old catalogue in the Project so that Claude has both versions available.",
      "Tell Claude at the start of each chat that prices changed in June and that any figures from the old catalogue should be ignored.",
      "Delete the Project and use a plain chat with the current price list pasted in whenever a price is needed."
    ],
    "correctAnswer": "A",
    "explanation": "Knowledge sources must be maintained. Replacing the stale file fixes the cause; the date instruction makes staleness visible next time. Why not the others: B leaves two conflicting sources for Claude to choose between; C: a per-chat workaround that leaves the wrong source in place; D abandons a useful configuration for a maintenance task."
  },
  {
    "id": 87,
    "ref": "5.11",
    "domain": 5,
    "multi": false,
    "question": "A project coordinator wants Claude to answer questions using the team’s project documents, which live in Google Drive and change weekly. Which approach is most appropriate?",
    "options": [
      "Copy the text of each document into the Project’s instructions and update it when the documents change.",
      "Download the documents each week and upload the latest versions to the chat as attachments.",
      "Connect Google Drive so that Claude can reference the current documents when asked.",
      "Upload the documents once and ask Claude to remember their contents for future conversations."
    ],
    "correctAnswer": "C",
    "explanation": "A connector is the right tool when the source of truth lives elsewhere and keeps changing. Why not the others: A: instructions are for guidance, not bulk content, and the copies go stale; B works, but is manual, weekly and easy to forget; D: a one-time upload is a snapshot; it will not track weekly changes."
  },
  {
    "id": 88,
    "ref": "5.12",
    "domain": 5,
    "multi": true,
    "question": "An operations team is choosing which files to add as knowledge to a Project that answers staff questions about procedures. Which two files are appropriate to include? (Select TWO.)",
    "options": [
      "The current standard operating procedures manual.",
      "Every email the team has received in the past year, so that Claude has the full context.",
      "A spreadsheet of staff home addresses used for emergency contact.",
      "A short glossary of internal terms and system names.",
      "The complete archive of superseded procedures, in case they are needed for comparison."
    ],
    "correctAnswer": [
      "A",
      "D"
    ],
    "explanation": "Project knowledge should be current, authoritative and relevant to the questions the Project answers. Why not the others: B: volume without relevance; C: personal data with no bearing on procedures; E: superseded content invites wrong answers."
  },
  {
    "id": 89,
    "ref": "5.13",
    "domain": 5,
    "multi": true,
    "question": "A marketing lead is writing Project instructions for a social-media drafting assistant. Which two instructions are well formed? (Select TWO.)",
    "options": [
      "“Be creative and engaging, and make every post something that people will want to share.”",
      "“If a request needs a product fact that is not in the knowledge files, say so rather than guessing.”",
      "“Use your best judgement about tone, length and audience for each post, depending on the request.”",
      "“Write for small-business owners in a warm, plain-English tone; keep each post under 80 words.”",
      "“Always include at least ten hashtags to maximise reach, whatever the platform or the subject of the post.”"
    ],
    "correctAnswer": [
      "B",
      "D"
    ],
    "explanation": "Good instructions are specific about audience, tone and length, and tell Claude how to behave when it lacks information. Why not the others: A: aspirational, not actionable; C delegates the decisions the instructions exist to make; E: a rigid rule that is wrong for most platforms."
  },
  {
    "id": 90,
    "ref": "5.14",
    "domain": 5,
    "multi": false,
    "question": "You are the owner of a shared Project used by a team of twelve. A policy the Project relies on has changed.\n1. Update the instructions where they describe the old policy.\n2. Tell the team what changed and the date it took effect.\n3. Identify which knowledge files and instructions refer to the old policy.\n4. Test with a few typical prompts to confirm that answers reflect the new policy.\n5. Replace the outdated files with the current version.\n\nWhich is the correct order of steps?",
    "options": [
      "3 → 5 → 1 → 4 → 2",
      "5 → 3 → 1 → 4 → 2",
      "3 → 5 → 1 → 2 → 4",
      "3 → 1 → 5 → 2 → 4"
    ],
    "correctAnswer": "A",
    "explanation": "Maintenance is find, replace, update, verify, then communicate. Testing before telling the team avoids announcing a change that has not actually worked. Why not the others: B replaces files before knowing which ones are affected; C and D both notify the team before the change has been tested."
  },
  {
    "id": 91,
    "ref": "6.1",
    "domain": 6,
    "multi": false,
    "question": "Which of the following tasks is the associate right to treat as an appropriate, low-risk use of Claude without additional approvals?",
    "options": [
      "Producing the company’s official written response to a regulator’s formal inquiry, and sending it out without any human review",
      "Analyzing an unredacted export of customer identity records from the CRM",
      "Turning the associate’s own rough notes from an internal team meeting into organized minutes, reviewed before sharing",
      "Generating a diagnosis for an employee's described medical symptoms"
    ],
    "correctAnswer": "C",
    "explanation": "Appropriate-use judgment weighs data sensitivity, stakes, and oversight. Internal, non-sensitive content authored by the user, with human review before sharing, sits squarely in the green zone. Why not the others: A is high-stakes external communication with the review step deleted; B processes regulated personal data without safeguards; D is a professional medical judgment no chat tool should be making."
  },
  {
    "id": 92,
    "ref": "6.2",
    "domain": 6,
    "multi": false,
    "question": "An HR associate wants Claude's help analyzing turnover patterns using a spreadsheet that includes employee names, salaries, and health-leave records. Organizational policy restricts sharing sensitive personal data. What is the correct approach?",
    "options": [
      "Upload it as-is; internal analysis doesn't count as sharing",
      "De-identify first (remove or pseudonymize identifiers, keep only fields the analysis needs) and confirm compliance with the data policy",
      "Upload the file as it is, but instruct Claude at the start of the conversation to treat the contents as strictly confidential and promise not to share them",
      "Analyze only the names column, since names alone reveal nothing"
    ],
    "correctAnswer": "B",
    "explanation": "Data-sensitivity practice is minimization: strip identity, keep only the analytical fields, and check the approach against policy. The insight survives; the exposure doesn't. Why not the others: A misreads policy: providing data to a tool is a disclosure event; C substitutes a chat message for a control; D is backwards, retaining the identifiers and discarding the analysis."
  },
  {
    "id": 93,
    "ref": "6.3",
    "domain": 6,
    "multi": false,
    "question": "A consultant working with a healthcare client is asked to run patient-feedback records through Claude to find service-improvement themes. Health data is subject to specific regulation. What must happen before any records are processed?",
    "options": [
      "Proceed: feedback records don't feel like medical records",
      "Proceed, but delete the conversation afterwards",
      "Run a small sample of the records through first, and wait to see whether the client or anyone else raises an objection before processing the full set",
      "Confirm the regulatory and contractual position first: engage the client’s privacy or compliance function and process the data only as they approve"
    ],
    "correctAnswer": "D",
    "explanation": "Regulated data categories reverse the default: authorization comes before processing. The compliance function determines what the regulation and client agreements permit: the consultant's job is to ask before, not apologize after. Why not the others: A substitutes vibes for regulatory analysis: patient feedback can absolutely contain health information; B deletes evidence of a violation rather than preventing one; C makes the violation smaller, not lawful."
  },
  {
    "id": 94,
    "ref": "6.4",
    "domain": 6,
    "multi": false,
    "question": "An associate discovers a teammate has been pasting confidential company documents into a personal, free AI chatbot account because “it's the same model anyway.” What is the governance-correct response?",
    "options": [
      "Explain the problem, direct the teammate to the sanctioned workspace, and follow the organization’s process for reporting the data exposure",
      "Ignore it: the underlying model quality is indeed similar, so the work product is the same wherever the documents happen to be pasted in the end",
      "Join in, because the free account saves budget",
      "Quietly delete the teammate's chat history and say nothing"
    ],
    "correctAnswer": "A",
    "explanation": "Following organizational AI policy means using sanctioned channels (the enterprise workspace exists precisely for its contractual data protections and admin controls) and treating confidential data in unsanctioned tools as an incident to report, not a secret to keep. Why not the others: B and C confuse model capability with governance: the account terms, not the model, are the issue; D destroys the record while leaving both the exposure and the behavior in place."
  },
  {
    "id": 95,
    "ref": "6.5",
    "domain": 6,
    "multi": false,
    "question": "A marketing lead asks an associate to have Claude write a dozen enthusiastic customer testimonials, each attributed to a fictional customer name, for the company website. How should the associate respond?",
    "options": [
      "Write them: every company polishes its testimonials",
      "Decline and explain that fabricated testimonials presented as real customers are deceptive, then offer legitimate alternatives",
      "Write them, but attribute each testimonial to a first name only, so that no complete fictional identity is created and the risk is reduced",
      "Write them and add a tiny footnote reading “illustrative”"
    ],
    "correctAnswer": "B",
    "explanation": "Ethical use draws the line at deception: content that manufactures false social proof misleads the public regardless of who typed it. The professional response pairs the refusal with legitimate paths to the same business goal. Why not the others: A normalizes fabrication as polish; C and D are cosmetic mitigations of the same deception: the reader is still being told real customers said things no one said."
  },
  {
    "id": 96,
    "ref": "6.6",
    "domain": 6,
    "multi": false,
    "question": "An associate uses Claude to draft a vendor-evaluation report, edits it, and submits it to their director. The report contains an error that later causes a problem. Who is accountable for the error?",
    "options": [
      "Claude, since it generated the sentence containing the error",
      "Anthropic, as the maker of the tool",
      "The associate who authored and submitted the report: AI assistance does not transfer accountability for one’s work product",
      "No one: errors that originate from AI-assisted work are an accepted cost of the technology and are nobody’s individual fault in particular"
    ],
    "correctAnswer": "C",
    "explanation": "Accountability follows authorship and submission, not typing. The person who signs off on AI-assisted work owns it, which is precisely the reason validation and review are non-negotiable steps, not courtesies. Why not the others: A and B mistake a tool for a responsible party: no organization accepts ‘the software wrote it’ as accountability; D describes a world in which no work product could be trusted at all."
  },
  {
    "id": 97,
    "ref": "6.7",
    "domain": 6,
    "multi": false,
    "question": "A colleague going through a divorce asks an associate to have Claude determine “what custody arrangement I'm legally entitled to” so they can act on it directly. What should the associate recognize?",
    "options": [
      "This asks the tool to substitute for professional legal advice on a high-stakes personal matter; the determination belongs with a qualified lawyer",
      "Claude's answer will be binding, so it should be worded carefully",
      "It's fine as long as the jurisdiction is specified precisely",
      "The request is acceptable, because family law matters are considerably simpler and more standardized than corporate law and well within the tool’s reach"
    ],
    "correctAnswer": "A",
    "explanation": "Recognizing inappropriate use cases includes the substitution test: when the ask is a professional determination someone will act on (legal, medical, financial), the tool's role shrinks to preparation and understanding, and the determination goes to a qualified professional. Why not the others: B attributes legal force a chat response cannot have; C fixes an input detail while the category problem remains; D is both false and irrelevant to whether professional advice is needed."
  },
  {
    "id": 98,
    "ref": "6.8",
    "domain": 6,
    "multi": true,
    "question": "Before uploading a dataset to Claude for analysis, which TWO checks should an associate perform? (Select TWO.)",
    "options": [
      "Whether the file's formatting is attractive",
      "Whether the dataset contains personal, confidential, or regulated information requiring removal, de-identification, or special handling",
      "Whether the file was created recently enough for the analysis to be interesting and worth the effort of uploading and running in the first place",
      "Whether the organization's AI and data policies permit this category of data to be used with this tool, in this workspace",
      "Whether the dataset is large enough to look impressive"
    ],
    "correctAnswer": [
      "B",
      "D"
    ],
    "explanation": "The pre-upload discipline has two gates: inspect the data itself for sensitive content, and confirm the intended use is inside policy for that data category and platform. Passing both is what makes the analysis safe to start. Why not the others: A, C, and E are aesthetic and incidental properties with no bearing on whether the upload is appropriate."
  },
  {
    "id": 99,
    "ref": "6.9",
    "domain": 6,
    "multi": true,
    "question": "Which TWO practices belong in a team's responsible-AI working norms? (Select TWO.)",
    "options": [
      "Disclose AI assistance where organizational policy or the context requires it, rather than presenting AI-drafted work as unaided",
      "Allow Claude outputs to be sent onward to external parties automatically, without a review step, so that speed of delivery is maximized for the team",
      "Keep humans accountable for decisions that affect people (hiring, performance, customer commitments), with AI limited to support",
      "Treat an output as verified once the model has reviewed its own work",
      "Discourage colleagues from questioning or second-guessing AI-produced analysis once it has been circulated, so that team efficiency is maintained"
    ],
    "correctAnswer": [
      "A",
      "C"
    ],
    "explanation": "Responsible-use norms rest on transparency and human accountability: honesty about AI's role where it matters, and people, not models, owning decisions with human consequences. Why not the others: B removes the review step exactly where stakes are highest; D is circular validation; E inverts healthy culture: scrutiny of AI output is the safeguard, not the obstacle."
  },
  {
    "id": 100,
    "ref": "6.10",
    "domain": 6,
    "multi": false,
    "question": "A payroll officer wants Claude to find patterns in overtime claims. The spreadsheet contains employee names, tax file numbers and bank details. Policy prohibits sharing identifiable personal data with AI tools. What is the most appropriate action?",
    "options": [
      "Upload the spreadsheet but instruct Claude not to read or use the columns that contain personal details.",
      "Upload only the first 50 rows so that the exposure is limited while the pattern analysis is tested.",
      "Remove names, tax file numbers and bank details, keep an anonymised ID with each claim, and proceed.",
      "Ask Claude to anonymise the spreadsheet first, then analyse the anonymised version it has produced."
    ],
    "correctAnswer": "C",
    "explanation": "De-identify before upload. The analysis needs the claims, not the identities, so the policy and the task are both satisfied. Why not the others: A: the data has already been shared once it is uploaded; B shares less identifiable data, but still shares it; D shares all of it in order to anonymise it."
  },
  {
    "id": 101,
    "ref": "6.11",
    "domain": 6,
    "multi": false,
    "question": "A team leader in a government agency is considering tasks to hand to Claude. Which task is an appropriate use?",
    "options": [
      "Producing a legal opinion on a contract dispute that will be relied on without a lawyer’s review.",
      "Drafting a plain-language version of a published policy for the website, for review before publication.",
      "Determining whether an individual’s application for a benefit should be approved, from the submitted form.",
      "Making the final decision on which staff members receive a performance bonus this year, from their reviews."
    ],
    "correctAnswer": "B",
    "explanation": "Drafting from public material with human review is squarely appropriate. The others are consequential decisions about people that require human accountability. Why not the others: A removes the professional review the output depends on; C: an administrative decision with legal effect; D: a personnel decision with significant impact on individuals."
  },
  {
    "id": 102,
    "ref": "6.12",
    "domain": 6,
    "multi": false,
    "question": "A marketing associate at Tallowood Credit Union finds that Claude drafts customer emails much faster than the current approved tool. The organisation’s AI policy requires new AI uses to be registered and assessed before use. What should she do?",
    "options": [
      "Start using Claude for internal drafts only, since the policy is aimed at external communications.",
      "Use Claude for the emails now and register the use once the benefit has been proven.",
      "Register the proposed use and complete the assessment before using Claude for customer emails.",
      "Ask her manager for verbal approval and proceed while the assessment is scheduled."
    ],
    "correctAnswer": "C",
    "explanation": "Governance processes exist to catch risks before they materialise. Following them is not optional because the tool is better. Why not the others: A reinterprets the policy to avoid it; B inverts the order the policy requires; D substitutes informal approval for the required process."
  },
  {
    "id": 103,
    "ref": "6.13",
    "domain": 6,
    "multi": false,
    "question": "A communications team is using Claude to help draft a public awareness campaign. Which practice best reflects ethical use?",
    "options": [
      "Avoid mentioning the AI involvement, since a person reviewed and approved the content before it was published and is named on it.",
      "Attribute the campaign to Claude in the credits so that the audience knows that a person did not write it.",
      "Use Claude only for the first draft and rewrite it substantially so that disclosure is not required.",
      "Disclose AI assistance where policy or audience expectations call for it, and keep a named person accountable."
    ],
    "correctAnswer": "D",
    "explanation": "Ethical use rests on transparency where it matters and clear human accountability for what is published. Why not the others: A: review does not remove the question of disclosure; B misplaces accountability on the tool; C structures the work to dodge transparency rather than to meet it."
  },
  {
    "id": 104,
    "ref": "6.14",
    "domain": 6,
    "multi": true,
    "question": "A health-promotion officer is preparing to use Claude to analyse free-text responses from a community survey. Which two considerations are most important before the responses are uploaded? (Select TWO.)",
    "options": [
      "Whether the survey’s privacy notice allowed the responses to be processed by a third-party tool.",
      "Whether the responses contain information that could identify an individual respondent.",
      "Whether the responses were collected through an online form or on paper at community events.",
      "Whether the responses are long and detailed enough for Claude to find meaningful themes in them.",
      "Whether Claude’s analysis is likely to agree with the conclusions the officer has already reached."
    ],
    "correctAnswer": [
      "A",
      "B"
    ],
    "explanation": "Identifiability and the terms under which the data was collected are the two privacy questions that decide whether the upload is permissible. Why not the others: C: the collection channel is irrelevant to the privacy obligation; D: a quality question, not a privacy one; E: confirmation is not the goal of analysis."
  },
  {
    "id": 105,
    "ref": "6.15",
    "domain": 6,
    "multi": true,
    "question": "An operations manager is reviewing Claude use cases proposed by her team. Which two should she decline or refer for further assessment? (Select TWO.)",
    "options": [
      "Summarising a client’s unredacted contract that carries a confidentiality clause.",
      "Screening job applicants and automatically rejecting those Claude scores below a threshold.",
      "Drafting agendas and summarising the notes for the weekly team meeting, for the manager to check.",
      "Explaining an unfamiliar spreadsheet formula that a team member found in an inherited workbook.",
      "Suggesting alternative wording for an internal staff newsletter before it goes to the editor."
    ],
    "correctAnswer": [
      "A",
      "B"
    ],
    "explanation": "Automated decisions about people and confidential third-party material are the two categories that need governance review before use. Why not the others: C: routine, internal and low risk; D: a learning task with no data concern; E: routine drafting."
  },
  {
    "id": 106,
    "ref": "6.16",
    "domain": 6,
    "multi": true,
    "question": "A regional manager at Halden Insurance is rolling out Claude to 40 staff. Which two actions best support compliance with the organisation’s AI governance standards? (Select TWO.)",
    "options": [
      "Restrict Claude to managers for the first year, since they are more accountable than other staff.",
      "Provide a short guide listing approved use cases and the categories of data that must not be entered.",
      "Nominate a contact who reviews new use cases and records them in the organisation’s AI register.",
      "Allow staff to use personal Claude accounts so that the rollout is not held up by the procurement process.",
      "Ask staff to agree informally not to enter sensitive data, and trust them to apply common sense."
    ],
    "correctAnswer": [
      "B",
      "C"
    ],
    "explanation": "Clear guidance and a defined review path are what turn a policy into practice. Why not the others: A: seniority is not a governance mechanism; D: personal accounts sit outside the organisation’s controls; E: informal agreement is not a control."
  },
  {
    "id": 107,
    "ref": "6.17",
    "domain": 6,
    "multi": false,
    "question": "You are a team leader deciding whether a proposed Claude use case that involves customer records can go ahead.\n1. Work out who would be affected if an output were wrong, and whether the error could be undone.\n2. List the data fields the use case needs and flag any that identify a person.\n3. Write up the outcome and the reasons for it.\n4. Compare the proposal with the AI policy and the privacy obligations that apply.\n5. Approve it, approve it with changes such as removing identifiers, or decline it.\n\nWhich is the correct order of steps?",
    "options": [
      "2 → 4 → 1 → 3 → 5",
      "2 → 1 → 4 → 5 → 3",
      "2 → 1 → 5 → 4 → 3",
      "4 → 2 → 1 → 5 → 3"
    ],
    "correctAnswer": "B",
    "explanation": "Understand the data and the impact first, then test against policy, then decide, then record. Why not the others: A writes up an outcome that has not yet been decided; C approves or declines before the policy comparison; D compares the proposal with policy before knowing what data is involved."
  },
  {
    "id": 108,
    "ref": "6.18",
    "domain": 6,
    "multi": false,
    "question": "You are a communications officer who has discovered that a colleague pasted a customer list containing personal details into Claude last week.\n1. Record what data was entered, when, and in which account.\n2. Stop any further use and ask the colleague not to repeat it.\n3. Support any assessment of harm and any notifications that are required.\n4. Report the incident, with that record, through the organisation’s privacy or AI incident process.\n5. Share the lesson with the team and update the guidance.\n\nWhich is the correct order of steps?",
    "options": [
      "2 → 1 → 5 → 4 → 3",
      "2 → 4 → 1 → 3 → 5",
      "2 → 1 → 4 → 3 → 5",
      "1 → 2 → 4 → 3 → 5"
    ],
    "correctAnswer": "C",
    "explanation": "Contain, record, report, support, then learn. Containment comes first because it limits further exposure; the record is what the report is based on. Why not the others: A shares the lesson before the incident has been reported or assessed; B reports before there is a record of what happened; D records before containing, allowing further exposure meanwhile."
  },
  {
    "id": 109,
    "ref": "7.1",
    "domain": 7,
    "multi": false,
    "question": "Claude's answers to an associate's competitive-analysis questions keep coming back generic and surface-level. What should the associate examine first?",
    "options": [
      "Whether Claude is having a bad day, by waiting and retrying tomorrow",
      "The prompt itself: does it supply the company’s context, the competitors, the decision it feeds, and the criteria that matter?",
      "The subscription tier, since analytical depth of this kind is presumably a feature reserved for the more expensive paid subscription plans",
      "The time of day the questions are sent"
    ],
    "correctAnswer": "B",
    "explanation": "Diagnosis starts at the input: generic output is the signature of a context-starved prompt. The model answers the question it was actually asked: specificity in produces specificity out. Why not the others: A, C, and D look for external causes (mood, billing, clock) for a problem whose cause is almost always visible in the prompt text itself."
  },
  {
    "id": 110,
    "ref": "7.2",
    "domain": 7,
    "multi": false,
    "question": "An associate's mega-prompt contains fourteen requirements for a report. The output consistently satisfies most of them but drops two or three, different ones each time. What is the likely cause and fix?",
    "options": [
      "The model is being deliberately selective; add a line demanding total obedience",
      "The requirements are fundamentally impossible to satisfy together in any single document; permanently delete half of them so that the remaining half can actually be met",
      "Fourteen is fine: the real problem is not saying ‘please’",
      "Instruction overload (too many requirements competing in one request): group and prioritize them, or decompose into sequential steps"
    ],
    "correctAnswer": "D",
    "explanation": "Dropped instructions in different places on each run is the classic overload signature. The remedy is structural: fewer simultaneous demands per pass, whether by prioritized grouping or step-by-step decomposition with a final checklist pass. Why not the others: A misdiagnoses a capacity pattern as defiance; B discards requirements that may all be achievable across passes; C is superstition."
  },
  {
    "id": 111,
    "ref": "7.3",
    "domain": 7,
    "multi": false,
    "question": "In a team's client-reporting Project, every conversation starts with Claude using the wrong tone, and every user manually corrects it mid-chat. What is the right fix?",
    "options": [
      "Fix it at the source: update the Project’s custom instructions to specify the required tone, so every conversation starts correct",
      "Keep correcting each conversation manually as the team already does: it only takes a message or two at the start of every chat to put right",
      "Ask the team to accept the default tone to save effort",
      "Start every chat by insulting the previous answer to motivate improvement"
    ],
    "correctAnswer": "A",
    "explanation": "A defect that recurs in every conversation is a configuration defect, not a conversation defect. One instruction update repairs all future chats; per-chat correction repairs one chat at a time, forever. Why not the others: B institutionalizes rework the configuration exists to remove; C accepts a quality miss with a one-line fix available; D is noise: tone is set by instructions, not intimidation."
  },
  {
    "id": 112,
    "ref": "7.4",
    "domain": 7,
    "multi": false,
    "question": "Deep into a marathon conversation that has covered several topics, Claude begins conflating earlier drafts, responding slowly, and missing recent corrections. What is happening, and what is the practical response?",
    "options": [
      "The model is permanently degraded and the account should be reset",
      "Nothing is wrong: conversations behave identically at any length, so the drafts and corrections are all being tracked exactly as they were at the start",
      "Accumulated context has grown long and muddled. Have Claude summarize the current state, verify it, and continue in a fresh conversation seeded with it",
      "Type the corrections in capital letters so they outweigh the older content"
    ],
    "correctAnswer": "C",
    "explanation": "Long, multi-topic conversations accumulate context that eventually works against them. The restart-with-summary pattern keeps what matters, verified decisions and current state, and sheds the clutter degrading responses. Why not the others: A misattributes a conversation-level condition to the account; B denies the symptom being described; D adds emphasis into the same overloaded context."
  },
  {
    "id": 113,
    "ref": "7.5",
    "domain": 7,
    "multi": false,
    "question": "Every week an associate spends fifteen minutes re-explaining the same report requirements to Claude before starting the actual weekly report. What is the right optimization?",
    "options": [
      "Accept the fifteen minutes as the cost of quality",
      "Make the setup reusable: capture the standing requirements once in a Project’s instructions, so each week starts at the work",
      "Stop explaining the requirements and accept lower-quality reports",
      "Rotate the weekly task among the whole team, so that no single person has to bear the same fifteen minutes of re-explaining every single week"
    ],
    "correctAnswer": "B",
    "explanation": "Optimization targets repeated overhead: anything explained identically every cycle belongs in reusable configuration. The one-time setup converts fifteen minutes a week into zero. Why not the others: A pays a recurring cost with a known one-time fix; C trades quality for time when neither needs sacrificing; D redistributes the waste instead of eliminating it."
  },
  {
    "id": 114,
    "ref": "7.6",
    "domain": 7,
    "multi": true,
    "question": "An associate is systematically improving an underperforming prompt. Which TWO practices make the improvement process reliable? (Select TWO.)",
    "options": [
      "Rewrite the entire prompt completely from scratch on every attempt, so no weak wording survives",
      "Change several elements at once to converge faster",
      "Change one element at a time, so each change's effect can be attributed",
      "Switch to a different AI product at the first sign of trouble",
      "Test each revision against the same example input, so results are compared like-for-like"
    ],
    "correctAnswer": [
      "C",
      "E"
    ],
    "explanation": "Reliable iteration is a fair experiment: vary one thing, hold the test input constant, observe the difference. That is how an associate learns which change helped rather than guessing. Why not the others: A and B destroy attribution: when everything changes, nothing is learned; D abandons diagnosis for tool-hopping."
  },
  {
    "id": 115,
    "ref": "7.7",
    "domain": 7,
    "multi": false,
    "question": "A recruitment coordinator asked Claude to “review this position description” and received a general comment on readability. She wanted specific gaps against the selection criteria. What is the most likely root cause?",
    "options": [
      "The prompt did not state what to review for or what the output should contain.",
      "The position description was too long for Claude to analyse properly.",
      "The model chosen was too light for a review task.",
      "Claude cannot compare a document against criteria unless they are presented in a table."
    ],
    "correctAnswer": "A",
    "explanation": "“Review” without criteria or an output specification leaves Claude to guess the purpose. The fix is in the prompt. Why not the others: B: a single position description is well within limits; C: any tier can do a criteria check if asked for one; D: format is not a prerequisite for comparison."
  },
  {
    "id": 116,
    "ref": "7.8",
    "domain": 7,
    "multi": false,
    "question": "Readers have described an analyst’s weekly Claude-drafted dashboard commentary as “too long and too hedged”. Which approach to adjusting is most effective?",
    "options": [
      "Ask Claude to write the commentary twice in different styles and send whichever version is shorter.",
      "Switch to a different model, since length and tone are characteristics of the model rather than the prompt.",
      "Turn the feedback into prompt constraints, such as a word limit, and check the next output against the complaint.",
      "Remove all constraints from the prompt so that Claude can decide on an appropriate length and level of certainty."
    ],
    "correctAnswer": "C",
    "explanation": "Feedback becomes improvement when it is translated into specific instructions and the next result is checked against the original complaint. Why not the others: A picks between two unguided outputs instead of fixing the guidance; B length and hedging are controlled by the prompt, not the tier; D removes the levers that control length and tone."
  },
  {
    "id": 117,
    "ref": "7.9",
    "domain": 7,
    "multi": false,
    "question": "A policy team spends 20 minutes at the start of every Claude session pasting the same background documents and explaining the house style. Which change best optimises the workflow?",
    "options": [
      "Move the documents and style guidance into a Project so that every session starts with them in place.",
      "Ask Claude at the end of each session to remember the documents and the style guidance for next time.",
      "Shorten the background documents so that pasting them and explaining the style takes less time.",
      "Assign one team member to do all of the pasting so that the others can start their work immediately."
    ],
    "correctAnswer": "A",
    "explanation": "Repeated setup is the signal that reference material belongs in a Project. The 20 minutes disappears for everyone. Why not the others: B: memory may retain stated preferences, but it does not carry whole background documents between sessions; a Project does; C reduces the waste slightly instead of removing it; D moves the waste to one person."
  },
  {
    "id": 118,
    "ref": "7.10",
    "domain": 7,
    "multi": true,
    "question": "A prompt asked for “a summary of the attached report, the three main risks, and a recommended next step”. Claude’s response contains only the summary. Which two changes are most likely to fix the problem? (Select TWO.)",
    "options": [
      "Ask Claude to confirm that it has understood the request before answering.",
      "Replace “summary” with “overview”, since the word may have narrowed the response.",
      "List the three required parts as numbered items in the prompt and ask for a heading for each.",
      "Give the required output structure as a short template showing the three sections.",
      "Attach the report twice so that Claude has it in context for each part of the answer."
    ],
    "correctAnswer": [
      "C",
      "D"
    ],
    "explanation": "Multi-part requests buried in one sentence get partial answers. Enumerating the parts or supplying a template makes each one explicit. Why not the others: A adds a turn without clarifying the structure; B: a vocabulary change that does not expose the three parts; E duplicates the input and changes nothing about the output."
  },
  {
    "id": 119,
    "ref": "7.11",
    "domain": 7,
    "multi": true,
    "question": "A team’s Claude-drafted customer replies have improved after several prompt changes, but the team leader wants to know which change actually helped. Which two practices make that clear? (Select TWO.)",
    "options": [
      "Judge improvement by whether the team leader prefers the latest draft to the previous one.",
      "Score each output against the same checklist of criteria before and after a change.",
      "Change one element of the prompt at a time and keep the test inputs the same.",
      "Ask Claude which of the changes it found most helpful.",
      "Make all of the changes at once so that the improvement is as large as possible."
    ],
    "correctAnswer": [
      "B",
      "C"
    ],
    "explanation": "Attribution needs a controlled comparison: one variable, fixed inputs, fixed criteria. Why not the others: A: preference without criteria is not measurement; D: the model cannot observe its own improvement; E destroys attribution."
  },
  {
    "id": 120,
    "ref": "7.12",
    "domain": 7,
    "multi": false,
    "question": "You are a project officer troubleshooting a Claude prompt that keeps producing an off-target weekly status report.\n1. Make one targeted change to the prompt.\n2. Compare the output with what was expected and name the specific gap.\n3. Keep the change if it helped; otherwise revert it and try the next hypothesis.\n4. Check whether the prompt actually states the missing expectation.\n5. Run the prompt again on the same inputs and compare it with the original expectation.\n\nWhich is the correct order of steps?",
    "options": [
      "2 → 4 → 5 → 1 → 3",
      "4 → 2 → 1 → 5 → 3",
      "2 → 1 → 4 → 5 → 3",
      "2 → 4 → 1 → 5 → 3"
    ],
    "correctAnswer": "D",
    "explanation": "Diagnosis before treatment: name the gap, find its cause in the prompt, change one thing, re-test on the same inputs, then decide. Why not the others: A re-runs before anything has been changed; B inspects the prompt before the gap has been named; C changes the prompt before checking whether it is the cause."
  }
];
const DOMAINS = {
  "1": "Prompting and Task Execution",
  "2": "Output Evaluation and Validation",
  "3": "Product and Model Selection",
  "4": "Workflow Integration and Solution Design",
  "5": "Configuration and Knowledge Management",
  "6": "Governance, Risk, and Responsible Use",
  "7": "Troubleshooting and Optimization"
};
const DOMAIN_WEIGHTS = {"1": 14, "2": 21, "3": 12, "4": 16, "5": 12, "6": 15, "7": 10};
