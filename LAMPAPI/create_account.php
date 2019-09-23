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

$sql = "INSERT INTO user_list (email, pass, first_name, last_name, phone, email) VALUES($inData["email"]', inData["pass"], $inData["first_name"]', '$inData["last_name"]', '$inData["phone"]', '$inData["email"]')";
$result = $conn->query($sql);
if($result->num_row <= 0)
{
    $row = $result->fetch->fetch_assoc();
    $email = $row["email"];
    $pass = $row["pass"]
    $first_name = $row["first_name"];
    $last_name = $row["last_name"];
    $phone = $row["phone"];
    $email = $row["email"];

    returnWithInfo($email, $pass, $first_name, $last_name, $phone, $email);
 
}
else
{
    returnWithError( "Contact Failed to be added" );
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
}

function returnWithInfo($email, $pass, $first_name, $last_name, $phone, $email);
{
	$retValue = '{"email":"' . $email . '","pass":"' . $pass . '","first_name":"' . $first_name . '","last_name":"' . $last_name . '","phone":"'. $phone . '","email":"' . $email .'","message":"Contact has been added!"}';
	sendResultInfoAsJson( $retValue );
}


?>
