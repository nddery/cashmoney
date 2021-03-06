'use strict';
angular.module('cm.services')
  .value('config', {
    seasons: [
       {name: 'Regular Season: 2011-2012', id: '2011-2012'}
      ,{name: 'Regular Season: 2012-2013', id: '2012-2013'}
      ,{name: 'Regular Season: 2013-2014', id: '2013-2014'}
      ,{name: 'Regular Season: 2014-2015', id: '2014-2015'}
    ]
    ,metrics: [
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
    ,colors: {
      blue: '#074C75', red: '#A80C06', purple: '#690582', green: '#0C7514'
      ,orange: '#BD3D00', yellow: '#A89A00', pink: '#DBADFF', grey: '#454341'
    }
    ,positions: [
       {name: 'All Skaters', value: ['C', 'D', 'L', 'R']}
      ,{name: 'Center', value: ['C']}
      ,{name: 'Defensemen', value: ['D']}
      ,{name: 'Forwards', value: ['L', 'R', 'C']}
      ,{name: 'Left Wing', value: ['L']}
      ,{name: 'Right Wing', value: ['R']}
    ]
    ,divisions: [
      'Custom', 'All', 'Atlantic', 'Western', 'Eastern',
      'Metropolitan', 'Central', 'Pacific'
    ]
    ,current: {}
  });
