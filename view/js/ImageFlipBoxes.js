function buildImageFlipBoxes(urlJson)
{
    var html = "";
    $.ajax({
        url: urlJson,
        dataType: 'json',
        async: false
    }).done(function(data){
        if (data.length > 0)
        {
            $.each(data, function(index, obj){
                html += '<div class="col-md-3">';
                html += '<div class="box-flip box-color box-icon box-icon-center box-icon-round box-icon-large text-center">';
                html += '    <div class="front">';
                html += '        <div class="box1 box-'+obj.box_color +'">';
                html += '            <div class="box-icon-title">';
                html += '                <img class="img-responsive" src="'+ obj.image +'" alt="" />';
                html += '                <h2>'+ obj.front.title +'</h2>';
                html += '            </div>';
                html += '            <p>'+ obj.front.description +'</p>';
                html += '        </div>';
                html += '    </div>';
                html += '    <div class="back">';
                html += '        <div class="box2 box-'+ obj.box_color +'">';
                html += '            <h4>'+ obj.back.title +'</h4>';
                html += '            <hr />';
                html += '            <p>'+ obj.back.description +'</p>';
                html += '            <buttom class="btn btn-danger btn-study" data-study="'+obj.data_study+'">Estudiar</buttom>';
                html += '            <buttom class="btn btn-success btn-test" data-test="'+obj.data_test+'">Lección</buttom>';
                html += '        </div>';
                html += '    </div>';
                html += '</div>';
                html += '</div>';
            });
        }else{
            html += "<h1>No hay contenido<h1>";
        }
    });
    return html;
}

var content = $("#myContent");

content.html(buildImageFlipBoxes("json/config.sections.json")).ready(function(){
    
    /** Flip Boxes
     *********************** **/
    if($('.box-flip').length > 0) {
        
        $('.box-flip').each(function() {
            _height = $('.box1', this).outerHeight();
            
            $(this).css({"min-height":_height+"px"});
            $('.box1, .box2').css({"min-height":_height+"px"});
        });
        
        $('.box-flip').hover(function() {
            $(this).addClass('flip');
        },function(){
            $(this).removeClass('flip');
        });
    }

    $("buttom.btn-study").click(function(e){

        e.preventDefault();
        e.stopImmediatePropagation();

        var json = $(this).attr("data-study");
        
        // cargar el nuevo contenido
        $.getScript("view/js/Accordion.js").done(function(){
            
            // obtener el archi json de config
            $.getJSON(json, function(data){
                // borrar el contenido actual (secciones)
                $("#myContent").html("");
                if (data.length > 0)
                {
                    $("#myContent").html(buildAccordion(data)).append(showModalVideo({
                        title: "a",
                        video: ""
                    }));
                    functionAccordion();
                }
            }).done(function(){
                $("button.mymodal").click(function(){
                    $(".modal-title").html($(this).attr("data-title"));
                    $("iframe").attr("src", $(this).attr("data-video"));
                });
            }).fail(function(){
                alert("Contenido no disponible");
            });
        });
    });

    $("buttom.btn-test").click(function(e){
        //evitar errores para que se ejecute dos veces
        e.preventDefault();
        e.stopImmediatePropagation();
        // primero llamar el script del test
        questionJsonFile = $(this).attr("data-test");
        $.ajax("view/pages/test/test1.php").done(function(response){
            $("header").hide(100);
            $("#myContent").html(response);
            $.getScript("view/scripts/test.js");
        });
        // al llamarlo le paso como parametro de la url el nombre del archivo
        // en el archivo del test deberia de recibirlo y pasarlo por parametro en la funcion
    });
});

