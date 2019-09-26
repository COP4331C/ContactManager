
var urlBase = 'http://ec2-18-191-105-89.us-east-2.compute.amazonaws.com/ContactManager';
var extension = "php";

var userId = 0;
var contactId = 0;
var firstName = "";
var lastName = "";

function goLogin()
{
	hideOrShow("loginDiv", true);
	hideOrShow("welcomeDiv", false);
	hideOrShow("createDiv", false);
}

function goCreateAccount()
{
	hideOrShow("loginDiv", false);
	hideOrShow("welcomeDiv", false);
	hideOrShow("createDiv", true);
}

function doCreateAccount()
{
	userId = 0;
	document.getElementById("loginResult").innerHTML = "";

	var login = document.getElementById("cloginName").value;
	var password = document.getElementById("cloginPassword").value;
	var phone = document.getElementById("phone").value;
	var first_name = document.getElementById("firstName").value;
	var last_name = document.getElementById("lastName").value;
	var address = document.getElementById("address").value;

// 	var jsonPayload = '{"first_Name" : "' + first_Name + '", "last_Name" : "' + last_Name + '", "phone" : "' + phone + '", "email" : "' + login + '", "password" : "' + password + '", "address" : "' + address + '"}';
	var jsonPayload = JSON.stringify({first_name:first_name, last_name:last_name, phone:phone, email:clogin, password:password, address:address});
	var url = urlBase + '/LAMPAPI/create_account.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				alert(xhr.responseText);

				var jsonObject = JSON.parse( xhr.responseText );

				userId = jsonObject.id;
				alert(userId);

				if( userId < 1 )
				{
					document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
					return;
				}

				firstName = jsonObject.firstName;
				lastName = jsonObject.lastName;

				document.getElementById("userName").innerHTML = firstName + " " + lastName;

				document.getElementById("cloginName").value = "";
				document.getElementById("cloginPassword").value = "";
				document.getElementById("phone").value = "";
				document.getElementById("firstName").value = "";
				document.getElementById("lastName").value = "";
				document.getElementById("address").value = "";

				hideOrShow( "loginDiv", false);
				hideOrShow("welcomeDiv", false);
				hideOrShow("createDiv", false);
				hideOrShow( "loggedInDiv", true);
				hideOrShow( "accessUIDiv", true);

			}
		}
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

function goBackHome()
{
	// document.getElementById("loginName").value = "";
	// document.getElementById("loginPassword").value = "";
	// document.getElementById("cloginName").value = "";
	// document.getElementById("cloginPassword").value = "";
	// document.getElementById("phone").value = "";
	// document.getElementById("firstName").value = "";
	// document.getElementById("lastName").value = "";
	// document.getElementById("address").value = "";
	hideOrShow("loginDiv", false);
	hideOrShow("welcomeDiv", true);
	hideOrShow("createDiv", false);
}

function doLogin()
{
	userId = 0;
	document.getElementById("loginResult").innerHTML = "";

	// Grab the user's email + pass from the html (variable names pending)
	var email = document.getElementById("email").value;
	var pass = document.getElementById("password").value;

	// Glue together some json
	var jsonPayload = JSON.stringify({email:email, password:pass});
	var url = urlBase + '/LAMPAPI/login.' + extension;

	// Prepare to send
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

// 	var url = urlBase + '/contacts.html';
	try
	{
		// Send the payload
		xhr.send(jsonPayload);

		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Parse the response from the server
				var jsonObject = JSON.parse(xhr.responseText);

				// Get UID from json. If json does not have an updated UID, print error.
				userId = jsonObject.id;
				if (userId < 1)
				{
					document.getElementById("loginResult").innerHTML = jsonObject.error;
					return;
				}

				// Otherwise, we successfuly got a user from the database.
				document.getElementById("loginResult").innerHTML = "Success";
				// Reset the username and password just for cleanliness
				document.getElementById("email").value = "";
				document.getElementById("password").value = "";

				// Go to contacts.html
				window.location.replace(urlBase + "/contacts.html");
			}
		}
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}

}

function doLogout()
{
	userId = 0;
	firstName = "";
	lastName = "";

	hideOrShow( "loggedInDiv", false);
	hideOrShow( "accessUIDiv", false);
	hideOrShow("createDiv", false);
	hideOrShow( "loginDiv", false);
	hideOrShow("welcomeDiv", true);
}

function hideOrShow( elementId, showState )
{
	var vis = "visible";
	var dis = "block";
	if( !showState )
	{
		vis = "hidden";
		dis = "none";
	}

	document.getElementById( elementId ).style.visibility = vis;
	document.getElementById( elementId ).style.display = dis;
}
