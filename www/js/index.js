//getting the search params
let transferedCategories = decodeURIComponent(window.location.search);
transferedCategories = transferedCategories.substring(2);

//getting the object of the title that matches the click title
let quizTitle = arrObj.filter(
  v => v.questionType === transferedCategories.trim()
);
console.log(quizTitle);

//destructuring the object

let len = 0;
let question = [], //array for the quiz question
  objective = [], //array for the multiple choice
  answer = []; //array for the answers
let pElem = document.querySelector(".display p"); //getting the paragraph elem
let nexButElem = document.querySelector("#nex"); //getting the next button elem
let prevButElem = document.querySelector("#prev"); //getting the previous button elem
let option = document.querySelector(".multiple_choice"); //getting the elem that will hold the answers view
let lists = document.querySelectorAll(".multiple_choice ul li"); //getting the elem that will hold the answers view
let pEl = document.getElementById("qui1"); //element for the option list
let pEle = document.getElementById("qui2"); //element for the option list
let pElee = document.getElementById("qui3"); //element for the option list
let inputElem = document.querySelector(".checkAnsWrapper input"); //input for answer check
let formElem = document.querySelector(".display form"); //form for the input on submit
let checkAns = document.querySelector(".display #checkAns"); //the submit button for the answers
let heading = document.querySelector(".wel h1"); //element for quiz titles
let progress = document.querySelector(".progress p"); //element for timeout
let pro, //declaring that hold the time interval
  countCo = 0, //declaration for the correct answer count
  countFa = 0, //declaration for the wrong answer count
  respond, // declaration that handles the voice note for wrong or right answers
  quisHolder = [], //array that pushes the correct answer quiz and answer to the local storage
  quisObject = {}; //object that holds the correct answer quiz and answer to the local storage
