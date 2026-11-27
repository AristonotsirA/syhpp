// 모바일에서 같은 페이지의 하위 영역을 골라도 메뉴가 화면을 덮지 않게 닫는다.
(function () {
    const menu = document.querySelector('.mobile-menu');
    if (!menu) return;
    menu.addEventListener('click', function (event) {
        if (event.target.closest('a')) menu.open = false;
    });
    menu.addEventListener('keydown', function (event) {
        if (event.key !== 'Escape' || !menu.open) return;
        menu.open = false;
        menu.querySelector('summary').focus();
    });
})();
