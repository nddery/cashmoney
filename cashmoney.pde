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
 
/*
nhlstats2010.txt
 0       1     2         3     4        5       6           7
 Player  Team  Position  Goal  Assists  Points  Plus/Minus  Salary
 */
 
// grad a reference to the Applet
// use for registering mouse event
PApplet app = this;

// DISPLAY OPTIONS
// project window size, to make bigger, lower number
// to make small, raise number -- between 1 and 12
static final int     ZOOM  = 1;
// if set to true, will print player's name
// and add more margin around
static final boolean PRINT = true;
// use a dark or a light color scheme
// only for saving name....
static final boolean DARK = true;

PFont projectTitle;
PFont teamFont;
PFont pFont;
PFont playerFont;

// MIN_FLOAT and MAX_FLOAT ensure we get actual min and max value
float maxPlusMinus = MIN_FLOAT;
float minPlusMinus = MAX_FLOAT;
float maxSalary = MIN_FLOAT;
float minSalary = MAX_FLOAT;

Table nhlstats;

int rowCount; // total number of row in data table
int colCount; // number of columns in a row

int numberOfTeams;

float angle;

String[] statsRow;

Player[] Players;
Team[] Teams;

// constant
static final int   BAR_WIDTH      = 12/ZOOM;
static final int   MAX_BAR_HEIGHT = 920/ZOOM;
static final int   GUTTERS        = 400/ZOOM;
// yellow, red, light grey, black, dark grey, light grey (dark)
static final color COLORS[]       = {#fdbe55, #98012e, #e2e2e2, #000000, #a9a9a9, #e2e2e2};
// yellow, red, grey, beige, light red, black (light)
//static final color COLORS[]     = {#fdbe55, #98012e, #bab4be, #efe1c6, #e7c2b8, #000000};

/**
 * setup()
 * 
 * Call all method to set up the parameters of the application
 */
void setup()
{
  
  // set the basic
  background(COLORS[3]);
  smooth();
  noStroke();
  frameRate(60); // good practice to set the frame rate (for faster computer)
  int wh = (MAX_BAR_HEIGHT*5+(GUTTERS*2));
  if(PRINT){
    size(wh+GUTTERS,wh+GUTTERS);
  }else{
    size(wh,wh);
  }
  loadfont();
  
  // read file into a data table
  nhlstats = new Table("nhlstats2010.txt");
  // get the number of row
  rowCount = nhlstats.getRowCount();
  // get the number of column in a row
  colCount = nhlstats.getColCount();
  
  // find min and max in nhlstats
  findMinMax();
  
  // find how many teams there is
  numberOfTeams();
  
  // put each row into it's own object
  // keep track of it by putting these object into an array
  createPlayers();
  // same for teams
  createTeams();
  
  // set rotation angle according to total number of players
  angle = (PI / (rowCount/2));
  
  // call the draw method for each player
  drawPlayers();
  // same for teams
  drawTeams();
  
  // create a puck in the middle
  Puck puck = new Puck();  
  
  String p, c;
  if(PRINT){p="t";}else{p="f";}
  if(DARK){c="d";}else{c="l";}
  save("cashmoney-"+ZOOM+"-"+p+"-"+c+".jpg");
  
} // end setup()


void draw(){}


/**
 * loadfont()
 * 
 * Load all fonts to be used in sketch
 * 
 * @return void
 */
public void loadfont()
{
  
  // assign fonts
  projectTitle = createFont("Arial Black", 440/ZOOM);
  teamFont     = createFont("Georgia", 160/ZOOM);
  pFont        = createFont("Georgia", 56/ZOOM);
  playerFont   = createFont("Georgia", BAR_WIDTH);
  
} // end loadfont()


/**
 * findMinMax()
 * 
 * Finds the minimum and maximum value for
 * plus/minus score and salary in the nhlstats table.
 * 
 * @return void
 */
public void findMinMax()
{

  for(int r=0; r<rowCount; r++){
    // plus/minus column
    float pm = nhlstats.getInt(r,6);
    if (pm > maxPlusMinus) maxPlusMinus = pm;
    if (pm < minPlusMinus) minPlusMinus = pm;
    
    // salary column
    float salary = nhlstats.getFloat(r,7);
    if (salary > maxSalary) maxSalary = salary;
    if (salary < minSalary) minSalary = salary;
  } // end for(r)
  
} // end findMinMax()


/**
 * numberOfTeams()
 * 
 * Gets the total number of teams
 * 
 * @return void
 */
public void numberOfTeams()
{
  
  String lastTeam = nhlstats.getString(0,1);
  String curTeam;
  
  for(int r=0; r<rowCount; r++){
    curTeam = nhlstats.getString(r,1);
    // if new team, numberOfTeams++
    if(curTeam.regionMatches(0,lastTeam,0,3)){
      numberOfTeams++;
    }
  } // end for(r)

} // end findMinMax()


/**
 * createPlayers()
 *
 * Create a Player instance for each row in the data table
 * and add the object to the Player array
 * 
 * @return void
 */
public void createPlayers()
{
  
  // make the array the correct lenght
  // rowCount++ prevent ArrayOutOfBoundsException
  Players = new Player[rowCount];
  // same for the statsRow array
  statsRow = new String[colCount];
  
  // loop thru each rows
  for(int r=0; r<rowCount; r++){
    // loop thru each columns
    for(int c=0; c<colCount; c++){
      // store column data into an array
      statsRow[c] = nhlstats.getString(r,c);
    } // end for(c)
    
    // create the instance
    Player player = new Player(statsRow, r);
    
    // add the instance to the array
    Players[r] = player;
  } // end for(r)
  
} // end createPlayer()


/**
 * drawPlayers()
 *
 * Call the drawPlayer() method on each instances in 
 * the Players array
 *
 * @return void
 */
public void drawPlayers()
{
  
  pushMatrix();
    translate(width/2, height/2);
    rect(0,0,5,5);
    for(int p=0; p<Players.length; p++){
      Players[p].drawPlayer();
    } // end for(p)
  popMatrix();
  
} // end drawPlayers()


/** 
 * createTeams()
 *
 * Create an Team instance for each different team
 * and store it in an array
 *
 * @return void
 */
public void createTeams()
{
  
  // create an array of the appropriate size
  Teams = new Team[numberOfTeams];
  
  String lastTeam = nhlstats.getString(0,1);
  String curTeam;
  int    teamWidth=1;
  int    curTeamNum=0;
  
  for(int r=0; r<rowCount; r++){
    curTeam = nhlstats.getString(r,1);
    // if new team
    if(!curTeam.regionMatches(0,lastTeam,0,3)){
      // create the instance
      Team team = new Team(lastTeam, teamWidth, curTeamNum);
      
      // add the instance to the array
      Teams[curTeamNum] = team;
      
      lastTeam = curTeam;
      curTeamNum++;
      teamWidth=1;
    }else if(r==(rowCount-1)){
      // create the instance
      Team team = new Team(curTeam, teamWidth, curTeamNum);
      
      // add the instance to the array
      Teams[curTeamNum] = team;
    }else{
      teamWidth++;
    }
    
  } // end for(r)
  
} // end createTeams()


/**
 * drawTeams()
 *
 * Call the drawTeam() method on each instances in 
 * the Teams array
 *
 * @return void
 */
public void drawTeams()
{
  
  pushMatrix();
    translate(width/2, height/2);
    for(int t=0; t<Teams.length; t++){
      Teams[t].drawTeam();
    } // end for(p)
  popMatrix();
  
} // end drawTeams()


/*
nhlstats2010.txt
 0       1     2         3     4        5       6           7
 Player  Team  Position  Goal  Assists  Points  Plus/Minus  Salary
 */
