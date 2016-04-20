<?php
include("qrlib.php");

$page = '';
$id = "";
foreach ($_GET as $key => $val) {
  if ($key == 'id') {
    $id = $val;
  }
  else if ($key == 'page') {
    $page = $val;
  }
}
$url = "http://tolokoban.org/hackathon/$page?$id";

QRcode::png($url);
?>
