let clearStorage = document.querySelector(".clear-storage");
let deleteButton = document.querySelector(".delete");
let taskComplete = document.querySelector(".taskComplete");
let inputField = document.querySelector("#item-input");
let ul = document.querySelector(".content-list");

const url = "https://jsonplaceholder.typicode.com/todos";

let arrTodos = [];
// let todosObject = {};

async function getData() {
  try {
    let res = await axios.get(url);

    data = res.data;
    // console.log(data);

    for (let i = 0; i < data.length; i++) {
      arrTodos[i] = data[i];
      console.log(arrTodos[i]);

      let newElement = document.createElement("li");
      newElement.innerHTML = `<input type="checkbox" /> ${arrTodos[i].title}`;

      if (arrTodos[i].completed == true) {
        newElement.classList.toggle("line-through");
      }

      // todosObject = { arrTodos };

      ul.appendChild(newElement);
    }

    localStorage.setItem("todos", JSON.stringify(arrTodos));
  } catch (error) {
    console.log("Error occured - ", error);
  }
}

window.onload = getData;

inputField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    inputText = inputField.value.trim();

    if (inputText) {
      let newElement = document.createElement("li");
      newElement.innerHTML = `<input type="checkbox" /> ${inputText}`;

      arrTodos.push({
        id: arrTodos.length + 1,
        completed: false,
        inputText,
        userID: arrTodos.length + 2,
      });

      // todosObject = { arrTodos };

      ul.appendChild(newElement);
      inputField.value = "";
    } else {
      alert("Please Enter Task");
    }
    localStorage.setItem(`todos`, JSON.stringify(arrTodos));
  }
});

//delete your added data on refreshy
// window.onbeforeunload = function () {};

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
