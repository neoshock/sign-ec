
let Test = class MainTest {

    theTestContent;
    correctAnswer;
    progress = document.getElementById('progress-bar');
    currentProgress = 0;

    constructor (test){
        console.log(test);
    }

    loadTest(config) {
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
            let color = randonColors();
            let buttonWord = `<button class="btn btn-colors" value="${testThree.wordOptions[i].value}" style="${color};">${testThree.wordOptions[i].name}</button>`;
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
        if(correct == present){
            this.audioEvent("correct");
            $("#test .container").addClass("correct-answer");
            setTimeout(() => {
                $("#test .container").removeClass("correct-answer");
            }, 500);
            this.currentProgress += 20;
            this.progress.toggleAttribute('aria-valuenow',`${this.currentProgress}`);
            this.progress.style.width = `${this.currentProgress}%`;
        }else{
            this.audioEvent("incorrect");
            $("#test .container").addClass("incorrect-answer");
            setTimeout(() => {
                $("#test .container").removeClass("incorrect-answer");
            }, 500);
        }
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
    var config = {
        typeTest: "img-select",
        answer: "img-2",
        titleTest: "Cual de lo siguientes es 2",
        images: [{
            name: "numero-2",
            value: "img-2",
            file: "view/images/numeros/dos.png"
        },
        {
            name: "numero-4",
            value: "img-4",
            file: "view/images/numeros/cuatro.png"
        },
        {
            name: "numero-1",
            value: "img-1",
            file: "view/images/numeros/uno.png"
        },
        {
            name: "numero-3",
            value: "img-3",
            file: "view/images/numeros/tres.png"
        }
        ]
    }

    var configTwo = {
        typeTest: "select-answer",
        answer: "num-2",
        titleTest: "Seleccione la respuesta correcta",
        fileImg: "view/images/numeros/dos.png",
        options: [{
            title: "Numero dos",
            name: "numero-2",
            value: "num-2"
        },
        {
            title: "Numero cuatro",
            name: "numero-4",
            value: "num-4"
        },
        {
            title: "Numero uno",
            name: "numero-1",
            value: "num-1"
        },
        {
            title: "Numero tres",
            name: "numero-3",
            value: "num-3"
        }
        ]
    }

    var configThree = {
        typeTest: "words-select",
        answer: "hola que-tal",
        titleTest: "Seleccione la frase correcta",
        fileImgs: [{
                name: "hola",
                file: "view/images/saludos/hola.png"
            },
            {
                name: "que-tal",
                file: "view/images/saludos/que tal.png"
            }],
        wordOptions: [{
            title: "hola",
            name: "Hola",
            value: "hola"
        },
        {
            title: "como estas",
            name: "como estas",
            value: "como-estas"
        },
        {
            title: "que tal",
            name: "que tal",
            value: "que-tal"
        },
        {
            title: "como te sientes",
            name: "como te sientes",
            value: "como-te-sientes"
        }
        ]
    }


    var mainTest;
    if (mainTest == null){
        mainTest = new Test("hola gente");
    }else{
        console.log('the test');
    }
    const testContent = document.getElementById('testContent');
    var onAnswer = "";

    mainTest.loadTest(configThree);
    testContent.appendChild(mainTest.theTestContent);

    var boxContent = document.getElementById('box-images');
    var optionsContent = document.getElementById('box-options');
    var nextButton = document.getElementById('next');
    var wordBox = document.getElementById('word-box');

    function addEvents(){
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
        }

    }

    addEvents();
    nextButton.addEventListener('click',()=>{
        mainTest.checkAnswer(mainTest.correctAnswer, onAnswer);
    });

});