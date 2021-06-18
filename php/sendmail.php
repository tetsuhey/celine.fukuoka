<?php

if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
   && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
    $age = isset($_POST['age']) ? filter_input(INPUT_POST, 'age') : "";
    $name = isset($_POST['name']) ? filter_input(INPUT_POST, 'name') : "";
    $phone = isset($_POST['phone']) ? filter_input(INPUT_POST, 'phone') : "";
    $mail = isset($_POST['mail']) ? filter_input(INPUT_POST, 'mail') : "";
    $inquery = isset($_POST['inquery']) ? filter_input(INPUT_POST, 'inquery') : "";
    $content = isset($_POST['content']) ? filter_input(INPUT_POST, 'content') : "";
    $timezone = isset($_POST['timezone']) ? filter_input(INPUT_POST, 'timezone') : "";
    $date1 = isset($_POST['date1']) ? filter_input(INPUT_POST, 'date1') : "";
    $date2 = isset($_POST['date2']) ? filter_input(INPUT_POST, 'date2') : "";
    $date3 = isset($_POST['date3']) ? filter_input(INPUT_POST, 'date3') : "";
    $place = isset($_POST['place']) ? filter_input(INPUT_POST, 'place') : "";
    $targetplace = isset($_POST['targetplace']) ? filter_input(INPUT_POST, 'targetplace') : "";
    $ids = isset($_POST['ids']) ? filter_input(INPUT_POST, 'ids') : "";

}else{
    return false;
}

//このページでechoしたものがhtmlに返されて出力される
header("Content-type: text/plain; charset=UTF-8");

// お問い合わせメール送信
$to = "celinelivechat@gmail.com";
// $to = "tetsu.o.8920@gmail.com";
$subject = "WEBフォームからのお問い合わせ";
$message = "WEBフォームからお問い合わせがありました。";
$message .= "\r\n\r\n[お問い合わせ種別] ".$content;
$message .= "\r\n\r\n[お名前] ".$name;
$message .= "\r\n\r\n[年齢] ".$age;
if(strlen($mail) > 0){
    $message .= "\r\n\r\n[メールアドレス] ".$mail;
}
$message .= "\r\n\r\n[電話番号] ".$phone;
$message .= "\r\n\r\n[連絡可能な時間帯] ".$timezone;

if($content == '面接の予約をしたい'){

    $message .= "\r\n\r\n[面接希望日]";
    if(strlen($date1) > 0){
        $message .= "\r\n第一希望:".$date1;
    }else{
        $message .= "\r\n第一希望:"."---";
    }
    if(strlen($date2) > 0){
        $message .= "\r\n第二希望:".$date2;
    }else{
        $message .= "\r\n第二希望:"."---";
    }
    if(strlen($date3) > 0){
        $message .= "\r\n第三希望:".$date3;
    }else{
        $message .= "\r\n第三希望:"."---";
    }
    if(strlen($place) > 0){
        $message .= "\r\n\r\n[面接場所] ".$place;
    }else{
        $message .= "\r\n\r\n[面接場所] "."---";
    }
    if(strlen($targetplace) > 0){
        $message .= "\r\n\r\n[面接希望の場所]".$targetplace;
    }else{
        $message .= "\r\n\r\n[面接希望の場所] "."---";
    }
    if(strlen($ids) > 0){
        $message .= "\r\n\r\n[身分証明書] ".$ids;
    }else{
        $message .= "\r\n\r\n[身分証明書] "."---";
    }
}
if(strlen($inquery) > 0){
    $message .= "\r\n\r\n[お問い合わせ内容]\r\n".$inquery;
}

$headers = "From:webservice@chat-fukuoka.com";
mb_language("ja");
mb_internal_encoding("UTF-8");
$is_send_mail_flg = false;
if(mb_send_mail($to, $subject, $message, $headers)){
    //送信成功
    $is_send_mail_flg = true;
    echo json_encode(
        array(
            "result"=>true,
            "msg"=>"送信しました。お問い合わせありがとうございます。",
            "data"=>array("name"=>$name,"age"=>$age,"phone"=>$phone,"mail"=>$mail,"inquery"=>$inquery)
        )
    );
}else{
    //送信失敗
    echo json_encode(
        array(
            "result"=>false,
            "msg"=>"メールの送信に失敗しました。入力内容をご確認のうえ、再度送信してください。",
            "content"=>$message
        )
    );
}

// メールアドレスが記入されている場合、その人に確認メールを送る
if(strlen($mail) > 0){
    $to = $mail;
    $subject = "[celine.]　お問い合わせありがとうございます。";
    $message = $name." 様\r\n\r\n";
    $message .= "お問い合わせいただき、ありがとうございます。\r\n";
    $message .= "2−3営業日中に担当の者からお電話またはメールにてご連絡させていただきます。\r\n";
    $message .= "今しばらくお待ちくださいませ。\r\n\r\n";
    $message .= "なお、返信がない場合は大変お手数ですが再度お問い合わせいただきますよう\r\n";
    $message .= "お願い申し上げます。\r\n\r\n\r\n";
    if(strlen($inquery) > 0){
        $message .= "[お問い合わせ内容]\r\n";
        $message .= $inquery;
        $message .= "\r\n\r\n\r\n";
    }
    $message .= "-----\r\nceline. [セリーヌ]\r\n\r\n";
    $message .= "-------------------------------------------------\r\n";
    $message .= "本メールは自動で送信されております。\r\n";
    $message .= "内容にお心当たりの無い方は、大変お手数ですが削除をお願いいたします。\r\n";
    $message .= "なお、本メールへの返信はできませんので、予めご了承ください。\r\n\r\n\r\n";
    
    $headers = "From: celine | セリーヌ <webservice@chat-fukuoka.com>";

    mb_send_mail($to, $subject, $message, $headers);
}

?>