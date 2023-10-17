<?php
  require_once("../page.class.php");
  require_once("../login.class.php");
  require_once("../user.class.php");
  require_once("../util.meta.php");
  require_once("../config.class.php");

  $login = new Login();
  if($login->status) {
    @$id     = $_REQUEST["id"];
    @$action = $_REQUEST["action"];
    $db = new Database();
    $db->open();
    $user = User::GetUser($_SESSION["user"], $db);
    echo("<!DOCTYPE html>
      <html lang=\"en\">
        <head>
          <meta charset=\"UTF-8\">
          <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
          <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
          <link rel=\"stylesheet\" href=\"css\style.css\">
          <script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js\"></script>
          <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM\" crossorigin=\"anonymous\"></script>
          <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC\" crossorigin=\"anonymous\">
          <div class=\"row\">
            <div class=\"col-sm-1\">
              <button type=\"button\" class=\"btn btn-primary\" data-bs-toggle=\"modal\" data-bs-target=\"#SaveWindow\">Save</button>
              <button type=\"button\" class=\"btn btn-success\" data-bs-toggle=\"modal\" data-bs-target=\"#LoadWindow\">Load</button>
            </div>
            <div class=\"col-sm-3\">
              <div class=\"input-group\">
                <div class=\"input-group-prepend text-white bg-dark\">
                  <span class=\"input-group-text\">Resolution</span>
                </div>
                <select class=\"form-select text-light bg-secondary\" id=\"resolution\">
                  <option value=\"1080p\" selected>1080p</option>
                  <option value=\"720p\">720p</option>
                  <option value=\"480p\">480p</option>
                </select>
              </div>
            </div>
            <div class=\"col-sm-3\">
              <div class=\"input-group\">
                <div class=\"input-group-prepend\">
                  <span class=\"input-group-text\">Font</span>
                </div>
                <select class=\"form-select text-light bg-secondary\" id=\"text_font\">
                  <option value=\"Sans Serif\" selected>Sans Serif</option>
                  <option value=\"Verdana\">Verdana</option>
                  <option value=\"Impact\">Impact</option>
                </select>
              </div>
            </div>
            <div class=\"col-sm-3\">
              <div class=\"input-group\">
                <div class=\"input-group-prepend\">
                  <span class=\"input-group-text\">Font Size</span>
                </div>
                <input type=\"number\" class=\"form-control text-light bg-secondary\">
                <div class=\"input-group-append\">
                  <span class=\"input-group-text\">px</span>
                </div>
              </div>
            </div>
          </div>
        </head>
        <body>
          <canvas id=\"canvasBox\">
          </canvas>
        </body>
        <div class=\"modal fade\" id=\"LoadWindow\" tabindex=\"-1\" aria-labelledby=\"loadModalLabel\" aria-hidden=\"true\">
          <div class=\"modal-dialog\">
            <div class=\"modal-content\">
              <div class=\"modal-header\">
                <h5 class=\"modal-title\" id=\"loadModalLabel\">Load file</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
              </div>
              <div class=\"modal-body\">
                <span id=\"saved_file\"></span>
              </div>
              <div class=\"modal-footer\">
                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
                <button type=\"button\" class=\"btn btn-primary\">Load</button>
              </div>
            </div>
          </div>
        </div>
        <div class=\"modal fade\" id=\"SaveWindow\" tabindex=\"-1\" aria-labelledby=\"saveModalLabel\" aria-hidden=\"true\">
          <div class=\"modal-dialog\">
            <div class=\"modal-content\">
              <div class=\"modal-header\">
                <h5 class=\"modal-title\" id=\"saveModalLabel\">Save name</h5>
                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>
              </div>
              <div class=\"modal-body\"> <input type=\"hidden\" id=\"overwrite\" value=\"\"> <input type=\"hidden\" id=\"word_save_state\" value=\"\">
                <input type=\"hidden\" id=\"shape_save_state\" value=\"\">
                <input class=\"form-control\" type=\"text\" placeholder=\"enter name\" id=\"file_name\">
                <span id=\"save_alert\"></span>
              </div>
              <div class=\"modal-footer\">
                <button type=\"button\" class=\"btn btn-primary\" onclick=\"SaveFile()\">Save</button>
                <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">Close</button>
              </div>
            </div>
          </div>
        </div>
        <script src=\"js/index.js\"></script>
      </html>");
  }
  else {
    Page::PrintLogin();
  }
?>

