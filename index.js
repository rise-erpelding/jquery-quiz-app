function handleQuiz() {
    displayQuestion();
    displayFeedback();
    changeScore();
    showQuestionNumber();
    endQuiz();
}

function displayQuestion() {
    console.log('`displayQuestion` ran');
}

function displayFeedback() {
    console.log('`displayFeedback` ran');
}

function changeScore() {
    console.log('`changeScore` ran');
}

function showQuestionNumber() {
    console.log('`showQuestionNumber` ran');
}

function endQuiz() {
    console.log('`endQuiz` ran');
}

$(handleQuiz);