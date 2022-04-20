
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
  if(timer <= 0)
  {
    // stop timer
    clearInterval(timeIntervalId);
    // remove event Listeners
  document.removeEventListener("keydown", keyDownFunc );
  document.removeEventListener("keyup" , keyUpFunc) ;
    let btns =document.getElementsByClassName("btn");
    for(let i=0 ; i < 7 ; i++)
    {
      console.log("Removing Button " , i+1)
      btns[i].removeEventListener("mousedown" , btnDownFuncs[i]) ;  
      btns[i].removeEventListener("mouseup" , btnUpFuncs[i]) ; 
    }
    endGame();
  }
} , 1000)


  // FUNCTION WHEN BUTTON IS PRESSED 
  function btnPress(btn){
    if(btn != keyPressed && btn >= 1 && btn <= 7 &keyPressed == -1)
    {
      document.getElementById("btn-"+btn).style.transform = "scale(0.8)";
      keyPressed = btn;
      questions[questions.length - 1 ].answer = dayMappingArr[btn%7] ;
      console.log("btn Pressed" , btn);
      console.log("Date entered  : " , dayMappingArr[btn%7]);
      updateQuestion();
    }
  }
  function btnUp(btn)
  {
    if(btn == keyPressed && btn >= 1 && btn <= 7)
    {
      console.log(btn , "  Btn Up")
      document.getElementById("btn-"+btn).style.transform = "scale(1)";
      keyPressed = -1;
    }
    
  }

  
  function keyDownFunc (event){
    btnPress(parseInt(event.key));
  }
  function keyUpFunc (event){
    btnUp(parseInt(event.key));
  }
  // add event listeners
  document.addEventListener("keydown" , keyDownFunc) ;
  document.addEventListener("keyup" , keyUpFunc) ;
  startKey = "4";
  let btns =document.getElementsByClassName("btn");
  let btnDownFuncs = [];
  let btnUpFuncs = [];
  for(let i=0 ; i < 7 ; i++)
  {
    console.log(i+1)
    btnDownFuncs.push(()=>{
      btnPress(i+1);
    });
    btnUpFuncs.push( ()=>{
      btnUp(i+1)
    });
    btns[i].addEventListener("mousedown" , btnDownFuncs[i]) ;    
    btns[i].addEventListener("mouseup" , btnUpFuncs[i]) ;    
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
  // document.getElementById("game-wrapper").style.display = "block";
  // document.getElementById("game-wrapper").style.opacity = "0";


  // show result screen
  questions.push(new Question("2022/04/20"));
  questions[0].answer = 3;
  questions.push(new Question("2022/04/20"));
  questions[1].answer = 1;
  questions.push(new Question("2022/04/20"));
  questions[2].answer = 3;
  let resultTable = document.getElementById("result-table")
  resultTable.innerHTML = `<tr>    
  <th>Question Date</th>
  <th>Your Answer</th>
  <th>Result</th>
  <th>Correct Answer</th>
  </tr>`;
  for(let i=0 ; i<questions.length ; i++)
  {
    console.log(i);
    let ans = questions[i].answer == questions[i].getDay() ?  "&check;" : "&#9587" ;
    let ansClass = questions[i].answer == questions[i].getDay() ?  "tick-symbol" : "cross-symbol";
    resultTable.innerHTML += `<tr>    
  <td>Question Date</td>
  <td>Your Answer</td>
  <td class="`+ ansClass+ `">`+ ans+`</td>
  <td>Correct Answer</td>
  </tr>`;
;

// cross code &#9587;  tick code : &check;
  }
}
// gameSetup(5 , 5);
endGame();


