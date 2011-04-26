/**
 * Puck
 *
 * Draw a "puck" in the middle of the stage
 */
class Puck
{

  // vars
  
  
  /** 
   * Puck()
   * 
   * 
   * 
   * @return void
   */
  public Puck()
  {
    
    // draw the "border"
    fill(#000000);
    ellipse(width/2,height/2,MAX_BAR_HEIGHT*2.5,MAX_BAR_HEIGHT*2.5);
    // fake the border
    fill(COLORS[3]);
    ellipse(width/2,height/2,(MAX_BAR_HEIGHT*2.5)-(120/zoom),(MAX_BAR_HEIGHT*2.5)-(120/zoom));
    
    // write project name
    textAlign(CENTER);
    
    
  } // end Puck()
  
} // end Puck
