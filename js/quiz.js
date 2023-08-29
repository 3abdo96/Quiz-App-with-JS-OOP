import { Setting } from "./setting.js";

export class Quiz {
  constructor(questions) {
    this.currentQuestion = 0;
    this.question = questions;
    this.totalNumberOfQuestions = questions.length;
    this.correctAnswer;
    this.score = 0;
    document
      .getElementById("next")
      .addEventListener("click", this.nextQuestion.bind(this));
    document.getElementById("tryBtn").addEventListener("click", () => {
      window.location.reload();
    });
    this.startQuestion();
  }

  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }
  startQuestion() {
    document.getElementById("currentQuestion").innerHTML =
      this.currentQuestion + 1;

    document.getElementById("question").innerHTML =
      this.question[this.currentQuestion].question;
    document.getElementById("totalNumberOfQuestions").innerHTML =
      this.totalNumberOfQuestions;

    let answers = [
      this.question[this.currentQuestion].correct_answer,
      ...this.question[this.currentQuestion].incorrect_answers,
    ];

    this.correctAnswer = this.question[this.currentQuestion].correct_answer;

    this.shuffle(answers);
    let answersContainer = ``;
    for (let i = 0; i < answers.length; i++) {
      answersContainer += ` <label class="form-check-label ">
           <input type="radio" class="form-check-input" name="answer"  value="${answers[i]}">
           ${answers[i]}
       </label> 
       <br/>`;
    }

    document.getElementById("rowAnswer").innerHTML = answersContainer;
  }

  nextQuestion() {
    const choice = document.querySelector('[name="answer"]:checked')?.value;

    if (choice != undefined) {
      $("#alert").fadeOut(300);
      this.checkAnswer(choice, this.correctAnswer);
      this.currentQuestion++;

      if (this.currentQuestion < this.question.length) {
        this.startQuestion();
      } else {
        $("#quiz").fadeOut(300);
        $("#finish").fadeIn(300);
        $("#score").html(this.score);
      }
    } else {
      $("#alert").fadeIn(300);
    }
  }

  checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer == correctAnswer) {
      this.score++;
      $("#Correct").fadeIn(300).fadeOut(300);
    } else {
      $("#inCorrect").fadeIn(300).fadeOut(300);
    }
  }

  //   showSetting() {
  //     $("#finish").fadeOut(300);
  //     $("#setting").fadeIn(300);
  //   }
}
