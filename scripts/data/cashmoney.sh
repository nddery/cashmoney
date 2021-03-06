#!/bin/bash
while getopts ":s:e:" opt; do
  case $opt in
    s) SEASON_START="$OPTARG"
    ;;
    e) SEASON_END="$OPTARG"
    ;;
    \?) echo "Invalid option -$OPTARG" >&2
    ;;
  esac
done

BASEDIR=$(dirname $0)
DB_NAME=$(date | md5)

if [ -z "$SEASON_START" ]; then
  exit "You must pass the season start year with the '-s' argument"
fi

if [ -z "$SEASON_END" ]; then
  exit "You must pass the season end year with the '-e' argument"
fi

# cd to the script location
cd $BASEDIR

# Acquire
/usr/bin/python acquisition/salaries.py $SEASON_END
/usr/bin/python acquisition/statistics.py $SEASON_START $SEASON_END

# Create the DB
mysql -u root -proot -e "CREATE DATABASE tmp_$DB_NAME"

# Import the DB scheme / data
mysql -u root -proot --local-infile tmp_$DB_NAME < import.sql

# Export
/usr/bin/php export.php $SEASON_START $SEASON_END tmp_$DB_NAME

# Clean up
rm salaries.txt
rm statistics.txt
mysql -u root -proot -e "DROP DATABASE tmp_$DB_NAME"
