-- Export 
SELECT    statistics.*, salaries.salary 
FROM      statistics,   salaries 
WHERE     statistics.player = salaries.player 
GROUP BY  statistics.player 
ORDER BY  statistics.team

-- Create tables
CREATE TABLE `salaries` (
  `player` varchar(255) NOT NULL DEFAULT '',
  `salary` float DEFAULT NULL,
  `team` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `statistics` (
  `player` varchar(255) NOT NULL DEFAULT '',
  `team` varchar(3) NOT NULL DEFAULT '',
  `pos` varchar(3) NOT NULL DEFAULT '',
  `gp` int(11) DEFAULT NULL,
  `g` int(11) DEFAULT NULL,
  `a` int(11) DEFAULT NULL,
  `p` int(11) DEFAULT NULL,
  `pm` int(11) DEFAULT NULL,
  `pim` int(11) DEFAULT NULL,
  `ppg` int(11) DEFAULT NULL,
  `ppp` int(11) DEFAULT NULL,
  `shg` int(11) DEFAULT NULL,
  `shp` int(11) DEFAULT NULL,
  `gw` int(11) DEFAULT NULL,
  `ot` int(11) DEFAULT NULL,
  `s` int(11) DEFAULT NULL,
  `sp` float DEFAULT NULL,
  `toi` varchar(11) NOT NULL DEFAULT '',
  `sft` float NOT NULL,
  `fop` float NOT NULL,
  PRIMARY KEY (`player`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
