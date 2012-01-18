<?php
// include ezSQL core
include_once 'lib/ez_sql_core.php';
// include ezSQL database specific component
include_once 'lib/ez_sql_mysql.php';
// initialize the database object and establish a  connection
$db = new ezSQL_mysql('root', '4vu2cet1fpka', 'cashmoney', 'localhost');
