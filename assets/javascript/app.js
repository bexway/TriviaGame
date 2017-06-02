var game = {
  currentQuestion: "",
  currentCorrectAnswer: -1,
  currentOptions: [],
  questiondb: [],
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

  updateTimer: function(){
    game.timeLeft--;
    console.log(game.timeLeft);
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
  }




};

$(document).ready(function() {
  $('#timerbutton').click(function(){
    game.startTimer();
  });
});
