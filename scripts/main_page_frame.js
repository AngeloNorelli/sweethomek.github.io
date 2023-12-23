
function toggleForm() {
    var formContainer = document.getElementById("formContainer");
    
    if (formContainer.style.display === "none" || formContainer.style.display === "") {
        formContainer.style.display = "block";
    } else {
        formContainer.style.display = "none";
    }
}

function addNewTile(event) {
    event.preventDefault();
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;

    var newTile = document.createElement("div");
    newTile.classList.add("tile");

    newTile.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>`;

    var tileContainer = document.getElementById("tileContainer");
    tileContainer.appendChild(newTile);

    var formContainer = document.getElementById("formContainer");
    formContainer.style.display = "none";
}