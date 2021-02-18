var theTestContent;
var theTestLenght;
var correctAnswer;
var progress;
var currentProgress = 0;
var currentInterval = 0;
var onIndex = 0;
var onConfig = "";
var onAnswer;

    function inicializador (){
        theTestContent = null;
        theTestLenght = null;
        correctAnswer = null;
        progress = document.getElementById('progress-bar');
        currentProgress = 0;
        currentInterval = 0;
        onIndex = 0;
        onConfig = "";
    }

    function insertTest(config) {
        $(".loader-container").animate({
            opacity: 0,
            display: "none"
        },500);
        if (config.typeTest == "img-select"){
            theTestContent = generateContentOne(config);
        }else if(config.typeTest == "select-answer"){
            theTestContent = generateContentTwo(config);
        }else if(config.typeTest == "words-select"){
            theTestContent = generateContentThree(config);
        }
        onConfig = config;
    }

    function generateContentOne(testOne){
        let divParent = document.createElement('div');
        let contentTitle = `<h5 class="fs-2 m-3 text-secondary text-center">${testOne.titleTest}</h5>`;
        let divChildren = document.createElement('div');
        
        correctAnswer = testOne.answer;

        divParent.classList.add('test-1');
        divParent.classList.add('w-100');
        divChildren.classList.add('images');
        divChildren.classList.add('w-100');
        divChildren.classList.add('d-flex');

        divChildren.setAttribute('id','box-images');

        divParent.innerHTML = contentTitle;
        divParent.appendChild(divChildren);

        for(let i =0; i< testOne.images.length; i++){
            let imgInput = `<input class="img" type="image" id="${testOne.images[i].name}" value="${testOne.images[i].value}" src="${testOne.images[i].file}">`;
            divChildren.innerHTML += imgInput;
        }
        return divParent;
    }

    function generateContentTwo(testTwo){
        let divParent = document.createElement('div');
        let divSonOne = document.createElement('div');
        let divSonTwo = document.createElement('div');
        let divSonOnThre = document.createElement('div');

        let contentTitle = `<h5 class="fs-2 m-3 text-secondary text-center">${testTwo.titleTest}</h5>`;

        divParent.classList.add('test-2');
        divParent.classList.add('row');
        divParent.classList.add('justify-content-center');

        divSonOne.classList.add('col-md-12');
        divSonOne.innerHTML = contentTitle;
        divParent.appendChild(divSonOne);

        divSonTwo.classList.add('col-md-4');
        divSonTwo.classList.add('align-self-center');

        let imgContent = `<img class="w-75" src="${testTwo.fileImg}" alt="">`;
        divSonTwo.innerHTML = imgContent;
        divParent.appendChild(divSonTwo);

        divSonOnThre.classList.add('col-md-4');
        divSonOnThre.classList.add('align-self-center');
        divSonOnThre.setAttribute('id','box-options');

        for(let i=0; i< testTwo.options.length; i++){
            let checkImput = `<div class="w-100 check-answer form-check">
                <input type="radio" value="${testTwo.options[i].value}" class="btn-check" id="${testTwo.options[i].name}">
                <label class="btn w-100" for="${testTwo.options[i].name}">${testTwo.options[i].title}</label>
            </div>`;
            divSonOnThre.innerHTML += checkImput;
        }

        divParent.appendChild(divSonOnThre);

        correctAnswer = testTwo.answer;

        return divParent;
    }

    function putContent(button, container){
        var answer = "";
        if(container[0] != undefined){
            container[0].appendChild(button);
        }else{
            container.appendChild(button);
        }
    }

    function generateContentThree(testThree){
        let divParent = document.createElement('div');
        let divSonOne = document.createElement('div');
        let divSonTwo = document.createElement('div');
        let divSonOnThre = document.createElement('div');

        let contentTitle = `<h5 class="fs-2 m-3 text-secondary text-center">${testThree.titleTest}</h5>`;

        divParent.classList.add('test-3');
        divParent.classList.add('w-100');
        divParent.innerHTML = contentTitle;

        divSonOne.classList.add('w-100');
        let divSonOneChildren = document.createElement('div');

        divSonOneChildren.classList.add('img-content');
        divSonOneChildren.classList.add('w-50');
        divSonOneChildren.classList.add('d-flex');

        for (let i =0; i< testThree.fileImgs.length; i++){
            let imgWord = `<img class="img-word" src="${testThree.fileImgs[i].file}" alt="${testThree.fileImgs[i].name}">`;
            divSonOneChildren.innerHTML += imgWord;
        }

        divSonOne.appendChild(divSonOneChildren);
        divParent.appendChild(divSonOne);

        divSonTwo.classList.add('word-content');
        divSonTwo.classList.add('rounded');

        divParent.appendChild(divSonTwo);


        divSonOnThre.classList.add('words');
        divSonOnThre.classList.add('mx-auto');
        divSonOnThre.classList.add('w-50');
        divSonOnThre.setAttribute('id','word-box');

        for(let i =0; i< testThree.wordOptions.length; i++){
            let buttonWord = `<button class="btn btn-colors" value="${testThree.wordOptions[i].value}">${testThree.wordOptions[i].name}</button>`;
            divSonOnThre.innerHTML += buttonWord;
        }

        divParent.appendChild(divSonOnThre);

        correctAnswer = testThree.answer;

        function randonColors(){
            let colorOne,colorTwo,colorThree;
            colorOne = Math.floor(Math.random()*255);
            colorTwo = Math.floor(Math.random()*255);
            colorThree = Math.floor(Math.random()*255);
            let rgb = `border: 3px solid rgb(${colorOne},${colorTwo},${colorThree})`;
            return rgb;
        }

        return divParent;
    }

    function checkAnswer(correct, present){
        if(correct === present){
            audioEvent("correct");
            $("#test .container").addClass("correct-answer");
            setTimeout(() => {
                $("#test .container").removeClass("correct-answer");
            }, 500);
            currentProgress += currentInterval;
            progress.toggleAttribute('aria-valuenow',`${currentProgress}`);
            progress.style.width = `${currentProgress}%`;
            if(currentProgress > 100){
                congratulationTest();
            }
            return true;
        }else{
            audioEvent("incorrect");
            $("#test .container").addClass("incorrect-answer");
            setTimeout(() => {
                $("#test .container").removeClass("incorrect-answer");
            }, 500);
            return false;
        }
    }

    function showAnswer(testElement,buttonNext,buttonJump){
        buttonNext.setAttribute("disabled","true");
        buttonJump.setAttribute("disabled","true");
        var testContainer = document.getElementById('answer');
        var buttonElement = `<button id="showDialog" type="button" class="btn btn-danger fs-4" data-bs-toggle="modal" data-bs-target="#modalRespuesta">Ver respuesta</button>`;
        testContainer.innerHTML = buttonElement;
        if(testElement.typeTest == "img-select"){
            let imgAnswer = "";
            for(let i = 0; i< testElement.images.length; i++){
                if(testElement.images[i].value == testElement.answer){
                    imgAnswer = `<img src="${testElement.images[i].file}" class="d-flex w-50 mx-auto" alt="${testElement.images[i].value}">`;
                }
            }
            testContainer.innerHTML += generateFeedbackContent(imgAnswer);
        }else if(testElement.typeTest = "select-answer"){
            testContainer.innerHTML += generateFeedbackContent(testElement.answer);
        }else{
            testContainer.innerHTML += generateFeedbackContent('La respuesta correcta es 2');
        }
    }

    function nextQuestion(functionReload,buttonNext,buttonJump){
        $('#answer button').each((index, element)=>{
            $(element).click(function(){
                if(element.classList[1] == "btn-success" || element.classList[0] == "btn-close"){
                    buttonNext.removeAttribute("disabled");
                    buttonJump.removeAttribute("disabled");
                    $(".loader-container").animate({
                        opacity: 100,
                        display: "block"
                    },500);
                    $('#answer').hide(100);
                    functionReload();
                }
            });
        });
    }

    function generateFeedbackContent(theContent){
        var title = "Respuesta correcta";
        var htmlContent = `<div class="modal fade" id="modalRespuesta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
                <div class="modal-body">
                    ${theContent}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Entendido</button>
                </div>
            </div>
            </div>
        </div>`;
        return htmlContent;
    }

    function congratulationTest(){
        $(".loader-container").animate({
            opacity: 0,
            display: "none"
        },500);
        $('#test .container').fadeOut(500);
        var theTest = document.getElementById('test');
        var audio = document.createElement('audio');
        var divButton = document.createElement('div');
        audio.setAttribute("src","files/sounds/Win-Sound.wav");

        let buttonNext = `<button id="nextState" class="btn btn-secondary fs-4">Continuar</button>`;
        let divFather = document.createElement('div');
        let character = document.createElement('div');
        let winText = document.createElement('div');

        divFather.classList.add('win-container');
        character.classList.add("character");
        winText.classList.add("win-screen");
        divButton.classList.add('continue');
        
        divButton.innerHTML = buttonNext;
        winText.innerHTML = "Felicitaciones";
        divFather.appendChild(character);
        divFather.appendChild(winText);
        divFather.appendChild(divButton);
        theTest.appendChild(divFather);
        $(".win-container").hide();
        setTimeout(function(){
            $(".win-container").fadeIn(1000);
            audio.play();
            $('.win-container #nextState').on('click', function(){
                $("[href='test1']").trigger("click");
            }); 
            setPointsLocalStorage();
        },1000);
    }

    function setPointsLocalStorage(){
        var points = parseInt(localStorage.points);
        points = 15;
        localStorage.points = parseInt(localStorage.points) + points;
    }

    function audioEvent(current){
        var audioElement = document.createElement('audio');
        if(current == "correct"){
            audioElement.setAttribute("src","files/sounds/REV-Chiptune FX 08.wav");
        }else{
            audioElement.setAttribute("src","files/sounds/REV-Chiptune FX 07.wav");
        }
        audioElement.play();
    }



