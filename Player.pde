/**
 * Player
 *
 * Draw a player information
 */
public class Player
{
  
  // player information
  private String player;
  private String team;
  private String pos;
  private int    goals;
  private int    assists;
  private int    points;
  private float  plusminus;
  private float  salary;
  
  // other
  private int nth;
  
  // store the calculation
  // map() needs it's parameters to be of type float
  private float barHeight;
  private float barColorPercent;
  private color barColor;
  
  // mouse event  
  private float mouseAngle;
  private float newX;
  private float newY;
  
  /**
   * Player constructor
   *
   * 
   */
  public Player(String[] stats, int nth)
  {
    
    // assign parameters to local variables
    // (all received data is of type String)
    this.player    = stats[0];
    this.team      = stats[1];
    this.pos       = stats[2];
    this.goals     = parseInt(stats[3]);
    this.assists   = parseInt(stats[4]);
    this.points    = parseInt(stats[5]);
    this.plusminus = parseInt(stats[6]);
    this.salary    = parseFloat(stats[7]);
    
    this.nth = nth;
    
    // for mosue event to work
    app.registerDraw(this);
    app.registerMouseEvent(this);
    
  } // end Player()
  
  
  /**
   * drawPlayer()
   *
   * Draw a player bar on the screen
   * 
   * @return void
   */
  public void drawPlayer()
  {
    
    // calculate the data for drawing
    calculate();
    
    fill(this.barColor);
    
    float radius = MAX_BAR_HEIGHT*2;
    //rect(0,-radius,BAR_WIDTH,-this.barHeight);
    pushMatrix();
    rect(0,radius,BAR_WIDTH,this.barHeight);
    popMatrix();
    
    /*pushMatrix();
    //fill(COLORS[2]);
    fill(#000000);
    textFont(playerFont);
    
    
    if(PRINT){
      if(this.nth <= rowCount/2){
        textAlign(RIGHT);
        rotate(radians(90));
        text(this.plusminus + " | " + this.player, radius+barHeight+10/ZOOM, -2);
      }else{
        textAlign(LEFT);
        rotate(radians(90));
        text(this.plusminus + " | " + this.player, radius+barHeight+10/ZOOM, -2);
      }
    }
    popMatrix();*/
    
    pushMatrix();
      if(PRINT){
        translate(0,radius);
        fill(#000000);
        textFont(playerFont);
        if(this.nth <= rowCount/2){
          textAlign(RIGHT,CENTER);
          rotate(radians(270));
          text(this.plusminus + " | " + this.player, -this.barHeight-10/ZOOM, 2/ZOOM);
        }else{
          textAlign(LEFT);
          rotate(radians(90));
          text(this.plusminus + " | " + this.player, this.barHeight+10/ZOOM, -2/ZOOM);
        }
      }
    popMatrix();
    
    rotate(angle);

  } // end draw()
  
  
  void draw(){}
  
  
  /**
   * calculate()
   *
   * Calculate the height and color of the bar to be drawn.
   * Also map these to standard numbers.
   *
   * @return void
   */
  private void calculate()
  {
    
    // map the plus/minus score
    this.barHeight = map(this.plusminus, minPlusMinus, maxPlusMinus, 0, MAX_BAR_HEIGHT);
    
    // lerpColor() needs parameters to be %
    // hence the use of norm() instead of map()
    this.barColorPercent = norm(this.salary, minSalary, maxSalary);
    this.barColor = lerpColor(COLORS[0], COLORS[1], barColorPercent);
    
  } // end calculate()
  
  
  /**
   * mouseEvent
   *
   * Display player's information on hover
   *
   * @params MouseEvent e Type of event
   * @return void
   */
  public void mouseEvent(MouseEvent e)
  {
    
    switch(e.getID()){
      case MouseEvent.MOUSE_PRESSED:
        // rotate mouse angle
        mouseAngle = - (TWO_PI / rowCount) * this.nth;
  
        newX       = mouseX * cos(mouseAngle) - mouseY * sin(mouseAngle);
        newY       = mouseX * sin(mouseAngle) + mouseY * cos(mouseAngle);
        
        float radius = (MAX_BAR_HEIGHT*2);
        newX -= radius;
        println(newX-radius + "\t   " + this.team + "\t" + this.player);
      // end MOUSE_PRESSED
    } // end switch()
    
  }
  
} // end Player
