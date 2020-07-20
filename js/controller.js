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
    $(".smpMenu li").on("click", function(){
        var _attr = $(this).attr("data");
        var scroll_top = $(_attr).offset().top - 50;
        $("html,body").animate({scrollTop:scroll_top},600);

        $(".menu_btn").removeClass('open');
        $(".smpMenu").removeClass('open')
    });
    $("#apply_btn, #contact_btn").on("click", function(){
        var pos = $("#apply").offset().top -50;
        $("html,body").animate({scrollTop:pos},600);
    });

    $('#top-image .top-smp').on('click', function(){
        var dt = $(this).attr('data');
        var new_src = '';
        if(dt == "1"){
            new_src = $(this).attr("src").replace('top-smp', 'top-smp2');
            $(this).attr("data","2");
        }else if(dt == "2"){
            new_src = $(this).attr("src").replace('top-smp2', 'top-smp3');
            $(this).attr("data","3");
        }else if(dt == "3"){
            new_src = $(this).attr("src").replace('top-smp3', 'top-smp4');
            $(this).attr("data","4");
        }else{
            new_src = $(this).attr("src").replace('top-smp4', 'top-smp');
            $(this).attr("data","1");
        }
        $(this).attr("src", new_src);
    });
});