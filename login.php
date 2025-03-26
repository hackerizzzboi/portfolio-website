<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Login</title>
    <link rel="stylesheet" href="login.css"/>
    <style>
        body {
            background-image: url('https://as1.ftcdn.net/v2/jpg/01/53/97/96/1000_F_153979609_i6SGjTHQdBknuxRcgtnVvx8G1ezK9Xoi.jpg');
        }
    </style>
</head>
<body>
<?php
    require('db.php');
    session_start();

    if (isset($_POST['username'])) {
        $username = stripslashes($_REQUEST['username']);    // removes backslashes
        $username = mysqli_real_escape_string($con, $username);
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($con, $password);

        // Check user is exist in the database
        $query = "SELECT * FROM `users` WHERE username='$username' AND password='" . md5($password) . "'";
        $result = mysqli_query($con, $query) or die(mysqli_error($con));
        $rows = mysqli_num_rows($result);

        if ($rows == 1) {
            $_SESSION['username'] = $username;

            // Check if user is admin
            $adminQuery = "SELECT * FROM `users` WHERE username='$username' AND role='admin'";
            $adminResult = mysqli_query($con, $adminQuery) or die(mysqli_error($con));
            $isAdmin = mysqli_num_rows($adminResult) == 1;

            if ($isAdmin) {
                header("Location: admin-dashboard.php"); // Redirect to admin dashboard
            } else {
                header("Location: index.html"); // Redirect to user dashboard
            }
            exit(); // Ensure no further code is executed after redirect
        } else {
            echo "<div class='form'>
                  <h3>Incorrect Username/password.</h3><br/>
                  <p class='link'>Click here to <a href='login.php'>Login</a> again.</p>
                  </div>";
        }
    } else {
?>
    <form class="form" method="post" name="login">
        <h1 class="login-title">Login</h1>
        <input type="text" class="login-input" name="username" placeholder="Username" autofocus="true"/>
        <input type="password" class="login-input" name="password" placeholder="Password"/>
        <input type="submit" value="Login" name="submit" class="login-button"/>
        <p class="link"><a href="registration.php">New Registration</a></p>
    </form>
<?php
    }
?>
</body>
</html>
