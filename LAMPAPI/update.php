<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "root", "cop4331", "database");

if(!$conn->connect_error)
{
  returnWithError($conn->connect_error);
}

else
{
	// $sql = "UPDATE contact_list SET first_name = '" . $inData["first_name"] . "', last_name= '" . $inData["last_name"] . "', phone= '" . $inData["phone"] . "', email= '" . $inData["email"] . "' WHERE contact list . cid = '" . $inData["cid"] . "'";

	$sql = "UPDATE `contact_list` SET `email` = 'donkey@classtraitor.net' WHERE `contact_list`.`cid` = 2";

	$result = $conn->query($sql);
	if($result->num_row > 0)
	{
		$row = $result->fetch->fetch_assoc();
		$cid = $row["cid"];
		$first_name = $row["first_name"];
		$last_name = $row["last_name"];
		$phone = $row["phone"];
		$email = $row["email"];
	
		returnWithInfo($id, $first_name, $last_name, $phone, $email);
	}
	else
	{
		returnWithError('No Records Found');
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
		$retValue = '{"id":null,"first_name":null,"last_name":null,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"cid":' . $cid . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","phone":"'. $phone . '","email":"' . $email . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}






?>
