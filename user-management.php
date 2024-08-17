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

// Handle form submission for adding a user
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Securely hash the password
    $role = $conn->real_escape_string($_POST['role']);

    $sql = "INSERT INTO users (username, email, password, role) VALUES ('$username', '$email', '$password', '$role')";

    if ($conn->query($sql) === TRUE) {
        header("Location: user-management.php?message=User successfully added"); // Redirect with success message
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Fetch existing users
$sql = "SELECT * FROM users";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Management</title>
    <link rel="stylesheet" href="admin-style.css">
    <style>
        * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    border: none;
    outline: none;
    scroll-behavior: smooth;
    font-family: 'Poppins', sans-serif;
}

:root {
    --bg-color: #101317;
    --second-bg-color: #17191b;
    --text-color: #fff;
    --main-color: rgb(255, 34, 0);
}

html {
    font-size: 62.5%;
    overflow-x: hidden;
}

body {
    background: var(--bg-color);
    color: var(--text-color);
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 3rem 9%;
    background: rgba(0, 0, 0, 0.41);
    backdrop-filter: blur(40px);
    border-bottom: rgba(166, 166, 166, 0.242);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}

header h1 {
    font-size: 3rem;
    color: var(--text-color);
    font-weight: 600;
}

header nav ul {
    display: flex;
    align-items: center;
    list-style: none;
}

header nav ul li a {
    font-size: 1.8rem;
    color: white;
    margin-left: 4rem;
    font-weight: 500;
    transition: 0.3s ease;
    border-bottom: 3px solid transparent;
}

header nav ul li a:hover,
header nav ul li a.active {
    color: var(--main-color);
    border-bottom: 3px solid var(--main-color);
}

main {
    padding: 12rem 9% 2rem;
}

section h2 {
    font-size: 2.4rem;
    margin-bottom: 2rem;
    color: var(--main-color);
    text-shadow: 0 0 25px var(--main-color);
}

section h3 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
}

form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
    background: var(--second-bg-color);
    padding: 2rem;
    border-radius: 1rem;
}

form label {
    font-size: 1.6rem;
}

form input,
form select,
form button {
    padding: 1rem;
    font-size: 1.6rem;
    background: var(--bg-color);
    color: var(--text-color);
    border-radius: 0.5rem;
    border: 1px solid #333;
    transition: 0.3s ease;
}

form button {
    background: var(--main-color);
    cursor: pointer;
}

form button:hover {
    background: #ff5733;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: var(--second-bg-color);
    margin-bottom: 3rem;
    border-radius: 1rem;
    overflow: hidden;
}

table th,
table td {
    padding: 1.5rem;
    text-align: left;
    font-size: 1.6rem;
    border-bottom: 1px solid #333;
    color: var(--text-color);
}

table th {
    background: var(--bg-color);
}

table tr:hover {
    background: rgba(255, 34, 0, 0.1);
}

table .action-buttons a {
    color: var(--main-color);
    font-weight: 500;
    transition: 0.3s ease;
}

table .action-buttons a:hover {
    color: #ff5733;
}

footer {
    text-align: center;
    padding: 2rem 0;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 1.4rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    z-index: 100;
}

    </style>
</head>
<body>
    <header>
        <h1>Admin Dashboard</h1>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <<li><a href="user-management.php#existing-users">Manage Users</a></li>
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>User Management</h2>

            <!-- Display success message if it exists -->
            <?php
            if (isset($_GET['message'])) {
                echo "<div class='message'>{$_GET['message']}</div>";
            }
            ?>

            <!-- Add User Form -->
            <h3>Add New User</h3>
            <form action="user-management.php" method="post">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>

                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required>

                <label for="role">Role:</label>
                <select id="role" name="role" required>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <!-- Add more roles as needed -->
                </select>

                <button type="submit">Add User</button>
            </form>

            <!-- User List -->>
            <h3 id="existing-users">Existing Users</h3>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    if ($result->num_rows > 0) {
                        while($row = $result->fetch_assoc()) {
                            echo "<tr>
                                <td>{$row['id']}</td>
                                <td>{$row['username']}</td>
                                <td>{$row['email']}</td>
                                <td>{$row['role']}</td>
                                <td class='action-buttons'>
                                    <a href='delete-user.php?id={$row['id']}'>Delete</a>
                                </td>
                            </tr>";
                        }
                    } else {
                        echo "<tr><td colspan='5'>No users found</td></tr>";
                    }
                    ?>
                </tbody>
            </table>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Hackerizzz Quiz. All rights reserved.</p>
    </footer>
</body>
</html>

<?php
// Close the database connection
$conn->close();
?>
