
let Test = class MainTest {

    theTestContent;
    theTestLenght;
    correctAnswer;
    progress = document.getElementById('progress-bar');
    currentProgress = 0;
    currentInterval = 0;
    onIndex = 0;
    onConfig = "";

    constructor (test){
        console.log(test);

    }

    insertTest(config) {
        $(".loader-container").animate({
            opacity: 0,
            display: "none"
        },500);
        if (config.typeTest == "img-select"){
            this.theTestContent = this.generateContentOne(config);
        }else if(config.typeTest == "select-answer"){
            this.theTestContent = this.generateContentTwo(config);
        }else if(config.typeTest == "words-select"){
            this.theTestContent = this.generateContentThree(config);
        }
        this.onConfig = config;
    }

    generateContentOne(testOne){
        let divParent = document.createElement('div');
        let contentTitle = `<h5 class="fs-2 m-3 text-secondary text-center">${testOne.titleTest}</h5>`;
        let divChildren = document.createElement('div');
        
        this.correctAnswer = testOne.answer;

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

    generateContentTwo(testTwo){
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

        this.correctAnswer = testTwo.answer;

        return divParent;
    }

    putContent(button, container){
        var answer = "";
        if(container[0] != undefined){
            container[0].appendChild(button);
        }else{
            container.appendChild(button);
        }
    }

    generateContentThree(testThree){
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

        this.correctAnswer = testThree.answer;

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

    checkAnswer(correct, present){
        if(correct === present){
            this.audioEvent("correct");
            $("#test .container").addClass("correct-answer");
            setTimeout(() => {
                $("#test .container").removeClass("correct-answer");
            }, 500);
            this.currentProgress += this.currentInterval;
            this.progress.toggleAttribute('aria-valuenow',`${this.currentProgress}`);
            this.progress.style.width = `${this.currentProgress}%`;
            if(this.currentProgress > 100){
                this.congratulationTest();
            }
            return true;
        }else{
            this.audioEvent("incorrect");
            $("#test .container").addClass("incorrect-answer");
            setTimeout(() => {
                $("#test .container").removeClass("incorrect-answer");
            }, 500);
            return false;
        }
    }

    showAnswer(testElement){
        var testContainer = document.getElementById('answer');
        var buttonElement = `<button id="showDialog" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalRespuesta">Ver respuesta</button>`;
        testContainer.innerHTML = buttonElement;
        if(testElement.typeTest == "img-select"){
            let imgAnswer = "";
            for(let i = 0; i< testElement.images.length; i++){
                if(testElement.images[i].value == testElement.answer){
                    imgAnswer = `<img src="${testElement.images[i].file}" class="d-flex w-50 mx-auto" alt="${testElement.images[i].value}">`;
                }
            }
            testContainer.innerHTML += this.generateFeedbackContent(imgAnswer);
        }else if(testElement.typeTest = "select-answer"){
            testContainer.innerHTML += this.generateFeedbackContent(testElement.answer);
        }else{
            testContainer.innerHTML += this.generateFeedbackContent('La respuesta correcta es 2');
        }
    }

    nextQuestion(functionReload){
        $('#answer button').each((index, element)=>{
            $(element).click(function(){
                if(element.classList[1] == "btn-success" || element.classList[0] == "btn-close"){
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

    generateFeedbackContent(theContent){
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

    congratulationTest(){
        $(".loader-container").animate({
            opacity: 0,
            display: "none"
        },500);
        $('#test .container').fadeOut(500);
        var theTest = document.getElementById('test');
        var audio = document.createElement('audio');
        audio.setAttribute("src","files/sounds/Win-Sound.wav");

        let divFather = document.createElement('div');
        let character = document.createElement('div');
        let winText = document.createElement('div');

        divFather.classList.add('win-container');
        character.classList.add("character");
        winText.classList.add("win-screen");
        
        winText.innerHTML = "Felicitaciones";
        divFather.appendChild(character);
        divFather.appendChild(winText);
        theTest.appendChild(divFather);
        $(".win-container").hide();
        setTimeout(function(){
            $(".win-container").fadeIn(1000);
            audio.play();
        },1000);
    }

    audioEvent(current){
        var audioElement = document.createElement('audio');
        if(current == "correct"){
            audioElement.setAttribute("src","files/sounds/REV-Chiptune FX 08.wav");
        }else{
            audioElement.setAttribute("src","files/sounds/REV-Chiptune FX 07.wav");
        }
        audioElement.play();
    }

}

class TestOne {

}

$('#test').ready(function(){

    const testContent = document.getElementById('testContent');
    var dataTestConfig;
    var mainTest;
    var randomArray = [];
    var counter = 0;

    if (mainTest != null){
        mainTest = null;
        mainTest = new Test("hola gente");
    }else{
        mainTest = new Test('Hola');
    }

    var onAnswer = "";
    var nextButton = document.getElementById('next');
    var jumpButton = document.getElementById('jump');

    function loadTest(){
        $.ajax({
            url: "json/config.abecedario.json",
            dataType: "json",
            async: false
        }).done(function(data){
            dataTestConfig = data;
            mainTest.theTestLenght = 10;
            mainTest.currentInterval = Math.floor(100 / mainTest.theTestLenght) + 1;
        });
    } 

    function reloadTest(){
        if(mainTest.onIndex < dataTestConfig.length){
            mainTest.onIndex = returnRandom(dataTestConfig.length);
            mainTest.insertTest(dataTestConfig[mainTest.onIndex]);
        }   
        if(testContent.childElementCount > 0){
            testContent.removeChild(testContent.childNodes[1]);
        }
        testContent.appendChild(mainTest.theTestContent);
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

        var boxContent = document.getElementById('box-images');
        var optionsContent = document.getElementById('box-options');
        var wordBox = document.getElementById('word-box');

        let listElement;
        if(boxContent != null){
            listElement = boxContent.childNodes;
            listElement.forEach(index => {
                index.addEventListener("click", function(){
                    onAnswer = index.value;
                });
            });
        }else if(optionsContent != null) {
            listElement = $("#box-options input");
            for (let i = 0; i< listElement.length; i++){
                listElement[i].addEventListener("click", ()=>{
                    onAnswer = listElement[i].value;
                });
            }
        }else if(wordBox != null){
            listElement = wordBox.childNodes;
            listElement.forEach(index => {
                index.addEventListener('click',()=>{
                    var answer = "";
                    if(index.parentElement.classList[0] == 'word-content'){
                        mainTest.putContent(index,document.getElementById('word-box'));
                    }else{
                        mainTest.putContent(index,document.getElementsByClassName('word-content'));
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
        if(mainTest.checkAnswer(mainTest.correctAnswer, onAnswer)){
            $(".loader-container").animate({
                opacity: 100,
                display: "block"
            },500);
            setTimeout(() => {
                reloadTest();
            }, 1000);
        }else{
            $('#answer').show(100);
            mainTest.showAnswer(mainTest.onConfig);
            mainTest.nextQuestion(reloadTest);
        }
    });

    jumpButton.addEventListener('click', function(){
        $(".loader-container").animate({
            opacity: 100,
            display: "block"
        },500);
        setTimeout(()=>{
            reloadTest();
        },1000);
    });

});