let clearStorage = document.querySelector(".clear-storage");
let deleteButton = document.querySelector(".delete");
let taskComplete = document.querySelector(".taskComplete");
let inputField = document.querySelector("#item-input");
let ul = document.querySelector(".content-list");

const url = "https://jsonplaceholder.typicode.com/todos";

let arrTodos = [];

async function getData() {
  try {
    let res = await axios.get(url);

    data = res.data;

    for (let i = 0; i < data.length; i++) {
      arrTodos[i] = data[i];
      let newElement = document.createElement("li");
      newElement.innerHTML = `<input type="checkbox" /> ${arrTodos[i].title}`;

      if (arrTodos[i].completed == true) {
        newElement.classList.toggle("line-through");
      }

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
        title: inputText,
        userID: arrTodos.length + 2,
      });

      ul.appendChild(newElement);
      inputField.value = "";
    } else {
      alert("Please Enter Task");
    }
    localStorage.setItem(`todos`, JSON.stringify(arrTodos));
  }
});

deleteButton.addEventListener("click", function () {
  let ul = document.querySelector(".content-list");
  let listItems = ul.querySelectorAll("li");

  for (items of listItems) {
    let checkbox = items.querySelector("input[type=checkbox");
    if (checkbox.checked) {
      let itemText = items.textContent.trim();

      for (i = 0; i < arrTodos.length; i++) {
        if (arrTodos[i].title == itemText) {
          arrTodos.splice(i, 1);
          break;
        }
      }

      ul.removeChild(items);
      localStorage.setItem("todos", JSON.stringify(arrTodos));
    }
  }
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
