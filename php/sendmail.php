<?php

$age = isset($_POST['age']) ? $_POST['age'] : NULL;
$name = isset($_POST['name']) ? $_POST['name'] : NULL;
$phone = isset($_POST['phone']) ? $_POST['phone'] : NULL;
$mail = isset($_POST['mail']) ? $_POST['mail'] : NULL;
$inquery = isset($_POST['inquery']) ? $_POST['inquery'] : NULL;
$is_submit = isset($_POST['submitted']) ? true : false;

if($is_submit){

}else{

}

$mail_to = "celinelivechat@gmail.com";
$mail_title = "WEBフォームからのお問い合わせ";
$mail_body = "WEBフォームからお問い合わせがありました。";
$mail_body .= "/n/n"."お名前/n".$name;
$mail_body .= "/n/n"."年齢/n".$age;
$mail_body .= "/n/n"."電話番号/n".$phone;
if($mail){
    $mail_body .= "/n/n"."メールアドレス/n".$mail;
}
if($inquery){
    $mail_body .= "/n/n"."お問い合わせ内容/n".$inquery;
}




?>