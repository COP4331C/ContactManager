<?php

$inData = getRequestInfo();

$conn = new mysqli("localhost", "root", "cop4331", "database");

if($conn->connect_error)
{
  returnWithError($conn->connect_error);
}

else
{
	$cid = $inData["cid"];
	$sql = "UPDATE contact_list SET first_name = '" . $inData["first_name"] . "', last_name= '" . $inData["last_name"] . "', phone= '" . $inData["phone"] . "', email= '" . $inData["email"] . "', address= '" . $inData["address"] . "' WHERE cid = '" . $inData["cid"] . "'";
	//returnWithError($sql);
	//Uncommen to test just a basic string that i pulled from phpMyAdmin
	//$sql = "UPDATE `contact_list` SET `email` = 'donkey@classtraitor.net' WHERE `contact_list`.`cid` = 2";

	if($conn->query($sql) === True)
	{
		//echo "Entry with CID = " . $cid . " found\n";
		$cid = $inData["cid"];
		$first_name = $inData["first_name"];
		$last_name = $inData["last_name"];
		$phone = $inData["phone"];
		$email = $inData["email"];
		$address = $inData["address"]
	
		returnWithInfo($cid, $first_name, $last_name, $phone, $email, $address);
	}
	else
	{
		//echo "Entry with CID = 2 not found\n";
		returnWithError('nothing has been updated');
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
	{	//echo $err;
		//if ($err = 'conn_err')
			//$retValue = '{"error":"Connection error"}';
		//else
			$retValue = '{"id":null,"first_name":null,"last_name":null,"error":"' . $err . '"}';

		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo($cid, $first_name, $last_name, $phone, $email, $address)
	{
		$retValue = '{"cid":' . $cid . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","phone":"'. $phone . '","email":"' . $email .  '","address":"' . $address . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}






?>
