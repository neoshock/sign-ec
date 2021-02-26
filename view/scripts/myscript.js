var questionJsonFile;
//Poner puntaje en localStorage
var points = $("#points");
$('.hiden-element').hide();
//llamar localStorage
function callPoints(){
    if(localStorage.length > 0){
        let number = localStorage.points;
        points.html(number + ' exp');
    }else{
        localStorage.setItem("points","0");
        points.html(0 + ' exp');
    }
}

$(document).ready(function()
{
    callPoints();

    $(".navbar ul li a, .btn-learn, .btn-dictionary").click(function(e) {
        e.preventDefault();
        var page = $(this).attr("href");
        $.get("index.php", { "page": page }, function(response){
            console.log(response);
            
            if (response.result) {
                $(".main").css("display","none");
                if (response.action.view)
                {
                    $.ajax({
                        url: response.action.view,
                        dataType: "html"
                    }).done(function(data){
                        $("#myContent").html(data);        
                    });
                }
                $.getScript(response.action.script);
            }
        }, "json");
    });
});


var showModalVideo = function(config)
{
    var html = "";
    html += '<div class="modal fade" id="modal-video" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">';
    html += '  <div class="modal-dialog modal-dialog-centered modal-lg text-center">';
    html += '    <div class="modal-content">';
    html += '      <div class="modal-header">';
    html += '        <h5 class="modal-title" id="exampleModalLabel">'+config.title+'</h5>';
    html += '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>';
    html += '      </div>';
    html += '      <div class="modal-body">';
    html += '        <div class="container">';
    html += '          <div class="row">';
    html += '            <iframe width="560" height="315" src="'+config.video+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    html += '          </div>';
    html += '        </div>';
    html += '      </div>';
    html += '      <div class="modal-footer">';
    html += '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>';
    html += '      </div>';
    html += '    </div>';
    html += '  </div>';
    html += '</div>';
    return html;
}
