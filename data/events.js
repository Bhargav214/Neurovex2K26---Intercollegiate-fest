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
            "Each participant gets one attempt per round.",
            "Plagiarism leads to immediate disqualification.",
            "Time limit per round will be announced on the day.",
        ],
        teamSize: "Individual (1 person)",
        rounds: [
            { round: "Round 1 – Coding Challenge", description: "Solve 3 algorithmic problems within 60 minutes." },
            { round: "Round 2 – Debugging", description: "Fix 5 buggy programs within 45 minutes. Fastest correct submission wins." },
        ],
        judgingCriteria: [
            "Correctness of solution",
            "Time taken to complete",
            "Code efficiency and optimization",
        ],
        prizes: {
            first: "₹3,000 + Certificate",
            second: "₹2,000 + Certificate",
            third: "₹1,000 + Certificate",
        },
        coordinators: [
            { name: "Aravind Kumar", phone: "+91 98XXX XXXXX", role: "Event Coordinator" },
            { name: "Priya Nair", phone: "+91 87XXX XXXXX", role: "Technical Lead" },
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
            "Teams of 2 participants per college.",
            "No mobile phones or electronic devices during the quiz.",
            "Quiz Master's decision is final and binding.",
            "Negative marking applies in elimination rounds.",
            "Visual rounds will be judged by coordinators.",
        ],
        teamSize: "2 members per team",
        rounds: [
            { round: "Round 1 – Prelims (Written)", description: "30 MCQ questions in 20 minutes. Top 8 teams qualify." },
            { round: "Round 2 – Audio-Visual Round", description: "Tech-related images and videos based questions." },
            { round: "Round 3 – Rapid Fire Finals", description: "Head-to-head buzzer round with 4 qualified teams." },
        ],
        judgingCriteria: [
            "Number of correct answers",
            "Speed of response in rapid fire round",
            "Tie-breaker questions if scores are equal",
        ],
        prizes: {
            first: "₹2,500 + Certificate",
            second: "₹1,500 + Certificate",
            third: "Certificate of Merit",
        },
        coordinators: [
            { name: "Divya Menon", phone: "+91 99XXX XXXXX", role: "Quiz Master" },
            { name: "Rahul Krishnan", phone: "+91 88XXX XXXXX", role: "Event Coordinator" },
        ],
    },
    {
        slug: "treasure-hunt",
        title: "Treasure Hunt",
        icon: "🗺️",
        tagline: "Decode. Discover. Dominate.",
        description:
            "An exhilarating campus-wide IT-themed treasure hunt where teams decode tech clues, solve puzzles, and race to find the hidden treasure. Combines teamwork, logical thinking, and technical knowledge.",
        rules: [
            "Teams of 3–4 participants.",
            "Clues must not be shared with other teams.",
            "Destroying or hiding clue cards leads to disqualification.",
            "All team members must be present at the final location.",
            "Coordinators' decision on clue interpretation is final.",
        ],
        teamSize: "3–4 members per team",
        rounds: [
            { round: "Stage 1 – Tech Riddles", description: "Decode 5 IT-themed riddles to find your first checkpoint." },
            { round: "Stage 2 – Puzzle Solving", description: "Solve physical and digital puzzles scattered across the campus." },
            { round: "Stage 3 – Final Hunt", description: "Race to the final location with the decoded treasure coordinates." },
        ],
        judgingCriteria: [
            "Time taken to reach the final treasure",
            "Number of checkpoints cleared",
            "Accuracy of answers at each stage",
        ],
        prizes: {
            first: "₹3,000 + Certificates for all members",
            second: "₹2,000 + Certificates for all members",
            third: "₹1,000 + Certificates for all members",
        },
        coordinators: [
            { name: "Sneha Pillai", phone: "+91 97XXX XXXXX", role: "Hunt Coordinator" },
            { name: "Akash Raj", phone: "+91 86XXX XXXXX", role: "Clue Designer" },
        ],
    },
    {
        slug: "it-gaming",
        title: "IT Gaming",
        icon: "🎮",
        tagline: "Game on. Level up.",
        description:
            "Competitive gaming event featuring popular PC esports titles. Showcase your reflexes, strategy, and team coordination in an electrifying tournament-style battle for gaming supremacy.",
        rules: [
            "Games: BGMI Mobile (Solo) and Valorant (Team 5v5).",
            "Participants must bring their own peripherals (mouse, keyboard, headset).",
            "Unsportsmanlike conduct leads to immediate ban.",
            "All matches are best of 3 unless specified.",
            "Hacking or cheat software leads to permanent disqualification.",
        ],
        teamSize: "Solo (BGMI) / 5 members (Valorant)",
        rounds: [
            { round: "Round 1 – Group Stage", description: "Round-robin format. Top teams advance to knockout." },
            { round: "Round 2 – Semifinals", description: "Best-of-3 series. Winner advances to finals." },
            { round: "Round 3 – Grand Finals", description: "Best-of-5 championship match with live audience." },
        ],
        judgingCriteria: [
            "Match wins and kill count",
            "Tournament bracket performance",
            "Sportsmanship (as a tiebreaker)",
        ],
        prizes: {
            first: "₹4,000 + Gaming Goodies + Certificate",
            second: "₹2,500 + Certificate",
            third: "₹1,500 + Certificate",
        },
        coordinators: [
            { name: "Vishnu Suresh", phone: "+91 95XXX XXXXX", role: "Gaming Coordinator" },
            { name: "Anjali Dev", phone: "+91 84XXX XXXXX", role: "Tournament Manager" },
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
            "Only allowed tools: Canva, Adobe Illustrator, Photoshop, or Figma.",
            "Logo must be original — no stock images or pre-made templates.",
            "Final submission must be in both PNG and PDF format.",
            "Time limit: 90 minutes.",
            "Theme and company brief will be given on the day of the event.",
        ],
        teamSize: "Individual (1 person)",
        rounds: [
            { round: "Single Round – Live Design", description: "90-minute on-spot logo design based on given brief. Judged immediately after." },
        ],
        judgingCriteria: [
            "Creativity and originality",
            "Relevance to the given brief",
            "Aesthetic appeal and color theory",
            "Typography and layout",
            "Technical execution",
        ],
        prizes: {
            first: "₹2,500 + Certificate",
            second: "₹1,500 + Certificate",
            third: "₹1,000 + Certificate",
        },
        coordinators: [
            { name: "Meera Gopinath", phone: "+91 96XXX XXXXX", role: "Design Coordinator" },
            { name: "Jishnu Thomas", phone: "+91 85XXX XXXXX", role: "Judging Panel Lead" },
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
            "Teams of 2 participants.",
            "Each team receives the same project scenario.",
            "Decisions must be documented and presented.",
            "External help or internet is not permitted.",
            "Time per round will be specified on event day.",
        ],
        teamSize: "2 members per team",
        rounds: [
            { round: "Round 1 – Case Study Analysis", description: "Read and analyze an IT project scenario. Present initial plan." },
            { round: "Round 2 – Crisis Management", description: "Handle unexpected project crises presented by the judges." },
            { round: "Round 3 – Final Presentation", description: "5-minute pitch of your complete project management strategy." },
        ],
        judgingCriteria: [
            "Decision-making quality",
            "Leadership and communication",
            "Technical feasibility of plan",
            "Presentation and confidence",
        ],
        prizes: {
            first: "₹2,500 + Certificate",
            second: "₹1,500 + Certificate",
            third: "Certificate of Merit",
        },
        coordinators: [
            { name: "Sooraj Babu", phone: "+91 94XXX XXXXX", role: "Event Coordinator" },
            { name: "Lakshmi Rajan", phone: "+91 83XXX XXXXX", role: "Judge Liaison" },
        ],
    },
    {
        slug: "corporate-walk",
        title: "Corporate Walk",
        icon: "👔",
        tagline: "Walk the talk. Own the stage.",
        description:
            "A unique personality contest blending professional presence, technical knowledge, and communication skills. Participants present themselves as IT professionals and are judged on their personality, confidence, and domain knowledge.",
        rules: [
            "Formal/semi-formal attire mandatory.",
            "Participants must introduce themselves in under 2 minutes.",
            "Questions will be asked from IT domains.",
            "Mobile phones are not allowed during the event.",
            "Judges' decisions are final.",
        ],
        teamSize: "Individual (1 person)",
        rounds: [
            { round: "Round 1 – Introduction Walk", description: "60-second self-introduction on stage. Personality and presence judged." },
            { round: "Round 2 – Tech Q&A", description: "Judges ask 3 IT-related questions. Assessment of knowledge depth." },
            { round: "Round 3 – Final Walk & Judging", description: "Top 5 finalists compete for the top spot with final statements." },
        ],
        judgingCriteria: [
            "Personality and stage presence",
            "Communication skills",
            "Technical knowledge",
            "Attire and grooming",
            "Confidence and articulation",
        ],
        prizes: {
            first: "₹2,000 + Trophy + Certificate",
            second: "₹1,500 + Certificate",
            third: "Certificate of Merit",
        },
        coordinators: [
            { name: "Nithya Krishnan", phone: "+91 93XXX XXXXX", role: "Event Host" },
            { name: "Arjun Mohan", phone: "+91 82XXX XXXXX", role: "Coordinator" },
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
            "Teams of 2 participants per side.",
            "Topics will be announced 30 minutes before the event.",
            "Each speaker gets 3 minutes for opening, 2 minutes for rebuttal.",
            "No personal attacks; arguments must be evidence-based.",
            "Moderator's time calls are final.",
        ],
        teamSize: "2 members per team",
        rounds: [
            { round: "Round 1 – Preliminary Debates", description: "Teams argue for/against assigned positions. Top 4 teams advance." },
            { round: "Round 2 – Finals", description: "Head-to-head final debate on a surprise topic with panel judging." },
        ],
        judgingCriteria: [
            "Logical reasoning and argument quality",
            "Use of technical facts and data",
            "Rebuttal effectiveness",
            "Communication and fluency",
            "Teamwork and synchronization",
        ],
        prizes: {
            first: "₹2,500 + Certificate",
            second: "₹1,500 + Certificate",
            third: "Certificate of Merit",
        },
        coordinators: [
            { name: "Aishwarya Pillai", phone: "+91 92XXX XXXXX", role: "Debate Moderator" },
            { name: "Midhun Paul", phone: "+91 81XXX XXXXX", role: "Coordinator" },
        ],
    },
];

export const eventSlugs = events.map((e) => e.slug);
