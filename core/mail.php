<?php
// Читать json файл
$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

// Письмо
$message = '';
$message .= '<h1>Заказ в магазине<h1>';
$message .='<p>Телефон: '.$_POST['ephone'].'</p>';
$message .='<p>Почта: '.$_POST['email'].'</p>';
$message .='<p>Клиент: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];

foreach ($cart as $id=>$count) {
    $message .=$json[$id]['name'].' --- ';
    $message .=$count.' --- ';
    $message .=$count*$json[$id]['cost'];
    $message .= '<br>';
}

print_r($message);
