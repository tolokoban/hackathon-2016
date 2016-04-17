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
$url = 'http://' . $_SERVERS['HTTP_HOST'] . '/' . "$page?$id";

QRcode::png($url);
?>
