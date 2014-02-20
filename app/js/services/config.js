'use strict';

/* Services */

// Register simple values.
angular.module('cm.services')
  .value('config', {
    metrics: [
       {name: 'gp', title: 'Game Played'}
      ,{name: 'g', title: 'Goals'}
      ,{name: 'a', title: 'Assists'}
      ,{name: 'p', title: 'Points'}
      ,{name: 'pm', title: 'Plus/Minus'}
      ,{name: 'salary', title: 'Salary'}
      ,{name: 'pim', title: 'Penalty Minutes'}
      ,{name: 'ppg', title: 'Power Play Goals'}
      ,{name: 'ppp', title: 'Power Play Points'}
      ,{name: 'shg', title: 'Short Handed Goals'}
      ,{name: 'shp', title: 'Short Handed Points'}
      ,{name: 'gw', title: 'Game Winning Goals'}
      ,{name: 'ot', title: 'Overtime Goals'}
      ,{name: 's', title: 'Shots'}
      ,{name: 'sp', title: 'Shooting Percentage'}
      ,{name: 'tim', title: 'Time On Ice Per Game'}
      ,{name: 'sft', title: 'Average Shifts Per Game'}
      ,{name: 'fop', title: 'Faceoff Win Percentage'}
    ]
    ,layouts: [
       {name: 'sunburst', active: true}
      // ,{name: 'bar-chart', active: false}
    ]
    ,colors: [
      "#074C75", "#A80C06", "#690582", "#0C7514"
      ,"#BD3D00", "#A89A00", "#DBADFF", "#454341"
    ]
    ,positions: [
       {name: 'All Skaters', value: ['C', 'D', 'L', 'R']}
      ,{name: 'Center', value: ['C']}
      ,{name: 'Defensemen', value: ['D']}
      ,{name: 'Forwards', value: ['L', 'R', 'C']}
      ,{name: 'Left Wing', value: ['L']}
      ,{name: 'Right Wing', value: ['R']}
    ]
    ,divisions: ['All', 'Atlantic', 'Western', 'Atlantic',
                 'Metropolitan', 'Central', 'Pacific']
  })
;
