const bodyEl = document.querySelector('body');
const burger = document.querySelector('.js-burger');
const menu = document.querySelector('.js-menu-nav');

let cart = {};   // Моя корзина
let later = {}; //  Мои желания

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
    let women = 'women';
    // Объявляем пустую строку
    let out = '';
    // Перебираем асоциативные массивы или объекты
    for (let key in data) {
        if (data[key].male === women) {
            out += `<li class="cart">
                        <div class="cart__container">
                            <a href="goods.html#${key}">
                                <h3 class="cart__name">${data[key].name}</h3>
                                <picture><source srcset="img/${data[key].imgwebp}" type="image/webp"><img class="cart__image" src="img/${data[key].img}" alt="${data[key].name}"></picture>
                            </a>
                        </div>
                        <div class="cart__cost">${data[key].cost} грн</div>
                        <button class="cart__add-to-cart" type="button" data-id="${key}">В корзину</button>
                    </li>`;
                    // <p class="cart__descr">${data[key].description}</p>
        }
    }

    $('.goods-out').html(out);
    $('.cart__add-to-cart').on('click', addToCart);
    $('.cart__add-to-later').on('click', addToLater);
}

function addToLater() {
    let id = $(this).attr('data-id');

    if (later[id] == undefined) {
        later[id] = 1;   // Если в желаниях нет товара - делаем равным 1
    }
    
    showMiniLater();
    saveLater();
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

function saveLater() {
    // Сохраняю корзину в localStorage
    localStorage.setItem('later', JSON.stringify(later)); // Преобразовываем корзину в строку
}

function saveСart() {
    // Сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); // Преобразовываем корзину в строку
}

function showMiniLater() {
    let out = '';
    out += Object.keys(later).reduce((total, key) => total += later[key], 0);

    $('.mini-later').html(out);
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
        showMiniCart();
    }
}

function showMenu() {
    menu.classList.toggle('active');
    bodyEl.classList.toggle('active');
}

$('document').ready(function() {
    $('.owl-carousel').owlCarousel({
        items: 1,
        loop: true,
        dots: false,
        autoplay: {
            delay: 2500,
          },
    });
    init();
    loadLater();
    loadCart();
    burger.addEventListener('click', showMenu);
});