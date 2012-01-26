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

$(document).ready(function(){
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

      // total number of records (player's)
      var totalPlayers = data.length;

      // the angle of rotation
      // var angle = Math.PI / (totalPlayers / 2);
      var angle = 360 / totalPlayers;

      // players array
      var players = new Array();
      // // teams array
      // var teams = new Array();

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

      // // create the box in the middle to display player's data
      // var info = paper.rect(0,0, 250, 150);
      // info.translate(size/2 - 125, size/2 - 75);

      // and create the players
      for(var i = 0; i < totalPlayers; i++){
        // calculate the bar height
        barHeight = floatmap(data[i].plusminus, minPlusMinus, maxPlusMinus, 10, 270);

        // create a reference to this element (player)
        players[i] = paper.rect(0, 0, 5, barHeight);

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
          var d = this.data('data');
          var html = '<p>'+ d.player +'</p>';
          $('#playersinfo').html(html);
          // console.log(d.player);
        });

        // apply the transformation (rotate and..)
        players[i].translate(size / 2, size / 2 + 200);

        // rotate the appropriate amount
        players[i].rotate(angle * i++, 0,-200);

      } // end for

      // // WORKING
      // // attach the event listener to each player
      // $('rect').each(function(e){
      //   $(this).mouseover(function(){
      //     console.log('over: ' + this);
      //   });
      //   $(this).mouseout(function(){
      //     console.log('out : ' + this);
      //   });
      // });

    } // end .ajax()
  });



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

});
