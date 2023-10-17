<?php
	define("DATABASE", "erascomm_hrworks");

	class Database 
	{
	 	var $uid;
	 	var $pwd;
	 	var $host;
	 	var $link;
	 	
	 	public function __construct() {
	 	    $this->uid  = "erascomm_hrworks";
	 	    $this->pwd  = '4[CSX@[b0kL*';
	 	    $this->host = "localhost";
	 	    $this->link = NULL;
	 	}
	 	
	 	public function open($database = DATABASE) {
	 	    $this->link = mysqli_connect($this->host, $this->uid, $this->pwd);
	 	    mysqli_select_db($this->link, $database) or die("Unable to select database.");
	 	}
	 	
	 	public function prepare($statement) {
      return $this->link->prepare($statement);
	 	}
	 	
	 	public function bind(&$statement, $types, ...$var) {
      return $statement->bind_param($types, ...$var);
	 	}
	 	
	 	public function execute(&$statement) {
      return $statement->execute();
	 	}
	 	
	 	public function sanitize($param) {
      return $this->link->real_escape_string($param);
	 	}
	 	
	 	public function query($script) {
	 	    $result = mysqli_query($this->link, $script);
	 	    return $result;
	 	}
	 	
	 	public function multi_query($script) {
      $result = array();
      if(mysqli_multi_query($this->link, $script)) {
        do {
          //// Disabled as we are not interested in the result rows
          //if($query_result = mysqli_store_result($this->link)) {
          //  $result[] = mysqli_insert_id($this->link);
          //  $query_result->free();
          //}
          //else {
          //  $result[] = mysqli_insert_id($this->link);
          //}
          $result[] = mysqli_insert_id($this->link);
        } while(mysqli_next_result($this->link));
      }
      return $result;
	 	}
	 	
	 	public function result($result, $row, $column) {
      mysqli_data_seek($result, $row);
      $row = mysqli_fetch_assoc($result);
      return $row[$column];
	 	}
	 	
	 	public function fetch($result, $mode = MYSQLI_ASSOC) {
      return mysqli_fetch_array($result, $mode);
	 	}
	 	
	 	public function num_rows($result) {
      return mysqli_num_rows($result);
	 	}

	 	public function affected_rows() {
      return mysqli_affected_rows($this->link);
	 	}

	 	public function insert_id() {
      return mysqli_insert_id($this->link);
	 	}
	 	
	 	public function rewind($result, $pos = 0) {
      return $result->data_seek($pos);
	 	}
	 	
	 	public function error() {
      return mysqli_error($this->link);
	 	}

	 	public function close() {
	 	    mysqli_close($this->link);
	 	}
	}
?>
