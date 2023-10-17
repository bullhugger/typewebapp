<?php
require_once("../../login.class.php");
require_once("../../db.class.php");
require_once("../../config.class.php");
require_once("../../user.class.php");

session_start();
$login = new Login();
if($login->status) {
  $uid = $login->id;
  $user = User::GetUser($uid, $db);
  $db = new Database();
  $db->open();
  $action = $_POST["action"];
  switch($action) {
    case "save" :
      $object = json_encode($_POST["elements"]);
      $name = $_POST["name"];
      if(empty($object)) {
        echo("Can't save empty file.");
        break;
      }
      else {
        $query = "SELECT * FROM ".TYPE_APP." WHERE name=$name AND creatorid=$login->id";
        $result = $db->query($query);
        if(!empty($result)) {
          $file_name = $db->fetch($result)["name"];
          echo("File $file_name already exist, overwrite file name?");
          $confirm = $_POST["confirm"];
          if($confirm) {
            $query = "INSERT INTO ".TYPE_APP." SET object=$object, name=$name, creatorid=$login->id";
          }
        }
        else {
          $query = "INSERT INTO ".TYPE_APP." SET object=$object, name=$name, creatorid=$login->id";
        }
        $result = $db->query($query);
        if($result !== false) {
          echo("File $name saved.");
        }
      }
      break;
    case "load" :
      $id = $_POST["id"];
      $query = "SELECT * FROM ".TYPE_APP." WHERE id=$id LIMIT 1";
      $result = $db->query($query);
      if($result !== false) {
        while($row = $query->fetch($result)) {
          json_encode($row);
        }
      }
  }
}
?>
