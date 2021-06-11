var ball;
var bg;
var xval=50;
var yval=50;
var bluegroup,greengroup,pinkgroup,purplegroup,yellowgroup,allgroup,shooter;
var ballarr=[],mainarr=[],newballarr=[],matchingBalls=[];

function preload ()
{
        //loadin
        bg=loadImage("images/background.jpg");
        blueimg=loadImage("images/blueball.png");
        greenimg=loadImage("images/greenball.png");
        pinkimg=loadImage("images/pinkball.png");
        purpleimg=loadImage("images/purpleball.png");
        yellowimg=loadImage("images/yellowball.png");
}


function setup()
 {
        createCanvas(600,700);
        //creating groups
        allgroup=new Group();
        generateNewShooter();
        for(var r=0;r<5;r++)
        {
                for(var c=0;c<10;c++)
                {
                        ball=createSprite(xval,yval,50,50);
                        ballarr.push(ball);
                        ball.debug=true;
                        ball.setCollider("circle",0,0,5)
                        var rand=Math.round(random(1,5));
                        ball.colorNum=rand;
                        allgroup.add(ball);
                        ballselect(ball,rand);
                        xval=xval+55;
               }
                xval=50;
                yval=yval+55;
                mainarr.push(ballarr);
                ballarr=[];
            //    console.log(mainarr);
        }
        
 }

 function checkColorRange(r,c,colorCode)
 {
        matchingBalls=[];
        checkColumn(r,c,colorCode);
        if(matchingBalls.length>2)
        {
                for(var i=0;i<matchingBalls.length;i++)
                {
                        matchingBalls[i].destroy();
                }
        }
 }

 function checkColumn(r,c,colorCode)
 {
  var thisCol=[];       
         for(var a=r;a>=0;a--)
         {
                thisCol=mainarr[a];
                if((thisCol[c]!=null)&&(thisCol[c].colorNum===colorCode))
                {
                        matchingBalls.push(thisCol[c]);
                        checkRow(a,c,colorCode);
                }
                else
                {
                        break;
                }
         }
         for(var a=r+1;a<mainarr.length;a++)
         {
                 thisCol=mainarr[a];
                 if((thisCol[c]!=null)&&(thisCol[c].colorNum===colorCode))
                 {
                        matchingBalls.push(thisCol[c]);
                        checkRow(a,c,colorCode);
                 }
                 else
                {
                        break;
                }
         }
         //return colBalls;
         

 }

 function checkRow(r,c,colorCode)
 {
         var rowarr=[];
         rowarr=mainarr[r];
         for(var cRight=c+1;cRight<rowarr.length;cRight++)
         {
                 console.log(rowarr);
                 if((rowarr[cRight]!=null)&&(rowarr[cRight].colorNum===colorCode))
                 {
                         matchingBalls.push(rowarr[cRight]);
                 }
                 else
                 {
                         break;
                         cRight=rowarr.length; //exit for
                 }
         }
         for(var cLeft=c-1;cLeft>=0;cLeft--)
         {
                 if((rowarr[cLeft]!=null)&&(rowarr[cLeft].colorNum===colorCode))
                 {
                        matchingBalls.push(rowarr[cLeft]);
                }
                else
                {
                        break;
                        cLeft=-1; //exit for
                }
         }
 }

 
 function generateNewShooter()
 {
        shooter=createSprite(280,500,10,10);
        shooter.debug=true;
        shooter.setCollider("circle",0,0,12)
        var randm=Math.round(random(1,5));
        ballselect(shooter,randm);
        shooter.colorNum=randm;
       
 }

function draw()
 {
  background(bg);
  if(shooter==null)
  {
          generateNewShooter();
  }  
  if (mouseWentUp("leftButton")) {
        //console.log("here");
        angle=(180/Math.PI)*Math.atan2(mouseY-shooter.y, mouseX-shooter.x);
        shooter.setSpeedAndDirection(10, angle);
      }
  fill("black");
  //console.log(mainarr.length)
  if(allgroup.isTouching(shooter))
  { 
          allgroup.add(shooter);
  for(var r=mainarr.length-1;r>=0;r--)
  {
          ballarr=mainarr[r];
          //console.log(ballarr)
          for(var c=0;c<ballarr.length;c++)
          {
                  //console.log(ballarr[c]);
                  if((ballarr[c]!=null)&&(shooter.isTouching(ballarr[c])))
                  {
                        shooter.setVelocity(0,0);
                        shooter.y=ballarr[c].y+55;
                          shooter.x=ballarr[c].x;
                          if(r===mainarr.length-1) //check if new row of ball need to be created
                          {
                                  newballarr=[];
                                  newballarr.length=ballarr.length;
                                  newballarr[c]=shooter;
                                  mainarr.push(newballarr);
                                  checkColorRange(mainarr.length-1,c,shooter.colorNum);
                          }
                          else
                          {
                                  newballarr=mainarr[r+1];
                                  newballarr[c]=shooter;
                                  mainarr[r+1]=newballarr;
                                  checkColorRange(r+1,c,shooter.colorNum);
                          }
                          
                  }
          }
  }
  shooter=null;
  }
//       if (frameCount%200===0){
//               allgroup.setVelocityYEach(3)
//       }else{
//               allgroup.setVelocityYEach(0)
      
//       }


        drawSprites();
 
}
function ballselect(ball,rand)
{
        switch(rand)
        {
          case 1: ball.addImage(blueimg);
                 // ball.scale=0.15;
                  break;
          case 2: ball.addImage(greenimg);
                  //ball.scale=0.13;
                  break;
          case 3: ball.addImage(pinkimg);
                 // ball.scale=0.35;
                  break;
          case 4: ball.addImage(purpleimg);
                 // ball.scale=0.3;
                  break;
          case 5: ball.addImage(yellowimg);
                 // ball.scale=0.29;
                  break;
                  
        }       
}