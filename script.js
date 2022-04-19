
// ########################### VARIABLES #############################



// ######################## UTILITY FUNCTIONS ########################
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
// ########################## GAME FUNCTIONS ##########################
function gameStart(){
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
    let startKey = document.getElementById("start-key-value").textContent;
  // add event listeners
  let btns =document.getElementsByClassName("btn");
  function keyPressFunc(event)
  {
    console.log("key pressed");
    console.log(event.key);
    
  }
  function btnPress(btn){
    console.log(btn);
  }
  for(let i=parseInt(startKey)-1 ; i < 7 ; i++)
  {
    let test = "ha";
    btns[i].addEventListener("click" , ()=>{
      btnPress(i+1);
    }) ;
    document.addEventListener("keydown" , keyPressFunc) ;
  }
    
}

gameStart();