$('#test').ready(function(){
    console.log('se hace la llamada');
    const testContent = document.getElementById('testContent');
    var dataTestConfig;
    var mainTest;
    var randomArray = [];
    var counter = 0;

    var nextButton = document.getElementById('next');
    var jumpButton = document.getElementById('jump');

    inicializador();

    function loadTest(){
        $.ajax({
            url: questionJsonFile,
            dataType: "json",
            async: false
        }).done(function(data){
            onAnswer = null;
            dataTestConfig = data;
            theTestLenght = 10;  
            currentInterval = Math.floor(100 / theTestLenght) + 1;
        });
    }
    $("#exitLearn").on('click', ()=>{
        //codigo para redireccionar
        $("[href='learn']").trigger("click");
        $("header").show(100);
    });

    function reloadTest(){
        if(onIndex < dataTestConfig.length){
            onIndex = returnRandom(dataTestConfig.length);
            insertTest(dataTestConfig[onIndex]);
        }   
        if(testContent.childElementCount > 0){
            testContent.removeChild(testContent.childNodes[1]);
        }
        testContent.appendChild(theTestContent);
        addEvents();
    }

    function returnRandom(dataLenght){
        let randomNumber = Math.floor(Math.random() * dataLenght);
        let c = counter;
        randomArray[counter] = randomNumber;
        for(let i = 0; i< randomArray.length; i++){
            if(randomNumber == randomArray[i]){
                randomNumber = Math.floor(Math.random() * dataLenght);
            }else{
                randomArray[c] = randomNumber;
            }
        }
        if(counter >= dataLenght -1){
            counter = 0;
        }
        counter++;
        return randomArray[c];
    }

    function addEvents(){
        nextButton.setAttribute("disabled","true");
        var boxContent = document.getElementById('box-images');
        var optionsContent = document.getElementById('box-options');
        var wordBox = document.getElementById('word-box');

        let listElement;
        if(boxContent != null){
            listElement = boxContent.childNodes;
            listElement.forEach(index => {
                index.addEventListener("click", function(){
                    onAnswer = index.value;
                    nextButton.removeAttribute("disabled");
                });
            });
        }else if(optionsContent != null) {
            listElement = $("#box-options input");
            for (let i = 0; i< listElement.length; i++){
                listElement[i].addEventListener("click", ()=>{
                    onAnswer = listElement[i].value;
                    nextButton.removeAttribute("disabled");
                });
            }
        }else if(wordBox != null){
            listElement = wordBox.childNodes;
            listElement.forEach(index => {
                index.addEventListener('click',()=>{
                    var answer = "";
                    if(index.parentElement.classList[0] == 'word-content'){
                        putContent(index,document.getElementById('word-box'));
                    }else{
                        putContent(index,document.getElementsByClassName('word-content'));
                    }
                    let wordContent = document.getElementsByClassName('word-content');
                    for (let i = 0; i< wordContent[0].childNodes.length; i++){
                        answer += wordContent[0].childNodes[i].value + " ";
                    }
                    onAnswer = answer;
                });
            });
        }

    }

    loadTest();
    reloadTest();

    nextButton.addEventListener('click',()=>{
        if(checkAnswer(correctAnswer, onAnswer)){
            $(".loader-container").animate({
                opacity: 100,
                display: "block"
            },500);
            setTimeout(() => {
                reloadTest();
            }, 1000);
        }else{
            $('#answer').show(100);
            showAnswer(onConfig,nextButton,jumpButton);
            nextQuestion(reloadTest,nextButton,jumpButton);
        }
    });

    jumpButton.addEventListener('click', function(){
        $(".loader-container").animate({
            opacity: 100,
            display: "block"
        },500);
        setTimeout(()=>{
            reloadTest();
            nextQuestion();
        },1000);
    });

});