<?php
// Database connection
$host = 'localhost';
$db = 'portfolio'; // Replace with your database name
$user = 'root'; // Replace with your username
$pass = ''; // Replace with your password

// Create connection
$con = new mysqli($host, $user, $pass, $db);

// Check connection
if ($con->connect_error) {
    die("Connection failed: " . $con->connect_error);
}

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $con->real_escape_string($_POST['name']);
    $email = $con->real_escape_string($_POST['email']);
    $password = $con->real_escape_string($_POST['password']);
    $role = $con->real_escape_string($_POST['role']);

    // Validate form data
    if (empty($name) || empty($email) || empty($password) || empty($role)) {
        die("All fields are required.");
    }

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Prepare SQL query to insert user
    $sql = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$hashed_password', '$role')";

    // Execute the query
    if ($con->query($sql) === TRUE) {
        echo "New user added successfully. <a href='user-management.php'>Go back</a>";
    } else {
        echo "Error: " . $sql . "<br>" . $con->error;
    }

    // Close connection
    $con->close();
} else {
    echo "Invalid request.";
}
?>
