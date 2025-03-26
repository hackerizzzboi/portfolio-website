<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$database = "try";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if 'id' is provided in the URL
if (isset($_GET['id'])) {
    $id = $conn->real_escape_string($_GET['id']);

    // SQL query to delete the user
    $sql = "DELETE FROM users WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        // Redirect with a success message
        header("Location: user-management.php?message=Account successfully deleted");
        exit();
    } else {
        echo "Error: " . $conn->error;
    }
} else {
    echo "No ID provided";
}

// Close the database connection
$conn->close();
?>
