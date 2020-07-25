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
        var scroll_top = $(_attr).offset().top - 10;
        $("html,body").animate({scrollTop:scroll_top},600);

        $(".menu_btn").removeClass('open');
        $(".smpMenu").removeClass('open')
    });
    $("#apply_btn, #contact_btn").on("click", function(){
        var pos = $("#apply").offset().top -10;
        $("html,body").animate({scrollTop:pos},600);
    });
    $("a span.phone").on("click",function(){
        if(!sp){
            return false
        }else{

        }
    });

    // $('#top-image .top-smp').on('click', function(){
    //     var dt = $(this).attr('data');
    //     var new_src = '';
    //     if(dt == "1"){
    //         new_src = $(this).attr("src").replace('top-smp', 'top-smp2');
    //         $(this).attr("data","2");
    //     }else if(dt == "2"){
    //         new_src = $(this).attr("src").replace('top-smp2', 'top-smp3');
    //         $(this).attr("data","3");
    //     }else if(dt == "3"){
    //         new_src = $(this).attr("src").replace('top-smp3', 'top-smp4');
    //         $(this).attr("data","4");
    //     }else{
    //         new_src = $(this).attr("src").replace('top-smp4', 'top-smp');
    //         $(this).attr("data","1");
    //     }
    //     $(this).attr("src", new_src);
    // });

    $("form .btn").on("click", function(){
        var errMsg1 = "この項目を空欄にすることはできません。";
        var errMsg2 = "数字以外の入力はできません。";
        var errMsg3 = "メールアドレスを正しく入力してください。";
        var errMsg4 = "500文字以内で入力してください。";
        var isErr = false;

        var $age = $("form input[name='age']");
        var $name = $("form input[name='name']");
        var $phone = $("form input[name='phone']");
        var $mail = $("form input[name='mail']");
        var $inquery = $("form textarea[name='inquery']");

        if(isNull_chk($age.val())){
            $age.next().text(errMsg1);
            isErr = true;
        }
        if(isNull_chk($name.val())){
            $name.next().text(errMsg1);
            isErr = true;
        }
        if(isNull_chk($phone.val())){
            $phone.next().text(errMsg1);
            isErr = true;
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
});