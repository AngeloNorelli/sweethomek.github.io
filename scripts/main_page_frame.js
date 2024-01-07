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
  var title = document.getElementById("title").value;
  var roomType = document.getElementById("roomType").value;
  var description = document.getElementById("description").value;

  window.parent.postMessage(
    { type: "subpage", page: title, roomType: roomType },
    "*"
  );

  var newTile = document.createElement("div");

  newTile.addEventListener("click", function () {
    window.parent.postMessage(
      { type: "subpage", page: title, roomType: roomType },
      "*"
    );
  });
  newTile.classList.add("tile");

  newTile.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>`;

  var tileContainer = document.getElementById("tileContainer");
  tileContainer.appendChild(newTile);

  var formContainer = document.getElementById("formContainer");
  formContainer.style.display = "none";
}

document.addEventListener("click", function () {
  window.parent.postMessage("clicked", "*");
});
