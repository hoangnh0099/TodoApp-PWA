if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/serviceWorker.js")
    .then((reg) => console.log("Service Worker registered", reg))
    .catch((err) => console.log("Service Worker not registered", err));
}

const todoList = document.getElementById("todoList");
const addButton = document.getElementById("addButton");
const inputText = document.getElementById("inputText");

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  data.unshift({
    id: data.length + 1,
    content: inputText.value
  })
  inputText.value = "";

  render(data);
});

const render = (data) => {
  const dataToHTML = data.map(data => {
    return `<li>${data.content}</li>`;
  });
  todoList.innerHTML = dataToHTML.join("");
};