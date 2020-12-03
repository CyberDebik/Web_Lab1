<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] != 'GET') {
	http_response_code(400);
	exit;
}
$start = microtime(true);

if (!isset($_SESSION['arr'])) $_SESSION['arr'] = array();

date_default_timezone_set('Europe/Moscow');
$x = (float)$_GET["X"];
$y = (float)$_GET["Y"];
$r = (float)$_GET["R"];
if (checkData($x, $y, $r)) {
	$coordsStatus = checkCoordinates($x, $y, $r);
	$currentTime = date("H : i : s");
	$benchmarkTime = microtime(true) - $_SERVER["REQUEST_TIME_FLOAT"];
	echo "<table id='resultTable'>
				<tr>
					<td>X</td>
					<td>Y</td>
					<td>R</td>
					<td>Результат</td>
					<td>Время t запроса</td>
					<td>Время t выполнения</td>
				</tr>";
	array_push($_SESSION["arr"], "<tr>
<td>$x</td>
<td>$y</td>
<td>$r</td>
<td>$coordsStatus</td>
<td>$currentTime</td>
<td>$benchmarkTime</td>
</tr>");
	foreach ($_SESSION["arr"] as $item) echo $item;
	echo "</table>";
} else {
	echo "Wrong data format";
}

function checkData($x, $y, $r)
{
	return in_array($x, array(-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2)) &&
		is_numeric($y) && ($y > -5 && $y < 3) &&
		in_array($r, array(1, 1.5, 2, 2.5, 3));
}

function checkCoordinates($x, $y, $r)
{
	if ((($x >= -$r) && ($x <= 0) && ($y <= 0) && ($y >= -$r)) ||
		(($x >= 0) && ($x <= $r) && ($y >= 0) && ($y <= $r)) ||
		(($x ** 2 + $y ** 2) <= (($r ** 2) / 2) && ($x >= 0) && ($y <= 0))) {
		return "да";
	} else {
		return "нет";
	}
}

