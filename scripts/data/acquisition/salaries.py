#!/usr/bin/python

#
# Author:     Nicolas Duvieusart Dery
# Date:       January 15th 2012
# Licence:    GPL
#
# Screen scrape the NHLNumbers website to gather all player's salary
# Saves it all to a .tsv file.
#

from bs4 import BeautifulSoup, SoupStrainer
import urllib
import time
import sys
import re

print ""
print "Cash Money - Visualizing the National Hockey League"
print ""

# create a text file in same directory
tsv = open("salaries.txt", "w")

# summary, sorted by players last name
base = "http://stats.nhlnumbers.com/teams/"

print "Fetching salaries from nhlnumbers.com."
print base
print ""

# array of team code to retrieve
# to match team name with nhl.com:
# CBJ = CLB
# NSH = NAS
teams = [
    "ANA", "ARI", "BOS", "BUF", "CAR",
    "CLB", "CGY", "CHI", "COL",
    "DAL", "DET", "EDM", "FLA",
    "LAK", "MIN", "MTL", "NJD",
    "NAS", "NYI", "NYR", "OTT",
    "PHI", "PHX", "PIT", "SJS",
    "STL", "TBL", "TOR", "VAN",
    "WPG", "WAS"
]

# will place acquired data in variables
fileContent = ''

# used to retrieve only appropriate columns
col = 0

# acquire/parse data
for i in range(0, len(teams)):
    sys.stdout.write("Now retrieving ")
    sys.stdout.write(teams[i])
    sys.stdout.write(" (" + str(i + 1) + " of " + str(len(teams)) + ")")
    print ""

    url = base + teams[i] + "?year=" + time.strftime('%Y')

    f = urllib.urlopen(url)

    html = f.read()

    # do not parse anything outside <div id="stats-left">
    strainer = SoupStrainer('div', {'class': 'content-with-box-ads'})
    soup = BeautifulSoup(''.join(html), parse_only=strainer)

    table = soup.find('table')

    # if it is a good row (found information), valid = 1
    # if valid = 1, add newline after td, else don't
    valid = 0

    rows = soup.findAll('tr')
    for tr in rows:
        # beautifulsoup treat CSS class attribute as one long string,
        # so regex is use to if specific word (class)
        # is contained inside the long string returned by beautifulsoup
        # regex looks for either team-cell or caphit class
        cols = tr.findAll('td', {
            'class': re.compile(r'\b(team-cell|caphit)\b')
        })

        for td in cols:
            # if first row (player's name)
            if(col == 0):
                # get anchor with a class of 'active' or 'injured'
                anchor = td.findAll('a', {
                    'class': re.compile(r'\b(active|injured)\b')
                })
                # only continue if the player is either 'active' or 'injured'
                # if we did not find any anchor, anchor will be empty,
                # hence false
                if anchor:
                    # get text from inside the <td>
                    text = ''.join(td.findAll(text=True))

                    # replace all &#39; with '
                    text = ((re.sub('[&#39;]+', '\'', text)))
                    # reverse name (name are 'last, first'
                    # - we want 'first last')
                    text = ((re.sub('([A-Za-z\'\.\-]+)(,\s*)([A-Za-z\'\.\-]+)',
                                    r'\3 \1',
                                    text)))

                    # remove all \t, \n & \r contained in text
                    fileContent += ((re.sub('[\t\n]+', '', text)) + '\t')

                    valid = 1

            # if player's salary
            if(col == 1 and valid == 1):
                fileContent += ''.join(td.findAll(text=True)) + '\t'

            # we got this far, hence this is a good column,
            # set the flag to add a new line
            # valid = 1
            col += 1

        if valid:
            # if team name is one of the three
            # nhlnumbers.com / nhl.com difference,
            # apply nhl.com style
            if teams[i] == 'CLB':
                fileContent += 'CBJ'
            elif teams[i] == 'NAS':
                fileContent += 'NSH'
            elif teams[i] == 'WAS':
                fileContent += 'WSH'
            else:
                # add the team to the current row
                fileContent += teams[i]

        # add a line break after each row
        fileContent += ('\r\n')

        valid = 0
        col = 0

# print in console
sys.stdout.write("DONE\r\n")

#write to file
tsv.write(fileContent.encode('utf8'))
