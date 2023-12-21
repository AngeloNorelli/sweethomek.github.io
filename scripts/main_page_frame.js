function addNewTile() {
    var newTile = document.createElement("div");
    newTile.classList.add("tile");

    newTile.innerHTML = `
        <h2>New Tile</h2>
        <p>Content for the new tile goes here.</p>`;

    var tileContainer = document.getElementById("tileContainer");
    tileContainer.appendChild(newTile);
}
