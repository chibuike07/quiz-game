let len = 0;

let qui = arrObj.map(n => n.quis);
let ans = arrObj.map(n => n.ans);
let pElem = document.querySelector(".display p");
let iElem = document.querySelector(".display i");
let heading = document.querySelector(".wel h2");
let progress = document.querySelector(".progress p");
let pro,
  countCo = 0,
  countFa = 0;
let respond;
function nex() {
  let display = document.querySelector(".display");
  // console.log(qui);
  len = len + 1;
  len = len % qui.length;
  let res = qui[len];
  pElem.innerText = res;
  iElem.innerText = ans[len];
  display.style.backgroundColor = "cornsilk";
  // console.log(len);
  if (len == 21) {
    // alert("yes");
    heading.innerText =
      "From the following advertising slogans can you name the companies?";
  }

  range();
}
function prev() {
  if (len === 0) {
    len = qui.length;
  } else {
    len = len - 1;
    pElem.innerText = qui[len];
    iElem.innerText = ans[len];
  }
}
function range() {
  pro = setInterval(time, 100);
  let width = 100;
  function time() {
    if (width <= 1) {
      clearInterval(pro);
    } else {
      width--;
      progress.style.width = width + "%";
      progress.innerText = width + "%";
    }
    if (width <= 1) {
      failedAns();
      return false;
    }
  }
}
document.addEventListener("DOMContentLoaded", () => {
  pElem.innerText = qui[0];
  iElem.innerText = ans[0];
});
function correctAns(event) {
  countCo++;
  respond = new SpeechSynthesisUtterance("nice shot! u answered correctly!");
  speechSynthesis.speak(respond);

  clearInterval(pro);
  console.log(countCo);
  priceWon();
}
function failedAns() {
  countFa++;
  let listEle = document.getElementById("ul").getElementsByTagName("li");
  respond = new SpeechSynthesisUtterance("sorry you missed the answer");
  speechSynthesis.speak(respond);
  console.log(countFa);
  for (let i = 0; i < listEle.length; i++) {
    listEle[i] = listEle[i].classList.remove("listColor");
  }
  clearInterval(pro);
}
function prices() {
  let listEle = document.getElementById("ul");
  price.map((n, i) => {
    let liEle = document.createElement("li");
    liEle.setAttribute("id", "liElem");
    liEle.innerText = n;
    listEle.appendChild(liEle);
  });
}
prices();
let c = 0;
function priceWon() {
  let listEle = document.getElementById("ul").getElementsByTagName("li");
  let arr = [...listEle];
  for (let i = 0; i < arr.length; ++i) {
    countCo == i + 1
      ? arr[i].classList.add("list")
      : arr[i].classList.remove("list");
  }
  if (countCo == 12) {
    alert("congrat your team is awesome");
    let ul = document.getElementById("ul");
    priceB.map((n, i) => {
      let li = document.getElementById("liElem");
      li.innerText = n;
      ul.appendChild(li);
      ul.style.left = "50%";
      console.log(c);
    });
  }
  countCo == 12 && (countCo = 0);
  // n = n + 1;
  // n = n % arr.length;
  // arr[n].classList.add('list')
}

// let re = new SpeechSynthesisUtterance("otabiabia");
// speechSynthesis.speak(re);
