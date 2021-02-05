
let Test = class MainTest {

    theTestContent;
    correctAnswer;
    progress = document.getElementById('progress-bar');
    currentProgress = 0;
    currentInterval = 0;
    onIndex = 0;

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
        $(".loader-container").animate({
            opacity: 100,
            display: "block"
        },250);
        if(correct === present){
            this.audioEvent("correct");
            $("#test .container").addClass("correct-answer");
            setTimeout(() => {
                $("#test .container").removeClass("correct-answer");
            }, 500);
            this.currentProgress += this.currentInterval;
            this.progress.toggleAttribute('aria-valuenow',`${this.currentProgress}`);
            this.progress.style.width = `${this.currentProgress}%`;
            this.onIndex += 1;
            if(this.currentProgress >= 100){
                this.congratulationTest();
            }
        }else{
            this.audioEvent("incorrect");
            $("#test .container").addClass("incorrect-answer");
            setTimeout(() => {
                $("#test .container").removeClass("incorrect-answer");
            }, 500);
        }
    }

    congratulationTest(){
        $(".loader-container").animate({
            opacity: 0,
            display: "none"
        },250);
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
        },500);
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
    if (mainTest == null){
        mainTest = new Test("hola gente");
    }else{
        console.log('the test');
    }

    var onAnswer = "";
    var nextButton = document.getElementById('next');

    function loadTest(){
        $.ajax({
            url: "json/config.test.json",
            dataType: "json",
            async: false
        }).done(function(data){
            dataTestConfig = data;
            mainTest.currentInterval = Math.floor(100 / data.length) + 1;
        });
    } 

    function reloadTest(){
        if(mainTest.onIndex < dataTestConfig.length){
            mainTest.insertTest(dataTestConfig[mainTest.onIndex]);
        }   
        if(testContent.childElementCount > 0){
            testContent.removeChild(testContent.childNodes[1]);
        }
        if(mainTest.onIndex == dataTestConfig.length){
            testContent.remove();
        }else{
            testContent.appendChild(mainTest.theTestContent);
        }
        addEvents();   
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
        mainTest.checkAnswer(mainTest.correctAnswer, onAnswer);
        setTimeout(() => {
            reloadTest();
        }, 500);
    });

});