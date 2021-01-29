$("#content-dictionary").ready(function(){
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
});
