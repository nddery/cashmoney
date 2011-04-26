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
    
    pushMatrix();
      translate(width/2, height/2);
      // draw the "border"
      fill(COLORS[2]);
      ellipse(0,0,MAX_BAR_HEIGHT*2.5,MAX_BAR_HEIGHT*2.5);
      // fake the border
      fill(COLORS[3]);
      ellipse(0,0,(MAX_BAR_HEIGHT*2.5)-(120/zoom),(MAX_BAR_HEIGHT*2.5)-(120/zoom));
      
      // write project name
      fill(#e7c2b8);
      textFont(projectTitle);
      textAlign(CENTER);
      rotate(radians(350));
      text("cash",0,0);
      text("money",0,220/zoom);
    popMatrix();
    
  } // end Puck()
  
} // end Puck
