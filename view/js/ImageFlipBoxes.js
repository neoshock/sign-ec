
// cambiar la clase por una funtion
class ImageFlipBoxes 
{
    constructor(config) 
    {
        console.log(typeof config);
        this.box_color = config.box_color;
        this.image = config.image;
        this.frontTitle = config.front.title;
        this.frontDescription = config.front.description;
        this.backTitle = config.back.title;
        this.backDescription = config.back.description;
    }

    build()
    {
        var html = "";
        html += '<div class="col-md-3">';
        html += '<div class="box-flip box-color box-icon box-icon-center box-icon-round box-icon-large text-center">';
        html += '    <div class="front">';
        html += '        <div class="box1 box-'+this.box_color +'">';
        html += '            <div class="box-icon-title">';
        html += '                <img class="img-responsive" src="'+ this.image +'" alt="" />';
        html += '                <h2>'+ this.frontTitle +'</h2>';
        html += '            </div>';
        html += '            <p>'+ this.frontDescription +'</p>';
        html += '        </div>';
        html += '    </div>';
        html += '    <div class="back">';
        html += '        <div class="box2 box-'+ this.box_color +'">';
        html += '            <h4>'+ this.backTitle +'</h4>';
        html += '            <hr />';
        html += '            <p>'+ this.backDescription +'</p>';
        html += '        </div>';
        html += '    </div>';
        html += '</div>';
        html += '</div>';

        return html;
    }
}

$.ajax({
    url: "json/config.sections.json",
    dataType: 'json',
    async: false
}).done(function(data){
    $.each(data, function(index){
        $("#learn").append(new ImageFlipBoxes(data[index]).build());
    });
});

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


