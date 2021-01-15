$("#lds_search_word").keyup(function(e){
    var element= $(this);
    $(".result-search-word").html("");
    if (element.val().length > 0) {
        $.ajax({
            url: "json/config.dictionary.json",
            dataType: "json",
            async: false
        }).done(function(data)
        {         
            var html = "";
            $.each(data, function(index, obj){
                if (obj.word.toLowerCase().includes(element.val().toLowerCase()))
                {
                    html += '<li class="list-group-item" data-word="'+obj.word+'" data-image="'+obj.image+'" data-video="'+obj.video+'" data-description="'+obj.description+'">'+obj.word+'</li>';
                }
            });
            $(".result-search-word").append(html);
        });

        $(".list-group li").on("click", function(){
            var item = $(this), card = $(".card");
            // colocar valor al campo
            element.val(item.text());
            // limpiar lista
            item.parent().html("");
            // mostrar contenido
            card.removeClass("d-none");
            $(".card img").attr("src", item.attr("data-image"));
            $(".card-title").html(item.attr("data-word"));
            $(".card-text").html(item.attr("data-description"));
            $(".myModal").html(showModalVideo({
                title: item.attr("data-word"),
                video: item.attr("data-video")
            }));
        });
    }else{
        element.parent().siblings('ul').html('');
        $(".card").addClass("d-none");
    }
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
    html += '            <iframe src="'+config.video+'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
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



