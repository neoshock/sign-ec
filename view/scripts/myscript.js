$(document).ready(function()
{
    $(".navbar ul li a").click(function(e) {
        e.preventDefault();
        var page = $(this).attr("href");
        $.get("index.php", { "page": page }, function(response){
            console.log(response);
            $(".main").css("display","none");

            if (response.result) {
                
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