/**
 * cashmoney
 *
 * A visualization of the correlation between NHL players'
 * plus/minus score and their salary.
 * Bar color indicate salary (the redder the higher)
 * Bar height indicate plus/minus score
 *
 * @author   Nicolas Duvieusart Déry
 * @date     February 2011
 * @license  GPL
 */

/**
 * nhlstats2010.txt
 * 0       1     2         3     4        5       6           7
 * Player  Team  Position  Goal  Assists  Points  Plus/Minus  Salary
 */

(function(){
  // get the database records
  $.ajax({
    url: 'get_records.php',
  asynch: false,
  success: function(data, textStatus, jqXHR){
    // parse the received data to JSON
    data = JSON.parse(data)

    // size of our app (same width and height)
    var size = 900;

  // create a canvas
  var paper = new Raphael('cashmoney', size, size);

  // initialize the min and max value for calculation later on
  var minPlusMinus =  999;
  var maxPlusMinus = -999;
  var minSalary =  999;
  var maxSalary = -999;
  // other variable initialization
  var barHeight;
  var barColor;
  var red;
  var green;
  // for the teams - just make sure they are different
  var currentTeam = 'AAA';
  var lastTeam= 'BBB';

  // total number of records (player's)
  var totalPlayers = data.length;

  // the angle of rotation
  // var angle = Math.PI / (totalPlayers / 2);
  var angle = 360 / totalPlayers;

  // players array
  var players = new Array();
  // teams array
  var teams = new Array();

  // find the minimum and maximum plus/minus & salary
  for(var i = 0; i < totalPlayers; i++){
    // plus/minus
    var pm = parseInt(data[i].plusminus);
    if(pm < minPlusMinus){
      minPlusMinus = pm;
    }
    if(pm > maxPlusMinus){
      maxPlusMinus = pm;
    }

    // salary
    var salary = parseFloat(data[i].salary);
    if(salary < minSalary){
      minSalary = salary;
    }
    if(salary > maxSalary){
      maxSalary = salary;
    }
  } // end for


  // and create the players
  for(var i = 0; i < totalPlayers; i++){
    // PLAYERS
    // calculate the bar height
    barHeight = floatmap(data[i].plusminus, minPlusMinus, maxPlusMinus, 10, 270);

    // create a reference to this element (player)
    players[i] = paper.rect(0, 0, 4, barHeight);

    // the colors to use for this player
    barColor = floatmap(data[i].salary, minSalary, maxSalary, 1, 6);
    red = parseInt(8 * barColor);
    green = parseInt(185 - 51 * barColor);

    // and apply them colors
    players[i].attr({
      fill: 'rgb('+red+','+green+',185)',
      stroke: 'none'
    });

    // add data to display on hover
    players[i].data('data', data[i]);
    players[i].mouseover(function(){
      positionInfoBox();
      $('div#infobox').css('display', 'block');

      var d = this.data('data');
      // var html  = '<p><strong>'+ d.player +'</strong> ('+ d.pos +' - '+ d.team +')</p>';
      html = '<table>';
      html += '<tr><th colspan="2"><strong>'+ d.player +'</strong> ('+ d.pos +' - '+ d.team +')</th></tr>';
      html += '<tr>';
      html += '<th>Plus/minus</th>';
      html += '<td>'+ d.plusminus +'</td>';
      html += '</tr>';

      html += '<tr>';
      html += '<th>Salary</th>';
      html += '<td>'+ d.salary +'</td>';
      html += '</tr>';

      html += '<tr>';
      html += '<th>Goals</th>';
      html += '<td>'+ d.goal +'</td>';
      html += '</tr>';

      html += '<tr>';
      html += '<th>Assists</th>';
      html += '<td>'+ d.assists +'</td>';
      html += '</tr>';
      html += '</table>';


      $('#infobox').html(html);
    });
    players[i].mouseout(function(){
      // $('#infobox').css('display', 'none');
    });

    // apply the transformation (rotate and..)
    players[i].translate(size / 2, size / 2 + 200);

    // rotate the appropriate amount
    players[i].rotate(angle * i++, 0,-200);


    // TEAM
    // store last team and set current team
    lastTeam = currentTeam;
    // currentTeam = (!null(data[i].team)) ? data[i].team : lastTeam;
    currentTeam = data[i].team;
    // if we are at a new team
    if(currentTeam !== lastTeam){
      // create the team separator (just a rect)
      teams[i] = paper.rect(0, 0, 1, 200);

      // apply color and...
      teams[i].attr({
        fill: '#666',
        stroke: 'none'
      });

      // go to the middle of the canvas
      teams[i].translate(size/2, size/2);

      // rotate the appropriate amount
      teams[i].rotate(angle * i++, 0, 0);

      // add the text
      var t = paper.text(0, 0, data[i].team);

      // set the font size and family
      t.attr({
        font: '13px "Verdana"'
      });

      // go to the middle of the canvas
      t.translate(size/2, size/2 + 175);

      // rotate the appropriate amount
      t.rotate(angle * i++, 0, -175);

      // rotate the text so it is aligned with the rect
      // also, if first half, rotate 270 (so it seems up)
      // and translate it so it does not lies straight on the rect
      if(i < totalPlayers/2){
        t.rotate(270, 0,0);
        t.translate(0,-3);
      }else{
        t.rotate(90, 0, 0);
        t.translate(0,3);
      }
    }
  } // end for(players)

  } // end success()

  }); // end ajax();



  /**
   * Position a div in the middle of another one
   *
   * @params 	none
   * @return 	void
   */
  function positionInfoBox()
  {

    var infotop, infoleft;
    // get the horizontal position
    infoleft = $('div#cashmoney').outerWidth() / 2;
    infoleft -= ($('div#infobox').outerWidth() / 2);
    // get the vertical position
    infotop = $('div#cashmoney').outerHeight() / 2;
    infotop -= ($('div#infobox').outerHeight() / 2);

    $('div#infobox').css('left', infoleft);
    $('div#infobox').css('top', infotop);

  } // end positionInfoBox()




  /**
   * Re-maps a number from one range to another
   *
   * Taken from processing core library, thanks to Casey Reas and Ben Fry
   * http://www.arduino.cc/cgi-bin/yabb2/YaBB.pl?num=1193416826
   * Should of been in Arduino 0011 but they (for some reason I don't understand)
   * added it but with integer... stupid!
   *
   * The Arduino map() function uses integer, not float...
   * "The map() function uses integer math so will not generate fractions, 
   * when the math might indicate that it should do so. Fractional remainders 
   * are truncated, and are not rounded or averaged."
   * 
   * @param   float    value    The number to map
   * @param   float    istart   Lower bound of the value's current range
   * @param   float    istop    Upper bound of the value's current range
   * @param   float    ostart   Lower bound of the value's target range
   * @param   float    ostop    Upper bound of the value's target range
   * @return  float             The mapped value
   */
  function floatmap(value, istart, istop, ostart, ostop)
  {

    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

  } // end floatmap()


  
  /**
   * Apply the correct zoom class to the body of the page
   *
   */
  // when user click on +
  // $('#zoonin').on('click', function(){
  //   
  // });
  // 
  // // when user click on -
  // $('#zoonin').on('click', function(){
  //   
  // });

})();
