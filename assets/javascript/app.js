var game = {
  currentQuestion: "",
  currentCorrectAnswer: -1,
  currentOptions: [],
  questiondb: questiondb,
  //An array of objects
  wins: 0,
  losses: 0,
  defaultAnswerTime:20,
  timeLeft:20,
  interval:null,
  timerStarted: 0,

  startTimer: function(){
    console.log('woah');
    if (!this.timerStarted) {
      this.timeLeft = this.defaultAnswerTime;
      this.interval = setInterval(this.updateTimer, 1000);
      this.timerStarted = true;
    }
    else{
      clearInterval(this.interval);
      this.timerStarted = false;
    }
  },

  stopTimer: function(){
    clearInterval(this.interval);
    this.timerStarted = false;
  },

  updateTimer: function(){
    game.timeLeft--;
    console.log(game.timeLeft);
  },

  nextQuestion: function(){
    var q = this.questiondb[randomNumber(this.questiondb.length)];
    console.log(q.question);
  },

  createQuestionHTML: function(){
    console.log('placeholder');
    //Create input of radio type, put them all in a giv and change the display to make them inline
  },

  ifRightAnswer: function(){
    console.log('placeholder');
    //increment wins
    //stop timer
    //check if done with trivia
    //setTimeout(newQuestionFunction, 1000 * 5);
    //to give a few seconds before next question
  },

  ifWrongAnswer: function(){
    console.log('placeholder');
    //increment losses
    //stop timer
    //check if done with trivia
    //setTimeout(newQuestionFunction, 1000 * 5);
    //to give a few seconds before next question
  },

  gameOver: function(){
    console.log('placeholder');
    //display stats
    //ask to start new game
  }




};

function randomNumber(max, min=0){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function serialArray(n){
  var arr = [];
  for (var i = 1; i <= n; i++) {
   arr.push(i);
  }
  return arr;
}


//from: https://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(function() {
  $('#timerbutton').click(function(){
    game.startTimer();
  });
});
