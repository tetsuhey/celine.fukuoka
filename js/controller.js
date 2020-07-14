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
});