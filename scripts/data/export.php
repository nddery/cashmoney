<?php
error_reporting(E_ALL);
ini_set('display_errors', True);

if (!isset($argv[1]))
  die('You should pass the season start as the first argument.');

if (!isset($argv[2]))
  die('You should pass the season end as the second argument.');

if (!isset($argv[3]))
  die('You should pass the database name as the third argument.');

include_once 'lib/ez_sql_core.php';
include_once 'lib/ez_sql_mysql.php';
// db_user / db_password / db_name / db_host
$db = new ezSQL_mysql('root', 'root', $argv[3], 'localhost');

// [
//   {
//     name,
//     children: [
//       { player },
//       { ... }
//     ]
//   },
//   { ... }
// ]
$output = array();

// Get all teams
$teams = $db->get_results("
  SELECT    team
  FROM      salaries
  GROUP BY  team
");

foreach ($teams as $team) :
  $players = $db->get_results("
    SELECT    statistics.*,
              salaries.salary
    FROM      statistics
    LEFT JOIN salaries
      ON        statistics.player = salaries.player
    WHERE     statistics.team = '$team->team'
    ORDER BY  statistics.team
  ");

  $foo = new stdClass();
  $foo->name = $team->team;
  $foo->children = $players;

  $output[] = $foo;
endforeach;

$filename = "data.$argv[1]-$argv[2].json";
$path = dirname(dirname(dirname(__FILE__))) . '/app/data/' . $filename;
$file = file_put_contents($path, json_encode($output));

if ($file)
  exit(0);
else
  exit(1);
