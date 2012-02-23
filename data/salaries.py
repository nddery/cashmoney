#!/usr/bin/python

#
# Author:     Nicolas Duvieusart Dery
# Date:       January 15th 2012
# Licence:    GPL
#
# Screen scrape the NHLNumbers website to gather all player's salary
# Saves it all to a .tsv file.
#

from BeautifulSoup import BeautifulSoup, SoupStrainer
import urllib
import sys
import re

# create a text file in same directory
tsv = open("salaries.txt", "w")

# summary, sorted by players last name
base = "http://www.nhlnumbers.com/teams/"

# array of team code to retrieve
teams = ["ANA","BOS","BUF","CAR","CBJ","CGY","CHI","COL","DAL","DET","EDM","FLA","LAK","MIN","MTL","NJD","NSH","NYI","NYR","OTT","PHI","PHX","PIT","SJS","STL","TBL","TOR","VAN","WPG","WAS"]

# will place acquired data in variables
fileContent = ''

# used to retrieve only appropriate columns
col = 0

# acquire/parse data
for i in range(0, len(teams)):
  print "Now retrieving "+teams[i]+" ("+str(i+1)+" of "+str(len(teams))+")"
  url = base+teams[i]+"?year=2012"

  f = urllib.urlopen(url)
  
  html = f.read()
  
  # do not parse anything outside <div id="stats-left">
  strainer = SoupStrainer('div', {'class': 'content-with-box-ads'})
  soup = BeautifulSoup(''.join(html), parseOnlyThese=strainer)
  
  table = soup.find('table')
  
  # if it is a good row (found information), valid = 1 
  # if valid = 1, add newline after td, else don't
  valid = 0;
  
  rows = soup.findAll('tr')
  for tr in rows:
    # beautifulsoup treat CSS class attribute as one long string, so regex is use to if specific word (class)
    # is contained inside the long string returned by beautifulsoup
    # regex looks for either team-cell or caphit class
    cols = tr.findAll('td', {'class': re.compile(r'\b(team-cell|caphit)\b')})

    for td in cols:
      # get text from inside the <td>
      text = ''.join(td.findAll(text=True))
      
      # if players' name
      if(col == 0):
        # replace all &#39; with '
        text = ((re.sub('[&#39;]+', '\'', text)))
        # reverse name (name are 'last, first' - we want 'first last')
        text = ((re.sub('([A-Za-z\'\.\-]+)(,\s*)([A-Za-z\'\.\-]+)',
          r'\3 \1',
          text)))
      
      # remove all \t, \n & \r contained in text
      fileContent += ((re.sub('[\t\n]+', '', text))+'\t')
      
      # we got this far, hence this is a good column, set the flag to add a new line
      valid = 1
      col += 1

    if valid:
      # add the team to the current row
      fileContent += teams[i]
      # add a line break after each row
      fileContent += ('\r\n')

      valid = 0
      col = 0

# print in console
sys.stdout.write("DONE\r\n")

#write to file
tsv.write(fileContent)
