<?php
header("Content-Type: application/json; charset=UTF-8");
include_once("../db.php");

  $stmt = $conn->prepare("SELECT * FROM questions");
  $stmt->execute();

  $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
  echo json_encode($results);

?>
