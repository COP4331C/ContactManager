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
  $sql2 = "SELECT cid FROM contact_list where id='". $inData["id"] . "' and first_name = '" . $inData["first_name"] . "' and last_name = '" . $inData["last_name"] . "' and phone = '" . $inData["phone"] . "' and email = '" . $inData["email"] .  "' and address = '" . $inData["address"] . "'";
  if($conn->query($sql) === TRUE)
  {
    $result = $conn->query($sql2);
    if($result->num_rows > 0)
    {
      echo "New record created successfully";
      $row = $result->fetch_assoc();
      $cid = $row["cid"];
      echo $cid ;
      $id = $inData["id"];
      $firstName = $inData["first_name"];
      $lastName = $inData["last_name"];
      $phone = $inData["phone"];
      $email = $inData["email"];
      $address = $inData["address"];
      $conn->close();
    }
    
    returnWithInfo($id,$cid, $firstName, $lastName, $phone, $email, $address);
    
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
  $retValue = '{"id":"'. $id . '","cid":"'. $cid . '","first_name":"' . $firstName . '","last_name":"' . $lastName . '","phone":"'. $phone . '","email":"' . $email . '","address":"' . $address . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

?>
