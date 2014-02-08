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

  .value('metrics', [ {name: 'goal', title: 'Goals'}
                    , {name: 'assists', title: 'Assists'}
                    , {name: 'points', title: 'Points'}
                    , {name: 'plusminus', title: 'Plus/Minus'}
                    , {name: 'salary', title: 'Salary'} ])

  .value('layouts', [ {name: 'circular', active: true}
                      ,{name: 'bar-chart', active: false} ])
;
