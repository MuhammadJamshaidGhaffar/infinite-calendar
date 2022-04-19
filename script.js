
// ########################### VARIABLES #############################





// ######################## UTILITY FUNCTIONS ########################
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
function getRandomDate(){
  let year = getRndInteger(1 ,9999).toString().padStart(4 , "0");
  let month = getRndInteger(1,12).toString().padStart(2 , "0");
  let day = getRndInteger(1,31).toString().padStart(2 , "0");
  let date = [year,month , day].join("-");
  return new Date(date);
}
// function delay(milliseconds){
//   var start = new Date().getTime();
//   var end=0;
//   while( (end-start) < milliseconds){
//       end = new Date().getTime();
//   }
//  }
function delay(n){
  return new Promise(function(resolve){
      setTimeout(resolve,n*1000);
  });
}

// ################# UTILITY CLASSES ######################### 
class Question {
  constructor(date)
  {
    this.date = date;
    this.answer = -1 ;
  }
  getDate()
  {
    return this.date.getDate();
  }
  getMonth()
  {
    return this.date.getMonth()+1;
  }
  getFullYear()
  {
    return this.date.getFullYear();
  }
  getAnswer()
  {
    return this.answer;
  }
}
// ########################## GAME FUNCTIONS ##########################
async function gameStart(p_time , p_startKey){
  // hide main menu
  document.getElementById("main-wrapper").style.display = "none";
  //show countdown block
  document.getElementById("countdown-div").style.display = "flex";
  document.getElementById("countdown-div").style.opacity = "1";
  //display game menu 
  document.getElementById("game-wrapper").style.display = "block";
  document.getElementById("game-wrapper").style.opacity = "1";

  // initialize variables 
    let questions = [];
    let score = 0;
    let timer = p_time ;
    let startKey = p_startKey;
  // FUNCTIONS 
  function btnPress(btn){
    console.log(btn);
  }
  // add event listeners
  document.addEventListener("keydown" , (event)=>{
    console.log("key pressed");
    console.log(parseInt(event.key));
  }) ;
  startKey = "4";
  let btns =document.getElementsByClassName("btn");
  for(let i=0 ; i < 7 ; i++)
  {
    console.log(i+1)
    btns[i].addEventListener("click" , ()=>{
      btnPress(i+1);
    }) ;  
  }
//starting countdown
document.getElementById("signal-green").style.backgroundColor = "black";
document.getElementById("signal-red").style.backgroundColor = "red";
await delay(1);
document.getElementById("signal-red").style.backgroundColor = "black";
document.getElementById("signal-yellow").style.backgroundColor = "yellow";
await delay(1);
document.getElementById("signal-yellow").style.backgroundColor = "black";
document.getElementById("signal-green").style.backgroundColor = "rgb(0, 255, 34)";
document.getElementById("countdown-div").style.opacity = "0";

//Adding random date
  while(timer > 0 )
  {
    questions.push(getRandomDate);
    
  }

  }


gameStart();


