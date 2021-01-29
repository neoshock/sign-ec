<?php 
    include_once $GLOBALS["dir_lds"] . "inc/doctype.php";
    include_once $GLOBALS["dir_lds"] . "inc/header.php";
?>
    <section class="main">
        <div class="portada">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner bg-dark w-100" style="height: 680px;">
                  <div class="carousel-item active">
                    <img src="files/background/bg-1.png" class="d-block" style="width: 100%; height: 100%;" alt="background">
                    <div class="carousel-caption position-absolute w-100" style="top: 18%; left: 12%;">
                        <div class="d-flex position-relative">
                            <div class="col-md-4">
                                <img src="files/covers/1.png" class="flex-shrink-0 me-3 cover position-relative" style="width: 80%;" alt="...">
                            </div>
                            <div class="col-md-5 titulos" style="text-align: start;">
                              <h2 class="mb-2 text-body fs-1 position-relative">APRENDE LENGUAJE DE SEÑAS</h2>
                              <p class="text-muted mt-3 contenido fs-4 position-relative">El acceso al lenguaje de señas, en ámbitos como la educación y los servicios públicos, es fundamental para los derechos humanos de las personas sordas.</p>
                              <a href="learn" class="btn btn-info fs-3 text-light btn-learn">Quiero Aprender</a>
                            </div>
                        </div>
                    </div>
                  </div>
                  <div class="carousel-item">
                    <img src="files/background/bg-2.png" class="d-block" style="width: 100%; height: 100%;" alt="background">
                    <div class="carousel-caption position-absolute w-100" style="top: 18%; left: 12%;">
                        <div class="d-flex position-relative">
                            <div class="col-md-5 titulos" style="text-align: start;">
                                <h2 class="mb-2 text-light fs-1 position-relative">APRENDIZAJE INTERACTIVO</h2>
                                <p class="text-dark mt-3 contenido fs-4 position-relative">Como parte de este emprendimiento, todos los involucrados deben acostumbrarse a un proceso de aula más flexible y abierta, que incluye colaboración, libertad de elección y corrección adaptativa del curso.</p>
                                <!--<a href="#" class="btn btn-outline-warning fs-4">Contenido</a>-->
                                <!--<a href="#" class="btn btn-outline-success fs-4 text-light">Sobre Nostros</a>-->
                                <a href="dictionary" class="btn btn-success fs-4 text-light btn-dictionary">Nuestro Diccionario</a>
                            </div>
                            <div class="col-md-6">
                                <img src="files/covers/2.png" class="flex-shrink-0 me-3 cover position-relative" style="width: 100%; bottom: 100px;" alt="...">
                            </div>
                        </div>
                    </div>
                  </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
                </a>
              </div>
        </div>
    </section>
    
    <section>
      <div class="container">
        <div class="row" id="myContent">
        
        </div>
      </div>
    </section>

    <?php include_once $GLOBALS["dir_lds"] . "inc/scripts.php"; ?>
</body>
</html>