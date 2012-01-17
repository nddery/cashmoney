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

  // instantiate the cashmoney app
  var app = new Cashmoney(ctx);
  // set everything up
  app.setup();


  // create a rectangle
  // ctx.fillRect(50,50,100,100);

  function Cashmoney(ctx)
  {

    // this.parameter = 'an object';  
    // call the test method
    // save the context
    this.ctx = ctx;


    /**
     * Set everything up
     *
     */
    this.setup = function()
    {  
    
      // get the database records
      $.get('get_records.php', function(data) {
        this.data = data;
      });
    
    }; // end setup()  

  }; // end cashmoney()  
});
