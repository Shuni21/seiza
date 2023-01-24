const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Что такое созвездие?",
        imgSrc : "img/1в.jpg",
        choiceA : "A)Группа звёзд на небе",
        choiceB : "B)Участок неба",
        choiceC : "C)Временное образование звёзд",
        correct : "A"

    },{
        question : "Всегда ли присутствуют звёзды на небе?",
        imgSrc : "img/2в.jpg",
        choiceA : "A)Нет, только ночью",
        choiceB : "B)Всегда ",
        choiceC : "C)В предутренние часы",
        correct : "B"
    },{
        question : "Какая наука изучает созвездия?",
        imgSrc : "img/3в.jpg",
        choiceA : "A)Астрономия",
        choiceB : "B)География",
        choiceC : "C)Физика",
        correct : "A"
      },{
        question : "Жители какой территории могут видеть все звёзды?",
        imgSrc : "img/4в.jpg",
        choiceA : "A)Жители Сибири",
        choiceB : "B)Жители Австралии",
        choiceC : "C)Жители экватора",
        correct : "C"
      },{
        question : "Это созвездие можно увидеть летом и осенью, оно напоминает лебедя с широко раскинутыми крыльями, летящего к Земле. Как оно называется?",
        imgSrc : "img/5в.jpg",
        choiceA : "A)Царевна-Лебедь",
        choiceB : "B)Лебедь",
        choiceC : "C)Лебединая верность",
        correct : "B"
      },{
        question:  "Древний мореплаватель ориентировался…",
        imgSrc : "img/6в.jpg",
        choiceA : "A)По высоте волн",
        choiceB : "B)По звёздам",
        choiceC : "C)По температуре воды",
        correct : "B"
      },{
        question:  "Какое небесное тело второе после Солнце по яркости на нашем небе?",
        imgSrc : "img/7в.jpg",
        choiceA : "A)Полярная звезда",
        choiceB : "B)Звезда Вега",
        choiceC : "C)Луна",
        correct : "C"
      },{
        question:  "Какой прибор используют для наблюдения за звёздами?",
        imgSrc : "img/8в.jpg",
        choiceA : "A)Микроскоп",
        choiceB : "B)Телескоп",
        choiceC : "C)Кинескоп",

        correct : "B"
      },{
        question:  "Угадай созвездие",
        imgSrc : "img/9в.jpg",
        choiceA : "A)Пегас",
        choiceB : "B)Единорог",
        choiceC : "C)Лошадь",

        correct : "A"
      },{
        question:  "Самая яркая звезда в созвездие Ориона",
        imgSrc : "img/10в.jpg",
        choiceA : "A)Арктур",
        choiceB : "B)Сириус",
        choiceC : "C)Бетельгейза",

        correct : "C"
      }
      ,{
        question:  "Какое из созвездии входило Зодикальных созездии?",
        imgSrc : "img/11в.jpg",
        choiceA : "A)Никакое",
        choiceB : "B)Гидра",
        choiceC : "C)Змеиносец",

        correct : "C"
      },{
        question:  "Кто гадает на звёзды?",
        imgSrc : "img/12в.jpg",
        choiceA : "A)Звездочёт",
        choiceB : "B)Астролог",
        choiceC : "C)Астроном",

        correct : "B"
      },{
        question:  "Самые яркая туманность звездного неба?",
        imgSrc : "img/13в.jpg",
        choiceA : "A)Туманность Андромеды",
        choiceB : "B)Туманность Ориона",
        choiceC : "C)Туманность Кольцо",

        correct : "B"
      }
];
// create some variables
const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 300; // 5min
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
// render a question
function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);
    
// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";

    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);

    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}