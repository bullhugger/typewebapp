<?php
require_once('db.class.php');
require_once('config.class.php');
require_once('page.class.php');
require_once('user.class.php');

session_start();
$login = new Login();
if($login->status) {
  $user = User::GetUser($uid, $db);
  $db = new Database();
  $db->open();
  $action = $_POST["action"];
  switch($action) {
    case "saved_file" :
      $option = "<select class=\"form-control\">";
      $query = "SELECT * FROM ".TABLE_TYPE." WHERE creatorid=$login->id";
      $result = $db->query($query);
      if($result !== false) {
        while($row = $db->fetch($result)) {
          $option .= "<option value=\"{$row["name"]}\">{$row["name"]}</option>";
        }
        $option .= "</select>";
      }
      echo($option);
      break;
    case "check_file_name" :
      $name = $_POST["file_name"];
      $overwrite = $_POST["overwrite"];
      $query = "SELECT * FROM ".TYPE_APP." WHERE name=$name AND creatorid=$login->id";
      $result = $db->query($query);
      if($result !== false) {
        while($row = $db->fetch($result)) {
          $arr_file_name = $row["name"];
        }
        if(in_array($name, $arr_file_name) && empty($overwrite)) {
          echo("File name already exist, overwrite?");
          break;
        }
        else {
          $query = "UPDATE ".TYPE_APP." SET object=$object WHERE creatorid=$login->id AND name=$name";
          $result = $db->query($query);
          if($result !== false) {
            echo("File saved.");
          }
        }
      }
      break;
  }
}
?>
