<?php

$inData = getRequestInfo();

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

//$sql = "INSERT INTO user_list (first_name, last_name, phone, email, other_info, email_verification) VALUES('Ben', 'clyde', '1234567890', 'awesomesauce@gmail.com', 'null', '0')";

$sql = "INSERT INTO user_list (first_name, last_name, phone, email, other_info, email_verification) VALUES('$inData["first_name"]', '$inData["last_name"]', '$inData["phone"] ', '$inData["email"]', 'null', '0')";

if($conn->query($sql) === TRUE)
{
  //echo "New record created successfully";

  $row = $result->fetch->fetch_assoc();
  $first_name = $row["first_name"];
  $last_name = $row["last_name"];
  $phone = $row["phone"];
  $email = $row["email"];


  returnWithInfo($first_name, $last_name, $phone, $email);
}
else
{
   returnWithError("Account Creation Failed!" )
}
$conn->close();

function getRequestInfo()
{
  return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
  header('Content-type: application/json');
  echo $obj;
}

function returnWithError( $err )
{
  $retValue = '{"firstName":"","lastName":"","phone":"","email":"","error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $email, $phone )
{
  $retValue = '{"first_name":"' . $first_name . '","last_name":"' . $last_name . '","phone":"'. $phone . '","email":"' . $email . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

?>
