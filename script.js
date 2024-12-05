document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "What is the capital of France?",
            choices: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            correctAnswer: 0
        },
        {
            question: "What is the largest mammal in the world?",
            choices: ["Elephant", "Giraffe", "Blue Whale", "Hippopotamus"],
            correctAnswer: 2
        },
        {
            question: "Who painted the Mona Lisa?",
            choices: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        },
        {
            question: "What is the chemical symbol for gold?",
            choices: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: 2
        }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionEl = document.getElementById("question");
    const choicesEl = document.getElementById("choices");
    const submitBtn = document.getElementById("submit");
    const quizEl = document.getElementById("quiz");
    const resultsEl = document.getElementById("results");
    const scoreEl = document.getElementById("score");
    const restartBtn = document.getElementById("restart");
    const progressBar = document.getElementById("progress-bar");

    function loadQuestion() {
        const question = quizData[currentQuestion];
        questionEl.textContent = question.question;

        // Clear previous choices and set new ones
        choicesEl.innerHTML = "";
        question.choices.forEach((choice, index) => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.classList.add("choice");
            button.addEventListener("click", () => selectChoice(button));
            choicesEl.appendChild(button);
        });

        // Reset submit button
        submitBtn.textContent = "Submit";
        submitBtn.style.display = "none";
    }

    function selectChoice(selected) {
        // Ensure only one choice is selected
        const choices = Array.from(choicesEl.children);
        choices.forEach(choice => choice.classList.remove("selected"));
        selected.classList.add("selected");
        submitBtn.style.display = "block";
    }

    function checkAnswer() {
        const selectedChoice = choicesEl.querySelector(".selected");
        if (!selectedChoice) return;

        const answer = Array.from(choicesEl.children).indexOf(selectedChoice);
        const question = quizData[currentQuestion];

        // Check if answer is correct and display feedback
        if (answer === question.correctAnswer) {
            score++;
            selectedChoice.classList.add("correct");
        } else {
            selectedChoice.classList.add("incorrect");
            choicesEl.children[question.correctAnswer].classList.add("correct");
        }

        // Disable all choices after selecting
        Array.from(choicesEl.children).forEach(choice => (choice.disabled = true));

        currentQuestion++;

        if (currentQuestion < quizData.length) {
            submitBtn.textContent = "Next Question";
        } else {
            submitBtn.textContent = "Show Results";
        }

        progressBar.style.width = `${(currentQuestion / quizData.length) * 100}%`;
    }

    function showResults() {
        quizEl.classList.add("hide");
        resultsEl.classList.remove("hide");
        scoreEl.textContent = `${score} out of ${quizData.length}`;
    }

    submitBtn.addEventListener("click", () => {
        if (submitBtn.textContent === "Submit") {
            checkAnswer();
        } else if (submitBtn.textContent === "Next Question") {
            loadQuestion();
        } else {
            showResults();
        }
    });

    restartBtn.addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        progressBar.style.width = "0%";
        quizEl.classList.remove("hide");
        resultsEl.classList.add("hide");
        loadQuestion();
    });

    loadQuestion();
});
