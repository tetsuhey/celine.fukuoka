$(function(){
    $(".qa_btn").on('click', function(){
        $toggleBtn = $(this);
        $toggleBtn.toggleClass('open');
        $toggleBtn.next('div').toggleClass('open');
        $toggleBtn.next('div').children("p").toggleClass('open');
    });
    $(".menu_btn").on("click", function(){
        $(this).toggleClass('open');
        $(".smpMenu").toggleClass('open')
    });
    $("#menu-close-btn").on("click", function(){
        $(".menu_btn").removeClass('open');
        $(".smpMenu").removeClass('open')
    });
    $(".smpMenu li").on("click", function(){
        var _attr = $(this).attr("data");
        var _goHome = $(this).attr("goHome");

        if(_goHome == "true"){
            if(_attr == "header"){
                window.location.href="../";
            }else if(_attr == "#apply"){
                window.location.href="./contact/";
            }else{
                window.location.href="../"+_attr;
            }
        }else{
            var scroll_top = $(_attr).offset().top - 10;
            $("html,body").animate({scrollTop:scroll_top},600);
        }

        $(".menu_btn").removeClass('open');
        $(".smpMenu").removeClass('open')
    });
    $("#apply_btn, #contact_btn").on("click", function(){
        // var pos = $("#apply").offset().top -10;
        // $("html,body").animate({scrollTop:pos},600);
        window.location.href="./contact/";
    });
    $("a span.phone").on("click",function(){
        if(!sp){
            return false
        }else{

        }
    });


    $("form #send").on("click", function(){
        var errMsg1 = "この項目を空欄にすることはできません。";
        var errMsg2 = "数字以外の入力はできません。";
        var errMsg3 = "18歳未満の応募はできません。";
        var errMsg4 = "メールアドレスを正しく入力してください。";
        var errMsg5 = "500文字以内で入力してください。";
        var errMsg6 = "30文字以内で入力してください。";
        var errMsg7 = "電話番号は10桁か11桁の半角数字を入力してください。";
        var isErr = false;

        var $age = $("form input[name='age']");
        var $name = $("form input[name='name']");
        var $phone = $("form input[name='phone']");
        var $mail = $("form input[name='mail']");
        var $inquery = $("form textarea[name='inquery']");

        // 年齢のチェック
        if(isNull_chk($age.val())){
            // 必須チェック
            $age.next().text(errMsg1);
            $age.next().show();
            isErr = true;
        }else if(isNumeric_chk($age.val())){
            //数字チェック
            $age.next().text(errMsg2);
            $age.next().show();
            isErr = true;
        }else if(parseInt($age.val()) < 19){
            // 年齢チェック
            $age.next().text(errMsg3);
            $age.next().show();
            isErr = true;
        }
        else{
            $age.next().hide();
        }

        // 名前のチェック
        if(isNull_chk($name.val())){
            // 必須チェック
            $name.next().text(errMsg1);
            $name.next().show();
            isErr = true;
        }else if($.trim($name.val()).length > 30){
            // 文字数チェック
            $name.next().text(errMsg6);
            $name.next().show();
            isErr = true;
        }else{
            $name.next().hide();
        }
        // 電話番号のチェック
        if(isNull_chk($phone.val())){
            //　必須チェック
            $phone.next().text(errMsg1);
            $phone.next().show();
            isErr = true;
        }else if(isNumeric_chk($phone.val())){
            //　数字チェック
            $phone.next().text(errMsg2);
            $phone.next().show();
            isErr = true;
        }else if($.trim($phone.val()).length < 10 || $.trim($phone.val()).length > 11){
            // 桁数チェック
            $phone.next().text(errMsg7);
            $phone.next().show();
            isErr = true;
        }else{
            $phone.next().hide();
        }
        // メールのチェック
        if(mail_chk($mail.val())){
            $mail.next().text(errMsg4);
            $mail.next().show();
            isErr = true;
        }else{
            $mail.next().hide();
        }
        // 問い合わせ内容のチェック
        var inquery_str = $inquery.val();
        if($.trim(inquery_str).length > 0 && $.trim(inquery_str).length > 500){
            $inquery.next().text(errMsg5 + "[" + $.trim(inquery_str).length + " /500]");
            $inquery.next().show();
            isErr = true;
        }else{
            $inquery.next().hide();
        }

        if(isErr){
            return false;
        }else{
            $age.next().hide();
            $name.next().hide();
            $phone.next().hide();
            $mail.next().hide();
            $("#send").next().hide();

            $.ajax({
                type: "POST",
                url: "./php/sendmail.php",
                data: {
                    'age' : $age.val(),
                    'name' : $name.val(),
                    'phone' : $phone.val(),
                    'mail' : $mail.val(),
                    'inquery' : $inquery.val()
                }
            }).done(function(response, textStatus, xhr) {
                $age.val('');
                $name.val('');
                $phone.val('');
                $mail.val('');
                alert('ご応募ありがとうございます。送信されました。');
            }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus     : " + textStatus);
                console.log("errorThrown    : " + errorThrown.message);
                $("#send").next().text("送信に失敗しました。時間を置いて再度送信しても解決しない場合は、別の方法でお問い合わせください。");
                $("#send").next().show();
            });
            return false;
        }
    });

    function isNull_chk(val){
        if(val == null){
            return true;
        }else if($.trim(val).length == 0){
            return true;
        }
        return false;
    }
    function isNumeric_chk(val){
        for(var i = 0; i < val.length -1; i++){
            var num = parseInt(val.charAt(i),10);
            if((!num || isNaN(num)) && num !== 0){
                return true;
            }
        }

        return false;
    }
    function mail_chk(val){
        var mail_str = val == null || val == undefined ? "" : $.trim(val);
        if(mail_str.length == 0 ){
            return false;
        }else if(mail_str.length < 5){
            return true;
        }
        
        if(mail_str.indexOf('@', 0) == -1){
            return true;
        }else if(mail_str.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) == null){
            return true;
        }
        return false;
    }

    function send_email(){

    }
});