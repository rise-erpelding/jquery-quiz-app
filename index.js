"USE STRICT";

//These variables keep track of the question index and number
let questionIndex = 0;
let questionNumber = questionIndex + 1;
let numberCorrect = 0;

function handleQuestion() {
    //This function will be responsible for displaying the question, multiple choice answers, and example, and submitting the answer
    $('#content-box').on('click', `.begin`, function() {
        $('.quiz-description').remove();
        $('.begin').remove();
        const question = displayQuestion(STORE);
        $('#content-box').html(question);
        submitAnswer();
        console.log('`handleQuestion` ran');
    });


}

function submitAnswer() {
    //This function will be responsible for submitting the answer
    $('#question-form').submit(function(event) {
        event.preventDefault();
        console.log("submit button is working");
        // Delete 2 lines below
        // $('.quiz-description').remove();
        // $('.begin').remove();
        displayFeedback();
    });
    console.log('`submitAnswer` ran');
}


function displayQuestion(item) {
    //This function is responsible for displaying the question each time
    console.log("Displaying the question");
    showQuestionNumber();//potentially move this? should it be in displayQuestion or handleQuestion above submitAnswer? Or does it matter?
    return `
    <section class="question-box">
    <p class="instructions content">
    Instructions: Select the definition that best describes the word below.
    </p>
    <h2 class="word content">${item[questionIndex]["question"]}</h2>
    <section>
        <h3>In a sentence:</h3>
        <p class="sentence content">${item[questionIndex]["exampleSentence"]}<br>--${item[questionIndex]["exampleSource"]}</p>
    </section>
    <form id="question-form">
        <ul class="answers content">
            <li>
                <input type="radio" id="answerA" name="answer" value="${item[questionIndex]["answerOptions"][0]}"><label for="answerA">  ${item[questionIndex]["answerOptions"][0]}</label>
            </li>
            <li>
                <input type="radio" id="answerB" name="answer" value="${item[questionIndex]["answerOptions"][1]}"><label for="answerB">   ${item[questionIndex]["answerOptions"][1]}</label>
            </li>
            <li>
                <input type="radio" id="answerC" name="answer" value="${item[questionIndex]["answerOptions"][2]}"><label for="answerC">  ${item[questionIndex]["answerOptions"][2]}</label>
            </li>
            <li>
            <input type="radio" id="answerD" name="answer" value="${item[questionIndex]["answerOptions"][3]}"><label for="answerD">  ${item[questionIndex]["answerOptions"][3]}</label>
            </li>
        </ul>
        <input type="submit" class="sbmt"></input>
    </form>
    </section>`;
    //Note to self: this is messy to look at, find a way to clean up later
}

function correctFeedback() {
    $('#content-box').html(`<p>You picked the correct answer</p>`);
    console.log('`correctFeedback` ran');
}

function incorrectFeedback() {
    $('#content-box').html(`<p>You picked the wrong answer</p>`);
    console.log('`incorrectFeedback` ran');
}

function displayFeedback() {
    //This function will be responsible for handling whether the feedback for the correct answer or the feedback for the incorrect answer is displayed
        let selectedAnswer = $('input:checked').val();
        let correctAnswer = STORE[questionIndex]["correctAnswer"];

        if (selectedAnswer === correctAnswer) {
            correctFeedback();
        } else {
            incorrectFeedback();
        }
    console.log('`displayFeedback` ran');
}



function changeScore() {
    //This function will be responsible for changing the number of correct answers in the header
    console.log('`changeScore` ran');
}

function showQuestionNumber() {
    //This function will be responsible for changing the number of the question in the header
    $('.question-number').replaceWith(questionNumber);
    console.log('`showQuestionNumber` ran');
}

function endQuiz() {
    //This function will be responsible for displaying end-of-quiz feedback and telling the user how to play again
    console.log('`endQuiz` ran');
}

function handleQuiz() {

    handleQuestion();
    changeScore();
    showQuestionNumber();
    endQuiz();
}

$(handleQuiz);