# cashmoney

## visualizing the national hockey league 

This project consists of building a data visualization contrasting the National Hockey League (NHL) players’ plus/minus score against their salary. Wikipedia define the plus/minus statistic as following: “plus-minus statistic is increased by one (“plus”) for each player on the ice for the team scoring the goal; the plus-minus statistic is decreased by one (“minus”) for each player on the ice for the other team on which the goal is scored”.

The idea behind this project is to create a visually compelling method of analyzing players’ performance and to easily spot overpaid players’. I chose to use the plus/minus statistic over the number of goal scored for the reason that a player can add value to his team without himself scoring goals. The use of plus/minus, in my opinion, should result in a more loyal representation.

The information is presented as a radial bar graph. The height of the bar indicate the plus/minus score while the color of the bar (ranging from dark blue (high salary) to to light blue (low salary)), the income of the player.

Statistics have been acquired from the [National Hockey League](http://www.nhl.com/ice/playerstats.htm#?navid=nav-sts-indiv "National Hockey League website") website and salary information from [NHL Numbers](http://nhlnumbers.com/ "NHL Numbers website") website. All data has been screen scraped using Python and [Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/ "Beautiful Soup").

Information is displayed on the screen with the help of the [Raphaël Javascript Library](http://raphaeljs.com/ "Raphaël.js website").
