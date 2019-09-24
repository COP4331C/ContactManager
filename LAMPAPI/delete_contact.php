<?php

$inData = getRequestInfo();

$id = 0;
$firstname = "";


$conn = new mysqli("localhost", "root", "cop4331", "database");

if($conn->connect_error)
{
  returnWithError($conn->connect_error);
}

else
{
	
//  $sql = "DELETE FROM contact_list where first_name='" . $inData["first_name"] . "'and last_name='" . $inData["last_name"] . "'and phone='" . $inData["phone"] . "'and email='" . $inData["email"] . "'and id='" . $indata["id"] . "'";
  
  // Trying to see if using just id + cid makes it any easier - clyde
  //$sql = "DELETE FROM contact_list where cid='" . $inData["cid"] . "' and id='" . $inData["id"] . "'";
  $sql = "DELETE FROM contact_list where cid = '". $inData["cid"] . "' and id ='" . $inData["id"] . "'";
  $result = $conn->query($sql);
  if($result->num_rows > 0)
  {
    $row = $result->fetch->fetch_assoc();
    $cid = $row["cid"];
    $id = $row["id"];
    $first_name = $row["first_name"];
    $last_name = $row["last_name"];
    $phone = $row["phone"];
    $email = $row["email"];

    returnWithInfo($cid,$id, $first_name, $last_name, $phone, $email);
  }
  else
  {
    returnWithError("No Records Found");
  }
  $conn->close();

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
		$retValue = '{"id":0,"firstName":"","lastName":"","phone":"","email":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $cid, $id, $firstName, $lastName, $phone, $email )
	{
		$retValue = '{"id":' . $id . ',"cid":"' . $cid . ',"first_name":"' . $firstName . '","last_name":"' . $lastName . '","phone":"'. $phone . '","email":"' . $email . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}

?>
