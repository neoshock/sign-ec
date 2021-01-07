<<<<<<< HEAD
<?php

include_once "config/config.vars.php";

class Main
{
  public static function search_page(string $page)
  {
      $result = array('result'=>false, 'message'=>'Lo setimos! La página no existe ó no tienes permiso');
      //busca si existe la pagina, regresa el index(true) de lo contrario false
      include_once "config/config.actions.php";
      $index = array_search($page, array_column($get_actions, 'action'));
      
      if ($index !== false) { // comprueba que no sea false y si existe la pagina
          // si existe la pagina
          $item = $get_actions[$index]; // obtengo el elemnto seleccionado
          /*if ( in_array($_SESSION['fmk_user_rol'], $item['rol']) ) { //valido el rol
              // Si tiene permiso
              unset($result['message']);
              $result = array_merge($result, array('result'=>true, 'action'=>$item));

          } // no tienes permiso*/
          unset($result['message']);
          $result = array_merge($result, array('result'=>true, 'action'=>$item));
      } // no existe la pagina
      return $result;
  }
}

function convertArrayToJson($array)
{
  echo "<script>console.log(". json_encode($array) .")</script>";
}

if (isset($_GET) && !empty($_GET)) {
  if ($page= (isset($_GET["page"]) && !empty($_GET["page"])) ? $_GET["page"] : "") {
    // busca la pagina y retorna la config del mismo
    echo json_encode(Main::search_page($_GET["page"]));
  }
}else 
{
  include_once "principal.php";
}
=======
<?php 
    include_once("inc/doctype.php");
    include_once("inc/header.php");
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
                              <p class="text-muted mt-3 contenido fs-4 position-relative">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                              <a href="learns.php" class="btn btn-info fs-3 text-light">Quiero Aprender</a>
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
                                <p class="text-light mt-3 contenido fs-4 position-relative">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
                                <a href="#" class="btn btn-outline-warning fs-4">Contenido</a>
                                <a href="#" class="btn btn-outline-success fs-4 text-light">Sobre Nostros</a>
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
    <?php include_once("inc/scripts.php"); ?>
</body>
</html>
>>>>>>> a43db4ed5c843dc6c49bbb55ccb09fb2f36387ad
