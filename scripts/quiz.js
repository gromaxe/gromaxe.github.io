let currentQuestion = {};
let availableQuestions = [];

fetch('questions.json')
    .then(res => res.json())
    .then(loadedQuestions => {
        availableQuestions = loadedQuestions;
        nextQuestion();
    });

function nextQuestion() {
    if (availableQuestions.length === 0) {
        alert("Больше нет вопросов!");
        return;
    }

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];

    document.getElementById('question').innerText = currentQuestion.question;

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';
    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.value = option.charAt(0); // Предполагается, что варианты начинаются с 'a)', 'b)', и т.д.
        button.onclick = selectOption;
        optionsDiv.appendChild(button);
    });

    availableQuestions.splice(questionIndex, 1); // Удаляем вопрос из пула
}

function selectOption(event) {
    const selectedOption = event.target.value;
    const resultElement = document.getElementById('result');

    if (selectedOption === currentQuestion.answer) {
        resultElement.innerText = "Правильно!";
    } else {
        resultElement.innerText = "Неправильно! Правильный ответ был: " + currentQuestion.options[currentQuestion.answer.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
}

function checkAnswer() {
    nextQuestion();
}
