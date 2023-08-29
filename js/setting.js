/// <reference path="../typings/globals/jquery/index.d.ts" />

import { Quiz } from "./quiz.js";

export class Setting {
  constructor() {
    this.category = document.getElementById("category");
    this.difficulty = document.getElementsByName("difficulty");
    this.numberOfQuestions = document.getElementById("numberOfQuestions");
    document
      .getElementById("startBtn")
      .addEventListener("click", this.startQuiz.bind(this));
  }

  async startQuiz() {
    let category = this.category.value;
    let difficulty = Array.from(this.difficulty).find((elm) => {
      return elm.checked;
    }).value;
    let numberOfQuestions = this.numberOfQuestions.value;

    let API = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;

    if (numberOfQuestions > 0) {
      let result = await this.fetchData(API);
      $("#setting").fadeOut(300);
      $("#quiz").fadeIn(300);

      let quiz = new Quiz(result);
    } else {
      $("#alert1").fadeIn(300);
    }
  }

  async fetchData(url) {
    let response = await fetch(url);
    response = await response.json();
    return response.results;
  }
}
