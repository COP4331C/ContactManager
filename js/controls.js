function fillExisting() {
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
	
	console.log(selectedCount);

	if (selectedCount == 0) {
		
	}
		
	else if (selectedCount == 1) {
		contactPopup.children[0].children[1].value = selectedRow.cells[1].innerHTML;
		contactPopup.children[1].children[1].value = selectedRow.cells[2].innerHTML;
		contactPopup.children[2].children[1].value = selectedRow.cells[3].innerHTML;
		contactPopup.children[3].children[1].value = selectedRow.cells[4].innerHTML;
		contactPopup.children[4].children[1].value = selectedRow.cells[5].innerHTML;
	}
	
	else {
		
	}
}

function filterTable() {
	var search = document.getElementById("searchBox");
	var table = document.getElementById("contactTable");
	var txt;
	
	for (var i = 1, row; row = table.rows[i]; i++) {
		for (var j = 1, col; col = row.cells[j]; j++) {
			if (col.innerText.includes(search.value))
				row.style.display = "";
			else
				row.style.display = "none";
		}
	}
}