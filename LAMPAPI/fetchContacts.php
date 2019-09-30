<?php


$conn = new mysqli("localhost", "root", "cop4331", "database");

$inData = getRequestInfo();

if ($conn->connect_error)
{
		returnWithError( $conn->connect_error );
}
else
{
	$id = $inData["id"];
	$sql = "SELECT * FROM contact_list where id='" . $id  . "'";
		//$result = $conn->query($sql);
	$result = mysqli_query($conn, $sql);
    	$json_array = array();
	
	if($result->num_rows > 0 )
	{
   		while($row = mysqli_fetch_assoc($result))
    		{
      			$json_array[] = $row;
    		}

    		returnWithInfo(json_encode($json_array));
		$conn->close();
	}
	
	else
	{
		returnWithError('Error there were no contacts for the user id = ' . $id . ' found.');
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
  	$retValue = '{"id":null,"first_name":null,"last_name":null,"error":"' . $err . '"}';
  	sendResultInfoAsJson( $retValue );
  }

  function returnWithInfo( $json_array )
  {
  	//$retValue = '{"id":' . $id . ',"first_name":"' . $first_name . '","last_name":"' . $last_name . '","message":"Records found. Welcome!"}';
  	//sendResultInfoAsJson( $retValue );
    sendResultInfoAsJson( $json_array );
  }




 ?>
