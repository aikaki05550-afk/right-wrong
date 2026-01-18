const clickSound = document.getElementById("clickSound");
const siren = document.getElementById("siren");

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

let current = 0;
let cakeClicks = 0;
const REQUIRED = 100;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const loserEl = document.getElementById("loser");
const boom = document.getElementById("boom");

const cake = document.getElementById("cake");
const counter = document.getElementById("counter");
const hintText = document.getElementById("hintText");
const currentQEl = document.getElementById("currentQ");
const hintBtn = document.getElementById("hintBtn");

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
        btn.onclick = () => {
            clickSound.currentTime = 0;
            clickSound.play();
            checkAnswer(i);
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

function checkAnswer(index) {
    if (index === questions[current].correct) {
        current++;
        if (current < questions.length) {
            loadQuestion();
        } else {
            questionEl.textContent = "YOU WIN 🔥";
            answersEl.innerHTML = "";
        }
    } else {
        explode();
    }
}

function explode() {
    loserEl.style.display = "flex";

    siren.currentTime = 0;
    siren.play();

    boom.currentTime = 0;
    boom.play();

    setTimeout(() => {
        loserEl.style.display = "none";
        siren.pause();
        siren.currentTime = 0;
        current = 0;
        loadQuestion();
    }, 2000);
}