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

function addNewTile(event) {
  event.preventDefault();
  const titleInput = document.getElementById("title");
  const tileId = `tile-${titleInput.value.toLowerCase()}`;

  if (isDuplicateTile(tileId)) {
    alert("Pokój o podanej nazwie już istnieje.");
    return;
  }

  const roomTypeInput = document.getElementById("roomType");
  const descriptionInput = document.getElementById("description");

  const title = titleInput.value;
  const roomType = roomTypeInput.value;
  const description = descriptionInput.value;

  postMessageToParent("subpage", title, roomType);

  const newTile = createTile(tileId, title, description);
  setupTileInteraction(newTile, title, roomType);
  appendTileToContainer(newTile);

  clearFormInputs(titleInput, roomTypeInput, descriptionInput);
  toggleFormVisibility(false);
}

function isDuplicateTile(tileId) {
  return document.getElementById(tileId) !== null;
}

function postMessageToParent(type, title, roomType) {
  window.parent.postMessage({ type, page: title, roomType }, "*");
}

function createTile(tileId, title, description) {
  const newTile = document.createElement("div");
  newTile.classList.add("tile");
  newTile.id = tileId;
  newTile.innerHTML = `<h2>${title}</h2><p>${description}</p>`;
  return newTile;
}

function setupTileInteraction(tile, title, roomType) {
  tile.addEventListener("click", () => {
    postMessageToParent("subpage", title, roomType);
  });
  const removeButton = createRemoveButton(tile, title, roomType);
  tile.appendChild(removeButton);
}

function createRemoveButton(tile, title, roomType) {
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-device-button");
  removeButton.innerHTML = `<i class="material-icons">close</i>`;
  removeButton.onclick = (event) => {
    tile.remove();
    event.stopPropagation();
    postMessageToParent("remove-subpage", title, roomType);
  };
  return removeButton;
}

function appendTileToContainer(tile) {
  const tileContainer = document.getElementById("tileContainer");
  tileContainer.appendChild(tile);
}

function clearFormInputs(...inputs) {
  inputs.forEach((input) => (input.value = ""));
}

function toggleFormVisibility(isVisible) {
  const formContainer = document.getElementById("formContainer");
  formContainer.style.display = isVisible ? "block" : "none";
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
