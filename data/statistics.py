#!/usr/bin/python

#
# Author:     Nicolas Duvieusart Dery
# Date:       January 15th 2012
# Licence:    GPL
#
# Screen scrape the NHL player statistics and gather relevant
# (for this project) information. Saves it all to a .tsv file.
#

# this script write players' statistics to a file

from bs4 import BeautifulSoup, SoupStrainer
import urllib
import sys
import re

# create a text file in same directory
tsv = open("statistics.txt", "w")

# summary, sorted by players last name
url = "http://www.nhl.com/ice/playerstats.htm"
url += "?season=20132014"
url += "&gameType=2"
url += "&sort=player.bioFirstNameLastName"
url += "&viewName=summary&pg="

# will place acquired data in variables
# will sort fileContent by team (hence separating header and content)
fileHeader = ''
fileContent = ''

# used to retrieve only appropriate columns
col = 0


# acquire/parse data
for i in range(1, 29):
    print "Now retrieving page " + str(i) + " of " + "28"

    f = urllib.urlopen(url + str(i))

    html = f.read()

    # do not parse anything outside <div id="statsTableGoop">
    strainer = SoupStrainer('div', {'id': 'contentBlock'})
    # beautifulsoup treat CSS class attribute as one long string,
    # so regex is use to if specific word (class) is contained
    # inside the long string returned by beautifulsoup
    # cols = tr.findAll('td', {'class': re.compile(r'\bstatBox\b')})
    strainer2 = SoupStrainer('table', {'class': re.compile(r'\bstats\b')})
    soup = BeautifulSoup(''.join(html), parseOnlyThese=strainer2)

    table = soup.find('tbody')

    # valid is used to determine if we should add a new line or not
    valid = 0
    # col reference the current column
    col = 0

    rows = soup.findAll('tr')
    for tr in rows:
        # beautifulsoup treat CSS class attribute as one long string,
        # so regex is use to if specific word (class) is contained
        # inside the long string returned by beautifulsoup
        # cols = tr.findAll('td')
        cols = tr.findAll('td', {'colspan': '1'})

        for td in cols:
            # only retrieve wanted columns
            # player | team | pos | goal | assists | points | +/-
            if ((col == 1) or (col == 2) or (col == 3)
                    or (col == 5) or (col == 6)
                    or (col == 7) or (col == 8)):
                text = ''.join(td.findAll(text=True))

            # if row is team, only gets first team
            if (col == 2):
                text = ((re.sub('([A-Za-z]+)(,\s*)([A-Za-z]+)',
                                r'\1',
                                text)))

            fileContent += ((re.sub('[\t\n]+', '', text))).encode('utf8')

            # only add a tab if not the end of line
            if(col != 8):
                fileContent += '\t'

            valid = 1
            # end if col...

        col += 1
        # end for td in cols

        if valid:
            fileContent += ('\r\n')
            valid = 0
            col = 0
            # end for tr in rows
            # end for i in range

# were done
sys.stdout.write("DONE\r\n")
#write to file
tsv.write(fileContent)
# sys.stdout.write(table)
