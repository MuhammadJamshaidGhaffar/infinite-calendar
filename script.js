
// ########################### VARIABLES #############################

let questions = [];
let attempted = 0;
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
function setCookie(cName , cValue  , cExDays){
  let d = new Date();
  d.setTime(d.getTime() + (cExDays*24*60*60*1000));
  let cookieStr = `${cName}=${cValue}; expires=${d.toUTCString()}; path=/`;
  document.cookie = cookieStr;
  console.log("cookie set to : " , cookieStr )
}
function getCookie(cName){
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieArr = decodedCookie.split("; ");
  for(let i=0; i < cookieArr.length ; i++)
  {
    cookie = cookieArr[i].split("=");
    if(cName == cookie[0])
    {
      return cookie[1];
    }
  }
  return -1;
}
function getFormattedDate(year, month , day)
{
  let formatDiv = document.getElementById("format-btn-value");
  console.log("In getFormattedDate()");
  console.log("year : "  , year);
  console.log("month : " , month);
  console.log("day : " ,  day);
  switch(formatDiv.innerHTML)
  {
    case "DD/MM/YY" :
      return [day , month , year].join("/");
    case "MM/DD/YY":
      return [month , day , year].join("/");
    case "YY/MM/DD":
      return [year, month , day].join("/");
    case "YY/DD/MM":
      return [year , day , month].join("/");
  }
}
function calculateStats()
{
  let correctAnswers = 0;
  let wrongAnswers = 0;
  for(let i=0; i< attempted ; i++)
  {
    if (questions[i].getAnswer() == questions[i].getDay())
    {
      correctAnswers++;
    }
    else{
      wrongAnswers++;
    }
  }
  let accuracy = (correctAnswers / attempted * 100).toFixed(2) ;
  return {"correctAnswers":correctAnswers , "wrongAnswers" : wrongAnswers , "accuracy" : accuracy};
}
function displayStats(statsObj)
{
  
  document.getElementById("attempted-div").innerHTML = "Attempted : " + attempted ;
  document.getAnimations("correct-attempt-div").innerHTML = "Correct : " + statsObj['correctAnswers'];
  document.getElementById("wrong-attempt-div").innerHTML = "Wrong : " + statsObj['wrongAnswers'];
  document.getElementById("accuracy-div").innerHTML = "Accuracy = " + statsObj['accuracy'] + "%";
}
// ################# UTILITY CLASSES ######################### 
class Question {
  constructor(date)
  {
    this.date = getFormattedDate(...date.split("/"));
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
  getDayStr(day){
    switch(day)
    {
      case 0:
        return "SU";
      case 1:
        return "MO";
      case 2:
        return "TU";
      case 3:
        return "WE";
      case 4:
        return "TH";
      case 5:
        return "FR";
      case 6:
        return "SA";
    }
  }
}
// ########################## GAME FUNCTIONS ##########################
async function gameStart(p_time , p_startKey){
  
//hide main menu
  document.getElementById("main-wrapper").style.opacity = "0";
  await delay(1);
  document.getElementById("main-wrapper").style.display = "none";
  
  //show countdown and game block block
  document.getElementById("countdown-div").style.display = "flex";
  document.getElementById("game-wrapper").style.display = "block";
  // set countdown block to black
  document.getElementById("signal-red").style.backgroundColor = "black";
  document.getElementById("signal-yellow").style.backgroundColor = "black";
  document.getElementById("signal-green").style.backgroundColor = "black";
  //Set game Timer
  document.getElementById("live-timer-div").innerHTML = p_time;
  // set date to 0000
  document.getElementById("date-question-div").innerHTML = getFormattedDate("0000","00","00");
  //set attempted to 0
  document.getElementById("counter-div").innerHTML = "<p>Attempted : 0 </p>" ;
  await delay(0.5);
  //change opacity of countdown and game block
  document.getElementById("countdown-div").style.opacity = "1";
  document.getElementById("game-wrapper").style.opacity = "1";
  await delay(1.5);

  // reset variables 
  questions = [];
  attempted = 0;
  timer = p_time ;
  startKey = p_startKey;
  keyPressed = -1;

  createWeekDaysMapping();
;
//starting countdown
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
    endGameWrapper();
  }
} , 1000)
// end game wrapper
function endGameWrapper(){
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
  document.getElementById("finish-btn").removeEventListener("mousedown" , finishBtnDown);
  console.log(typeof(questions))
  questions.pop();
  endGame();
}

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
  function finishBtnDown(){
    endGameWrapper();
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
  document.getElementById("finish-btn").addEventListener("mousedown" , finishBtnDown);
// Adding and Displaying random date
  attempted--;
  updateQuestion();
  //update question function
  function updateQuestion(){
    questions.push(new Question(getRandomDate()));
    document.getElementById("date-question-div").innerHTML = questions[questions.length - 1].getDate();
    attempted++;
    document.getElementById("counter-div").innerHTML = "<p>Attempted : " + attempted +"</p>" ;
  }
}


