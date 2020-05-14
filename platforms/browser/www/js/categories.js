const addCategories = () => {
  let divElem = document.querySelector(".list_wrapper");
  arrObj.map(values => {
    let listWrapper = document.createElement("div");
    listWrapper.style.backgroundColor = "red";
    listWrapper.setAttribute("class", "container");
    let ulElem = document.createElement("ul");
    let liElem = document.createElement("li");
    let link = document.createElement("a");
    link.innerText = values.type;
    link.href = `../../www/game_display.html?= ${values.type}`;
    liElem.appendChild(link);
    ulElem.appendChild(liElem);
    listWrapper.appendChild(ulElem);
    divElem.appendChild(listWrapper);
  });
};
addCategories();
