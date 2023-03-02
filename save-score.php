<?php
include_once("./db.php");


// Récupérer les données envoyées par la requête AJAX
$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$score = $data['score'];

// Insérer le score dans la base de données
$query = "INSERT INTO user (username, score) VALUES (:username, :score)";
$stmt = $pdo->prepare($query);
$stmt->bindParam(':username', $username);
$stmt->bindParam(':score', $score);

if ($stmt->execute()) {
    echo "Score enregistré avec succès";
} else {
    echo "Erreur lors de l'enregistrement du score";
}
?>
