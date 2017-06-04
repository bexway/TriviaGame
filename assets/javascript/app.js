var game = {
  currentQuestion: null,
  questiondb: questiondb,
  //An array of objects
  questionOrder: shuffle(serialArray(questiondb.length)),
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
    $('#timer').html(game.timeLeft);
    if(game.timeLeft<=0){
      game.stopTimer();
      console.log("Time up!");
    }
  },

  nextQuestion: function(){
    var index = game.questionOrder.shift();
    game.currentQuestion = this.questiondb[index];
    //display question
    $('#question').html(game.createQuestionHTML());
    game.startTimer();
  },

  createQuestionHTML: function(){
    var questionContainer = $('<div>').addClass("question").attr("id", "myQuestion").data("questionvar", this.currentQuestion);
    console.log(this.currentQuestion.answers);
    var answers = shuffle(this.currentQuestion.answers);
    var qtext = '<p class="questionText">'+
    this.currentQuestion.question +
    '</p>'+'<div class="answers">' +
    '<input type="radio" name="answer" value='+answers[0]+'>'+ answers[0]+
    '<input type="radio" name="answer" value='+answers[1]+'>'+ answers[1]+
    '<input type="radio" name="answer" value='+answers[2]+'>'+ answers[2]+
    '<input type="radio" name="answer" value='+answers[3]+'>'+ answers[3];
    questionContainer.append(qtext);
    return questionContainer;
  },

  checkAnswer: function(){
    game.stopTimer();
    if($('input[name="answer"]:checked').val()===this.currentQuestion.correctAnswer){
      console.log("Correct!");
      this.wins++;
    }
    else{
      this.losses++;
    }

    if(this.questionOrder.length===0){
      this.gameOver();
    }
    else{
      console.log("Next question...");
      setTimeout(this.nextQuestion, 1000 * 5);
    }
  },

  gameOver: function(){
    console.log('placeholder');
    //display stats
    //ask to start new game
  },

  startGame: function(){
    //reset and shuffle question order
    //put first question on screen
    //start timer
  }




};

function randomNumber(max, min=0){
  return Math.floor(Math.random()*(max-min+1)+min);
}

function serialArray(n){
  var arr = [];
  for (var i = 0; i <= n-1; i++) {
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
