var game = {
  currentQuestion: null,
  //see other file for questiondb variable
  questiondb: questiondb,
  questionOrder: shuffle(serialArray(questiondb.length)),
  wins: 0,
  losses: 0,
  defaultAnswerTime:20,
  timeLeft:20,
  interval:null,
  timerStarted: 0,
  rate:1000,

  startTimer: function(){
    if (!this.timerStarted) {
      //reset the time left
      this.timeLeft = this.defaultAnswerTime;
      this.interval = setInterval(this.updateTimer, this.rate);
      this.timerStarted = true;
      //set html timer display
      $('#timer').html(game.timeLeft);
      $('#timer').removeClass("font-color-red");
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
    else if(game.timeLeft<=5){
      $('#timer').addClass("font-color-red");
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
    var qtext = '<div class="row question"><p class="col-md-10 col-md-offset-1 questionText border-thin text-center bg-content">'+
    this.currentQuestion.question +
    '</p></div>'+'<div class="row answers"><div class="col-md-10 col-md-offset-1 flex flex-around flex-wrap border-thin padding bg-content"><div class="row width-full">';
    for(var i=0;i<answers.length;i++){
      // for each answer, add an answer button
      qtext += '<div class="col-md-6">'+
        '<label id="answerLabel'+answers[i][1]+'" class="answerLabel js-addLabel'+answers[i][1]+'" for='+answers[i][1]+'>'+answers[i][0]+'</label><input id="answer'+answers[i][1]+'" type="radio" name="answer" value='+answers[i][1]+'>'+
      '</div>';
    }
    qtext += "</div><div id='message' class='row width-full text-center'><p class='col-md-12'></p></div>";
    questionContainer.append(qtext);
    return questionContainer;
  },

  checkAnswer: function(){
    if(game.currentQuestion){
      var answer =$(this).attr("for");
      game.stopTimer();

      if(parseInt(answer)===game.currentQuestion.correctAnswer){
        //add correctness class to corect answer
        $(".js-addLabel"+game.currentQuestion.correctAnswer).addClass("answerLabelCorrect");
        $("#message").text("You got it right!");
        game.wins++;
        if(game.rate>=400){
          game.rate-=200;
        }
      }
      else{
        //add wrongness class to chosen answer, and correctness class to correct answer
        $(".js-addLabel"+game.currentQuestion.correctAnswer).addClass("answerLabelCorrect");
        $(".js-addLabel"+answer).addClass("answerLabelWrong");
        $("#message").text("Not quite! Green shows the correct answer!");
        game.losses++;
        if(game.rate<=2000){
          game.rate+=200;
        }
      }

      if(game.questionOrder.length===0){
        setTimeout(function(){game.gameOver();}, 1000 * 3);
      }
      else{
        setTimeout(function(){game.nextQuestion();}, 1000 * 3);
      }
    }
  },

  gameOver: function(){
    //display stats, return buttons to initial states
    $('#score').removeClass("hidden").html("<p>Wins: "+this.wins+"</p><p>Losses:"+this.losses+"</p>");
    $('#startbutton').toggle();
    $('#timer').toggle();
    $('#question').empty();
  },

  startGame: function(){
    $('#timer').toggle();
    $('#startbutton').toggle();
    $('#score').addClass("hidden").empty();
    //reset and shuffle question order
    this.currentQuestion = null;
    this.rate = 1000;
    this.questionOrder= shuffle(serialArray(game.questiondb.length));
    this.wins = 0;
    this.losses = 0;
    this.nextQuestion();
  }




};







$(document).ready(function() {
  $('#startbutton').click(function(){
    game.startGame();
  });

  // $(document).on('click', '.answerLabel', function(){
  //   if(game.currentQuestion&&game.timerStarted){
  //     //check the answer with the value from the clicked label
  //     game.checkAnswer($(this).attr("for"));
  //   }
  // });

  $(document).on('click', '.answerLabel', game.checkAnswer);
});











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
