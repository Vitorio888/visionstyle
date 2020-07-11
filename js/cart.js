const bodyEl = document.querySelector('body');
const burger = document.querySelector('.js-burger');
const menu = document.querySelector('.js-menu-nav');

let cart = {};  // Корзина

function loadLater() {
    // Проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('later') ) {
        // Если есть - расшифровываю и записываю в переменную cart
        later = JSON.parse(localStorage.getItem('later') );
        showMiniLater();
    }
}

function loadCart() {
    // Проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart') ) {
        // Если есть - расшифровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart') );  
        showCart();
    }
    else {
        let empty = '';
        empty += `<p class="main-cart__empty">Корзина пуста!
                    <a href="index.html#catalog" class="main-cart__catalog">Заполнить корзину.</a>    
                </p>`;
        $('.main-cart').html(empty);
    }
}

function showCart() {
    // Вывод корзины
    if (!isEmpty(cart) ) {
        let empty = '';
        empty += `<p class="main-cart__empty">Корзина пуста!
                    <a href="index.html#catalog" class="main-cart__catalog">Заполнить корзину.</a>    
                </p>`;
        $('.main-cart').html(empty);
    }
    else {
        $.getJSON('goods.json', function (data) {
            let goods = data;
            let out = '';

            for (let id in cart) {
                out += `<div class="main-cart__item">
                            <picture><source srcset="img/${goods[id].imgwebp}" type="image/webp"><img class="main-cart__image" src="img/${goods[id].img}" alt="${goods[id].name}"></picture>
                            <p class="main-cart__name">${goods[id].name}</p>
                            <div class="main-cart__counter">
                                <button class="main-cart__minus-goods" type="button" data-id="${id}">-</button>
                                <p class="main-cart__quantity">${cart[id]}</p>
                                <button class="main-cart__plus-goods" type="button" data-id="${id}">+</button>
                            </div>
                            <p class="main-cart__sum">${cart[id] * goods[id].cost} грн</p>
                            <button class="main-cart__del-goods" type="button" data-id="${id}">x</button>
                        </div>`;
            }

            $('.main-cart').html(out);
            $('.main-cart__del-goods').on('click', delGoods);
            $('.main-cart__plus-goods').on('click', plusGoods);
            $('.main-cart__minus-goods').on('click', minusGoods);
        });
    }
}

function delGoods() {
    // Удаляем товар из корзины
    let id = $(this).attr('data-id');
    delete cart[id];
    saveСart();
    showCart();
}

function plusGoods() {
    // Добавляем товар в корзины
    let id = $(this).attr('data-id');
    cart[id]++;
    saveСart();
    showCart();
}

function minusGoods() {
    // Удаляю товар из корзины
    let id = $(this).attr('data-id');

    if (cart[id] == 1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveСart();
    showCart();
}


function saveСart() {
    // Сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // Преобразовываем корзину в строку
}

function isEmpty(object) {
    // Проверка корзины на пустоту
    for (let key in object) {
        if (object.hasOwnProperty(key) ) {
            return true;
        }
        else {
            return false;
        }
    }
}

function showMiniLater() {
    let out = '';
    out += Object.keys(later).reduce((total, key) => total += later[key], 0);

    $('.mini-later').html(out);
}

function sendEmail() {
    let ename = $('.ename').val();
    let email = $('.email').val();
    let ephone = $('.ephone').val();

    if (ename != '' && email != '' && ephone != '') {
        if (isEmpty(cart) ) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data) {
                    if (data == 1) {
                        alert('Заказ отправлен');
                        localStorage.removeItem('cart');
                    }
                    else {
                        alert('Повторите заказ');
                    }
                }
            );
        }
        else {
            alert('Корзина пуста!');
        }
    }
    else {
        alert('Заполните поля');
    }
}

function showMenu() {
    menu.classList.toggle('active');
    bodyEl.classList.toggle('active');
}

$(document).ready(function () {
    loadCart();
    loadLater();
    $('.send-email').on('click', sendEmail);    // Отправить письмо с заказом
    burger.addEventListener('click', showMenu);
});