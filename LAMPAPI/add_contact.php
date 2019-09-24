<?php

$inData = getRequestInfo();

$servername = "localhost";
$uname = "root";
$pword = "cop4331";
$dbname = "database";

$conn = new mysqli($servername, $uname, $pword, $dbname);

//  check connections
if($conn->conn_error)
{
  returnWithError("Connection failed: ");
}

else
{

  //$sql ="INSERT INTO contact_list (id, first_name, last_name, phone, email) VALUES('34','TRIET', 'BRYAN', 1234567890, 'Toawesomeforthisproject@gmail.com' , 'NULL')";
  $sql = "INSERT INTO `user_list` (id, first_name, last_name, phone, email) VALUES('" . $inData["id"] . "', '" . $inData["first_name"] . "', '" . $inData["last_name"] . "', '" . $inData["phone"] . "', '" . $inData["email"] .  "')";
  if($conn->query($sql) === TRUE)
  {
    echo "New record created successfully";
    $id = $inData["id"];
    $firstName = ["first_name"];
    $lastName = ["last_name"];
    $phone = ["phone"];
    $email = ["email"];
    $conn->close();
    
    returnWithInfo($id, $first_name, $last_name, $phone, $email);
    
  }
  else 
  {
      returnWithError("Contact Creation failure");
  }
  
  
  
}

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
  $retValue = '{"id":"0","firstName":"","lastName":"","phone":"","email":"","error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}
function returnWithInfo( $id, $firstName, $lastName, $email, $phone)
{
  $retValue = '{"id":"'. $id . '","first_name":"' . $firstName . '","last_name":"' . $lastName . '","phone":"'. $phone . '","email":"' . $email . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

?>
