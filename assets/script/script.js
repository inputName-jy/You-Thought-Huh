var startButton = document.querySelector('#start-button');
var highScoreLink = document.querySelector('header');

var displayArea = document.getElementById('questionBox');
var optionsArea = document.getElementById('optionsBox');
var retakeArea = document.getElementById('retakeBox');
var saveArea = document.getElementById('initialBox');

var timerDisplay = document.getElementById('timerBox');
var time = 120;

var score = 0;
var highScores = getLocalStorage();
function getLocalStorage() {
    var temp = JSON.parse(localStorage.getItem('highscores'));
    if (temp === null) {
        temp = [];
    }
    return temp;
}

var quizQuestions = [
    questionOne = {
        question: 'What type of language is JavaScript?',
        choices: ['Object-Oriented', 'Object-Based', 'Procedural', 'None'],
        correctChoice: 'Object-Oriented',
    },
    questionTwo = {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        choices: ['var', 'let', 'Both "var" and "let"', 'None'],
        correctChoice: 'Both "var" and "let"',
    },
    questionThree = {
        question: 'Which of the following methods can be used to display data in some form using Javascript?',
        choices: ['document.write()', 'console.log()', 'window.alert()', 'All'],
        correctChoice: 'All',
    },
    questionFour = {
        question: 'How can a datatype be declared to be a constant type?',
        choices: ['const', 'var', 'let', 'All'],
        correctChoice: 'const',
    },
    questionFive = {
        question: 'The "function" and " var" are known as:',
        choices: ['Keywords', 'Data Types', 'Declaration Statements', 'Prototypes'],
        correctChoice: 'Declaration Statements',
    }
];

function saveScore() {

    var form = document.createElement('form');
    var input = document.createElement('input');
    var submit = document.createElement('input');
    var submitDone = document.createElement('h4');

    form.id = 'save-form'

    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '2');
    input.setAttribute('placeholder', 'Your Initials');
    input.id = 'initials-input';

    submit.setAttribute('type', 'submit')
    submit.setAttribute('value', 'Save');
    submit.textContent = 'Save';
    submit.id = 'submit-button';

    submitDone.textContent = 'Score submitted!'

    saveArea.append(form);
    form.appendChild(input);
    form.appendChild(submit);

    document.getElementById('save-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var home = document.createElement('button');
        var quizScore = {
            initials: `${input.value}`,
            savedScore : `${Math.trunc(score)}`
        };

        home.textContent = 'Home'

        highScores.push(quizScore);

        localStorage.setItem('highscores', JSON.stringify(highScores));

        
        console.log(highScores);
        input.value = '';
        saveArea.textContent = ' ';
        saveArea.append(submitDone);

    })
};

function retakeQuiz() {
   
    var retake = document.createElement('button');

    retake.id = 'retake';
    retake.textContent = 'Try Again';
    
    retakeArea.appendChild(retake);
        retake.addEventListener('click', function() {
            clearTimeout(quizDone)
            highScoreLink.hidden = true;
            time = 120;
            score = 0;
            retakeArea.textContent = ' ';
            saveArea.textContent = ' ';
            startQuiz();
        });
};

function finishQuiz() {
    var done = document.createElement('h1');
    var scoreDisplay = document.createElement('h2');

    done.textContent = 'Done!';
    scoreDisplay.textContent = `You scored ${Math.trunc(score)} points!`;

    clearTimeout(start);
    clearInterval(quizTimer);

    quizDone = setTimeout(function () {

        highScoreLink.hidden = false;

        timerDisplay.textContent = ' ';
        
        displayArea.textContent = ' ';
        optionsArea.textContent = ' ';
        displayArea.append(done);
        displayArea.append(document.createElement('br'));
        displayArea.append(scoreDisplay);

        retakeQuiz();
        saveScore();

    }, 2000);


};

function checkAnswer(questionNum) {
    for (var i = 0; i < quizQuestions[questionNum].choices.length; i++) {
        
        var answerChoice = document.getElementById(`options${[i]}`);
        
        answerChoice.addEventListener('click', function (event) {
            event.preventDefault();
            if (this.textContent === quizQuestions[questionNum].correctChoice && questionNum + 1 !== quizQuestions.length) {

                var result = document.createElement('h3');
                result.textContent = 'Correct!'
                optionsArea.textContent = ' ';
                optionsArea.append(result);

                score = score + 2 * time/5

                if (time > 0) {
                    nextQuestion = setTimeout(function () {

                        displayArea.textContent = ' ';
                        optionsArea.textContent = ' ';
                        giveQuestion(questionNum + 1);
    
                    }, 1000);
                };

            } else if (this.textContent !== quizQuestions[questionNum].correctChoice && questionNum + 1 !== quizQuestions.length) {

                var result = document.createElement('h3');
                result.textContent = 'Wrong!';
                optionsArea.textContent = ' ';
                optionsArea.append(result);

                clearInterval(quizTimer);
                time = time - 20;
                startTimer();

                if (time > 0) {
                    nextQuestion = setTimeout(function () {

                        displayArea.textContent = ' ';
                        optionsArea.textContent = ' ';
                        giveQuestion(questionNum + 1);
    
                    }, 1000);
                };
                
            } else if (this.textContent === quizQuestions[questionNum].correctChoice && questionNum + 1 === quizQuestions.length) {

                var result = document.createElement('h3');
                result.textContent = 'Correct!';
                optionsArea.textContent = ' ';
                optionsArea.append(result);

                score = score + 2 * time/5

                finishQuiz();
            
            } else if (this.textContent !== quizQuestions[questionNum].correctChoice && questionNum + 1 === quizQuestions.length) {

                var result = document.createElement('h3');
                result.textContent = 'Wrong!';
                optionsArea.textContent = ' ';
                optionsArea.append(result);

                finishQuiz();
            };
        });
    };
};

function giveAnsChoices(questionNum) {

    for (var i = 0; i < quizQuestions[questionNum].choices.length; i++) {

        var choiceBtn = document.createElement('button');
        choiceBtn.id = `options${[i]}`;
        choiceBtn.textContent = quizQuestions[questionNum].choices[i];
        optionsArea.append(choiceBtn);

    };

    checkAnswer(questionNum);

};

function giveQuestion(questionNum) {

    var questionGiven = document.createElement('h2');

    questionGiven.textContent = quizQuestions[questionNum].question;
    displayArea.append(questionGiven);

    giveAnsChoices(questionNum);

};

function startTimer() {

    quizTimer = setInterval(function () {

        time--;
        timerDisplay.textContent = `${time} seconds remaining`;

        if (time <= 0) {

            clearTimeout(start);
            clearInterval(quizTimer);
           
            timerDisplay.textContent = ' ';

            var timesUp = document.createElement('h1');
            timesUp.textContent = 'Times Up!';
            displayArea.textContent = ' ';
            optionsArea.textContent = ' ';
            displayArea.append(timesUp);
            finishQuiz();

        };

    }, 1000);

}
;
function startQuiz() {

    highScoreLink.hidden = true;
    displayArea.textContent = ' ';
    start = setTimeout(giveQuestion(0), 0);
    startTimer();

};

startButton.addEventListener('click', startQuiz);

