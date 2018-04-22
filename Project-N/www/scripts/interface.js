let nav;
let navInstance;
let menuBtn;

let initNav = function () {
    nav = document.querySelector('.sidenav');
    navInstance = M.Sidenav.init(nav);
    menuBtn = document.getElementById('menu-btn');
    menuBtn.addEventListener('click', function () { navInstance.open() });
}