if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js")
    .then((reg) => console.log("Service Worker registered", reg))
    .catch((err) => console.log("Service Worker not registered", err));
}



const todoList = document.getElementById("todoList");
const addButton = document.getElementById("addButton");
const inputText = document.getElementById("inputText");
const dateElement = document.getElementById("date");

const option = { 
  weekday: "long",
  month: "short",
  day: "numeric",
}
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", option);

const render = (data) => {
  const dataToHTML = data.map(data => {
    return `<li class="deteleButton">${data.content}</li>`;
  });
  todoList.innerHTML = dataToHTML.join("");
};

render(data);

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  data.unshift({
    id: data.length + 1,
    content: inputText.value
  })
  inputText.value = "";
  render(data);
});