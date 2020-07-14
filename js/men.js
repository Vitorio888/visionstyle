const bodyEl = document.querySelector('body');
const burger = document.querySelector('.js-burger');
const menu = document.querySelector('.js-menu-nav');
const menuLink = document.querySelectorAll('.menu-nav__link');
const modal = document.querySelector('.modal');

let cart = {};   // Моя корзина

function init() {
    // Вычитуем файл goods.json
    $.getJSON('goods.json', goodsOut);
    // $.post(
    //     "admin/core.php",
    //     {
    //         "action" : "loadGoods"
    //     },
    //     goodsOut
    // );

    // <button class="cart__add-to-later" type="button" data-id="${key}">&hearts;</button>
}

function goodsOut(data) {
    // Вывод на страницу
    // data = JSON.parse(data);
    let men = 'men';
    // Объявляем пустую строку
    let out = '';
    // Перебираем асоциативные массивы или объекты
    for (let key in data) {
        if (data[key].male === men) {
            out += `<li class="cart">
                        <div class="cart__container">
                            <a href="goods.html#${key}">
                                <h3 class="cart__name">${data[key].name}</h3>
                                <picture><source srcset="img/${data[key].imgwebp}" type="image/webp"><img class="cart__image" src="img/${data[key].img}" alt="${data[key].name}"></picture>
                                <p class="cart__descr">${data[key].descr}</p>
                            </a>
                        </div>
                        <div class="cart__cost">${data[key].cost} грн</div>
                        <button class="cart__add-to-cart neon-btn" type="button" data-id="${key}">В корзину
                            <span class="neon-btn__decorate neon-btn__decorate--one" aria-hidden="true"></span>
                            <span class="neon-btn__decorate neon-btn__decorate--two" aria-hidden="true"></span>
                            <span class="neon-btn__decorate neon-btn__decorate--three" aria-hidden="true"></span>
                            <span class="neon-btn__decorate neon-btn__decorate--four" aria-hidden="true"></span>
                        </button>
                    </li>`;
        }
                // <p class="cart__descr">${data[key].description}</p>
    }

    $('.goods-out').html(out);
    $('.cart__add-to-cart').on('click', addToCart);
}

function addToCart() {
    // Добавляем товар в корзину
    let id = $(this).attr('data-id');
    // console.log(id);

    if (cart[id] == undefined) {
        cart[id] = 1;   // Если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; // Если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveСart();
}

function saveСart() {
    // Сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // Преобразовываем корзину в строку
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

function loadCart() {
    // Проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart') ) {
        // Если есть - расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart') );
        showMiniCart();
    }
}

function showMenu() {
    bodyEl.classList.toggle('active');
    menuLink.forEach(el => el.addEventListener('click', closeMenu));
    modal.addEventListener('click', closeMenu);
}

function closeMenu() {
    bodyEl.classList.remove('active');
}

$('document').ready(function() {
    init();
    loadCart();
    burger.addEventListener('click', showMenu);
});