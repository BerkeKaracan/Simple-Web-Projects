<?php
header('Content-Type: application/json');

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (empty($name) || empty($email) || empty($message)) {
  echo json_encode([
    'status' => 'error',
    'message' => 'Please fill in all the required fields.'
  ]);
  exit;
}

echo json_encode([
  'status' => 'success',
  'message' => "Thank you, $name! Your message has been sent successfully."
]);
