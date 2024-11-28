<?php
session_start();

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host = "localhost";
$dbname = "crab_db";
$username = "public";
$password = "pub123";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo "Database connection failed.";
    exit;
}

$name = htmlspecialchars(trim($_POST['name']));
$email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($_POST['subject']));
$message = htmlspecialchars(trim($_POST['message']));
$meeting_date = htmlspecialchars(trim($_POST['meeting_date']));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo "Invalid email format.";
    exit;
}

$stmt = $conn->prepare("INSERT INTO book_submissions (name, email, subject, message, meeting_date) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $email, $subject, $message, $meeting_date);

if ($stmt->execute()) {
    // Step 4: Send Email Using PHPMailer
    $mail = new PHPMailer(true);
    
    try {
        // Server settings
        // $mail->isSMTP();  // Use SMTP
        // $mail->Host = 'smtp.gmail.com';  // Set the SMTP server to Gmail
        // $mail->SMTPAuth = true;  // Enable SMTP authentication
        // $mail->Username = getenv('SMTP_USER');  // Fetch email from environment variable
        // $mail->Password = getenv('SMTP_PASS');  // Fetch password from environment variable 
        // $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;  // Use TLS encryption
        // $mail->Port = 587;  // TCP port to connect to

        // // Recipients
        // $mail->setFrom('no-reply@crabstudio.com', 'Web Booking');  // Sender's email
        // $mail->addAddress('polimus26@gmail.com', 'Polim');  // Your email address where you want to receive the form submissio     "Name: " . $name . "\n" .
        //               "Email: " . $email . "\n" .
        //               "Subject: " . $subject . "\n" .
        //               "Message: " . $message . "\n" .
        //               "Meeting Date: " . $meeting_date . "\n";

        // // Send the email
        // $mail->send();n

        // // Content
        // $mail->isHTML(false);  // Set email format to plain text
        // $mail->Subject = "New Booking Request: " . $subject;
        // $mail->Body = "You have received a new booking request:\n\n" .
                 
        echo "Form submitted successfully, and email has been sent!";
    } catch (Exception $e) {
        echo "Form submitted, but failed to send email. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    http_response_code(500); // Internal Server Error
    echo "Error saving data.";
}


// if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//     $url = 'https://api.web3forms.com/submit';
//     $data = [
//         'name' => $_POST['name'],
//         'email' => $_POST['email'],
//         'message' => $_POST['message']
//     ];

//     // Use cURL to send data to Web3Forms
//     $ch = curl_init($url);
//     curl_setopt($ch, CURLOPT_POST, 1);
//     curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     $response = curl_exec($ch);
//     curl_close($ch);

//     // Handle Web3Forms API response
//     if ($response) {
//         echo json_encode(['status' => 'success', 'message' => 'Form submitted']);
//     } else {
//         echo json_encode(['status' => 'error', 'message' => 'Error submitting form']);
//     }
// }



$stmt->close();
$conn->close();
?>