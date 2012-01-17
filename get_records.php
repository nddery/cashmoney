<?php
error_reporting(E_ALL);
ini_set('display_errors', True);
/**
 * Get the data from the database
 *
 */

// include ezSQL core
include_once 'lib/ez_sql_core.php';
// include ezSQL database specific component
include_once 'lib/ez_sql_mysql.php';
// initialize the database object and establish a  connection
$db = new ezSQL_mysql('root', '4vu2cet1fpka', 'cashmoney', 'localhost');


// get the infomration out
$info = $db->get_results("
  SELECT    statistics.*,
            salaries.salary
  FROM      statistics,
            salaries
  WHERE     statistics.player = salaries.player
  GROUP BY  statistics.player
  ORDER BY  statistics.team
");

print_r($info);
