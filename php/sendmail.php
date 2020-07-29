<?php
header("Content-type: text/plain; charset=UTF-8");
$is_err_flg = false;
if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
   && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
{
    $age = isset($_POST['age']) ? $_POST['age'] : NULL;
    $name = isset($_POST['name']) ? $_POST['name'] : NULL;
    $phone = isset($_POST['phone']) ? $_POST['phone'] : NULL;
    $mail = isset($_POST['mail']) ? $_POST['mail'] : NULL;
    $inquery = isset($_POST['inquery']) ? $_POST['inquery'] : NULL;

    if(is_null($age) || is_null($name) || is_null($phone)){
        $is_err_flg = true;
    }else if(is_null($mail)){
        $mail = "";
    }else if(is_null($inquery)){
        $inquery = "";
    }

}else{
    return false;
}

// お問い合わせメール送信
$to = "tetsu.o.8920@gmail.com";
// $to = "celinelivechat@gmail.com";
$subject = "WEBフォームからのお問い合わせ";
$message = "WEBフォームからお問い合わせがありました。";
$message .= "\r\n\r\n[お名前]\r\n".$name;
$message .= "\r\n\r\n[年齢]\r\n".$age;
$message .= "\r\n\r\n[電話番号]\r\n".$phone;
if(strlen($mail) > 0){
    $message .= "/\r\n\r\n[メールアドレス]\r\n".$mail;
}
if(strlen($inquery) > 0){
    $message .= "/\r\n\r\n[お問い合わせ内容]\r\n".$inquery;
}
$headers = "From: tetsuhei.okada.8920@gmail.com";
// $headers = "From: celinelivechat@gmail.com";
mb_language("ja");
mb_internal_encoding("UTF-8");
$is_send_mail_flg = false;
if(mb_send_mail($to, $subject, $message, $headers)){
    //送信成功
    $is_send_mail_flg = true;
    echo json_encode(
        array(
            "result"=>true,
            "msg"=>"送信しました。お問い合わせありがとうございます。"
        )
    );
}else{
    //送信失敗
    echo json_encode(
        array(
            "result"=>false,
            "msg"=>"メールの送信に失敗しました。入力内容をご確認のうえ、再度送信してください。"
        )
    );
}

// メールアドレスが記入されている場合、その人に確認メールを送る
if(strlen($mail) > 0){
    $to = $mail;
    $from = "<tetsuhei.okada.8920@gmail.com>";
    $subject = "[celine.]　お問い合わせありがとうございます。";
    $message = $name." 様\r\n\r\n";
    $message += "お問い合わせいただき、ありがとうございます。\r\n";
    $message += "2−3営業日中に担当の者からお電話またはメールにてご連絡させていただきます。\r\n";
    $message += "今しばらくお待ちくださいませ。\r\n\r\n";
    $message += "なお、返信がない場合は大変お手数ですが再度お問い合わせいただきますよう\r\n";
    $message += "お願い申し上げます。\r\n\r\n\r\n";
    if(strlen($inquery) > 0){
        $message += "[お問い合わせ内容]\r\n";
        $message += $inquery;
        $message += "\r\n\r\n\r\n";
    }
    $message += "celine. [セリーヌ]";
    
    $headers = "From:".mb_encode_mimeheader("celine | セリーヌ").$from;
    mb_language("ja");
    mb_internal_encoding("UTF-8");
    mb_send_mail($to, $subject, $message, $headers)
}

?>