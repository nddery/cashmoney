'use strict';
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

    var filterByDivision = function(teams, division) {
      var deferred = $q.defer();

      getAllData().then(function(data) {
        var filteredTeams = $filter('filter')(teams, function(team) {
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
        // If data is already in cache, use that, else, filter it.
        var cached = cmCache.get('all_players')
            ,players = [];

        if (!cached) {
          data.forEach(function(team) {
            team['children'].forEach(function(player) {
              players.push(player);
            });
          });
        }
        else {
          players = cached;
        }

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

    var getLeagueHighsLows = function(metrics) {
      var deferred = $q.defer();

      getAllData().then(function(data) {
        // If data is already in cache, use that, else, filter it.
        var cached     = cmCache.get('league_highs_lows')
            ,highsLows = {};

        if (!cached) {
          if (typeof metrics === 'undefined')
            deferred.reject('\'getLeagueHighsLows\' needs to be passed a metrics argument.');

          var val = .0;
          angular.forEach(metrics, function(metric, m) {
            highsLows[metric.name] = {
              title: metric.title
              ,high: -Number.MAX_VALUE
              ,low: Number.MAX_VALUE
            };

            angular.forEach(data, function(team, t) {
              angular.forEach(team.children, function(player, p) {
                val = parseInt(player[metric.name]);

                if (val < highsLows[metric.name].low) {
                  highsLows[metric.name].low = val;
                }

                if (val > highsLows[metric.name].high) {
                  highsLows[metric.name].high = val;
                }
              });
            });
          });

          cmCache.put('league_highs_lows', highsLows);
        }
        else {
          highsLows = cached;
        }

        deferred.resolve(highsLows);
      });

      return deferred.promise;
    }

    return {
       getAllData: getAllData
      ,filterByDivision: filterByDivision
      ,filterByPosition: filterByPosition
      ,filterByTeams: filterByTeams
      ,getAllPlayers: getAllPlayers
      ,getPlayer: getPlayer
      ,getLeagueHighsLows: getLeagueHighsLows
    }
  });
