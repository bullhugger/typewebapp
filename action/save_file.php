<?php
require_once("config.class.php");

$db = new Database();
$db->open();
$action = $_POST["action"];
switch($action) {
  case "save" :
    $object = $_POST["elements"];
    $name = $_POSt["name"];
    $query = "INSERT INTO ".TYPE_APP." SET object=$object, name=$name";
    $result = $db->query($query);
    if($result !== false) {
      echo("File $name saved.");
    }
    break;
  case "load" :
    $id = $_POST["id"];
    $query = "SELECT * FROM ".TYPE_APP." WHERE id=$id LIMIT 1";
    $result = $db->query($query);
    if($result !== false) {

    }
}
?>
