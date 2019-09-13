<?php

$servername = "localhost";
$uname = "root";
$Pword = "cop4331";
$dbname = "database";

$conn = new mysqli($servername, $name, $pword, $databasename);

//  check connections
if(!$conn)
{
  die("Connection failed: ". $conn->connect_error);
}

else
{
  echo "Connect succesfully";
}

$sql = INSERT INTO contact_list (first_name, last_name, phone,  email, other) VALUES ('TRIET', 'BRYAN', '1234567890', 'Toawesomeforthisproject@gmail.com' , 'null');




?>
