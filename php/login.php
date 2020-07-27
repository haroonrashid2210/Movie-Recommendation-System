<html>

<head>
    <style>
        body {
            margin: 0;
            background: #020d18;
            font-family: Inconsolata, monospace;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
        }
    </style>
</head>



<body>
    <?php
    $connection = mysqli_connect("localhost", "root", "");

    if (!$connection) {
        die('Could not connect: ' . mysqli_connect_error());
    }

    $username = $_POST['username'];
    $password =  $_POST['password'];

    $query="SELECT * FROM `MRS`.`UserTable` WHERE `username` = '$username'";

    $result = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($result);


    if ($row == null){
        echo "<h1>Invalid user!</h1>";

    }
    elseif ($row['username'] == $username and $row['password'] == $password){
        echo "<h1>Logged in successfully</h1>";
    }
    else {
        echo "<h1>Invalid password</h1>";
    }
    ?>
</body>

</html>