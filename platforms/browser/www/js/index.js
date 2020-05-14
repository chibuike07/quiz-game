//getting the search params
let transferedCategories = decodeURIComponent(window.location.search);
transferedCategories = transferedCategories.substring(2);

//getting the object of the title that matches the click title
let quizTitle = arrObj.filter(v => v.type === transferedCategories.trim());
console.log(quizTitle);

//destructuring the object
let [questions] = quizTitle;
let len = 0;
let question = questions.questions.map(n => n.quis); //getting the questions from the array
let answer = questions.questions.map(n => n.ans); //getting the answers from the array
let pElem = document.querySelector(".display p"); //getting the paragraph elem
let nexButElem = document.querySelector("#nex"); //getting the next button elem
let prevButElem = document.querySelector("#prev"); //getting the previous button elem
let iElem = document.querySelector(".display i"); //getting the elem that will hold the answers view
let inputElem = document.querySelector(".checkAnsWrapper input");
let formElem = document.querySelector(".display form");
let checkAns = document.querySelector(".display #checkAns");
let heading = document.querySelector(".wel h1");
let progress = document.querySelector(".progress p");
let pro,
  countCo = 0,
  countFa = 0,
  respond,
  quisHolder = [],
  quisObject = {};

nexButElem.onclick = () => {
  //function for the next button
  let display = document.querySelector(".display");
  len = len + 1;
  len = len % question.length;
  let res = question[len];
  console.log(question[len]);
  pElem.innerText = res; //appending the question to the pelem
  iElem.innerHTML = answer[len]; //appending the answers to the iElem
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
    iElem.innerText = answer[len];
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
  document.querySelector("#cor").disabled = true;
  document.querySelector("#fail").disabled = true;
}

// document.querySelector("#fail").addEventListener("click", failedAns);
function failedAns() {
  countFa++;
  let listEle = document.getElementById("ul").getElementsByTagName("li");
  console.log(countFa);
  clearInterval(pro);
  for (let i = 0; i < listEle.length; i++) {
    listEle[i] = listEle[i].classList.remove("listColor");
    respond = new SpeechSynthesisUtterance("sorry you missed the answer");
  }
  alert("sorry u failed");
  speechSynthesis.speak(respond);
}
function prices() {
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
document.addEventListener("DOMContentLoaded", () => {
  // things to load on moun
  let confirmText = window.confirm("are you redy to start");
  if (confirmText === true) {
    range();
  } else {
    return;
  }
  pElem.innerText = question[0];
  iElem.innerText = answer[0];
  quisObject[question[len]] = answer[0];
  console.log(len);
  // setting the heading to match the title of the quis when it reaches the 21 quis
  heading.innerText = transferedCategories.trim().toUpperCase();
});

// let re = new SpeechSynthesisUtterance("otabiabia");
// speechSynthesis.speak(re);
