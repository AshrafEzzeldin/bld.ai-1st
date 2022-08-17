let size = 5;
let info;
let grid = "lg";

function myFunctionlg(x) {
  if (x.matches) {
    grid = "md";
    md = true;
    lg = false;
    size = 3;
    if (info) drawCards(info);
  } else {
    size = 5;
    grid = "lg";
    if (info) drawCards(info);
  }
}

function myFunctionmd(x) {
  if (x.matches) {
    grid = "sm";
    size = 2;
    if (info) drawCards(info);
  } else {
    size = 3;
    grid = "md";
    if (info) drawCards(info);
  }
}

function myFunctionsm(x) {
  if (x.matches) {
    grid = "xsm";
    size = 1;
    if (info) drawCards(info);
  } else {
    size = 2;
    grid = "sm";
    if (info) drawCards(info);
  }
}
let mdw = window.matchMedia("(max-width: 1300px)");
myFunctionlg(mdw);
mdw.addListener(myFunctionlg); // Attach listener function on state changes

let smw = window.matchMedia("(max-width: 800px)");
smw.addListener(myFunctionmd); // Attach listener function on state changes

let xsmw = window.matchMedia("(max-width: 520px)");
xsmw.addListener(myFunctionsm); // Attach listener function on state changes

const newFetch = async (course) => {
  let response = await fetch("http://localhost:3000/" + course);
  let json = await response.json();
  return json;
};

const removeContent = (e) => {
  let div = document.querySelector(e);
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};

let drawCards = function (data, cond) {
  removeContent(".carousel-inner");

  if (!info) {
    info = data;
    removeContent(".info");

    const infoDiv = document.querySelector(".info");

    let h3 = document.createElement("h4");
    h3.innerHTML = data[0]["header"];

    let p0 = document.createElement("p");
    p0.innerHTML = data[0]["description"];

    let form = document.createElement("form");

    let button = document.createElement("button");
    button.innerHTML = "Explore " + data[0]["clicked"];
    let listOfClasses = button.classList;
    listOfClasses.add("black-button");

    form.appendChild(button);

    infoDiv.appendChild(h3);
    infoDiv.appendChild(p0);
    infoDiv.appendChild(form);
  }
  const c1 = document.querySelector(".c1");

  let div1 = document.createElement("div");
  let listOfClasses = div1.classList;
  listOfClasses.add("carousel-item");
  listOfClasses.add("active");

  let div2 = document.createElement("div");
  listOfClasses = div2.classList;
  listOfClasses.add("carousel-item");
  listOfClasses.add("active");

  let cards5 = document.createElement("div");
  listOfClasses = cards5.classList;
  listOfClasses.add("wrapper-container");
  listOfClasses.add(grid);

  let count5 = 0;

  for (let i in data) {
    if (i == 0) continue;
    let object = data[i];
    if (!cond || object["title"].toLowerCase().includes(cond.toLowerCase())) {
      let newDiv = document.createElement("div");
      listOfClasses = newDiv.classList;
      listOfClasses.add("card-css");

      let img = document.createElement("img");
      img.setAttribute("src", object["image"]);
      listOfClasses = img.classList;
      listOfClasses.add("image-card");

      let h4 = document.createElement("h4");
      h4.innerHTML = object["title"];

      let p1 = document.createElement("p");
      p1.innerHTML = object["headline"];
      listOfClasses = p1.classList;
      listOfClasses.add("grey");

      let span1 = document.createElement("span");
      span1.innerHTML = object["rating"];

      let j = 0;
      for (j; j < object["rating"]; j++) {
        let star = document.createElement("i");
        listOfClasses = star.classList;
        listOfClasses.add("fa-solid");
        listOfClasses.add("fa-star");
        listOfClasses.add("gold");
        span1.appendChild(star);
      }
      j--;
      if (j < object["rating"]) {
        let star = document.createElement("i");
        listOfClasses = star.classList;
        listOfClasses.add("fa-solid");
        listOfClasses.add("fa-star-half-stroke");
        span1.appendChild(star);
      }
      listOfClasses = span1.classList;
      listOfClasses.add("gold");

      // let span2 = document.createElement("span");
      // span2.innerHTML = "(" + data[0]["followers"] + ")";
      // listOfClasses = span2.classList;
      // listOfClasses.add("grey");

      let p2 = document.createElement("p");
      p2.innerHTML = "E£" + object["price"];
      listOfClasses = p2.classList;
      listOfClasses.add("bold");

      newDiv.appendChild(img);
      newDiv.appendChild(h4);
      newDiv.appendChild(p1);
      newDiv.appendChild(span1);
      // newDiv.appendChild(span2);
      newDiv.appendChild(p2);
      cards5.appendChild(newDiv);
      count5++;

      // cards3.appendChild(newDiv.cloneNode(true));
      // count3++;
      // console.log(i);

      if (count5 % size == 0) {
        count5 = 0;
        div1.appendChild(cards5);
        cards5 = document.createElement("div");
        listOfClasses = cards5.classList;
        listOfClasses.add("wrapper-container");
        listOfClasses.add(grid);

        c1.appendChild(div1);
        div1 = document.createElement("div");
        listOfClasses = div1.classList;
        listOfClasses.add("carousel-item");
      }
    }
  }
  if (count5 != 0) {
    count5 = 0;
    div1.appendChild(cards5);
    cards5 = document.createElement("div");
    listOfClasses = cards5.classList;
    listOfClasses.add("wrapper-container");
    listOfClasses.add(grid);

    c1.appendChild(div1);
    div1 = document.createElement("div");
    listOfClasses = div1.classList;
    listOfClasses.add("carousel-item");
  }
};

newFetch("python").then(drawCards);

document
  .querySelector(".search-input")
  .addEventListener("input", function (evt) {
    drawCards(info, this.value);
  });

const courses = [
  document.querySelector(".python"),
  document.querySelector(".excel"),
  document.querySelector(".web"),
  document.querySelector(".js"),
  document.querySelector(".data"),
  document.querySelector(".aws"),
  document.querySelector(".draw"),
];

let old = courses[0];

for (let i = 0; i < courses.length; i++) {
  courses[i].addEventListener("click", function (evt) {
    info = 0;
    old.classList.remove("bold");
    old.classList.remove("black");
    old.classList.add("grey");

    old = courses[i];
    old.classList.add("bold");
    old.classList.remove("grey");
    old.classList.add("black");
    if (i == 0) newFetch("python").then(drawCards);
    if (i == 1) newFetch("excel").then(drawCards);
    if (i == 2) newFetch("web").then(drawCards);
    if (i == 3) newFetch("js").then(drawCards);
    if (i == 4) newFetch("data").then(drawCards);
    if (i == 5) newFetch("aws").then(drawCards);
    if (i == 6) newFetch("draw").then(drawCards);
  });
}
// python.addEventListener("click", function (evt) {
//   old.classList.remove("bold");
//   old.classList.remove("black");
//   old.classList.add("grey");

//   old = this;
//   old.classList.add("bold");
//   old.classList.remove("grey");
//   old.classList.add("black");

//   newFetch("python").then(drawCards);
// });

// excel.addEventListener("click", function (evt) {
//   old.classList.remove("bold");
//   old.classList.remove("black");
//   old.classList.add("grey");

//   old = this;
//   old.classList.add("bold");
//   old.classList.remove("grey");
//   old.classList.add("black");

//   newFetch("excel").then(drawCards);
// });
