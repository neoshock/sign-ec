<?php include_once "inc/doctype.php"; ?>
<?php include_once "inc/header.php"; ?>
    <div class="container">
        <div class="row bg-light rounded w-75 mx-auto p-3" style="margin: 30px 0px;">
            <div class="col-md-12">
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 50%"></div>
                </div>
            </div>
            <div class="col-md-12" style="margin:30px 0px;">
                <h5 class="fs-3 text-secondary" style="text-align: center; font-weight: bold;">Seleccione la frase correcta</h5>
                <div class="img-container w-100 d-flex" style="margin: 21px 0px; justify-content: center;">
                    <div class="sign-ec w-25 border border-3 rounded rounded">
                        <img class="w-75" src="files/tests/saludos/hola.png" alt="">
                    </div>
                    <div class="sign-ec w-25 border border-3 rounded rounded">
                        <img class="w-75" src="files/tests/saludos/que tal.png" alt="">
                    </div>
                </div>
                <div class="answer-container w-100 p-3">
                    <div class="bg-light bg-gradient border" id="boxAnswer" style="height: 90px;">
                        
                    </div>
                </div>
                <div class="question-container w-100 p-3" id="questionContainer">
                    
                </div>
            </div>
        </div>
        <div class="row w-75 mx-auto border-top border-3 d-flex justify-content-center">
            <button class="btn btn-info w-25" style="margin: 0px 15px;">Siguiente</button>
            <button class="btn btn-secondary w-25" style="margin: 0px 15px;">Saltar</button>
        </div>
    </div>
<?php include_once "inc/scripts.php"; ?>