let [questions] = quizTitle; //destructured object from the array
// console.log(q)
let res = questions.questions.map(value => {
  //mapping through the questions
  if (!Object.keys(value).includes("multipleChoice")) {
    // thing to do if quiz does not contain multiple choice categories
    question.push(value.quis); //pushing question
    answer.push(value.ans); //pushing anwer
  } else {
    //things to do if multiple choice quiz is been clicked
    question.push(value.quis);
    objective.push(value.multipleChoice); //push the multiple choice quiz
    // console.log(objective);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // things to load on moun
  pElem.innerText = question[0];
  quisObject[question[len]] = answer[0];
  pEl.innerText = objective[len].a;
  pEle.innerText = objective[len].b;
  pElee.innerText = objective[len].c;
  console.log(lists);
  for (let i = 0; i < lists.length; i++) {
    lists[i].addEventListener("click", selectionanswer); //added an event to get the selection option from the user
  }
  questions.questions.map(value => answer.push(value.ans)); //pushing the answer
  // setting the heading to match the title of the quis when it reaches the 21 quis
  heading.innerText = transferedCategories.trim().toUpperCase();
});

function selectionanswer(e) {
  //things to do when the user clicked on any of the answers
  inputElem.value = e.target.innerText;
}
nexButElem.onclick = () => {
  //function for the next button
  let display = document.querySelector(".display");
  len = len + 1; //index of the display views
  len = len % question.length; //getting the questions length
  let res = question[len]; //getting the next question
  pElem.innerText = res; //appending the question to the pelem
  //appending the options to the html elements
  pEl.innerText = objective[len].a;
  pEle.innerText = objective[len].b;
  pElee.innerText = objective[len].c;

  display.style.backgroundColor = "cornsilk";

  range(); //setting time down immediately the next button is been hit
  // enabling the correctAns but and failed but
};

checkAns.addEventListener("click", formSubmission);
function formSubmission() {
  // funtion that checks if the input value is the correct answer of the question
  if (question[len]) {
    //check to verify that the question has appeared
    if (inputElem.value === answer[len]) {
      //check if the value match the answer
      quisObject[question[len]] = answer[len]; //wrapper the correct ans and its question to an object
      if (localStorage.getItem("correct_answers") === null) {
        //check if correct answers is exist in the local storage
        localStorage.setItem("correct_answers", JSON.stringify(quisObject)); //setting the correct answers data to the local storage
      } else {
        let correctAnsHolders = JSON.parse(
          localStorage.getItem("correct_answers")
        ); //getting the value of the correct answers data
        correctAnsHolders = quisObject; //adding to the existing storage
        localStorage.setItem(
          "correct_answers",
          JSON.stringify(correctAnsHolders)
        ); //setting the update to the storage
      }
      correctAns();
      console.log(quisObject, "quisObject");
      return inputElem.value;
    } else {
      console.log("not found");
      failedAns();
      // return "not found";
    }
  }
}
// console.log(quisObject, "globally");

prevButElem.onclick = () => {
  //getting the previous question
  if (len === 0) {
    len = question.length;
  } else {
    if (pElem.innerText !== "") {
      //making sure that the quis is out
      if (pElem.innerText === question[0]) {
        prevButElem.disabled = true;
      } else {
        prevButElem.disabled = false;
      }
    }
    len = len - 1;
    pElem.innerText = question[len];
    // iElem.innerText = answer[len];
  }
};

function range() {
  //setting the timeOut
  pro = setInterval(time, 100); //setting time
  let width = 100;
  function time() {
    //timeout
    if (width <= 1) {
      clearInterval(pro); //clear interval
      alert(true);
    } else {
      width--;
      progress.style.width = width + "%";
      progress.innerText = width + "%";
    }
    if (width <= 1) {
      failedAns(); // incorrect if time out
      return false;
    }
  }
}

// document.querySelector("#cor").addEventListener("click", correctAns);
function correctAns() {
  // correct answer
  countCo++;
  alert("corect");
  respond = new SpeechSynthesisUtterance("nice shot! u answered correctly!");
  speechSynthesis.speak(respond);

  clearInterval(pro);
  console.log(countCo);
  priceWon();
  // document.querySelector("#cor").disabled = true;
  // document.querySelector("#fail").disabled = true;
}

// document.querySelector("#fail").addEventListener("click", failedAns);
function failedAns() {
  //getting the failed question and giving the user feed back
  countFa++;
  let listEle = document.getElementById("ul").getElementsByTagName("li"); //getting the prices elements
  console.log(countFa);
  clearInterval(pro); //clearing the interval
  for (let i = 0; i < listEle.length; i++) {
    //map through the list
    listEle[i] = listEle[i].classList.remove("listColor"); //removing the classlist
    respond = new SpeechSynthesisUtterance("sorry you missed the answer"); //added a voice note for the failed questions
  }
  alert("sorry u failed"); //alerting failed
  speechSynthesis.speak(respond); //voice the failed option
}
function prices() {
  //functions for the prices
  let listEle = document.getElementById("ul");
  price.map(n => {
    let liEle = document.createElement("li");
    liEle.setAttribute("id", "liElem");
    liEle.innerText = n;
    listEle.appendChild(liEle);
  });
}
prices();
// let c = 0;
function priceWon() {
  //functions for the price won
  let listEle = document.getElementById("ul").getElementsByTagName("li");
  let arr = [...listEle];
  for (let i = 0; i < arr.length; ++i) {
    countCo === i + 1
      ? arr[i].classList.add("list")
      : arr[i].classList.remove("list");
  }
  if (countCo === 12) {
    alert("congrat your team is awesome");
    let ul = document.getElementById("ul");
    priceB.map(n => {
      let li = document.getElementById("liElem");
      li.innerText = n;
      ul.appendChild(li);
      ul.style.left = "50%";
    });
  }
  countCo === 12 && (countCo = 0);
}

// let re = new SpeechSynthesisUtterance("otabiabia");
// speechSynthesis.speak(re);
