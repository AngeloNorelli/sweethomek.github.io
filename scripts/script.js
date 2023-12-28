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
});