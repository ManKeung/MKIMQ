<?php
  header('Content-type: text/html; charset=utf-8'); // 页面编码
  $con = mysql_connect('localhost', 'root', '765139'); // 连接数据
  mysql_select_db('mkimq'); // 选择数据库
  mysql_query('set names utf8'); // 设置数据库编码
 ?>
