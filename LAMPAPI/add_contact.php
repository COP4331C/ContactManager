<?php

$inData = getRequestInfo();

$servername = "localhost";
$uname = "root";
$pword = "cop4331";
$dbname = "database";

$conn = new mysqli($servername, $uname, $pword, $dbname);

//  check connections
/*if($conn->conn_error)
{
  returnWithError("Connection failed: ");
}*/

//else
//{

  //$sql ="INSERT INTO contact_list (id, first_name, last_name, phone, email) VALUES('34','TRIET', 'BRYAN', 1234567890, 'Toawesomeforthisproject@gmail.com' , 'NULL')";
  $sql = "INSERT INTO `contact_list` (id, first_name, last_name, phone, email, address) VALUES('" . $inData["id"] . "', '" . $inData["first_name"] . "', '" . $inData["last_name"] . "', '" . $inData["phone"] . "', '" . $inData["email"] . "', '" . $inData["address"] . "')";
  if($conn->query($sql) === TRUE)
  {
    echo "New record created successfully";
    $id = $inData["id"];
    $firstName = $inData["first_name"];
    $lastName = $inData["last_name"];
    $phone = $inData["phone"];
    $email = $inData["email"];
    $address = $inData["address"];
    $conn->close();
    
    returnWithInfo($id, $firstName, $lastName, $phone, $email, $address);
    
  }
  else 
  {
      returnWithError("Contact Creation failure");
  }
  
  
  
//}

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
  $retValue = '{"id":"0","firstName":"","lastName":"","phone":"","email":"","address":"","error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}
function returnWithInfo( $id, $firstName, $lastName, $phone, $email, $address)
{
  $retValue = '{"id":"'. $id . '","first_name":"' . $firstName . '","last_name":"' . $lastName . '","phone":"'. $phone . '","email":"' . $email . '","address":"' . $address . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

?>
