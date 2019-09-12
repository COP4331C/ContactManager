<?php

$servername = "localhost";
$uname = "root";
$pword = "cop4331";
$databasename = "test_database";

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

$sql = "INSERT INTO Login (Uname, Pword) VALUES('John TWO', 'BEN IS THE BEST')";

if($conn->query($sql) === TRUE)
  echo "New record created successfully";

else {
    echo "Error";
}
$conn->close();


?>
