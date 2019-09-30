var userId = 0;
var urlBase = 'http://ec2-18-191-105-89.us-east-2.compute.amazonaws.com/ContactManager';
var extension = "php";

jQuery(function($) {
	$("#contactPhone").mask("999-999-9999");
});

// Access a user's session cookie to get their user id from the login screen
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
    //if (c.indexOf(name) == 0)
		//{
      return c.substring(name.length, c.length);
    //}
  }
  return "";
}

function cookieTest()
{
	var tempstring = getCookie("user_id");
	// alert(tempstring);
}

// Refresh the table of contacts based on the userId given.
function fetchContactList(userId)
{
	console.log("Fetching contacts...");
	//   document.getElementById("contactRetrieveResult").innerHTML = "";
	// var jsonPayload = '{"id" : "' + userId + '"}';

	// TEMPORARY user id Test
	var jsonPayload = JSON.stringify({id:userId});

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
					console.log("No contacts found");
					return;
				}

				console.log("Contacts found");

				// this should give the number of json entries we were returned?
				var numContacts = jsonObject.cid.length;
				// just the number of cells we need to put into the table per contact
				var numCells = 6;

				// Reference to Bryan's html table to work off of
				var tableRef = document.getElementById('contactTable').getElementsByTagName('tbody')[0];

				for (i = 0; i < numContacts; i++)
				{
					// Reference to the current row
					var newRow = tableRef.insertRow(tableRef.rows.length);

					for (j = 0; j < numCells; j++)
					{
						// Reference to the current cell
						var newCell = newRow.insertCell(j);
						// String to store the text we're adding to this cell
						var cellString;

						// Detect which attribute we need to add
						switch(j)
						{
							case 0:
								// Insert a checkbox??
								break;
							case 1:
								cellString = jsonObject.first_name[i];
								break;
							case 2:
								cellString = jsonObject.last_name[i];
								break;
							case 3:
								cellString = jsonObject.address[i];
								break;
							case 4:
								cellString = jsonObject.email[i];
								break;
							case 5:
								cellString = jsonObject.phone[i];
								break;
							default:
								break;
						}

						// Not sure if we'll get nulls but just in case
						if (cellString == null)
							cellString = "";

						// Make a new text node out of cellString
						var newText = document.createTextNode(cellString);

						// Add newText to the current cell
						newCell.appendChild(newText);

					}
				}
      }
    };
   }
   catch(err)
   {
      document.getElementById("contactSearchResult").innerHTML = err.message;
   }
}

function editClick() {
	var table = document.getElementById("contactTable");
	var contactPopup = document.getElementById("contactForm").children[0].children[0].children[1];
	var selectedCount = 0;
	var selectedRow = null;

	for (var i = 1, row; row = table.rows[i]; i++) {
		if (row.cells[0].children[0].checked == true) {
			selectedCount++;
			selectedRow = row;
		}
	}

	if (selectedCount == 1) {
		clearPopup();
		$("#contactForm").data("editing", true);
		$("#contactForm").data("row", selectedRow);
		$("#contactForm").modal('show');

		for (var i = 0; i < 5; i++)
			contactPopup.children[i].children[1].value = selectedRow.cells[i+1].innerText;
	}
}

function checkAll() {
	var table = document.getElementById("contactTable");

	for (var i = 1, row; row = table.rows[i]; i++)
		row.cells[0].children[0].checked = table.rows[0].cells[0].children[0].checked;
}

function deleteClick() {
	var rows = [];
	var table = document.getElementById("contactTable");
	var found = true;
	var foundCount = 0;
	var msg = "Are you sure you want to delete ";

	for (var i = 1, row; row = table.rows[i]; i++) {
		if (row.cells[0].children[0].checked == true)
			foundCount++;
	}

	console.log(foundCount);
	if (foundCount == 1)
		msg = msg.concat("this contact?");
	else if (foundCount > 0)
		msg = msg.concat("these ").concat(foundCount).concat(" contacts?");

	if (confirm(msg)) {
		while (found) {
			found = false;

			for (var i = 1, row; row = table.rows[i]; i++) {
				if (row.cells[0].children[0].checked == true) {
					found = true;
					table.deleteRow(row.rowIndex);
					break;
				}
			}
		}
	}
}

function clearPopup() {
	var contactModal, contactPopup;

	contactModal = document.getElementById("contactForm");
	if (contactModal) {
		contactPopup = document.getElementById("contactForm").children[0].children[0].children[1];

		for (var i = 0; i < 5; i++)
			contactPopup.children[i].children[1].value = "";
	}

	$("#contactForm").data("editing", false);
}

function filterTable() {
	var search = document.getElementById("searchBox");
	var table = document.getElementById("contactTable");
	var txt;

	for (var i = 1, row; row = table.rows[i]; i++) {
		for (var j = 1, col; col = row.cells[j]; j++) {
			if (col.textContent.toUpperCase().includes(search.value.toUpperCase())) {
				row.style.display = "";
				break;
			}
			else
				row.style.display = "none";
		}
	}
}

function getNextCid() {
	return "cid3";
}

function saveClick() {
	var table = document.getElementById("contactTable");
	var row = $("#contactForm").data("row");
	var args, cid, blank;
	var contactPopup = document.getElementById("contactForm").children[0].children[0].children[1];
	var newRowString = "";

	blank = true;
	for (var i = 0; i < 5; i++) {
		if (contactPopup.children[i].children[1].value.length > 0) {
			blank = false;
			break;
		}
	}

	if (!blank) {
		if ($("#contactForm").data("editing")) {
			args = [row.id];

			for (var i = 0; i < 5; i++) {
				row.cells[i+1].innerText = contactPopup.children[i].children[1].value;
				args.push(contactPopup.children[i].children[1].value);
			}
		}

		else {
			cid = getNextCid();
			newRowString = newRowString.concat("<tr id=\"", cid, "\"><td align=\"center\"><input type=\"checkbox\" name=\"check\"/></td>");
			args = [cid];

			for (var i = 0; i < 5; i++) {
				newRowString = newRowString.concat("<td>", contactPopup.children[i].children[1].value, "</td>");
				args.push(contactPopup.children[i].children[1].value);
			}

			newRowString = newRowString.concat("</tr>");
			$('#contactTable').find('tbody').append(newRowString);
		}

		$("#contactForm").modal('hide');
	}
}
