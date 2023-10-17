<?php
require_once('db.class.php');
require_once('config.class.php');
require_once('page.class.php');
require_once('user.class.php');

$db = new Database();
$db->open();
@$action = $_POST["a"];
$id = $_POST["id"];
switch($action) {
  case "saved_file" :
    $option = "<select class=\"form-control\">";
    $query = "SELECT * FROM ".TABLE_TYPE." WHERE creatorid=$id";
    $result = $db->query($query);
    if($result !== false) {
      while($row = $db->fetch($result)) {
        $option .= "<option value=\"{$row["name"]}\">{$row["name"]}</option>";
      }
      $option .= "</select>";
    }
    echo($option);
    break;
}
?>
