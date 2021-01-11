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

if (isset($_GET) && !empty($_GET)) {
  if ($page= (isset($_GET["page"]) && !empty($_GET["page"])) ? $_GET["page"] : "") {
    // busca la pagina y retorna la config del mismo
    echo json_encode(Main::search_page($_GET["page"]));
  }
}else 
{
  include_once "principal.php";
}
