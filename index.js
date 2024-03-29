"USE STRICT";


//These variables keep track of the question index and number
let questionIndex = 0;
let questionNumber = questionIndex + 1;
let numberCorrect = 0;
let incorrectAnswers = [];

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
        displayFeedback();
    });
    console.log('`submitAnswer` ran');
}


function displayQuestion(item) {
    //This function is responsible for displaying the question each time
    console.log("Displaying the question");
    showQuestionNumber();//potentially move this? should it be in displayQuestion or handleQuestion above submitAnswer? Or does it matter?
    testFunction();
    return `
    <section class="question-box">
    <p class="instructions content">
    Instructions: Select the definition that best describes the word below.
    </p>
    <h2 class="word content">${item[questionIndex]["question"]}</h2>
    <section class="in-a-sentence">
        <h3>In a sentence:</h3>
        <section class="example content">
            <blockquote class="sentence content">${item[questionIndex]["exampleSentence"]}</blockquote><cite class="source content">${item[questionIndex]["exampleSource"]}</cite>
        </section>
    </section>
    <form role="form" id="question-form">
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


//not working right
function testFunction() {
    $('.in-a-sentence').html(`<p>This is a test paragraph</p>`);
    console.log('the test function is working');
}

function correctFeedback() {
    $('#content-box').html(`<h3 class="correct-incorrect">Correct!</h3><p class="feedback"><span class="capitalize">${STORE[questionIndex]["question"]}</span> is defined as ${STORE[questionIndex]["correctAnswer"]}.
    
    <h3 class="in-a-sentence">In a sentence:</h3>
    <section class="example content">
        <blockquote class="sentence content">${STORE[questionIndex]["exampleSentence"]}</blockquote><cite class="source content">${STORE[questionIndex]["exampleSource"]}</cite></p></section>
    <button role="button" class="Next">Next</button>`);
    console.log('`correctFeedback` ran');
    changeScore();
    nextQuestion();
}

function incorrectFeedback() {
    $('#content-box').html(`<h3 class="correct-incorrect">Incorrect.</h3><p class="feedback"><span class="capitalize">${STORE[questionIndex]["question"]}</span> is defined as ${STORE[questionIndex]["correctAnswer"]}.
    
    <h3 class="in-a-sentence">In a sentence:</h3>
    <section class="example content">
        <blockquote class="sentence content">${STORE[questionIndex]["exampleSentence"]}</blockquote><cite class="source content">${STORE[questionIndex]["exampleSource"]}</cite></p></section>
    <button role="button" class="Next">Next</button>`);
    holdIncorrectAnswers();
    nextQuestion();
    console.log('`incorrectFeedback` ran');
    //note to self: expand upon this to give better feedback later.
}

function holdIncorrectAnswers() {
    incorrectAnswers.push(STORE[questionIndex]["question"]);
    console.log('pushing to incorrect answers');
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

function nextQuestion() {
    questionIndex ++;
    questionNumber ++;
    if (questionIndex < STORE.length) {
        $('#content-box').on('click', `.Next`, function() {
            const question = displayQuestion(STORE);
            $('#content-box').html(question);
            submitAnswer();
            console.log("The next button is working");
        });
    } else {
        endQuiz();
    }
    console.log('`nextQuestion` ran');
}



function changeScore() {
    //This function will be responsible for adding one point to the current score
    numberCorrect ++;
    $('.your-score').text(numberCorrect);
    console.log('`changeScore` ran');
}

function showQuestionNumber() {
    //This function will be responsible for changing the number of the question in the header
    $('.question-number').text(questionNumber);
    console.log('`showQuestionNumber` ran');
}

function endQuiz() {
    //This function will be responsible for displaying end-of-quiz feedback and telling the user how to play again
    $('#content-box').html(`<p>Your score is ${numberCorrect}/10</p><button role="button" class="restart">Start New Quiz</button>`);
    console.log('`endQuiz` ran');
    restartQuiz();
    return;
}

function restartQuiz() {
    $('#content-box').on('click', `.restart`, function() {
        questionIndex = 0;
        questionNumber = questionIndex + 1;
        numberCorrect = 0;
        incorrectAnswers = [];
        const question = displayQuestion(STORE);
        $('#content-box').html(question);
        submitAnswer();
        console.log("restart button pushed");
    });
}

function handleQuiz() {
    handleQuestion();
}

$(handleQuiz);