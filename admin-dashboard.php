<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <link rel="stylesheet" href="admin-style.css">
    <style>
   :root {
    --bg-color: #101317;
    --second-bg-color: #17191b;
    --text-color: #fff;
    --main-color: rgb(255, 34, 0);
}

html {
    font-size: 67.5%;
    overflow-x: hidden;
}

body {
    background-image: url('https://as1.ftcdn.net/v2/jpg/01/53/97/96/1000_F_153979609_i6SGjTHQdBknuxRcgtnVvx8G1ezK9Xoi.jpg');
    color: var(--text-color);
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 2.5rem 5%;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(40px);
    border-bottom: rgba(166, 166, 166, 0.242);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}

header h1 {
    font-size: 3.2rem;
    color: var(--text-color);
    font-weight: 600;
}

header nav ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
}

header nav ul li {
    margin-left: 2rem;
}

header nav ul li a {
    font-size: 2rem;
    color: white;
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
    padding: 10rem 5% 3rem;
}

section h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: var(--main-color);
    text-shadow: 0 0 25px var(--main-color);
}

section h3 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: var(--text-color);
}

footer {
    text-align: center;
    padding: 2rem 0;
    background: var(--bg-color);
    color: var(--text-color);
    font-size: 1.6rem;
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
                <li><a href="index.html">Home</a></li>
                <li><a href="user-management.html">Manage Users</a></li>
                <li><a href="settings.html">Settings</a></li>
                <li><a href="logout.php">Logout</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>Welcome, Admin!</h2>
            <p>Here you can manage users, configure site settings, and perform other administrative tasks.</p>

            <div>
                <h3>User Management</h3>
                <p>View and manage registered users. <a href="user-management.php">Go to User Management</a></p>
            </div>

            <div>
                <h3>Site Settings</h3>
                <p>Configure site settings such as appearance, features, and more. <a href="settings.html">Go to Settings</a></p>
            </div>

            <!-- Additional admin functionalities can be added here -->
        </section>
    </main>
    
    <footer>
        <p>&copy; 2024 Hackerizzz Quiz. All rights reserved.</p>
    </footer>
</body>
</html>
