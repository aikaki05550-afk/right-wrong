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

function loadQuestion() {
    answersEl.innerHTML = "";
    questionEl.textContent = questions[current].q;
    hintText.textContent = "";
    cakeClicks = 0;
    counter.textContent = "0 / 100";

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

}

function explode() {
    loserEl.style.display = "flex";
    boom.currentTime = 0;
    boom.play();

    setTimeout(() => {
        loserEl.style.display = "none";
        current = 0;
        loadQuestion();
    }, 2000);
}

loadQuestion();
