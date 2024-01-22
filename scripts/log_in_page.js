function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Tutaj możesz dodać logikę weryfikacji użytkownika (np. porównywanie zapisanych danych do testowych)
    // Na potrzeby przykładu, sprawdzimy, czy oba pola są niepuste
    if (username !== "" && password !== "") {
        alert("Logowanie udane!");
    } else {
        alert("Wprowadź nazwę użytkownika i hasło.");
    }
}

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
