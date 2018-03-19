<?php
  require_once('./connect.php');
  $username = $_REQUEST['userval'];
  $email = $_REQUEST['emailval'];
  $phone = $_REQUEST['phoneval'];
  $msg = htmlspecialchars($_REQUEST['msgval']);
  $timess = $_REQUEST['timeval'];

  $sql = "INSERT INTO test(name, email, phone, msg, timess) VALUES('$username', '$email', '$phone', '$msg', '$timess')"; // 添加到数据库
  $query = mysql_query($sql);

  if($query) {
    echo '感谢您在百忙当中的填写，在此非常感谢，我已收到';
  } else{
    echo '服务器或数据库出错';
  }
 ?>
