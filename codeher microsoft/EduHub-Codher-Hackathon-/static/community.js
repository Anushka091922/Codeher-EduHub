const questions = document.querySelectorAll(".question");
const searchbar = document.querySelector("#searchbar");
const bookmarksContainer = document.querySelector("#bookmarks-container");
// const searchInput = document.querySelector("#search-input");


 let bookmarkedQuestions = [];
// Search questions

 searchbar.addEventListener("input", function() {
  const searchTerm = this.value.toLowerCase();
  const questions = document.querySelectorAll(".question");
  questions.forEach(function(question) {
    const questionText = question.querySelector(".question-text").textContent;
    if (questionText.toLowerCase().indexOf(searchTerm) !== -1) {
      question.style.display = "block";
    } else {
      question.style.display = "none";
    }
  });
});

// Submit answers
questions.forEach(question => {
  const submitAnswerButton = question.querySelector(".submit-answer");
  const answerInput = question.querySelector(".answer-input");
  const questionAnswer = question.querySelector(".question-answer");
 submitAnswerButton.addEventListener("click", () => {
    if (answerInput.value) {
      questionAnswer.textContent = answerInput.value;
      bookmarkedQuestions.forEach(question => {
      if (question.questionText === questionText) {
        question.answer = answerInput.value;
      }
    });
      answerInput.value = "";
    }
  });
});
// Bookmark questions
questions.forEach(question => {
  const bookmarkButton = question.querySelector(".bookmark-button");
  const questionText = question.querySelector(".question-text").textContent;
  const answerInput = question.querySelector(".answer-input");
   const submitAnswerButton = question.querySelector(".submit-answer");
   const questionAnswer = question.querySelector(".question-answer");
  submitAnswerButton.addEventListener("click", () => {
    if (answerInput.value) {
      questionAnswer.textContent = answerInput.value;
      bookmarkedQuestions.forEach(bookmarkedQuestion => {
        if (bookmarkedQuestion.questionText === questionText) {
          bookmarkedQuestion.answer = answerInput.value;
        }
      });
      answerInput.value = "";
    }
  });

  bookmarkButton.addEventListener("click", () => {
    document.getElementById("show-bookmarks").addEventListener("click", function() {
  document.getElementById("bookmarks-container").style.display = "block";
});
document.getElementById("hide-bookmarks").addEventListener("click", function() {
  document.getElementById("bookmarks-container").style.display = "none";
});

    if (question.classList.contains("bookmarked")) {
      question.classList.remove("bookmarked");
      const index = bookmarkedQuestions.findIndex(q => q.questionText === questionText);
      bookmarkedQuestions.splice(index, 1);
    } else {
      question.classList.add("bookmarked");
      bookmarkedQuestions.push({ questionText, answer: questionAnswer.textContent });
    }
    renderBookmarks();
  });
});



function renderBookmarks() {
  bookmarksContainer.innerHTML = "";
  const questions = document.querySelectorAll(".question");
  [...questions].forEach(question => {
    if (question.classList.contains("bookmarked")) {
      const questionText = question.querySelector(".question-text").textContent;
      const questionAnswer = question.querySelector(".question-answer").textContent;
      const bookmark = document.createElement("div");
      bookmark.classList.add("bookmark");
      bookmark.innerHTML = `<p><strong>Question:</strong> ${questionText}</p><p><strong>Answer:</strong> ${questionAnswer}</p>`;
      bookmarksContainer.appendChild(bookmark);
    }
  
  });
}

const form = document.querySelector("#add-question");
const questionInput = document.querySelector("#add-question-input");
const questionsContainer = document.querySelector("#questions");

function addQuestion() {
  const questionText = questionInput.value;
  if (!questionText) {
    return;
  }
  const questionHTML = `
    <div class="question">
      <h2 class="question-text">${questionText}</h2>
      <button class="bookmark-button">Bookmark</button>
      <p class="question-answer"></p>
      <input type="text" class="answer-input" placeholder="Enter your answer here">
      <button class="submit-answer">Submit</button>
    </div>
  `;
  questionsContainer.insertAdjacentHTML("afterbegin", questionHTML);
  // questionsContainer.innerHTML += questionHTML;
  
  questionInput.value = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  addQuestion();
});

const addQuestionButton = document.querySelector("#add-question-button");
addQuestionButton.addEventListener("click", addQuestion);

questionsContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("submit-answer")) {
    const question = event.target.closest(".question");
    const answerInput = question.querySelector(".answer-input");
    const answer = answerInput.value;
    if (!answer) {
      return;
    }
    const answerParagraph = question.querySelector(".question-answer");
    answerParagraph.textContent = answer;
  } else if (event.target.classList.contains("bookmark-button")) {
    const question = event.target.closest(".question");
    const questionText = question.querySelector(".question-text").textContent;
    const questionAnswer = question.querySelector(".question-answer");

    if (question.classList.contains("bookmarked")) {
      question.classList.remove("bookmarked");
      const index = bookmarkedQuestions.findIndex(q => q.questionText === questionText);
      bookmarkedQuestions.splice(index, 1);
    } else {
      question.classList.add("bookmarked");
      bookmarkedQuestions.push({ questionText, answer: questionAnswer.textContent });
    }
    renderBookmarks();
  
  }
});