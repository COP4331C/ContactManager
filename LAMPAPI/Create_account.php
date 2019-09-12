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

$sql = "INSERT INTO user_list (first_name, last_name, phone, email, other_info, email_verification) VALUES('Ben', 'clyde', '1234567890', 'awesomesauce@gmail.com', 'null', '0')";

if($conn->query($sql) === TRUE)
  echo "New record created successfully";

else {
    echo "Error";
}
$conn->close();


?>
