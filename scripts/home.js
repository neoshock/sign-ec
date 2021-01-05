$(document).ready(function(){
    $('.cover').hide();

    $('.cover').css({
        'left':'-200px',
    });
    setTimeout(() => {
        $('.cover').fadeIn(500);
        $('.cover').animate({
            display: 'block',
            left: '0'
        },1000);
    },500);

    setTimeout(() => {
        $('.contenido').fadeIn(500);
        $('.contenido').animate({
            right: '0'
        },500);
    }, 1000);
    
    $('.contenido').hide();
    $('.contenido').css({
        'right':'-300px',
    });

    $('.titulos h2').css({
        'top':'-200px',
    });
    $('.titulos h2').animate({
        display: 'block',
        top: '0'
    },1000);
    $('.titulos a').hide();
    setTimeout(() => {
        $('.titulos a').fadeIn(500);
    }, 2000);
});