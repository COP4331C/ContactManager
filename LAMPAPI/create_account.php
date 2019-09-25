<?php

$inData = getRequestInfo();

$servername = "localhost";
$uname = "root";
$pword = "cop4331";
$databasename = "database";

// creating connections
$conn = new mysqli($servername, $uname, $pword, $databasename);

//  check connections
if($conn->conn_error)
{
  returnWithError("ConnectionError");
}

else
{
	//$sql = "INSERT INTO user_list (first_name, last_name, phone, email, other_info, email_verification) VALUES('Ben', 'clyde', '1234567890', 'awesomesauce@gmail.com', 'null', '0')";

	$sql = "INSERT INTO `user_list` (first_name, last_name, phone, email, pass, address) VALUES('" . $inData["first_name"] . "', '" . $inData["last_name"] . "', '" . $inData["phone"] . "', '" . $inData["email"] ."','" . $inData["password"] . "','". $inData["address"] . "')";

	if($conn->query($sql) === TRUE)
	{
  	 echo "New record created successfully";

  	//$row = $result->fetch->fetch_assoc();
  	//$first_name = $row["first_name"];
  	$first_name = $inData["first_name"];
  	//$last_name = $row["last_name"];
  	$last_name = $inData["last_name"];
  	//$phone = $row["phone"]; 
  	$phone = $inData["phone"];
  	//$email = $row["email"];
  	$email = $inData["email"];
	$pass = $inData["password"];
	$address = $inData["address"];
  	$conn->close();

  	returnWithInfo($first_name, $last_name, $phone, $email, $pass, $address);
	}
	
	else
	{
  	returnWithError("Account Creation Failed!");
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
  $retValue = '{"firstName":"","lastName":"","phone":"","email":"","error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}

function returnWithInfo( $firstName, $lastName, $email, $phone, $password, $address )
{
  $retValue = '{"first_name":"' . $firstName . '","last_name":"' . $lastName . '","phone":"'. $phone . '","email":"' . $email . '","password":"' . $password . '","address":"' . $address . '","error":""}';
  sendResultInfoAsJson( $retValue );
}

?>
