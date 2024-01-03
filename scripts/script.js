document.addEventListener('click', function(event) {
    const allSubmenus = document.querySelectorAll('.submenu');
    const allTabs = document.querySelectorAll('.tab');

    let clickedOnTab = false;

    allTabs.forEach(function(tab) {
        if (tab.contains(event.target)) {
            clickedOnTab = true;
        }
    });

    if (!clickedOnTab) {
        allSubmenus.forEach(function(submenu){
            submenu.style.display = 'none';
        });
    }
});

function toggleSubmenu(submenuID) {
    const submenu = document.getElementById(submenuID);
    const allSubmenus = document.querySelectorAll('.submenu');

    allSubmenus.forEach(function(item) {
        if (item.id !== submenuID) {
            item.style.display = 'none';
        }
    });

    if(submenu) {
        if(submenu.style.display === 'block') {
            submenu.style.display = 'none';
        } else {
            submenu.style.display = 'block';
        }
    }
}

function showSubpage(pageID) {
    const page = document.getElementById(pageID);
    const allPages = document.querySelectorAll('.content');

    allPages.forEach(function(item) {
        if (item !== page) {
            item.style.display = 'none';
        } else {
            item.style.display = 'block'
        }
    });
}

window.addEventListener('message', function(event) {
    if(event.data.type === 'changeColor' && event.origin === this.window.origin) {
        document.body.style.backgroundColor = event.data.color;
    }

    if(event.data === 'clicked') {
        const allSubmenus = document.querySelectorAll('.submenu');
        allSubmenus.forEach(function(submenu){
            submenu.style.display = 'none';
        });
    }

    if(event.data.type === 'subpage') {
        var checkForExistance = document.getElementById(event.data.page)
        // Skrypt z dodawaniem kafelka daje na stałe event listenera i za każdym razem jak kafelek jest naciśnięty
        // on będzie tworzył kolejne divy, które już powstały dla danego pokoju, więc dodaję sprawdzenie, czy już przypadkiem go nie było.
        if(!checkForExistance) {   
            // Utwórz div dla strony głównej
            var nowyPokoj = document.createElement("div");
            nowyPokoj.id = event.data.page;
            nowyPokoj.classList.add("content");

            // Utwórz iframe
            var iframeElement = document.createElement("iframe");
            iframeElement.src = "views/roomtemplate.html";
            // powyżej powinna być nazwa jako zmienna, dla każdej podstrony powinien być generowany osoby plik html (który dziedziczy po roomtamplate)
            //  1) tworzymy kopię pliku roomtemplate.html i zmieniamy dla niej nazwę na nazwę podstrony pomieszczenia,
            //  2) w ten sposób kafelki z różnych stron nie będą nie siebie wpływać, będą różne na każdej podstronie,
            //  3) przez to mogą się identycznie nazywać, tzn. można będzie je rozróżniać na podstawie podstrony pomieszczenia, w którym się znajdują.
            iframeElement.style.height = "710px";
            iframeElement.frameBorder = "0";

            // Utwórz strzałkę w burgerze przekierowującą na podstronę
            var arrowInBurger = document.createElement("div");
            arrowInBurger.classList.add("arrow");
            arrowInBurger.innerText = '>';
            
            // Utwórz div dla burgerka
            var burgerElement = document.createElement("div");
            burgerElement.classList.add("subsite");
            burgerElement.innerText = event.data.page;
            burgerElement.addEventListener('click', function() {
                showSubpage(event.data.page)
            });

            var sideContainer = document.getElementById('side-bar');
            burgerElement.appendChild(arrowInBurger);
            sideContainer.appendChild(burgerElement);

            // Dodaj iframe do diva strony głównej
            nowyPokoj.appendChild(iframeElement);

            var cotainer = document.getElementById('main-content');
            cotainer.appendChild(nowyPokoj);
        }

        showSubpage(event.data.page);
    }
});