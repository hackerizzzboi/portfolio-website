<?php
    // Enter your host name, database username, password, and database name.
    // If you have not set database password on localhost then set empty.
    $con = mysqli_connect("localhost","root","","try");
    // Check connection
    if (mysqli_connect_errno()){
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
?>
<?php
$con = mysqli_connect("localhost", "root", "", "try");

if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
