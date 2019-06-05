// PWA
// This is the "Offline page" service worker

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("serviceWorker.js")
    .then((reg) => console.log("Service worker has been registed"))
    .catch((err) => console.log("Service worker has not been registed"))
}

const database = firebase.firestore();

// HTML DOM
const todoList = document.querySelector("#todoList");
const formSubmit = document.querySelector("#formSubmit");
const deleteButton = document.querySelector(".deleteButton");

// Render data to HTML
const render = (doc) => {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const i = document.createElement("i");
  const addIcon = document.createTextNode("delete");

  i.setAttribute("class", "material-icons");
  i.appendChild(addIcon);
  deleteButton.appendChild(i);

  li.setAttribute("data-id", doc.id)
  deleteButton.setAttribute("class", "deleteButton");
  const content = document.createTextNode(doc.data().content);
  li.appendChild(content);
  li.appendChild(deleteButton);
  todoList.appendChild(li);

  // Delete data
  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation(); 
    const id = li.dataset.id;
    database.collection("TodoList").doc(id).delete();
  });
}

// Get data
// database.collection("TodoList").get()
//   .then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//       render(doc);
//     });
//   })
//   .catch();

// New data
formSubmit.addEventListener("submit", (event) => {
  event.preventDefault();
  database.collection("TodoList").add({
    content: formSubmit.newNote.value
  });
  formSubmit.newNote.value = "";
});

// Realtime listener
database.collection("TodoList").orderBy("content").onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type === "added") {
      render(change.doc);
    } else if (change.type === "removed") {
      let li = todoList.querySelector("[data-id=" + change.doc.id + "]");
      todoList.removeChild(li);
    }
  })
});