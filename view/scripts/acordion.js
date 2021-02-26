$('#acordion').ready(function(){
    console.log('el script esta funcionando');

    function generateItems(){

    }

    $(".acordionBody").hide();

    $("#accordionContent1 .acordionHeader").click(function(){
        $(this).toggleClass('#accordionContent1 acordion-active');
        $("#accordionContent1 .acordionBody").fadeToggle(250);
    });

    $("#accordionContent2 .acordionHeader").click(function(){
        $(this).toggleClass('acordion-active');
        $("#accordionContent2 .acordionBody").fadeToggle(250);
    });
});