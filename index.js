"use strict";

//These variables keep track of the question index and number
let questionIndex = 0;
let questionNumber = questionIndex + 1;

function displayQuestion(item) {
    //This function is responsible for displaying the question each time
    console.log("Displaying the question");
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
                <input type="radio" id="answerA" name="answer" value="a"><label for="answerA">  ${item[questionIndex]["answerOptions"][0]}</label>
            </li>
            <li>
                <input type="radio" id="answerB" name="answer" value="b"><label for="answerB">   ${item[questionIndex]["answerOptions"][1]}</label>
            </li>
            <li>
                <input type="radio" id="answerC" name="answer" value="c"><label for="answerC">  ${item[questionIndex]["answerOptions"][2]}</label>
            </li>
            <li>
            <input type="radio" id="answerD" name="answer" value="d"><label for="answerD">  ${item[questionIndex]["answerOptions"][3]}</label>
            </li>
        </ul>
        <button type="submit" class="retrieve-feedback">submit</button>
    </form>
    </section>`;
}

function handleQuestion() {
    //This function will be responsible for displaying the question, multiple choice answers, and example
    $('#content-box').on('click', `.begin`, function() {
        $('.quiz-description').remove();
        $('.begin').remove();
        const question = displayQuestion(STORE);
        $('#content-box').html(question);
        console.log('`handleQuestion` ran');
    });

}

function displayFeedback() {
    //This function will be responsible for handling whether the feedback for the correct answer or the feedback for the incorrect answer is displayed
        // let selectedAnswer = $('input:checked');
        // let correctAnswer = STORE[questionIndex]["correctAnswer"];
        // if (selectedAnswer === correctAnswer) {
        //     $('#content-box').html(`<p>Hello world</p>`)
        // }
    $('#content-box').html(`<p>Feedback would be displayed here.</p>`)
    console.log('`displayFeedback` ran');
}

function submitAnswer() {
    //This function will be responsible for submitting the answer
    $('#question-form').submit(function(event) {
        event.preventDefault();
        $('.quiz-description').remove();
        $('.begin').remove();
        displayFeedback();
    });
    console.log('`submitAnswer` ran');
}

function changeScore() {
    //This function will be responsible for changing the number of correct answers in the header
    console.log('`changeScore` ran');
}

function showQuestionNumber() {
    //This function will be responsible for changing the number of the question in the header
    console.log('`showQuestionNumber` ran');
}

function endQuiz() {
    //This function will be responsible for displaying end-of-quiz feedback and telling the user how to play again
    console.log('`endQuiz` ran');
}

function handleQuiz() {
    handleQuestion();
    submitAnswer();
    changeScore();
    showQuestionNumber();
    endQuiz();
}

$(handleQuiz);