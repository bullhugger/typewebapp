<?php
require_once("../../login.class.php");
require_once("../../db.class.php");
require_once("../../config.class.php");
require_once("../../user.class.php");

session_start();
$login = new Login();
if($login->status) {
  $id = $_POST["id"];
  $uid = $login->id;
  $db = new Database();
  $db->open();
  $user = User::GetUser($uid, $db);
  $action = $_POST["action"];
  switch($action) {
    case "save" :
      $name      = $_POST["name"];
      $word      = $_POST["word"];
      $shape     = $_POST["shape"];
      $overwrite = $_POST["overwrite"];
      $query = "SELECT name FROM ".TYPE_APP." WHERE creatorid=$login->id";
      $result = $db->query($query);
      if($result !== false) {
        while($row = $db->fetch($result)) {
          $arr_file_name = $row["name"];
        }
        if(!in_array($name, $arr_file_name)) {
          $query = "INSERT INTO ".TYPE_APP." (word, shape, `name`, creatorid) VALUES ('$word', '$shape', '$name', $login->id)";
        }
        else {
          echo "File name already exist, overwrite?";
          $response = $_POST["response"];
          if($response) {
            $query = "INSERT INTO ".TYPE_APP." (word, shape, `name`, creatorid) VALUES ('$word', '$shape', '$name', $login->id)";
          }
          else {
            $query = "UPDATE ".TYPE_APP." SET shape='$shape', word='$word' WHERE name=$name AND creatorid=$login->id";
          }
        }
        $result = $db->query($query);
        if($result !== false) {
          echo("File $name saved.");
        }
        else {
          echo($query.$db->error());
        }
      }
      break;
    case "load" :
      $id = $_POST["id"];
      $query = "SELECT * FROM ".TYPE_APP." WHERE id=$id LIMIT 1";
      $result = $db->query($query);
      if($result !== false) {
        while($row = $query->fetch($result)) {
          $object = json_decode($row);
        }
        echo($object);
      }
  }
}
?>
