'use strict';

/* Services */

// Register simple values.
angular.module('cm.services')
  .factory('cache', function($cacheFactory) {
    return $cacheFactory('data');
  })

  .factory('dataFactory', function($http, $q, $filter) {
    var data = false;

    var getAllData = function() {
      var deferred = $q.defer();

      $http.get('data/data.full.json', {cache: true})
        .success(function(response) {
          data = response;
          deferred.resolve(data);
        }).error(function(){
          deferred.reject("Woops! Something wen't wrong.");
        });

      return deferred.promise;
    }

    var filterByTeams = function(teams) {
      if (!data) {
        dataNotYetAvailable();
        return;
      }

      var filteredTeams = $filter('filter')(data, function(team) {
        if (teams.indexOf(team.name) !== -1)
          return true;
        else
          return false;
      });

      return filteredTeams;
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

    var getPlayer = function(player) {
      if (!data) {
        dataNotYetAvailable();
        return;
      }

      //
      // Do some filtering of the data
      //

      return player;
    }

    function dataNotYetAvailable() {
      console.log('You need to call \'dataFactory.getData()\' before calling this method.');
    }

    return{
       getAllData: getAllData
      ,getPlayer: getPlayer
      ,filterByTeams: filterByTeams
      ,filterByPosition: filterByPosition
    }
  })
;
