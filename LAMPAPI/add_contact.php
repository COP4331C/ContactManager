<?php

$servername = "localhost";
$uname = "root";
$pword = "cop4331";
$dbname = "database";

$conn = new mysqli($servername, $uname, $pword, $dbname);

//  check connections
if(!$conn)
{
  die("Connection failed: ". $conn->connect_error);
}

else
{
  echo "Connect succesfully";
}

$sql ="INSERT INTO contact_list (first_name, last_name, phone, email, other) VALUES('TRIET', 'BRYAN', 1234567890, 'Toawesomeforthisproject@gmail.com' , 'NULL')";

if($conn->query($sql) === TRUE)
  echo "New record created successfully";

else {
    echo "Error";
}
$conn->close()
?>
