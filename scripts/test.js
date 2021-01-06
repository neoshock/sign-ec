$(document).ready(function(){
    var nextButton = document.getElementById('next');
    var audioError = document.createElement('audio');
    var audioSuccess = document.createElement('audio');

    audioError.setAttribute("src", "files/sounds/REV-Chiptune FX 07.wav");
    audioSuccess.setAttribute("src", "files/sounds/REV-Chiptune FX 08.wav");

    var answer = [
        {
            id : "hola",
            respuesta : "Hola"
        },
        {
            id : "que-tal",
            respuesta : "Que tal"
        },
        {
            id : "como-te-sientes",
            respuesta : "Como te sientes"
        },
        {
            id : "como-estas",
            respuesta : "Como estas"
        }
    ];

    var correctAnswer = answer[0].respuesta + answer[1].respuesta;

    function answerError(){
        let cotnainer = document.getElementById('container');
        cotnainer.classList.add("container-error");
        audioError.play();
        setTimeout(() => {
            cotnainer.classList.remove("container-error");
        }, 1000);
    }

    function answerCorrect(){
        let cotnainer = document.getElementById('container');
        cotnainer.classList.add("container-success");
        audioSuccess.play();
        setTimeout(() => {
            cotnainer.classList.remove("container-success");
        }, 1000);
    }

    function comprobarAnswer(){
        let respuesta = "";
        let boxAnswer = document.getElementById('boxAnswer');
        let buttons = boxAnswer.getElementsByTagName('button');
        for (let i = 0; i< buttons.length; i++){
            respuesta = respuesta + buttons[i].innerHTML;
        }
        if(respuesta == correctAnswer){
            answerCorrect();
        }else{
            answerError();
        }
    }

    function showContent(){
        $('#loader').fadeOut(1000);
        $('#principal').hide();
        $('#principal').fadeIn(2000);
    }

    function fillContainer(fillAnswers){
        let boxContainer = document.getElementById('questionContainer');
        for (let i = 0; i < fillAnswers.length; i++){
            let button = document.createElement('button');
            button.classList.add('btn');
            button.classList.add('w-25');
            button.classList.add('m-1');
            button.classList.add('btn-outline-secondary');
            button.setAttribute("value",fillAnswers[i].respuesta);
            button.setAttribute("id",fillAnswers[i].id);
            button.innerHTML = fillAnswers[i].respuesta;
            boxContainer.appendChild(button);
            button.addEventListener('click', ()=>{
                $(`#${button.id}`).fadeOut(250);
                colocarBox(button);
            });
        }
    }

    function colocarBox(button){
        let answerContainer = document.getElementById('boxAnswer');
        let boxContainer = document.getElementById('questionContainer');
        let buttonAnswer = document.createElement("button");
        buttonAnswer.classList.add('btn');
        buttonAnswer.classList.add('w-25');
        buttonAnswer.classList.add('m-1');
        buttonAnswer.classList.add('btn-outline-primary');
        buttonAnswer.setAttribute("id",button.id);
        buttonAnswer.innerHTML = button.innerHTML;
        answerContainer.appendChild(buttonAnswer);
        buttonAnswer.addEventListener("click", ()=>{
            $(`#${buttonAnswer.id}`).fadeOut(250);
            boxContainer.appendChild(buttonAnswer);
            $(`#${buttonAnswer.id}`).fadeIn(250);
        });
    }
    nextButton.addEventListener('click', comprobarAnswer);
    showContent();
    fillContainer(answer);
});