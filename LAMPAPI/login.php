<?php

$servername = "localhost";
$uname = "root";
$pword = "cop4331";
$databasename = "database";

// creating connections
$conn = new mysqli($servername, $uname, $pword, $databasename);

//  check connections
if(!$conn)
{
  die("Connection failed: ". $conn->connect_error);
}

else
{
  echo "Connect succesfully";
}

$sql = "SELECT * FROM `user_list` WHERE `first_name` = 'Bob' ";

if($conn->query($sql) === TRUE)
  echo "Login successful!";

else {
    echo "Error";
}
$conn->close();


?>
