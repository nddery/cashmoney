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

DB_NAME=$(date | md5)

# Acquire
/usr/bin/python acquisition/salaries.py
/usr/bin/python acquisition/statistics.py

# Create the DB
mysql -u root -proot -e "CREATE DATABASE $DB_NAME"

# Import the DB scheme / data
mysql -u root -proot --local-infile $DB_NAME < import.sql

# Export
/usr/bin/php export.php $SEASON_START $SEASON_END $DB_NAME

# Clean up
mysql -u root -proot -e "DROP DATABASE $DB_NAME"
