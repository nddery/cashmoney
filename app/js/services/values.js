'use strict';

/* Services */

// Register simple values.
angular.module('cm.services')
  .value('teams', [ {name:"ANA", division: ['Pacific', 'Western'], active:true},
                    {name:"BOS", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"BUF", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"CAR", division: ['Pacific', 'Western'], active:true},
                    {name:"CBJ", division: ['Metropolitan', 'Eastern'], active:true},
                    {name:"CGY", division: ['Pacific', 'Western'], active:true},
                    {name:"CHI", division: ['Central', 'Western'], active:true},
                    {name:"COL", division: ['Central', 'Western'], active:true},
                    {name:"DAL", division: ['Central', 'Western'], active:true},
                    {name:"DET", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"EDM", division: ['Pacific', 'Western'], active:true},
                    {name:"FLA", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"LAK", division: ['Pacific', 'Western'], active:true},
                    {name:"MIN", division: ['Central', 'Western'], active:true},
                    {name:"MTL", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"NJD", division: ['Metropolitan', 'Eastern'], active:true},
                    {name:"NSH", division: ['Central', 'Western'], active:true},
                    {name:"NYI", division: ['Metropolitan', 'Eastern'], active:true},
                    {name:"NYR", division: ['Metropolitan', 'Eastern'], active:true},
                    {name:"OTT", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"PHI", division: ['Metropolitan', 'Eastern'], active:true},
                    {name:"PHX", division: ['Pacific', 'Western'], active:true},
                    {name:"PIT", division: ['Metropolitan', 'Eastern'], active:true},
                    {name:"SJS", division: ['Pacific', 'Western'], active:true},
                    {name:"STL", division: ['Central', 'Western'], active:true},
                    {name:"TBL", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"TOR", division: ['Atlantic', 'Eastern'], active:true},
                    {name:"VAN", division: ['Pacific', 'Western'], active:true},
                    {name:"WPG", division: ['Central', 'Western'], active:true},
                    {name:"WSH", division: ['Metropolitan', 'Eastern'], active:true} ])
;
