document.addEventListener("click", function (event) {
  const allSubmenus = document.querySelectorAll(".submenu");
  const allTabs = document.querySelectorAll(".tab");

  let clickedOnTab = false;

  allTabs.forEach(function (tab) {
    if (tab.contains(event.target)) {
      clickedOnTab = true;
    }
  });

  if (!clickedOnTab) {
    allSubmenus.forEach(function (submenu) {
      submenu.style.display = "none";
    });
  }
});

function toggleSubmenu(submenuID) {
  const submenu = document.getElementById(submenuID);
  const allSubmenus = document.querySelectorAll(".submenu");

  allSubmenus.forEach(function (item) {
    if (item.id !== submenuID) {
      item.style.display = "none";
    }
  });

  if (submenu) {
    if (submenu.style.display === "block") {
      submenu.style.display = "none";
    } else {
      submenu.style.display = "block";
    }
  }
}

function showSubpage(pageID) {
  const page = document.getElementById(pageID);
  const allPages = document.querySelectorAll(".content");

  allPages.forEach(function (item) {
    if (item !== page) {
      item.style.display = "none";
    } else {
      item.style.display = "block";

      if(pageID === 'zakladka3-content') {
        const topbar = document.querySelector('.top-bar-left');
        const title = document.querySelector('.bar-title');
        const subsites = document.querySelectorAll('.submenu .subsite');
        const sidebar = document.querySelector('.container .side-bar');
        
        for (var i = 0; i < subsites.length; i++) {
          var subsiteText = subsites[i].textContent.trim();
  
          if (subsiteText === 'Twoje konto' || subsiteText === 'Wyloguj') {
              subsites[i].style.display = 'none';
          }
        }

        if(sidebar){
          sidebar.style.display = "none";
        }

        topbar.style.display = "none";
        title.style.marginLeft = '42.1%';
      }
    }
  });
}

window.addEventListener("message", function (event) {
  if (event.data === "clicked") {
    const allSubmenus = document.querySelectorAll(".submenu");
    allSubmenus.forEach(function (submenu) {
      submenu.style.display = "none";
    });
  }

  if (event.data.type === "subpage") {
    var page = event.data.page;
    var checkForExistance = document.getElementById(page);
    // Skrypt z dodawaniem kafelka daje na stałe event listenera i za każdym razem jak kafelek jest naciśnięty
    // będzie tworzył kolejne divy, które już powstały dla danego pokoju, więc dodaję sprawdzenie, czy już przypadkiem już nie istnieje
    if (!checkForExistance) {
      // Utwórz div dla strony głównej
      var nowyPokoj = document.createElement("div");
      nowyPokoj.id = event.data.page;
      nowyPokoj.roomType = event.data.roomType;
      // this.alert(`Nowy pokoj typ: ${nowyPokoj.roomType}`);
      nowyPokoj.style.display = "none";
      nowyPokoj.classList.add("content");

      // Utwórz iframe

      var iframeElement = document.createElement("iframe");
      iframeElement.src =
        "/iframe/roomtemplate/" + nowyPokoj.id + "/" + nowyPokoj.roomType;

      console.log(iframeElement);

      iframeElement.style.height = "87vh";
      iframeElement.frameBorder = "0";
      document.body.appendChild(iframeElement);

      // powyżej powinna być nazwa jako zmienna, dla każdej podstrony powinien być generowany osoby plik html (który dziedziczy po roomtamplate)
      //  1) tworzymy kopię pliku roomtemplate.html i zmieniamy dla niej nazwę na nazwę podstrony pomieszczenia,
      //  2) w ten sposób kafelki z różnych stron nie będą nie siebie wpływać, będą różne na każdej podstronie,
      //  3) przez to mogą się identycznie nazywać, tzn. można będzie je rozróżniać na podstawie podstrony pomieszczenia, w którym się znajdują.

      var burgerElement = document.createElement("div");
      burgerElement.classList.add("subsite");
      burgerElement.id = page.toLowerCase() + "-menu";
      var paragraphElement = document.createElement("p");
      paragraphElement.innerText = event.data.page;

      burgerElement.appendChild(paragraphElement);

      var arrowInBurger = document.createElement("div");
      arrowInBurger.classList.add("arrow");

      burgerElement.addEventListener("click", function () {
        showSubpage(event.data.page);
      });

      // strzalka niewidczona
      burgerElement.appendChild(arrowInBurger);

      arrowInBurger.style.position = "absolute";
      arrowInBurger.style.top = "50%";
      arrowInBurger.style.transform = "translateY(-50%)";
      arrowInBurger.style.right = "10px";

      var sideContainer = document.getElementById("side-bar");
      burgerElement.appendChild(arrowInBurger);
      sideContainer.appendChild(burgerElement);

      nowyPokoj.appendChild(iframeElement);

      var cotainer = document.getElementById("main-content");
      cotainer.appendChild(nowyPokoj);
    } else {
      showSubpage(event.data.page);
    }
  }

  if (event.data.type == "remove-subpage") {
    var page = event.data.page;
    var subpage_id = page.toLowerCase() + "-menu";
    var burgerElement = this.document.getElementById(subpage_id);
    burgerElement.remove();
  }

  if (event.data === "login") {
    showSubpage("strona_glowna");

    const topbar = document.querySelector('.top-bar-left');
    const title = document.querySelector('.bar-title');
    const subsites = document.querySelectorAll('.submenu .subsite');
    
    for (var i = 0; i < subsites.length; i++) {
      var subsiteText = subsites[i].textContent.trim();

      if (subsiteText === 'Twoje konto' || subsiteText === 'Wyloguj') {
          subsites[i].style.display = 'block';
      }
    }

    topbar.style.display = "block";
    title.style.marginLeft = '0%';
  }
});

function switchTheme() {
  const body = document.body;

  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.style.backgroundColor = "#e0dfdf";
  } else {
    body.classList.add("dark-mode");
    body.style.backgroundColor = "#444444";
  }

  const trybNocnyButton = document.querySelector(
    ".submenu .subsite:nth-child(2)"
  );
  trybNocnyButton.textContent = body.classList.contains("dark-mode")
    ? "Tryb dzienny"
    : "Tryb nocny";

  localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
}

document.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  const body = document.body;

  if (savedDarkMode === "true") {
    body.classList.add("dark-mode");
    body.style.backgroundColor = "#444444";
    const trybNocnyButton = document.querySelector(
      ".submenu .subsite:nth-child(2)"
    );
    trybNocnyButton.textContent = "Tryb dzienny";
  }
});