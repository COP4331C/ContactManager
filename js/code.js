
var urlBase = 'http://18.222.70.247';
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
	document.getElementById("loginError").innerHTML = "";


	var email = document.getElementById("signupEmail").value;
	var password = document.getElementById("signupPW").value;
	var confirmPass = document.getElementById("confirmPW").value;

	if (password != confirmPass)
	{
		document.getElementById("loginError").innerHTML = "Passwords do not match";
		return;
	}

	var jsonPayload = JSON.stringify({email:email, password:password});
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
				var jsonObject = JSON.parse( xhr.responseText );

				if(jsonObject.hasOwnProperty('error') && jsonObject.error.length > 0)
				{
					// document.getElementById("contactSearchResult").innerHTML = "No contacts were found.";
					console.log("Unexpected error");
					console.log(jsonObject.error);

					document.getElementById("loginError").innerHTML = jsonObject.error;

					return;
				}

				else
				{
					document.getElementById("loginError").innerHTML = "Created successfuly. Redirecting...";

					// doLogin();
				}

			}
		}
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
	}
}

// Creates a cookie to store a user's session info
function createCookie(name, value)
{
	document.cookie = name + "=" + value + ";path=/";
}

function getCookie(cname)
{
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    // if (c.indexOf(name) == 0)
		// {
      return c.substring(name.length, c.length);
    // }
  }
  return "";
}

function doLogin()
{
	userId = 0;
	document.getElementById("loginError").innerHTML = "";

	// Grab the user's email + pass from the html (variable names pending)
	var email = document.getElementById("loginEmail").value;
	var pass = document.getElementById("loginPW").value;

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

		console.log(jsonPayload);

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
					document.getElementById("loginError").innerHTML = jsonObject.error;
					console.log("User doesn't exist");
					return;
				}

				// Otherwise, we successfuly got a user from the database.
				document.getElementById("loginError").innerHTML = "Success";

				// Create a sitewide cookie to store this info
				createCookie("id", userId.toString());

				var tempstring = getCookie("user_id");

				// Reset the username and password just for cleanliness
				document.getElementById("loginEmail").value = "";
				document.getElementById("loginPW").value = "";

				// Go to contacts.html
				console.log("Redirecting...");
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
