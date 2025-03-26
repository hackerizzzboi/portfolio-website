<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title>Registration</title>
    <link rel="stylesheet" href="login.css"/>
    <style>
        body {
            background-image: url('https://as1.ftcdn.net/v2/jpg/01/53/97/96/1000_F_153979609_i6SGjTHQdBknuxRcgtnVvx8G1ezK9Xoi.jpg');
        }

        .form {
            width: 300px;
            margin: 0 auto;
            padding: 20px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .form h1 {
            text-align: center;
        }

        .login-input {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .login-button {
            width: 100%;
            padding: 10px;
            background: #333;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        .login-button:hover {
            background: #555;
        }

        .link {
            text-align: center;
        }

        .link a {
            color: #333;
        }

        .link a:hover {
            text-decoration: underline;
        }
    </style>
    <script>
        function validatePassword() {
            var password = document.getElementById("password").value;
            var confirmPassword = document.getElementById("confirm_password").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return false;
            }
            return true;
        }
    </script>
</head>
<body>
<?php
    require('db.php');

    if (isset($_REQUEST['username'])) {
        $username = stripslashes($_REQUEST['username']);
        $username = mysqli_real_escape_string($con, $username);
        $email    = stripslashes($_REQUEST['email']);
        $email    = mysqli_real_escape_string($con, $email);
        $password = stripslashes($_REQUEST['password']);
        $password = mysqli_real_escape_string($con, $password);
        $role     = stripslashes($_REQUEST['role']);
        $role     = mysqli_real_escape_string($con, $role);
        $create_datetime = date("Y-m-d H:i:s");

        $checkQuery = "SELECT * FROM `users` WHERE username='$username' OR email='$email'";
        $checkResult = mysqli_query($con, $checkQuery);
        if (mysqli_num_rows($checkResult) > 0) {
            echo "<div class='form'>
                  <h3>Username or email already exists.</h3><br/>
                  <p class='link'>Click here to <a href='registration.php'>try again</a></p>
                  </div>";
        } else {
            $query = "INSERT into `users` (username, password, email, role, create_datetime)
                     VALUES ('$username', '" . md5($password) . "', '$email', '$role', '$create_datetime')";
            $result = mysqli_query($con, $query);
            if ($result) {
                echo "<div class='form'>
                      <h3>You are registered successfully.</h3><br/>
                      <p class='link'>Click here to <a href='login.php'>Login</a></p>
                      </div>";
            } else {
                echo "<div class='form'>
                      <h3>Required fields are missing or there was an error.</h3><br/>
                      <p class='link'>Click here to <a href='registration.php'>try again</a></p>
                      </div>";
            }
        }
    } else {
?>
    <form class="form" action="" method="post" onsubmit="return validatePassword();">
        <h1 class="login-title">Registration</h1>
        <input type="text" class="login-input" name="username" placeholder="Username" required />
        <input type="text" class="login-input" name="email" placeholder="Email Address" required />
        <input type="password" class="login-input" name="password" id="password" placeholder="Password" required />
        <input type="password" class="login-input" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required />

        <!-- Role selection -->
        <select name="role" class="login-input" required>
            <option value="user">User</option>
            <option value="admin">Admin</option>
        </select>
        
        <input type="submit" name="submit" value="Register" class="login-button">
        <p class="link"><a href="login.php">Click to Login</a></p>
    </form>
<?php
    }
?>
</body>
</html>
