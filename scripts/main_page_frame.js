function toggleForm() {
  var formContainer = document.getElementById("formContainer");

  if (
    formContainer.style.display === "none" ||
    formContainer.style.display === ""
  ) {
    formContainer.style.display = "block";
  } else {
    formContainer.style.display = "none";
  }
}

// function addNewTile(event) {
//   event.preventDefault();
//   var titleInput = document.getElementById("title");
//   var roomTypeInput = document.getElementById("roomType");
//   var descriptionInput = document.getElementById("description");

//   var title = titleInput.value;
//   var roomType = roomTypeInput.value;
//   var description = descriptionInput.value;

//   window.parent.postMessage(
//     { type: "subpage", page: title, roomType: roomType },
//     "*"
//   );

//   var newTile = document.createElement("div");

//   newTile.addEventListener("click", function () {
//     window.parent.postMessage(
//       { type: "subpage", page: title, roomType: roomType },
//       "*"
//     );
//   });
//   newTile.classList.add("tile");

//   newTile.innerHTML = `
//         <h2>${title}</h2>
//         <p>${description}</p>`;

//   var tileContainer = document.getElementById("tileContainer");
//   tileContainer.appendChild(newTile);

//   // Wyczyść wartości pól formularza
//   titleInput.value = "";
//   roomTypeInput.value = "";
//   descriptionInput.value = "";

//   var formContainer = document.getElementById("formContainer");
//   formContainer.style.display = "none";
// }

function addNewTile(event) {
  event.preventDefault();
  var titleInput = document.getElementById("title");
  var roomTypeInput = document.getElementById("roomType");
  var descriptionInput = document.getElementById("description");

  var title = titleInput.value;
  var roomType = roomTypeInput.value;
  var description = descriptionInput.value;

  window.parent.postMessage(
    { type: "subpage", page: title, roomType: roomType },
    "*"
  );

  var newTile = document.createElement("div");
  newTile.classList.add("tile");

  // Create the remove button
  var removeButton = document.createElement("button");
  removeButton.classList.add("remove-device-button");
  removeButton.innerHTML += `<i class="material-icons">close</i>`;

  removeButton.onclick = function (event) {
    newTile.remove();
    event.stopPropagation();
    window.parent.postMessage(
      { type: "remove-subpage", page: title, roomType: roomType },
      "*"
    );
  };

  // Set the inner HTML for the tile
  newTile.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</p>
  `;
  // Append the remove button to the newTile
  newTile.appendChild(removeButton);

  var tileContainer = document.getElementById("tileContainer");
  tileContainer.appendChild(newTile);

  // Clear form values
  titleInput.value = "";
  roomTypeInput.value = "";
  descriptionInput.value = "";

  var formContainer = document.getElementById("formContainer");
  formContainer.style.display = "none";
}

function removeTile(tileElement) {
  if (tileElement && tileElement.parentNode) {
    tileElement.parentNode.removeChild(tileElement);
  }
}

// Odczytywanie aktualnego trybu z localStorage
const savedDarkMode = localStorage.getItem("darkMode");
const body = document.body;

if (savedDarkMode === "true") {
  body.classList.add("dark-mode");
}

window.addEventListener("storage", function (event) {
  if (event.key === "darkMode") {
    const updatedDarkMode = localStorage.getItem("darkMode");
    const body = document.body;

    if (updatedDarkMode === "true") {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }
});
