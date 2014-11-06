function Platforms(cx, cy) {
    //setting up the properties
    this.centerX = cx; //the center of the cluster
    this.centerY = cy;
    this.d = Math.random() * (300-15) + 15; //distance from the center
    this.l = Math.random() * (200-20)+20; //length of platform
    this.r = Math.random() * -360; //rotation around center;
    this.rSpeed = .2; //the speed its gonna rotate at;
    this.fillColl = ""; //fill color of the platform
    this.timer = 0; //timer for the fade from blue
    this.opac = 1; //opacity for fade from blue
    this.colorSwitch = false; //should it switch to blue?
    this.xPos = this.centerX + Math.cos(toRadians(this.r) * this.d);
    this.yPos = this.centerY + Math.sin(this.r * this.d);
    
    
    
    //initial draw of the ledge
    this.ledge = new PIXI.Graphics();
    this.ledge.beginFill(0xFFFFFFF);
     this.ledge.pivot.set(.5*this.l,1);
    this.ledge.lineStyle(0, 0xFFFFFFF);
    this.ledge.drawRect(0, 0, this.l, 2);
    this.ledge.endFill();
    this.ledge.position.x = this.xPos;
    this.ledge.position.y = this.yPos;

    stage.addChild(this.ledge);

    /* draws the imaginary collision lines, waste of memory out of development
    CLEAR THE COMMENTED OUT CODE IN THE COLLISION DETECTION METHOD IF YOU UNCOMMENT
    this.lineOne = new PIXI.Graphics();
    this.lineOne.lineStyle(5,0xFFF);
    this.lineOne.moveTo(0,0);
    this.lineOne.lineTo(5,5);
    
    this.lineTwo = new PIXI.Graphics();
    this.lineTwo.lineStyle(5,0xFFFF);
    this.lineTwo.moveTo(0,0);
    this.lineTwo.lineTo(5,5);
    */
    
    
    stage.addChild(this.lineOne);
    stage.addChild(this.lineTwo);
    
    //setting up the methods
    
    //update properties
    this.update = function () {
       
        this.xPos = this.centerX + Math.cos(toRadians(this.r)) * this.d;
        this.yPos = this.centerY + Math.sin(toRadians(this.r)) * this.d;
        this.ledge.rotation = toRadians(this.r+90);
        this.ledge.position.x = this.xPos;
        this.ledge.position.y = this.yPos;

 
        this.r += 0.3;

    }
    
    this.collisionDetection = function() {
    var lineX = this.centerX+Math.cos(toRadians(this.r))*this.d;
    var lineY = this.centerY+Math.sin(toRadians(this.r))*this.d;

    var aX= lineX + (Math.cos(toRadians(this.r+90))*(.5*this.l));
    var aY = lineY + (Math.sin(toRadians(this.r+90))*(.5*this.l));

    var bX = lineX - (Math.cos(toRadians(this.r+90))*(.5*this.l));
    var bY= lineY - (Math.sin(toRadians(this.r+90))*(.5*this.l));

     /*  draws the imaginary collision lines, waste of memory out of development
     CLEAR THE COMMENTED OUT CODE IN THE CONSTRUCTER ABOVE IF YOU UNCOMMENT
     this.lineTwo.clear();
        this.lineOne.clear();
        
     
    this.lineOne.lineStyle(5,0xFF);
    this.lineOne.moveTo(aX,aY);
    this.lineOne.lineTo(lineX,lineY);
    
   
    this.lineTwo.lineStyle(5,0xFF);
    this.lineTwo.moveTo(bX,bY);
    this.lineTwo.lineTo(lineX,lineY);
        */
        
    }


}
