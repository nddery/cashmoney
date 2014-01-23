SELECT    statistics.*, salaries.salary 
FROM      statistics,   salaries 
WHERE     statistics.player = salaries.player 
GROUP BY  statistics.player 
ORDER BY  statistics.team
