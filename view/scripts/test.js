$(document).ready(function(){
    var img_select;
    var nextButton = document.getElementById('next');
    var audioError = document.createElement('audio');
    var audioSuccess = document.createElement('audio');

    audioError.setAttribute("src", "files/sounds/REV-Chiptune FX 07.wav");
    audioSuccess.setAttribute("src", "files/sounds/REV-Chiptune FX 08.wav");

    var questionImg = [
        {
            id: 'numero-1',
            image_file: 'files/tests/numeros/uno.png',
            respuesta: 'numero-1'
        },
        {
            id: 'numero-2',
            image_file: 'files/tests/numeros/dos.png',
            respuesta: 'numero-2'
        },
        {
            id: 'numero-3',
            image_file: 'files/tests/numeros/tres.png',
            respuesta: 'numero-3'
        },
        {
            id: 'numero-4',
            image_file: 'files/tests/numeros/cuatro.png',
            respuesta: 'numero-4'
        }
    ];

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

    function fill_images(){
        let box_answer = document.getElementById('box-images');
        let image_button = [];
        for (let i = 0; i < questionImg.length; i++){
            image_button[i] = document.createElement('img');
            image_button[i].classList.add('question-img');
            image_button[i].setAttribute("alt",questionImg[i].respuesta);
            image_button[i].setAttribute("id",questionImg[i].id);
            image_button[i].setAttribute('src',questionImg[i].image_file);
            box_answer.appendChild(image_button[i]);
            image_button[i].addEventListener('click', ()=>{
                let index = i;
                img_select = image_button[i];
                console.log(img_select);
                addClassRemove(image_button, index);
            });
        }
    }

    function addClassRemove(images_btn, index){
        for (let i = 0; i< images_btn.length; i++){
            images_btn[i].classList.remove('image-selected');
        }
        images_btn[index].classList.add('image-selected');
    }

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

        if (correctAnswer == respuesta){
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
    fill_images();
});