
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
	var jsonPayload = JSON.stringify({first_name:first_name, last_name:last_name, phone:phone, email:login, password:password, address:address});
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

				fetchContactList(userId);
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

// Refresh the table of contacts based on the userId given.
function fetchContactList(userId)
{
	//   document.getElementById("contactRetrieveResult").innerHTML = "";
	var jsonPayload = '{"id" : "' + userId + '"}';
  var url = urlBase + 'LAMPAPI/fetchContacts.' + extension;
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try
  {
  	xhr.send(jsonPayload);

    xhr.onreadystatechange = function()
    {
    	if (this.readyState == 4 && this.status == 200)
      {
      	var jsonObject = JSON.parse(xhr.responseText);
        //contactId = jsonObject.tableId;
        if(jsonObject.error.length > 0)
			  {
					// document.getElementById("contactSearchResult").innerHTML = "No contacts were found.";
					return;
				}

        var i;
				// runs i times, where i = number of ids found
        for (i = 0; i < jsonObject.cid.length; i++)
				{
		    	var table = document.getElementById("contactTable");
		      var tr = document.createElement("tr");
		      s = jsonObject.userId[i];

					tr.setAttribute("cid" + s);
		      tr.innerHTML =
					'<td>' + jsonObject.first_name[i] + '</td>' +
		      '<td>' + jsonObject.last_name[i] + '</td>' +
					'<td>' + jsonObject.address[i] + '</td>' +
		      '<td>' + jsonObject.email[i] + '</td>' +
		      '<td>' + jsonObject.phone[i] + '</td>';
		      table.appendChild(tr);
				}
      }
    };
   }
   catch(err)
   {
      document.getElementById("contactSearchResult").innerHTML = err.message;
   }
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
