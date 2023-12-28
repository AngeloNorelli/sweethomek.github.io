document.addEventListener('click', function() {
    window.parent.postMessage({type: 'subpage', page: 'dupa'});
});