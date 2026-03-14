// data/events.js
// Static event data for NEUROVEX 2K26

export const events = [
    {
        slug: "coding-debugging",
        title: "Coding & Debugging",
        icon: "💻",
        tagline: "Debug your way to glory",
        description:
            "Test your programming prowess and problem-solving skills in this thrilling two-phase event. Participants will first write optimized code solutions, then tackle intentionally broken programs to identify and fix bugs under time pressure.",
        rules: [
            "Participants must use only allowed programming languages (C, C++, Java, Python).",
            "No internet access is permitted during the event.",
            "Maximum 3 attempts allowed, Incorrect submissions will attract penalty marks.",
            "Plagiarism leads to immediate disqualification.",
            "Time limit per round will be announced on the day.",
        ],
        teamSize: "2 members per team",
        entryFee: "₹200 per team",
        rounds: [
            { round: "Round 1 – Coding Challenge", description: "Coding MCQ Round." },
            { round: "Round 2 – Debugging", description: "Debugging Round using 'C' language. Fastest correct submission wins." },
            { round: "Round 3 – Final Challenge", description: "Finalists will solve logic based problems." },
        ],
        judgingCriteria: [
            "Correctness of solution",
            "Time taken to complete",
            "Code efficiency and optimization",
        ],
        prizes: {
            first: "₹2,000 + Certificate",
            second: "₹1,000 + Certificate",
        },
        coordinators: [
            { name: "Y.Lakshmipriya", phone: "+91 9491543865", role: "Event Coordinator" },
            { name: "Jayashree Nayak", phone: "+91 9901346139", role: "Event Coordinator" },
        ],
    },
    {
        slug: "it-quiz",
        title: "IT Quiz",
        icon: "🧠",
        tagline: "Knowledge is your superpower",
        description:
            "A high-octane quiz competition covering all dimensions of Information Technology — from computer science fundamentals and programming to emerging technologies like AI, cybersecurity, blockchain, and cloud computing.",
        rules: [
            "No mobile phones or electronic devices during the quiz.",
            "Quiz Master's decision is final and binding.",
            "Negative marking applies in elimination rounds.",
            "Visual rounds will be judged by coordinators.",
        ],
        teamSize: "2 members per team",
        entryFee: "₹200 per team",
        rounds: [
            { round: "Round 1 – Prelims (Written)", description: "MCQ questions(top scored will be qualified for next round)." },
            { round: "Round 2 – Technical Round", description: "Tech-related questions." },
            { round: "Round 3 – Rapid Fire Finals", description: "Head-to-head buzzer round with qualified teams." },
        ],
        judgingCriteria: [
            "Number of correct answers",
            "Speed of response in rapid fire round",
            "Tie-breaker questions if scores are equal",
        ],
        prizes: {
            first: "₹2,000 + Certificate",
            second: "₹1,000 + Certificate",
        },
        coordinators: [
            { name: "Chandrika A", phone: "+91 9353371325", role: "Event Coordinator" },
            { name: "Aasiya", phone: "+91 9945533315", role: "Event Coordinator" },
        ],
    },
    {
        slug: "treasure-hunt",
        title: "Treasure Hunt",
        icon: "🗺️",
        tagline: "Mystery Quest - Decode. Discover. Dominate.",
        description:
            "An exhilarating campus-wide IT-themed treasure hunt where teams decode tech clues, solve puzzles, and race to find the hidden treasure. Combines teamwork, logical thinking, and technical knowledge.",
        rules: [
            "Teams of 4 participants.",
            "Clues must not be shared with other teams.",
            "Destroying or hiding clue cards leads to disqualification.",
            "All team members must be present at the final location.",
            "Coordinators' decision on clue interpretation is final.",
            "Teams caught cheating, breaking rules, or misbehaving and arguing with the coordinators, volunteers leads to immediate disqualification.",
            "The organizer's decision will be final in any dispute.",
        ],
        teamSize: "4 members per team",
        entryFee: "₹400 per team",
        rounds: [
            { round: "Stage 1 – Preliminary Round", description: "Solve physical and digital puzzles scattered across the campus." },
            { round: "Stage 2 – Challenge Round", description: "Challenge tasks for selected teams. " },
            { round: "Stage 3 – Final Hunt", description: "Race to the final location with the decoded treasure coordinates." },
        ],
        judgingCriteria: [
            "Time taken to reach the final treasure",
            "Number of checkpoints cleared",
            "Accuracy of answers at each stage",
        ],
        prizes: {
            first: "₹2,000 + Certificates for all members",
            second: "₹1,000 + Certificates for all members",
        },
        coordinators: [
            { name: "Nithyashree R D", phone: "+91 8431399418", role: "Hunt Coordinator" },
        ],
    },
    {
        slug: "it-gaming",
        title: "IT Gaming",
        icon: "🎮",
        tagline: "Game on. Level up.",
        description:
            "Competitive gaming event featuring popular esports titles. Showcase your reflexes, strategy, and team coordination in an electrifying tournament-style battle for gaming supremacy.",
        rules: [
            "Games: Free Fire Tournament (Squads of 4).",
            "Triggers or any unauthorised accessories are strictly prohibited.",
            "Screen peeking = Instant violation lead to disqualification.",
            "Toxic behaviour, Arguing or Abuse will lead to immediate disqalification.",
            "Disrespecting coordinators or volunteers will lead to disqualification.",
            "Sharing your screen is compulsory.",
            "First 2 Rounds Character Skills✅,Gun Attributes ❎and in Final Round Character Skills❎,Gun Attributes ❎",
            "Hacking or cheat software leads to permanent disqualification.",
            "No internet/charging sockets will be provided by the college.",
            "Every single player level should be above 35.",
            "Note: For detailed game structure, see the Rules PDF below."
        ],
        teamSize: "4 members per team",
        entryFee: "₹400 per team",
        rounds: [
            { round: "Round 1 – Qualification Round" },
            { round: "Round 2 – Semi Final" },
            { round: "Round 3 – Grand Final" },
        ],
        judgingCriteria: [
            "Match wins and kill count",
            "Tournament bracket performance",
            "Sportsmanship (as a tiebreaker)",
        ],
        prizes: {
            first: "₹4,000  + Certificate",
            second: "₹2,000 + Certificate",
        },
        rulespdf: "https://drive.google.com/file/d/1nBsOOubRa1twezLJlkNyD15gFS-epQb8/view?usp=sharing",// Paste the PDF URL here, e.g. "/pdfs/gaming-rules.pdf" or a Google Drive link
        coordinators: [
            { name: "Jamwanth C", phone: "+91 7829740310", role: "Gaming Coordinator" },
            { name: "Yuvaraj M G", phone: "+91 8296922397", role: "Gaming Coordinator" },
        ],
    },
    {
        slug: "logo-design",
        title: "Logo Design",
        icon: "🎨",
        tagline: "Design the future",
        description:
            "Unleash your creative genius in this design competition. Participants create a professional logo for a given tech company/brand brief using digital design tools. Tests creativity, visual communication, and design principles.",
        rules: [
            "Only allowed tools: Canva or Figma.",
            "Logo must be original — no stock images or pre-made templates.",
            "Final submission must be in both PNG and PDF format.",
            "Time limit: 90 minutes.",
            "Disqualification for copied designs",
            "Theme and company brief will be given on the day of the event.",
        ],
        teamSize: "Individual (1 person)",
        entryFee: "₹100 per participant",
        rounds: [
            { round: "Single Round – Live Design", description: "On-spot logo design based on given brief. Judged immediately after." },
        ],
        judgingCriteria: [
            "Creativity and originality",
            "Relevance to the given brief",
            "Aesthetic appeal and color theory",
            "clarity & presentation",
            "Typography and layout",
            "Technical execution",
        ],
        prizes: {
            first: "₹1,000 + Certificate",
        },
        coordinators: [
            { name: "Lavanya", phone: "+91 8904716029", role: "Design Coordinator" },
            { name: "Sneha", phone: "+91 6362547914", role: "Judging Panel Lead" },
        ],
    },
    {
        slug: "it-manager",
        title: "IT Manager",
        icon: "📊",
        tagline: "Lead the tech revolution",
        description:
            "A management simulation event where participants play the role of an IT Project Manager. Handle crisis scenarios, allocate resources, manage a virtual tech team, and deliver a project on time and budget.",
        rules: [
            "Number of participants = 1.",
            "Decisions must be documented and presented.",
            "External help or internet is not permitted.",
            "Time per round will be specified on event day.",
        ],
        teamSize: "1 members per team",
        entryFee: "₹100 per team",
        rounds: [
            { round: "Round 1 – Problem-solving task", description: "Participants will be given a real-world IT project scenario and must propose a solution within the given time limit." },
            { round: "Round 2 – Group discussion", description: "Teams engage in a group discussion on a given topic." },
            { round: "Round 3 – Mock Interview", description: "Candidates will participate in a simulated job interview." },
        ],
        judgingCriteria: [
            "Leadership Qualities",
            "Communication & Decision making",
            "Handling stress and creativity",
        ],
        prizes: {
            first: "₹1,500 + Certificate",
        },
        coordinators: [
            { name: "Sathyasimha H N", phone: "+91 6360582689", role: "Event Coordinator" },
        ],
    },
    {
        slug: "corporate-walk",
        title: "Corporate Walk",
        icon: "👔",
        tagline: "Tech Titans - Architects of Digital Future.",
        description:
            "A unique personality contest blending professional presence, technical knowledge, and communication skills. Participants present themselves as IT professionals and are judged on their personality, confidence, and domain knowledge.",
        rules: [
            "Team Composition: Each team must consist of 6–8 participants. No substitution of members will be allowed after registration.",
            "Eligibility: Participants must represent their respective college and carry a valid college ID card during the event.",
            "Reporting Time: All teams must report at least 30 minutes prior to the scheduled start time. Late reporting may result in penalty or disqualification.",
            "Event Structure: The event consists of two rounds — Quiz Round and Gesture Walk Round. All registered teams must participate in both rounds.",
            "Scoring System: Quiz Round and Gesture Walk Round scores will be combined, and the final winner will be decided based on the total cumulative score from both rounds.",
            "Answering Protocol (Quiz Round): Only one member can answer a question, and use of unfair means or electronic devices is strictly prohibited.",
            "Gesture Walk Duration: Each team will get 2–3 minutes to present their corporate concept and walk.",
            "Dress Code & Theme Compliance: Participants must strictly adhere to the approved corporate/IT theme; non-compliance may lead to score deduction.",
            "Prohibited Conduct: Offensive language, political statements, plagiarism, disrespectful gestures, or inappropriate behaviour will lead to immediate disqualification.",
            "Props & Setup: Minimal props are allowed, and any electronic setup must be pre-approved by the organizing committee.",
            "Tie-Breaker Rule: In case of a tie in total scores, a rapid-fire technical question will be asked to determine the winner.",
            "Judges' Decision: The decision of the judges and organizing committee will be final and binding in all circumstances.",
        ],
        teamSize: "6–8 members per team",
        entryFee: "₹400 per team",
        rounds: [
            { round: "Round 1 – Quiz Round", description: "Tech & IT-themed quiz for the full team. Only one member may answer per question." },
            { round: "Round 2 – Gesture Walk Round", description: "2–3 minute corporate concept presentation and walk judged on relevance, confidence, creativity, and team coordination." },
        ],
        judgingCriteria: [
            "Corporate relevance",
            "Confidence & Communication skills",
            "Technical knowledge",
            "Attire and grooming",
            "Team coordination",
        ],
        prizes: {
            first: "₹1,500 + Certificate",
        },
        coordinators: [
            { name: "Arathi A", phone: "+91 9663091959", role: "Event Host" },
        ],
    },
    {
        slug: "it-debate",
        title: "IT Debate",
        icon: "🎤",
        tagline: "Argue. Persuade. Win.",
        description:
            "An intellectually stimulating debate competition on contemporary IT topics such as AI vs Human Intelligence, Privacy vs Convenience, Open Source vs Proprietary Software. Sharpen your arguments and oratory skills.",
        rules: [
            "Team Registration: Each college may register one team of two students. Valid college ID cards are mandatory. No changes in team members permitted after registration.",
            "Format: The debate follows a 2 vs 2 format. Topics and sides (For/Against) will be decided by lot draw prior to the round.",
            "Rounds: There will be a total of 3 rounds.",
            "Duration: Each debate will be conducted for 20 minutes, strictly adhering to the prescribed structure.",
            "Time Management: A 10-second warning will be given before time expires. Exceeding the limit may result in mark deduction.",
            "Preparation: Preparation time will be provided before each debate. Use of internet, mobile phones, or any electronic devices during preparation or debate is strictly prohibited. Printed or handwritten notes are permitted.",
            "Unfair Means: Any participant found using unauthorized electronic devices or unfair means will face immediate disqualification.",
            "Conduct: Participants must maintain professional conduct at all times. Personal, offensive, religious, caste-based, or political remarks are strictly prohibited.",
            "Relevance & Interruptions: Arguments must remain relevant to the topic. Interruptions during opponent responses are not allowed. The moderator holds full authority to regulate the discussion.",
            "Evaluation: Teams will be evaluated on technical knowledge, logical strength of arguments, rebuttal effectiveness, communication skills, confidence, and team coordination.",
            "Reporting & Attire: Teams must report at least 30 minutes before their scheduled debate. Late arrival beyond 5 minutes of call time will result in a walkover. Formal attire is mandatory.",
            "Judges' Decision: The decision of the judges shall be final and binding under all circumstances.",
        ],
        teamSize: "2 members per team",
        entryFee: "₹200 per team",
        rounds: [
            { round: "Round 1 – Preliminary Debates", description: "Teams argue for/against assigned positions. Top teams advance." },
            { round: "Round 2 – Semi Finals", description: "Head-to-head debate on assigned topic. Each debate is 20 minutes with strict time management." },
            { round: "Round 3 – Finals", description: "Final debate on a surprise topic with panel judging." },
        ],
        judgingCriteria: [
            "Technical knowledge and logical argument quality",
            "Rebuttal effectiveness",
            "Communication skills and confidence",
            "Teamwork and synchronization",
        ],
        prizes: {
            first: "₹2,000 + Certificate",
            second: "₹1,000 + Certificate",
        },
        coordinators: [
            { name: "Sujith kumar vishwakarma", phone: "+91 8431576586", role: "Debate Moderator" },
        ],
    },
];

export const eventSlugs = events.map((e) => e.slug);
