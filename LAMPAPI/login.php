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
		$testEmail = "bob@bob.com";
		$email = $inData["email"];
		$sql = "SELECT id, first_name, last_name FROM user_list where email='". $email ."'";
		$result = $conn->query($sql);

		if ($result->num_rows > 0)
		{
			if (!$result)
			{
 			   trigger_error('Test #1 - invalid num_rows check ' . $conn->error);
			}

			$row = $result->fetch_assoc();
			$first_name = $row["first_name"];
			$last_name = $row["last_name"];
			$id = $row["id"];
			
			returnWithInfo($first_name, $last_name, $id );
			echo "records found successfully\n";
		}
		else
		{
			returnWithError( $email );
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
		$retValue = '{"id":0,"first_name":"","last_name":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $first_name, $last_name, $id )
	{
		$retValue = '{"id":' . $id . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
