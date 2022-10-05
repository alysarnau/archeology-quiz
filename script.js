// quiz class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrectAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }

    isEnded() {
        return this.questionIndex === this.questions.length;
    }
}

class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrectAnswer(choice) {
        return this.answer === choice;
    }
}

function displayQuestion() {
    if (quiz.isEnded()) {
        showScore();
    } else {
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
}

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
}

function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let progressElement = document.getElementById("progress")
    progressElement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`
}

function showScore() {
    let quizEndHTML = 
        `
            <h1>Quiz Completed!</h1>
            <h2 id="score">Your Score: ${quiz.score} of ${quiz.questions.length}</h2>
            <div class="quiz-repeat">
                <a href="index.html">Play Again?</a>
            </div>
        `;
    let quizElement = document.getElementById("quiz")
    quizElement.innerHTML = quizEndHTML
}

let questions = [
    new Question(
        "One of the most important archeological sites is Pompeii. What happened in 79 AD that caused so many artifacts to be preserved?", ["Artists created mini-replicas", "A tsunami washed away all the dirt", "The city was preserved under volcanic ash", "Someone left a note not to disturb anything and people listened"], "The city was preserved under volcanic ash"
    ),
    new Question(
        "Can you name the famous slab, originally discovered in Egypt, that has text from three different languages inscribed on it?", ["Camera Obsura", "Tablet of Babel", "Rosetta Stone", "Valun Rock"], "Rosetta Stone"
    ),
    new Question(
        "Discovered in Shanxi, a province in Central China, were ancient artifacts made out terra cotta. What was their shape?", ["Dragons", "Warriors", "Brewery Pots", "Birds in Flight"], "Warriors"
    ),
    new Question(
        "The Antikythera Mechanism was discovered on an island in the southern Aegean sea in about 1900 and is estimated to be about 2000 years old. Of the following functions, which one is LEAST LIKELY to be one the mechanism had?", ["Tracking the cycle of Olympiad Games", "Predicting the movement of the Planets", "Tuning a Lyre", "Predicting Eclipses"], "Tuning a Lyre"
    ),
    new Question(
        "Otzi is a most interesting find - a mummy of a man who lived sometime between 3400 and 3100 BC was found in the Alps in 1991. He had a myriad of artifacts that were preserved in the ice with him. Which of the following would NOT be one of Otzi's artifacts?", ["A Walkman", "Firestarting Supplies", "Medicinal Herbs",  "Arrow-Repair Supplies"], "A Walkman"
    )
]

let quiz = new Quiz(questions);
displayQuestion();

let time = 5;
let quizTimeInMinutes = time * 60 * 60
quizTime = quizTimeInMinutes/60;

let counting = document.getElementById("countdown")

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScore();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60)
            let min = Math.floor((quizTime / 60) % 60)
            counting.innerHTML = `Time: ${min}:${sec}`
        }
    }, 1000) 
}

startCountdown();