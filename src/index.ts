var stdin = process.openStdin();

class Placement{
    x:number = 0;
    y:number = 0;
    f:string = "";
    isValid = false;
}

class Robot {
    private xPos:number = 0;
    private yPos:number = 0;
    private fPos:string = "";
    private placed: boolean = false;

    public setPlacedState(state: boolean){
        this.placed = state;
    }

    public getPlacedState(){
        return this.placed;
    }

    public move(){
        // Check current direction and position before move
        if(this.fPos == "NORTH")
        {
           if(this.yPos < 5) 
           {
               this.yPos++;
           }
        }
        else if(this.fPos == "SOUTH")
        {
            if(this.yPos > 0) 
            {
                this.yPos--;
            }
        }
        else if(this.fPos == "EAST")
        {
            if(this.xPos < 5) 
            {
                this.xPos++;
            }
        }
        else if(this.fPos == "WEST")
        {
            if(this.xPos > 0) 
            {
               this.xPos--;
            }
        }
    }

    public left(){
        if(this.fPos == "NORTH")
        {
          this.fPos = "WEST";
        }
        else if(this.fPos == "SOUTH")
        {
            this.fPos = "EAST";
        }
        else if(this.fPos == "EAST")
        {
            this.fPos = "NORTH";
        }
        else if(this.fPos == "WEST")
        {
            this.fPos = "SOUTH";
        }
    }

    public right(){
        if(this.fPos == "NORTH")
        {
          this.fPos = "EAST";
        }
        else if(this.fPos == "SOUTH")
        {
            this.fPos = "WEST";
        }
        else if(this.fPos == "EAST")
        {
            this.fPos = "SOUTH";
        }
        else if(this.fPos == "WEST")
        {
            this.fPos = "NORTH";
        }
    }

    public report(){
        console.log(`${this.xPos},${this.yPos},${this.fPos}`)
    }

    public place (plc: Placement){
        if(this.validatePlacement(plc ))
        {
            this.xPos = plc.x;
            this.yPos = plc.y;
            this.fPos = plc.f;
            this.placed = true;
        }
    }

    private validatePlacement(plc: Placement): boolean
    {
        var isPosValid = false;
        var isDirValid = false;

        // place within 5 x 5 array
        if(plc.x < 6 && plc.x >= 0 && plc.y < 6 && plc.y >= 0)
        {
            isPosValid = true;
        }

        // Check if directions are good
        if(plc.f == "NORTH" || plc.f == "SOUTH" || plc.f == "EAST" || plc.f == "WEST" )
        {
            isDirValid = true;
        }

        return isPosValid && isDirValid;
    }
}

// Instantiate Robot globally
var yum: Robot = new Robot();

// Application entry point
stdin.addListener("data", function(d) {
    // Convert input to string and removed extra chars
    var input = d.toString().trim();
    var plc: Placement = awaitPlacement(input);

    // Place robot
   if(plc.isValid)
   {
       yum.place(plc);
   }

   // Robot actions
   if(yum.getPlacedState())
   {
        if(input == "MOVE")
        {
            yum.move();
        }
        if(input == "LEFT")
        {
            yum.left();
        }
        if(input == "RIGHT")
        {
            yum.right();
        }
        if(input == "REPORT")
        {
            yum.report();
        }
   }
});

function awaitPlacement(d: any) {
    // Extract coodinates from statement
    var array = d.replace("PLACE ", "")
    var inArray = array.split(",");
    var plc: Placement = new Placement();

    // Check if array is 3 char long
    if(inArray.length == 3)
    {
        plc.x = inArray[0];
        plc.y = inArray[1];
        plc.f = inArray[2];
        plc.isValid = true;
    }

    return plc;
}

