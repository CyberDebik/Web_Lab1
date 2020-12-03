let x, y, r;

window.onload = function () {
	let buttons = document.querySelectorAll("input[name=R]");
	buttons.forEach(click)

	function click(element) {
		element.onclick = function () {
			r = this.value;
			buttons.forEach(function (element) {
				element.style.boxShadow = "";
				element.style.transform = "";
			});
			this.style.boxShadow = "0 0 10px 1px #569099";
			this.style.transform = "scale(1.05)"
		}
	}
}

function check() {
	let message = "";
	let checkX;
	let checkY;
	let checkR;
	try {
		x = document.querySelector("input[type=radio]:checked").value;
		checkX = true;
	} catch (err) {
		message += "Значение X не выбрано\n";
		checkX = false;
	}

	y = document.querySelector("input[name=Y-input]").value.replace(",", ".");
	if (y[0] === "-") {
		y = y.substring(0, 8);
	} else {
		y = y.substring(0, 7);
	}
	if (y === "") {
		message += "Y не введён\n";
		checkY = false;
	} else if (isNaN(parseFloat(y) && !isFinite(y))) {
		message += "Y не число\n";
		checkY = false;
	} else if (!((y > -5) && (y < 3))) {
		message += "Y не входит в область допустимых значений\n";
		checkY = false;
	} else {
		checkY = true;
	}

	if (!isNaN(r) && isFinite(r) && r != null) {
		checkR = true;
	} else {
		message += "Значение R не выбрано\n";
		checkR = false;
	}
	if (!(message === "")) {
		alert(message);
	}
	if (checkX == true && checkY == true && checkR == true) {
		return true;
	} else {
		return false;
	}
}

function ask() {
	if (check()) {
		$("#resultTable").remove();
		$.get('answer.php', {
			"X": encodeURIComponent(x),
			"Y": encodeURIComponent(y),
			"R": encodeURIComponent(r),
		}, function (serverAnswer) {
			document.getElementById("output").innerHTML = serverAnswer;
		});
	}
}

function erase() {
	x = null;
	y = null;
	r = null;
	document.getElementById("-2.0").checked = false;
	document.getElementById("-1.5").checked = false;
	document.getElementById("-1.0").checked = false;
	document.getElementById("-0.5").checked = false;
	document.getElementById("0.0").checked = false;
	document.getElementById("0.5").checked = false;
	document.getElementById("1.0").checked = false;
	document.getElementById("1.5").checked = false;
	document.getElementById("2.0").checked = false;
	document.getElementById("Y").value = "";
	let buttons = document.querySelectorAll("input[name=R]");
	buttons.forEach(function (element) {
		element.style.boxShadow = "";
		element.style.transform = "";
	});
}
