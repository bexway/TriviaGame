# Trivia Game

A shell for a simple trivia game. The questions are placeholders. When a question is answered correctly, the timer's countdown speeds up, and when a question is answered incorrectly, it slows down. It is possible for any number of answers to be correct (including none of all of the answers). The order of the questions and answers is randomized. After all of the questions have been answered, the number of correct and incorrect answers will display on the screen, along with a button to start the trivia game again.

The countdown is tracked by a `setInterval`. The rate of that interval depends on how previous questions were answered, and the interval is recreated for each new question.

The questions are stored in the `questiondb.js` file, which consists of a list of question objects. To change the questions of the game, change the question object's properties. The same question object format can be repeated to create additional questions. The `answers` property is a list of lists, each of which contains the answer text to display and a key number. If more than one answer is correct, they should both have the same key number, so that the answer-checking function will mark them both correct. The answer keys are arbitrary, but are not simplified to booleans (0 and 1) to prevent them from appearing in the html element tags.

Each answer for a question has its own class and id containing its answer key. These classes are used to find the elements after an answer is chosen, and highlight them as the correct or incorrect answer.

## Goals

I would like to simplify how answers are checked so that the answer key number isn't displayed on the html element.
