
// ########################### VARIABLES #############################

let questions = [];
let counter = 0;
let timer = 0 ;
let startKey = 1;
let keyPressed = -1;

let dayMappingArr = Array(7);

// ######################## UTILITY FUNCTIONS ########################
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
function getRandomDate(){
  let year = getRndInteger(1 ,9999).toString().padStart(4 , "0");
  let month = getRndInteger(1,12).toString().padStart(2 , "0");
  let day = getRndInteger(1,31).toString().padStart(2 , "0");
  let date = [year,month , day].join("/");
  return date;
}

function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}
function createWeekDaysMapping()
{
  
  for(let i=0 ; i < 7 ; i++)
  {
    dayMappingArr[(startKey+i-1)%7] = i;
  }
}


// ################# UTILITY CLASSES ######################### 
class Question {
  constructor(date)
  {
    this.date = date;
    this.day = new Date(date).getDay();
    this.answer = -1 ;
  }
  getDate()
  {
    return this.date;
  }
  getDay()
  {
    return this.day;;
  }
  getAnswer()
  {
    return this.answer;
  }
}
// ########################## GAME FUNCTIONS ##########################
async function gameSetup(p_time , p_startKey){
  // hide main menu
  document.getElementById("main-wrapper").style.display = "none";
  //show countdown block
  document.getElementById("countdown-div").style.display = "flex";
  document.getElementById("countdown-div").style.opacity = "1";
  //display game menu 
  document.getElementById("game-wrapper").style.display = "block";
  document.getElementById("game-wrapper").style.opacity = "1";

  // reset variables 
  questions = [];
  score = 0;
  timer = p_time ;
  startKey = p_startKey;
  keyPressed = -1;

  createWeekDaysMapping();

//starting countdown
document.getElementById("signal-red").style.backgroundColor = "black";
document.getElementById("signal-yellow").style.backgroundColor = "black";
document.getElementById("signal-green").style.backgroundColor = "black";
document.getElementById("signal-red").style.backgroundColor = "red";
await delay(1);
document.getElementById("signal-red").style.backgroundColor = "black";
document.getElementById("signal-yellow").style.backgroundColor = "yellow";
await delay(1);
document.getElementById("signal-yellow").style.backgroundColor = "black";
document.getElementById("signal-green").style.backgroundColor = "rgb(0, 255, 34)";

//starting timer
await delay(0.4);
document.getElementById("countdown-div").style.opacity = "0";
let timeIntervalId = 0;
timeIntervalId = setInterval(()=>{
  timer--;
  document.getElementById("live-timer-div").innerHTML = timer;
  if(timer < 0)
  {
    clearInterval(timeIntervalId);
    // remove event Listeners
  document.removeEventListener("keydown", keyPressFunc );
  document.addEventListener("keyup" , btnUp) ;
    let btns =document.getElementsByClassName("btn");
    for(let i=0 ; i < 7 ; i++)
    {
      console.log("Removing Button " , i+1)
      btns[i].removeEventListener("mousedown" , btnFuncs[i]) ;  
      btns[i].addEventListener("mouseup" , btnUp) ; 
    }
    endGame();
  }
} , 1000)


  // FUNCTION WHEN BUTTON IS PRESSED 
  function btnPress(btn){
    if(btn != keyPressed && btn >= 1 && btn <= 7)
    {
      keyPressed = btn;
      questions[questions.length - 1 ].answer = dayMappingArr[btn%7] ;
      console.log("btn Pressed" , btn);
      console.log("Date entered  : " , dayMappingArr[btn%7]);
      updateQuestion();
    }
  }


  // add event listeners
  function keyPressFunc (event){
    console.log("key pressed");
    console.log(parseInt(event.key));
    btnPress(parseInt(event.key));
  }
  function btnUp()
  {
    keyPressed = -1;
  }
  document.addEventListener("keydown" , keyPressFunc) ;
  document.addEventListener("keyup" , btnUp) ;
  startKey = "4";
  let btns =document.getElementsByClassName("btn");
  let btnFuncs = [];
  for(let i=0 ; i < 7 ; i++)
  {
    console.log(i+1)
    btnFuncs.push(()=>{
      btnPress(i+1);
    });
    btns[i].addEventListener("mousedown" , btnFuncs[i]) ;    
    btns[i].addEventListener("mouseup" , btnUp) ;    
  }

// Adding and Displaying random date
  updateQuestion();
  //update question function
  function updateQuestion(){
    questions.push(new Question(getRandomDate()));
    document.getElementById("date-question-div").innerHTML = questions[questions.length - 1].getDate();
    counter++;
    document.getElementById("counter-div").innerHTML = "<p>Count : " + counter +"</p>" ;
  }
}


// ------------- End Game ------------------
function endGame()
{
  
  //hide game menu 
  document.getElementById("game-wrapper").style.display = "block";
  document.getElementById("game-wrapper").style.opacity = "1";
}
gameSetup(120 , 5);


