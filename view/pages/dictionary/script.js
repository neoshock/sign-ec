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
                    html += '<li class="list-group-item position-absolute" style="width: 42%;z-index: 2;">'+obj.word+'</li>';
                }
            });
            $(".result-search-word").append(html);
        });

        $("li").on("click", function(){
            console.log("mostrar informacion del item seleccionado");
            element.val($(this).text());
            $(".list-group").html("");
        });
    }else{
        element.parent().siblings('ul').html('');
    }
});




