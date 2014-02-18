'use strict';

/* Services */

// Register simple values.
angular.module('cm.services')
  .factory('cmCache', function($cacheFactory) {
    return $cacheFactory('data');
  })

  .factory('dataFactory', function($http, $q, $filter, cmCache) {
    var getAllData = function() {
      var deferred = $q.defer();

      $http.get('data/data.full.json', {cache: cmCache})
        .success(function(data) {
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("Woops! Something wen't wrong.");
        });

      return deferred.promise;
    }

    var filterByTeams = function(teams) {
      var deferred = $q.defer();

      getAllData().then(function(data) {
        var filteredTeams = $filter('filter')(data, function(team) {
          if (teams.indexOf(team.name) !== -1)
            return true;
          else
            return false;
        });

        // Filter out data
        deferred.resolve(filteredTeams);
      });

      return deferred.promise;
    }

    // @TODO: Find a way to not have to copy the original children array....
    var filterByPosition = function(filteredTeams, position) {
      var filteredPlayers = [];
      angular.forEach(filteredTeams, function(team, i) {
        var has_copy = team.hasOwnProperty('children_copy') ? true :false
            ,access_key = has_copy ? 'children_copy' : 'children';

        filteredPlayers = $filter('filter')(team[access_key], function(p) {
          if (position.value.indexOf(p.pos) !== -1)
            return true;
          else
            return false;
        });

        if (!has_copy)
          filteredTeams[i].children_copy = filteredTeams[i].children;

        filteredTeams[i].children = filteredPlayers;
      });

      return filteredTeams;
    }

    var getAllPlayers = function() {
      var deferred = $q.defer();

      getAllData().then(function(data) {
        // Filter out data
        var players = [];

        data.forEach(function(team) {
          team['children'].forEach(function(player) {
            players.push(player);
          });
        });

        deferred.resolve(players);
      });

      return deferred.promise;
    }

    var getPlayer = function(player) {
      var deferred = $q.defer();

      getAllData().then(function(data) {
        // Filter out data
        deferred.resolve(data);
      });

      return deferred.promise;
    }

    function dataNotYetAvailable() {
      console.error('Data not available.');
    }

    return{
       getAllData: getAllData
      ,getAllPlayers: getAllPlayers
      ,getPlayer: getPlayer
      ,filterByTeams: filterByTeams
      ,filterByPosition: filterByPosition
    }
  })
;
