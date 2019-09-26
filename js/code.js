
var urlBase = 'http://ec2-18-191-105-89.us-east-2.compute.amazonaws.com/ContactManager';
var extension = "php";

var userId = 0;
var contactId = 0;
var firstName = "";
var lastName = "";

function goLogin()
{
	// Nullify some variables for error detection
	userId = 0;

	// Grab the user's email + pass from the html
	var email = document.getElementById("uName").value;
	var pass = document.getElementById("pass").value;

	// 

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
	var first_Name = document.getElementById("firstName").value;
	var last_Name = document.getElementById("lastName").value;
	var address = document.getElementById("address").value;

	//var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var jsonPayload = '{"first_Name" : "' + first_Name + '", "last_Name" : "' + last_Name + '", "phone" : "' + phone + '", "email" : "' + login + '", "password" : "' + password + '", "address" : "' + address + '"}';
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
	document.getElementById("loginName").value = "";
	document.getElementById("loginPassword").value = "";
	document.getElementById("cloginName").value = "";
	document.getElementById("cloginPassword").value = "";
	document.getElementById("phone").value = "";
	document.getElementById("firstName").value = "";
	document.getElementById("lastName").value = "";
	document.getElementById("address").value = "";
	hideOrShow("loginDiv", false);
	hideOrShow("welcomeDiv", true);
	hideOrShow("createDiv", false);
}

function doLogin()
{
	userId = 0;
	firstName = "";
	lastName = "";

	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;

	document.getElementById("loginResult").innerHTML = "";

// 	var jsonPayload = '{"login" : "' + login + '", "password" : "' + password + '"}';
	var jsonPayload = '{"email" : "' + login + '", "pass" : "' + password + '"}';
	var url = urlBase + '/LAMPAPI/login.' + extension;
// 	var url = urlBase + '/contacts.html';

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

// 		xhr.onreadystatechange = function();

		var jsonObject = JSON.parse( xhr.responseText );

		userId = jsonObject.id;

		if( userId < 1 )
		{
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}

		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;

		document.getElementById("userName").innerHTML = firstName + " " + lastName;

		document.getElementById("loginName").value = "";
		document.getElementById("loginPassword").value = "";

		hideOrShow( "loggedInDiv", true);
		hideOrShow( "accessUIDiv", true);
		hideOrShow( "loginDiv", false);
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

function addColor()
{
	var newColor = document.getElementById("colorText").value;
	document.getElementById("colorAddResult").innerHTML = "";

	var jsonPayload = '{"color" : "' + newColor + '", "userId" : ' + userId + '}';
	var url = urlBase + '/AddColor.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				document.getElementById("colorAddResult").innerHTML = "Color has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorAddResult").innerHTML = err.message;
	}

}

function searchColor()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("colorSearchResult").innerHTML = "";

	var colorList = document.getElementById("colorList");
	colorList.innerHTML = "";

	var jsonPayload = '{"search" : "' + srch + '"}';
	var url = urlBase + '/SearchColors.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				hideOrShow( "colorList", true );

				document.getElementById("colorSearchResult").innerHTML = "Color(s) has been retrieved";
				var jsonObject = JSON.parse( xhr.responseText );

				var i;
				for( i=0; i<jsonObject.results.length; i++ )
				{
					var opt = document.createElement("option");
					opt.text = jsonObject.results[i];
					opt.value = "";
					colorList.options.add(opt);
				}
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("colorSearchResult").innerHTML = err.message;
	}

}
