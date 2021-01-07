$(document).ready(function()
{
    $(".navbar ul li a").click(function(e) {
        e.preventDefault();
        var page = $(this).attr("href");
        $.get("index.php", { "page": page }, function(response){
            console.log(response);
            $(".main").html("");

            if (response.result)
            {
                $.getScript(response.action.script); // colocar la ruta de la config
            }
        }, "json");
    });
});