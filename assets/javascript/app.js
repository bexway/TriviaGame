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
    if (!this.timerStarted) {
      //reset the time left
      this.timeLeft = this.defaultAnswerTime;
      this.interval = setInterval(this.updateTimer, 1000);
      this.timerStarted = true;
      //set html timer display
      $('#timer').html(game.timeLeft);
    }
  },

  stopTimer: function(){
    clearInterval(game.interval);
    game.timerStarted = false;
  },

  updateTimer: function(){
    //decrement timer
    game.timeLeft--;
    //set html timer display
    $('#timer').html(game.timeLeft);
    //if timeup, stop timer and check with a blank answer
    if(game.timeLeft<=0){
      game.stopTimer();
      game.checkAnswer(null);
    }
  },

  nextQuestion: function(){
    //grab the question index from the front of the order array
    var index = game.questionOrder.shift();
    //set current question var
    game.currentQuestion = this.questiondb[index];
    //display question
    $('#question').html(game.createQuestionHTML());
    game.startTimer();
  },

  createQuestionHTML: function(){
    //create containing div, with id
    var questionContainer = $('<div>').addClass("question").attr("id", "myQuestion");
    //randomize question order
    var answers = shuffle(this.currentQuestion.answers);
    //write string for the question and answers, starting with question and the div for the answers
    var qtext = '<div class="row question"><p class="col-md-10 col-md-offset-1 questionText border-thin text-center">'+
    this.currentQuestion.question +
    '</p></div>'+'<div class="row answers"><div class="col-md-10 col-md-offset-1 flex flex-around flex-wrap border-thin padding"><div class="row width-full">';
    for(var i=0;i<answers.length;i++){
      // for each answer, add an answer button
      qtext += '<div class="col-md-6">'+
        '<label id="answerLabel'+answers[i]+'" class="answerLabel" for='+answers[i]+'>'+answers[i]+'</label><input id="answer'+answers[i]+'" type="radio" name="answer" value='+answers[i]+'>'+
      '</div>';
    }
    questionContainer.append(qtext);
    //This is the code to add a submit button for submitting answers. It's helpful if you want to give users the change to choose different answers, instead of going with the first one they click
    // https://stackoverflow.com/a/8936678
    // questionContainer.append($('<button/>', {
    //     text: 'Submit',
    //     id: 'submit_btn',
    //     click: game.checkAnswer}).addClass("btn"));
    return questionContainer;
  },

  checkAnswer: function(answer){
    game.stopTimer();

    if(answer===game.currentQuestion.correctAnswer){
      console.log("correct");
      //TODO: Print message to show correctness
      //add correctness class to corect answer
      $("#answerLabel"+game.currentQuestion.correctAnswer).addClass("answerLabelCorrect");
      game.wins++;
    }
    else{
      //TODO: Print message to show wrongness
      console.log("incorrect");
      //add wrongness class to chosen answer, and correctness class to correct answer
      $("#answerLabel"+game.currentQuestion.correctAnswer).addClass("answerLabelCorrect");
      $("#answerLabel"+answer).addClass("answerLabelWrong");
      game.losses++;
    }

    if(game.questionOrder.length===0){
      game.gameOver();
    }
    else{
      console.log("Next question...");
      setTimeout(game.nextQuestion, 1000 * 3);
    }
  },

  gameOver: function(){
    console.log('placeholder');
    //display stats
    //ask to start new game
    $('#score').html("<p>wins: "+this.wins+"</p><p>Losses:"+this.losses+"</p>");
  },

  startGame: function(){
    $('#timer').toggle();
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
  $('#startbutton').click(function(){
    game.startGame();
  });

  $(document).on('click', '.answerLabel', function(){
    if(game.currentQuestion&&game.timerStarted){
      console.log($(this).attr("for"));
      game.checkAnswer($(this).attr("for"));
    }
  });
});
