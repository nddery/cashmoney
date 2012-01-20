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
  // grab a reference to our canvas
  var canvas = document.getElementById('cashmoney');
  // get the context of our canvas
  var ctx = canvas.getContext('2d');

  var app;

  // get the database records
  $.ajax({
    url: 'get_records.php',
    asynch: false,
    success: function(data, textStatus, jqXHR){
      // instantiate the cashmoney app
      app = new Cashmoney(ctx, JSON.parse(data));
    }
  });
  

  // create a rectangle
  // ctx.fillRect(50,50,100,100);

  function Cashmoney(ctx, data)
  {

    // save the context
    this.ctx = ctx;
    this.data = data;

    // width of each bar (for player)
    this.barWidth = 12;
    // maximum bar height
    this.maxBarHeight = 270;

    // colors to be used
    this.colors = ['#fdbe55', '#98012e', '#e2e2e2', '#000000', '#a9a9a9', '#e2e2e2'];

    // will change further down the road (just initializing them)
    this.minPlusMinus =  999;
    this.maxPlusMinus = -999;
    this.minSalary =  999;
    this.maxSalary = -999;

    this.totalPlayers = this.data.length;

    this.angle = Math.PI / (this.totalPlayers / 2);

    // players array
    this.players = new Array();
    // teams array
    this.teams = new Array();

    // find the minimum and maximum plus/minus & salary
    for(var i = 0; i < this.totalPlayers; i++){
      // plus/minus
      var pm = parseInt(this.data[i].plusminus);
      if(pm < parseInt(this.minPlusMinus)){
        this.minPlusMinus = pm;
      }
      if(pm > parseInt(this.maxPlusMinus)){
        this.maxPlusMinus = pm;
      }

      // salary
      var salary = this.data[i].salary;
      if(salary < parseFloat(this.minSalary)){
        this.minSalary = salary;
      }
      if(salary > parseFloat(this.maxSalary)){
        this.maxSalary = salary;
      }
      console.log(this.data[i].salary);
    } // end for

    // we set all properties, add them up in an array
    this.info = [this.maxBarHeight, this.minPlusMinus, this.maxPlusMinus, this.minSalary, this.minSalary];

    // first "go" to the center of the "stage"
    this.ctx.translate(canvas.width/2, canvas.height/2);

    // and create the players
    for(var i = 0; i < this.totalPlayers; i++){
      // save the current position
      this.ctx.save();

      // rotate the canvas
      this.ctx.rotate(this.angle * i++);

      // draw a player on the screen
      this.players[i] = new Player(this.ctx, this.data[i], this.info);

      // restore last saved position
      this.ctx.restore();
    } // end for

  }; // end cashmoney()



  function Player(ctx, data, info)
  {
  
    this.ctx = ctx;
    this.data = data;
    this.info = info;

    // the colors to use for this player
    this.ctx.fillStyle = "rgb(200,0,0)";

    // calculate the bar height
    this.barHeight = floatmap(this.data.plusminus, this.info[1], this.info[2], 10, 270);
    console.log(this.info);
    
    this.ctx.fillRect(0, 175, 5, this.barHeight);

  } // end Player
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
