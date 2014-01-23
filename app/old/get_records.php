<?php
error_reporting(E_ALL);
ini_set('display_errors', True);
/**
 * Get the data from the database
 *
 */

// require DB config file
require_once 'db_config.php';


// // get the information out
// $info = $db->get_results("
//   SELECT    statistics.*,
//             salaries.salary
//   FROM      statistics,
//             salaries
//   WHERE     statistics.player = salaries.player
//   GROUP BY  statistics.player
//   ORDER BY  statistics.team
// ");
// get the infomration out
$info = $db->get_results("
  SELECT    statistics.*,
            salaries.salary
  FROM      statistics
  LEFT JOIN salaries
    ON        statistics.player = salaries.player
  ORDER BY  statistics.team
");

echo json_encode($info);
