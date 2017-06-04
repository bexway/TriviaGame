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
      game.checkAnswer();
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
    '</p>'+'<div class="answers">';
    for(var i=0;i<answers.length;i++){
      qtext += '<input id="answerbuttons" type="radio" name="answer" value='+answers[i]+'>'+ answers[i];
    }
    questionContainer.append(qtext);

    // https://stackoverflow.com/a/8936678
    // questionContainer.append($('<button/>', {
    //     text: 'Submit',
    //     id: 'submit_btn',
    //     click: game.checkAnswer}).addClass("btn"));
    return questionContainer;
  },

  checkAnswer: function(){
    game.stopTimer();
    if($('input[name="answer"]:checked').val()===game.currentQuestion.correctAnswer){
      console.log("Correct!");
      game.wins++;
    }
    else{
      game.losses++;
    }

    if(game.questionOrder.length===0){
      game.gameOver();
    }
    else{
      console.log("Next question...");
      setTimeout(game.nextQuestion, 1000 * 1);
    }
  },

  gameOver: function(){
    console.log('placeholder');
    //display stats
    //ask to start new game
    $('#score').html("<p>wins: "+this.wins+"</p><p>Losses:"+this.losses+"</p>");
  },

  startGame: function(){
    //reset and shuffle question order
    this.currentQuestion = null;

    this.questionOrder= shuffle(serialArray(game.questiondb.length));
    this.wins = 0;
    this.losses = 0;
    this.nextQuestion();
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
    game.startGame();
  });

  $(document).on('click', '#answerbuttons', function(){
    if(game.currentQuestion){
      game.checkAnswer();
    }
  });
});
