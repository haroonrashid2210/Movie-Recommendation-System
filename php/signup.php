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
    $email =  $_POST['email'];
    $password =  $_POST['password'];

    // checking if username or email already exists

    $query="SELECT * FROM `MRS`.`UserTable` WHERE `username` = '$username'";

    $result = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($result);

    // if username is available
    if ($row != null){
        echo "<h1>username exist!</h1>";
    }
    else {
        $query="SELECT * FROM `MRS`.`UserTable` WHERE `email` = '$email'";

        $result = mysqli_query($connection, $query);
        $row = mysqli_fetch_assoc($result);

        // if email is available
        if ($row != null) {
            echo "<h1>email exist!</h1>";
        }
        else {
            $query = "INSERT INTO `MRS`.`UserTable` (`username`, `email`, `password`) VALUES ('$username', '$email', '$password')";
            mysqli_query($connection, $query);
            echo "<h1>Registered successfully!</h1>";
        }
    }
    ?>
</body>

</html>