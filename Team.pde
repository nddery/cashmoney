/**
 * Team
 *
 * Draw a team information
 */
public class Team
{

  private String team;
  private int    teamWidth;
  private int    nth;

  /**
   * Team()
   *
   * Make everything internal / Store all passed data
   *
   * @params String team       The name of the team (3 letters)
   * @params int    teamWidth  The number of player in the team
   * @params int    nth        How many Team() instances have already been created
   * @return void
   */
   public Team(String team, int teamWidth, int nth)
  {

    this.team      = team;
    this.teamWidth = teamWidth;
    this.nth       = nth;
    
  } // end Team()


  /**
   * drawTeam()
   *
   * Call all methods for a team to be drawn
   * 
   * @return void
   */
  public void drawTeam()
  {

    drawSeparator();

    drawTeamName();
    
  } // end drawTeam()


  /**
   * drawSeparator()
   *
   * Draw the separator
   *
   * @return void
   */
  private void drawSeparator()
  {

    rotate(angle*this.teamWidth);
    
    fill(COLORS[2]);

    float radius = MAX_BAR_HEIGHT*2;
    rect(0,0,1,radius);

    
  } // end drawSeparator()


  /**
   * drawTeamName()
   *
   * Draw the team name
   *
   * @return void
   */
  private void drawTeamName()
  {

    fill(COLORS[2]);
    textFont(teamFont);

    pushMatrix();
      // translate to the edge
      translate(0,  MAX_BAR_HEIGHT*1.9);
      if(this.nth <= (numberOfTeams/2)-1) { // RIGHT SIDE (first side)
        rotate(radians(270));
        textAlign(LEFT);
        text(this.team,0,112/ZOOM); // for some reason 28... only thing that was left to chance this time...
      }else{
        rotate(radians(90));
        textAlign(RIGHT);
        text(this.team,0,0);
      }
    popMatrix();
    
  } // end drawTeamName()
}

