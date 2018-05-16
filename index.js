'use strict'

//Defines important varibles
let numQuestions = STORE.length;
let questionNumber = 0;
let score = 0;

//Quiz
function renderQuestion() {
    //Defines imporant varibles
    let questionObject = STORE[questionNumber];
    let question = questionObject.question;
    let answers = questionObject.answers;
    let correctAnswer = questionObject.correctAnswer;

    //renders question
    $('.questionNumber').text(questionNumber + 1); //offsets the 0 within the array
    $('.score').text(score);
    $('.questionAnswerForm').html(`
        <div class="question-${questionNumber}">
            <h2>${question}</h2>
            <form>
                <fieldset>
                    <legend>Choose Wisely</legend>
                    <label class="answerOption">
                        <input type="radio" value="${answers[0]}" name="answer" required>
                        <span>${answers[0]}</span>
                    </label>
                    <label class="answerOption">
                        <input type="radio" value="${answers[1]}" name="answer" required>
                        <span>${answers[1]}</span>
                    </label>
                    <label class="answerOption">
                        <input type="radio" value="${answers[2]}" name="answer" required>
                        <span>${answers[2]}</span>
                    </label>
                    <label class="answerOption">
                        <input type="radio" value="${answers[3]}" name="answer" required>
                        <span>${answers[3]}</span>
                    </label>
                    <button type="submit" class="submitButton">Submit</button>
                </fieldset>
            </form>
        </div>`);

    //Sets up event listeners 
    $('.questionAnswerForm form').on('submit', function(event) {
        event.preventDefault();
        let selected = $('input:checked');
        let answer = selected.val();
        renderAnswerResponse(answer);
    })
}

function renderAnswerResponse(answer) {
    //Defines important varibles
    let questionObject = STORE[questionNumber];
    let correctAnswer = questionObject.correctAnswer;

    //Renders response to users answer choice
    //boolean check to see if answer is correct or not
    if (answer === correctAnswer) {
        score++;
        $('.score').text(score); //increases user score
        $('.questionAnswerForm').html(`
        <div class="correctAnswer">
            <p><b>Correct! Great job!</b></p>
            <button type=button class="nextButton">Next</button>
        </div>`) //gives notification that choice was correct
    } else {
        $('.questionAnswerForm').html(`
        <div class="correctAnswer">
            <p><b>Sorry, that's incorrect!</b> 
            The correct answer is <span>"${correctAnswer}"</span></p>
            <button type=button class="nextButton">Next</button>
        </div>`) 
    } //gives notification that choice was incorrect and reveals the right answer

    //sets up event listener for next button
    $('.nextButton').on('click', function(event) {
        event.preventDefault();
        questionNumber++; //increases question number

        if (questionNumber < numQuestions)
            renderQuestion(); //takes user to the next question
        else 
            renderScore(); //takes user to results page
    });
}

function renderScore() {
    //renders the results page 
    //sets up boolean condition on user's score
    $('.quizInfo').hide(); 
    //hides the quiz info because the information is on the main
    if (score >= 7)
        $('.questionAnswerForm').html(`
        <div class="results correctAnswer">
            <h3>Excellent work!</h3>
            <p>You got ${score} / 10</p>
            <p>You are on your way on becoming a coffee master!</p>
            <button class="restartButton">Restart Quiz</button>
        </div>`)
    else 
        $('.questionAnswerForm').html(`
        <div class="results correctAnswer">
            <h3>You may want to do some more coffee tastings</h3>
            <p>You got ${score} / 10</p>
            <p>With more research and experience, you can continue your coffee journey towards mastery!
            <button class="restartButton">Restart Quiz</button>
        </div>`)

    //Sets up event listerns for quiz restart
    $('.restartButton').on('click', function(event) {
        score = 0;
        questionNumber = 0;
        //this allows us to take the user back to the first question
        $('.quizInfo').show();
        renderQuestion();
    });
}

//renders quiz on page load
function startQuiz() {
    $('.startButton').on('click', function(event) {
        $('.quizInfo').show();
        renderQuestion();
    });
}

$(startQuiz);