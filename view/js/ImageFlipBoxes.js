
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

$("#myContent").html("").append(buildImageFlipBoxes("json/config.sections.json"));

/** Flip Boxes
 *********************** **/
if($('.box-flip').length > 0) {
    
    $('.box-flip').each(function() {
        _height1 = $('.box1',this).outerHeight();
        _height2 = $('.box2',this).outerHeight();

        if(_height1 >= _height2) {
            _height = _height1;
        } else {
            _height = _height2;
        }

        $(this).css({"min-height":_height+"px"});
        $('.box1',this).css({"min-height":_height+"px"});
        $('.box2',this).css({"min-height":_height+"px"});
    });
    
    $('.box-flip').hover(function() {
        $(this).addClass('flip');
    },function(){
        $(this).removeClass('flip');
    });
}


