<?php
header('Content-Type: application/json');

// === KONFIGURASI ===
$receiving_email_address = 'hammamgonjil@gmail.com';

// === FUNGSI BANTUAN ===
function sanitize_input($data) {
  return htmlspecialchars(strip_tags(trim($data)));
}

// === CEK METODE ===
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['status' => 'error', 'message' => 'Invalid request method.']);
  exit;
}

// === VALIDASI DAN SANITASI ===
$name    = isset($_POST['name']) ? sanitize_input($_POST['name']) : '';
$email   = isset($_POST['email']) ? sanitize_input($_POST['email']) : '';
$subject = isset($_POST['subject']) ? sanitize_input($_POST['subject']) : 'No Subject';
$message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Please fill in all required fields.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Invalid email address.']);
  exit;
}

// === SIAPKAN EMAIL ===
$email_subject = "New Contact Message from $name: $subject";
$email_body = "You received a new message via your website contact form:\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Subject: $subject\n\n";
$email_body .= "Message:\n$message\n";

$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// === KIRIM EMAIL ===
if (mail($receiving_email_address, $email_subject, $email_body, $headers)) {
  echo json_encode(['status' => 'success', 'message' => 'Message sent successfully.']);
} else {
  http_response_code(500);
  echo json_encode(['status' => 'error', 'message' => 'Failed to send message. Please try again later.']);
}
?>
