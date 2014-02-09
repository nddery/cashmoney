'use strict';

/* Services */

// Register simple values.
angular.module('cm.services', [])
  .factory('dataService', function($http, teams) {
    var dataService = {};

    // dataService.getData = function() {
    //   var promise = $http.jsonp('data/data.json').then(function(response) {
    //     return response.data;
    //   });

    //   return promise;
    // }

    dataService.data = [];
    dataService.teams = [];

    dataService.getData = function() {
      $http.get('data/data.full.json')
        .success(function(data) {
          dataService.data = data;
        });

        return dataService.data;
    };

    dataService.getTeams = function() {
      return dataService.teams = teams;
    }

    return dataService;
  })

  .value('teams', [ {name:"ANA", active:true},
                    {name:"BOS", active:true},
                    {name:"BUF", active:true},
                    {name:"CAR", active:true},
                    {name:"CBJ", active:true},
                    {name:"CGY", active:true},
                    {name:"CHI", active:true},
                    {name:"COL", active:true},
                    {name:"DAL", active:true},
                    {name:"DET", active:true},
                    {name:"EDM", active:true},
                    {name:"FLA", active:true},
                    {name:"LAK", active:true},
                    {name:"MIN", active:true},
                    {name:"MTL", active:true},
                    {name:"NJD", active:true},
                    {name:"NSH", active:true},
                    {name:"NYI", active:true},
                    {name:"NYR", active:true},
                    {name:"OTT", active:true},
                    {name:"PHI", active:true},
                    {name:"PHX", active:true},
                    {name:"PIT", active:true},
                    {name:"SJS", active:true},
                    {name:"STL", active:true},
                    {name:"TBL", active:true},
                    {name:"TOR", active:true},
                    {name:"VAN", active:true},
                    {name:"WPG", active:true},
                    {name:"WSH", active:true} ])

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
      ,{name: 'bar-chart', active: false}
    ]
    ,colors: [
      "#074C75", "#A80C06", "#690582", "#0C7514"
      ,"#BD3D00", "#A89A00", "#DBADFF", "#454341"
    ]
    ,positions: [
       {name: 'All Skaters', value: 0}
      ,{name: 'Center', value: ['C']}
      ,{name: 'Defensemen', value: ['D']}
      ,{name: 'Forwards', value: ['L', 'R', 'C']}
      ,{name: 'Left Wing', value: ['L']}
      ,{name: 'Right Wing', value: ['R']}
    ]
  })
;
