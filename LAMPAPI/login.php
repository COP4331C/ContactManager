<?php

	$inData = getRequestInfo();

	$id = 0;
	$first_name = "";
	$last_name = "";

	$conn = new mysqli("localhost", "root", "cop4331", "database");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$email = $inData["email"];
		$pass = $inData["password"];
		$sql = "SELECT id, first_name, last_name FROM user_list where email='". $email . "' and pass = '" . $pass . "'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$first_name = $row["first_name"];
			$last_name = $row["last_name"];
			$id = $row["id"];
			
			returnWithInfo($first_name, $last_name, $id);
		}
		else
		{
			returnWithError('Error: No user with email = ' . $email . ' found.');
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
	
	function returnWithInfo( $first_name, $last_name, $id )
	{
		$retValue = '{"id":' . $id . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","message":"Records found. Welcome!"}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