// ------------- End Game ------------------
async function endGame()
{
  
  //hide game menu 
  document.getElementById("game-wrapper").style.opacity = "0";
  await delay(0.5);
  document.getElementById("game-wrapper").style.display = "none";
  // show result screen
  document.getElementById("result-wrapper").style.display = "block";
  await delay(0.1);
  document.getElementById("result-wrapper").style.opacity = "1";
  
  //show stats 
  displayStats(calculateStats());
  //  Show result
  let resultTable = document.getElementById("result-table");
  resultTable.innerHTML = `<tr id="table-heading"> 
  <th>sr#</th>   
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
    <td>`+(i+1)+`</td>    
  <td>`+questions[i].getDate()+`</td>
  <td>`+questions[i].getDayStr(questions[i].getAnswer()) +`</td>
  <td class="`+ ansClass+ `">`+ ans+`</td>
  <td>`+questions[i].getDayStr(questions[i].getDay())+`</td>
  </tr>`;
;

// cross code &#9587;  tick code : &check;
  }

  // Adding go back btn event listener
  document.getElementById("result-go-back-btn").addEventListener('click' , mainMenu);
}

//-------------------- Main Menu ----------------------
async function mainMenu(){
  // Removing go back btn event listener
  document.getElementById("result-go-back-btn").removeEventListener('click' , mainMenu);
  //hide result menu  --------------------------------
  document.getElementById("result-wrapper").style.opacity = "0";
  await delay(0.5);
  document.getElementById("result-wrapper").style.display = "none";
  // show main Menu -----------------
  document.getElementById("main-wrapper").style.display = "block";
  await delay(0.3);
  document.getElementById("main-wrapper").style.opacity = "1";

//Main Menu Functions -----------------------------
function checkTimerValue()
{
  console.log("Check timer executed");
  let timeDiv = document.getElementById("timer");
  if (timeDiv.value < 30){
    timeDiv.value = "30";
  }
  else if(timeDiv.value > 120 || isNaN(timeDiv.value))
  {
    timeDiv.value = "120";
  }
  
}
function gameStartWrapper ()
{
  // removing event listeners
    document.getElementById("start-btn").removeEventListener("click" , gameStartWrapper);
    document.getElementById("timer").removeEventListener('focusout' , checkTimerValue);
    document.getElementById("start-key-btn").removeEventListener("click" , changeStartKey);
    document.getElementById("format-btn").removeEventListener("click" , changeFormat);

    //starting game
    console.log("Timer is : " , getTime());
    console.log("Start Key is : " , getStartKey());
    gameStart(getTime(),getStartKey());
  }
function changeStartKey(){
  console.log("changestartkey() executed");
  let startKeyValueElm = document.getElementById("start-key-value");
  let value = parseInt(startKeyValueElm.innerHTML);
  value++;
  if (value == 8){
    value = 1;
  } 
  startKeyValueElm.innerHTML = value.toString();
}
function changeFormat(){
  let format = document.getElementById("format-btn-value");
  if(format.innerHTML == "DD/MM/YY")
    format.innerHTML = "MM/DD/YY";
  else if(format.innerHTML == "MM/DD/YY")
    format.innerHTML = "YY/MM/DD";
  else if(format.innerHTML == "YY/MM/DD")
    format.innerHTML = "YY/DD/MM";
  else if(format.innerHTML == "YY/DD/MM")
    format.innerHTML = "DD/MM/YY";
}
  function getTime(){
    return parseInt(document.getElementById("timer").value);   
  }
  function getStartKey(){
    return parseInt(document.getElementById("start-key-value").innerText);
  }
 
  // add event listeners ----------------------------------------------
  document.getElementById("timer").addEventListener('focusout' , checkTimerValue);
  document.getElementById("start-btn").addEventListener("click" , gameStartWrapper);
  document.getElementById("start-key-btn").addEventListener("click" , changeStartKey);
  document.getElementById("format-btn").addEventListener("click" , changeFormat);

}

// hide other menus
document.getElementById("result-wrapper").style.display = "none";
document.getElementById("result-wrapper").style.opacity = "0";
document.getElementById("game-wrapper").style.display = "none";
document.getElementById("game-wrapper").style.opacity = "0";

mainMenu();


