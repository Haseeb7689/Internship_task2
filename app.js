let clearStorage = document.querySelector(".clear-storage");
let deleteButton = document.querySelector(".delete");
let taskComplete = document.querySelector(".taskComplete");
let inputField = document.querySelector("#item-input");
let ul = document.querySelector(".content-list");

const url = "https://dummyjson.com/todos";

async function getData() {
  let key = 1;
  let todosObject = {};
  try {
    let res = await axios.get(url);
    data = res.data;
    fullData = data.todos;
    console.log(fullData);

    fullData.forEach(function (elements) {
      let newElement = document.createElement("li");
      newElement.innerHTML = `<input type="checkbox" /> ${elements.todo}`;

      todosObject[key] = elements.todo;
      key = key + 1;

      ul.appendChild(newElement);
    });

    localStorage.setItem("todos", JSON.stringify(todosObject));
  } catch (error) {
    console.log("Error occured - ", error);
  }
}

window.onload = getData;

let key = 31;
let todosObject = {};
inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inputText = inputField.value.trim();

    if (inputText) {
      let newElement = document.createElement("li");
      newElement.innerHTML = `<input type="checkbox" /> ${inputText}`;

      todosObject[key] = inputText;

      key = key + 1;
      ul.appendChild(newElement);
      inputField.value = "";
    } else {
      alert("Please Enter Task");
    }
    localStorage.setItem(`ntodos`, JSON.stringify(todosObject));
  }
});

//delete your added data on refreshy
window.onbeforeunload = function () {
  localStorage.removeItem("ntodos");
};

deleteButton.addEventListener("click", function () {
  let ul = document.querySelector(".content-list");
  let listItems = ul.querySelectorAll("li");

  listItems.forEach((items) => {
    let checkbox = items.querySelector("input[type=checkbox]");
    if (checkbox.checked) {
      ul.removeChild(items);
    }
  });
});

clearStorage.addEventListener("click", function () {
  let listItems = ul.querySelectorAll("li");

  listItems.forEach((items) => {
    let checkbox = items.querySelector("input[type=checkbox]");
    if (checkbox.checked || !checkbox.checked) {
      ul.removeChild(items);
      localStorage.clear();
    }
  });
});

taskComplete.addEventListener("click", function () {
  let listItems = ul.querySelectorAll("li");

  listItems.forEach(function (items) {
    let checkbox = items.querySelector("input[type=checkbox]");
    if (checkbox.checked) {
      items.classList.toggle("line-through");
      checkbox.checked = false;
    }
  });
});
