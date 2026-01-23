// Audio elements
const clickSound = document.getElementById("clickSound");
const siren = document.getElementById("siren");
const boom = document.getElementById("boom");

// Constants
const REQUIRED = 100;
const CORRECT_DELAY = 800;
const INCORRECT_DELAY = 1000;
const EXPLODE_DURATION = 2000;

const questions = [
    {
        q: "Who is Naruto's father?",
        answers: ["Itachi", "Minato", "Jiraiya", "Kakashi"],
        correct: 1,
        hint: "He was the Fourth Hokage"
    },
    {
        q: "Who is the main character of One Punch Man?",
        answers: ["Genos", "Saitama", "King", "Blast"],
        correct: 1,
        hint: "He defeats enemies with one punch"
    },
    {
        q: "Who is the strongest sorcerer in Jujutsu Kaisen?",
        answers: ["Yuji", "Sukuna", "Gojo", "Megumi"],
        correct: 2,
        hint: "He has Six Eyes"
    },
    {
    q: "Who can transform into a Titan?",
    answers: ["Levi", "Mikasa", "Eren", "Armin"],
    correct: 2,
    hint: "He wants freedom"
    },
    {
    q: "What is Luffy's dream?",
    answers: ["Become Marine", "Find All Blue", "Become Pirate King", "Defeat Shanks"],
    correct: 2,
    hint: "The freest man on the sea"
},
{
    q: "What fruit did Luffy eat?",
    answers: ["Mera Mera no Mi", "Gomu Gomu no Mi", "Ope Ope no Mi", "Yami Yami no Mi"],
    correct: 1,
    hint: "Makes his body rubber"
},
{
    q: "Who was Naruto's sensei?",
    answers: ["Iruka", "Kakashi", "Jiraiya", "Asuma"],
    correct: 1,
    hint: "He copies jutsu with Sharingan"
},
{
    q: "What is the name of Naruto's signature jutsu?",
    answers: ["Chidori", "Rasengan", "Amaterasu", "Shadow Clone"],
    correct: 1,
    hint: "Taught by his father"
},
{
    q: "What breathing style does Tanjiro use first?",
    answers: ["Flame", "Water", "Thunder", "Wind"],
    correct: 1,
    hint: "Looks like flowing waves"
},
{
    q: "Who is the King of Curses?",
    answers: ["Gojo", "Geto", "Sukuna", "Toji"],
    correct: 2,
    hint: "Lives inside Yuji"
},
{
    q: "What beast is sealed inside Naruto?",
    answers: ["Shukaku", "Kurama", "Gyuki", "Matatabi"],
    correct: 1,
    hint: "Nine tails"
},
{
    q: "Who is Naruto's rival?",
    answers: ["Gaara", "Sasuke", "Neji", "Rock Lee"],
    correct: 1,
    hint: "Uchiha clan survivor"
}
];

// Game state
let current = 0;
let cakeClicks = 0;
let score = 0;
let streak = 0;

// DOM elements
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const loserEl = document.getElementById("loser");

const cake = document.getElementById("cake");
const counter = document.getElementById("counter");
const hintText = document.getElementById("hintText");
const currentQEl = document.getElementById("currentQ");
const hintBtn = document.getElementById("hintBtn");

// Helper function to safely play audio
function playSound(audio) {
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(err => console.warn("Audio play failed:", err));
    }
}

function loadQuestion() {
    answersEl.innerHTML = "";
    questionEl.textContent = questions[current].q;
    hintText.textContent = "";
    cakeClicks = 0;
    counter.textContent = "0 / 100";
    currentQEl.textContent = current + 1;

    questions[current].answers.forEach((text, i) => {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.setAttribute("aria-label", `Answer: ${text}`);
        btn.onclick = () => {
            playSound(clickSound);
            checkAnswer(i, btn);
        };
        answersEl.appendChild(btn);
    });
}

loadQuestion();

hintBtn.onclick = () => {
    hintText.textContent = "HINT: " + questions[current].hint;
};

cake.onclick = () => {
    if (cakeClicks < REQUIRED) {
        cakeClicks++;
        counter.textContent = `${cakeClicks} / 100`;
    }

    if (cakeClicks === REQUIRED) {
        hintText.textContent = "HINT: " + questions[current].hint;
    }
};

function checkAnswer(index, clickedBtn) {
    const allButtons = document.querySelectorAll("#answers button");
    allButtons.forEach(btn => btn.disabled = true);
    
    if (index === questions[current].correct) {
        score++;
        streak++;
        clickedBtn.style.background = "#00d900";
        
        setTimeout(() => {
            current++;
            if (current < questions.length) {
                loadQuestion();
            } else {
                showWinScreen();
            }
        }, CORRECT_DELAY);
    } else {
        streak = 0;
        clickedBtn.style.background = "#ff0000";
        const correctBtn = allButtons[questions[current].correct];
        correctBtn.style.background = "#00d900";
        
        setTimeout(() => {
            explode();
        }, INCORRECT_DELAY);
    }
}

function showWinScreen() {
    const percentage = Math.round((score / questions.length) * 100);
    questionEl.textContent = `YOU WIN 🔥`;
    questionEl.innerHTML += `<div style="font-size: 24px; margin-top: 20px;">Final Score: ${score}/${questions.length} (${percentage}%)</div>`;
    answersEl.innerHTML = `<button onclick="location.reload()" style="padding: 20px 40px; font-size: 20px; background: #00d900; margin-top: 20px;">PLAY AGAIN</button>`;
}

function explode() {
    loserEl.style.display = "flex";

    playSound(siren);
    playSound(boom);

    setTimeout(() => {
        loserEl.style.display = "none";
        siren.pause();
        siren.currentTime = 0;
        current = 0;
        loadQuestion();
    }, EXPLODE_DURATION);
}
