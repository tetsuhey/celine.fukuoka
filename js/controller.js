$(function(){
    var isHome = ($(location).attr('origin') + '/' ==  $(location).attr('href')) ? true:false;
    //console.log(location.pathname);
    if(location.pathname == '/' || location.pathname == '/index.html'){
        isHome = true;
    }
    if(isHome){
        $.ajax({
            type: "GET",
            url: "php/rss.php"
        }).done(function(data) {
            $('#feed').html(data);
        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
            $('#feed').html("<div class='row'><div class='col-12 center'>記事の読み込みに失敗しました。</div></div>");
        });
    }
    

    $(".qa_btn").on('click', function(){
        $toggleBtn = $(this);
        $toggleBtn.toggleClass('open');
        $toggleBtn.next('div').toggleClass('open');
        $toggleBtn.next('div').children("p").toggleClass('open');
    });
    $("#showFormBtn").on('click', function(){
        $target = $('#formrow');
        $target.slideToggle();
    });
    $(".menu_btn").on("click", function(){
        $(this).toggleClass('open');
        $(".smpMenu").toggleClass('open')
    });
    $("#menu-close-btn").on("click", function(){
        $(".menu_btn").removeClass('open');
        $(".smpMenu").removeClass('open')
    });
    $(".chatlady_desc_wrap .arrowwrap div").on("click", function(){
        $(this).parent().next().slideToggle('fast');
        $(this).toggleClass('open');
    });
    $("#benefit .arrow").on('click', function(){
        $(this).toggleClass('open');
        data = $(this).attr('data');
        $('#benefit').find('p.msg').each(function(i, elem){
            var target = $(elem).attr('data');
            if(target == data){
                $(elem).toggleClass('open');
            }
        });
    });
    $(".smpfixed li.menu").on("click", function(){
        $(this).toggleClass('open');
        $('.smpMenu').toggleClass('open');
        $('.menuwrap').toggleClass('open');
    });
    $(".menuwrap li").on("click", function(){
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
            var scroll_top = $(_attr).offset().top - 60;
            $("html,body").animate({scrollTop:scroll_top},600);
        }

        $(".smpfixed li.menu").removeClass('open');
        $(".menuwrap").removeClass('open');
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
    $('input[name="inlineRadioOptions"]').change(function () {
        var $this = $(this);
        if($this.val() == '面接の予約をしたい'){
            $('#formConts').slideDown();
        }else{
            $('#formConts').slideUp();
        }

    });


    $("form #send").on("click", function(){
        $(this).prop('disabled', true);
        var errMsg1 = "この項目を空欄にすることはできません。";
        var errMsg2 = "数字以外の入力はできません。";
        var errMsg3 = "18歳未満の応募はできません。";
        var errMsg4 = "メールアドレスを正しく入力してください。";
        var errMsg5 = "500文字以内で入力してください。";
        var errMsg6 = "30文字以内で入力してください。";
        var errMsg7 = "電話番号は10桁か11桁の半角数字を入力してください。";
        var isErr = false;

        var $content = $("form input[name='inlineRadioOptions']:checked");//お問い合わせ内容
        var $age = $("form input[name='age']");//年齢
        var $name = $("form input[name='name']");//名前
        var $phone = $("form input[name='phone']");//電話番号
        var $timezone = $("form select[name='timezone']");//電話可能な時間帯
        var $mail = $("form input[name='mail']");//メール
        var $inquery = $("form textarea[name='inquery']");//お問い合わせ内容
        var $date1 = $("form input[name='date1']");//面接希望日１
        var $date2 = $("form input[name='date2']");//面接希望日２
        var $date3 = $("form input[name='date3']");//面接希望日３
        var $place = $("form input[name='placeoptions']:checked");//面接場所
        var $targetplace = $("form input[name='targetPlace']");//指定場所
        var $ids = $("form input[name='idoptions']:checked");//ID

        // 名前のチェック
        if(isNull_chk($name.val())){
            // 必須チェック
            $("#nameErrMsg").text(errMsg1);
            $("#nameErrMsg").show();
            isErr = true;
        }else if($.trim($name.val()).length > 30){
            // 文字数チェック
            $("#nameErrMsg").text(errMsg6);
            $("#nameErrMsg").show();
            isErr = true;
        }else{
            $("#nameErrMsg").text("");
            $("#nameErrMsg").hide();
        }
        // 年齢のチェック
        if(isNull_chk($age.val())){
            // 必須チェック
            $("#ageErrMsg").text(errMsg1);
            $("#ageErrMsg").show();
            isErr = true;
        }else if(isNumeric_chk($age.val())){
            //数字チェック
            $("#ageErrMsg").text(errMsg2);
            $("#ageErrMsg").show();
            isErr = true;
        }else if(parseInt($age.val()) < 19){
            // 年齢チェック
            $("#ageErrMsg").text(errMsg3);
            $("#ageErrMsg").show();
            isErr = true;
        }
        else{
            $("#ageErrMsg").text("");
            $("#ageErrMsg").hide();
        }
        // メールのチェック
        if(isNull_chk($mail.val())){
            // 必須チェック
            $("#mailErrMsg").text(errMsg1);
            $("#mailErrMsg").show();
            isErr = true;
        }else if(mail_chk($mail.val())){
            $("#mailErrMsg").text(errMsg4);
            $("#mailErrMsg").show();
            isErr = true;
        }else{
            $("#mailErrMsg").text('');
            $("#mailErrMsg").hide();
        }
        // 電話番号のチェック
        if(isNumeric_chk($phone.val())){
            //　数字チェック
            $("#phoneErrMsg").text(errMsg2);
            $("#phoneErrMsg").show();
            isErr = true;
        }else if($phone.val().length > 0 && ($.trim($phone.val()).length < 10 || $.trim($phone.val()).length > 11)){
            // 桁数チェック
            $("#phoneErrMsg").text(errMsg7);
            $("#phoneErrMsg").show();
            isErr = true;
        }else{
            $("#phoneErrMsg").text("");
            $("#phoneErrMsg").hide();
        }
        // 問い合わせ内容のチェック
        var inquery_str = $inquery.val();
        if($.trim(inquery_str).length > 0 && $.trim(inquery_str).length > 500){
            $("#inqueryErrMsg").text(errMsg5 + "[" + $.trim(inquery_str).length + " /500]");
            $("#inqueryErrMsg").show();
            isErr = true;
        }else{
            $("#inqueryErrMsg").text("");
            $("#inqueryErrMsg").hide();
        }

        if(isErr){
            $(this).prop('disabled', false);
            return false;
        }else{
            $(".errormsg").hide();
            $(".errormsg").text('');
            $("#errMsg").hide();
            $("#errMsg").text('');

            console.log(!($place.val()) ? "undefined":$place.val());
            console.log($content.val());


            $.ajax({
                type: "POST",
                url: "../php/sendmail.php",
                data: {
                    'age' : $age.val(),
                    'name' : $name.val(),
                    'phone' : $phone.val(),
                    'timezone' : $timezone.val(),
                    'mail' : $mail.val(),
                    'inquery' : $inquery.val(),
                    'content':$content.val(),
                    'date1' : $date1.val(),
                    'date2' : $date2.val(),
                    'date3' : $date3.val(),
                    'place' : !($place.val()) ? "":$place.val(),
                    'targetplace' : $targetplace.val(),
                    'ids' : !($ids.val()) ? "":$ids.val()
                }
            }).done(function(response, textStatus, xhr) {
                $('form input').val('');
                $('.errormsg').text('');
                $('.errormsg').hide();
                // $age.val('');
                // $name.val('');
                // $phone.val('');
                // $mail.val('');
                $(this).prop('disabled', false);
                window.location.href = "./thanks.html";
                // alert('ご応募ありがとうございます。送信されました。');
            }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
                console.log("XMLHttpRequest : " + XMLHttpRequest.status);
                console.log("textStatus     : " + textStatus);
                console.log("errorThrown    : " + errorThrown.message);
                $("#errMsg").text("送信に失敗しました。時間を置いて再度送信しても解決しない場合は、別の方法でお問い合わせください。");
                $("#errMsg").show();
                $(this).prop('disabled', false);
            });
            $(this).prop('disabled', false);
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
    
});