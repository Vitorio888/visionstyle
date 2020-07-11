const bodyEl = document.querySelector('body');
const burger = document.querySelector('.js-burger');
const menu = document.querySelector('.js-menu-nav');

function init() {
    // Вычитуем файл goods.json
    $.getJSON('goods.json', goodsOut);
}

function goodsOut(data) {
    // Вывод на страницу
    console.log(data);
    // Объявляем пустую строку
    let out = '';
    let later = {};

    if (localStorage.getItem('later') ) {
        // Если есть - расшифровываю и записываю в переменную cart
        later = JSON.parse(localStorage.getItem('later') );
        // Перебираем асоциативные массивы или объекты
        for (let key in later) {
            out += `<div class="cart">
                        <p class="cart__name">${data[key].name}</p>
                        <picture><source srcset="img/${data[key].imgwebp}" type="image/webp"><img class="cart__image" src="img/${data[key].img}" alt="${data[key].name}"></picture>
                        <div class="cart__cost">${data[key].cost} грн</div>
                        <a class="cart__link" href="goods.html#${key}">Просмотреть</a>
                    </div>`;
        }
        $('.goods-out').html(out);
    }
    else {
        out += `<a class="cart__link-catalog" href="index.html#catalog">Добавьте товар.</a>`;
        $('.goods-out').html(out);
    }
}

function loadCart() {
    // Проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart') ) {
        // Если есть - расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart') );
        showMiniCart();
    }
}

function showMiniCart() {
    let out = '';
    out += Object.keys(cart).reduce((total, key) => total += cart[key], 0);
    // for (let key in cart) {
        // out += key + ' --- ' + cart[key] + '<br>';
        // out += key(cart).reduce((total, key) => total += cart[key], 0);
    // }

    $('.mini-cart').html(out);
}

function showMenu() {
    menu.classList.toggle('active');
    bodyEl.classList.toggle('active');
}

$('document').ready(function() {
    init();
    loadCart();
    burger.addEventListener('click', showMenu);
});