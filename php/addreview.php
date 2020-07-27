<html>

<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Dosis&display=swap');
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
    $movie_id =  $_POST['movie_id'];
    $review =  $_POST['movie_review'];

    $query="SELECT * FROM `MRS`.`UserTable` WHERE `username` = '$username'";

    $result = mysqli_query($connection, $query);
    $row = mysqli_fetch_assoc($result);


    if ($row == null){
        echo "<h1>Invalid user!</h1>";

    }
    elseif ($row['username'] == $username and $row['password'] == $password){
        $query = "INSERT INTO `MRS`.`ReviewTable` (`username`, `movie_id`, `review`) VALUES ('$username', '$movie_id', '$review')";
        mysqli_query($connection, $query);
        echo "<h1>Review added successfully!</h1>";
    }
    else {
        echo "<h1>Invalid password</h1>";
    }
    ?>
</body>

</html>