document.addEventListener('click', function() {
    window.parent.postMessage('clicked', '*');
});