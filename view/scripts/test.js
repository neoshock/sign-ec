
class MainTest {

    testOne;
    correctAnswer;
    progress = document.getElementById('progress-bar');
    currentProgress = 0;

    constructor (test){
        console.log(test);
    }

    loadTest(config) {
        if (config.typeTest == "img-select"){
            this.testOne = this.generateContentOne(config);
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
    let config = {
        typeTest: "img-select",
        answer: "img-2",
        titleTest: "Cual de estos es 2?",
        images: [{
            name: "numero-2",
            value: "img-2",
            file: "view/images/numeros/dos.png"
        },
        {
            name: "numero-2",
            value: "img-4",
            file: "view/images/numeros/cuatro.png"
        },
        {
            name: "numero-2",
            value: "img-1",
            file: "view/images/numeros/uno.png"
        },
        {
            name: "numero-2",
            value: "img-3",
            file: "view/images/numeros/tres.png"
        }
        ]
    }

    const mainTest = new MainTest("hola gente");
    const testContent = document.getElementById('testContent');
    var onAnswer = "";

    mainTest.loadTest(config);
    testContent.appendChild(mainTest.testOne);

    var boxContent = document.getElementById('box-images');
    var nextButton = document.getElementById('next');

    function addEvent(element){
        let listElement = element.childNodes;
        listElement.forEach(index => {
            index.addEventListener("click", function(){
                onAnswer = index.value;
            });
        });
    }

    addEvent(boxContent);
    nextButton.addEventListener('click',()=>{
        mainTest.checkAnswer(mainTest.correctAnswer, onAnswer);
    });

});