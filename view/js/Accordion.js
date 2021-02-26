function buildAccordion(config)
{
    var html = "";
    html += '<div class="accordion">';
    $.each(config, function(i, o){
        html+='<div class="accordion-item">';
        html+='	<div class="accordion-title">';
        html+='  		'+o.title+' <i class="fa fa-chevron-down"></i>';
        html+='	</div>';
        html+='	<div class="accordion-content accordion-hide">';
        html+='  		'+ buildPersonalizedCard(o.content) +'';
        html+='	</div>';
        html+='</div>';
    });
    html += '</div>';
    
    return html;
}

function buildPersonalizedCard(config)
{
    var html = "";
    html += '<div class="row">';
    $.each(config, function(i, ob){
        html += '<div class="col-md-6">';
        html += '    <div class="card mb-3">';
        html += '       <div class="row g-0">';
        html += '           <div class="col-md-4">';
        html += '               <img class="img-fluid" src="'+ob.image+'" alt="...">';
        html += '           </div>';
        html += '           <div class="col-md-8">';
        html += '               <div class="card-body">';
        html += '                   <h5 class="card-title">'+ob.word+'</h5>';
        html += '                   <p class="card-text">'+ob.description+'</p>';
        html += '                   <button type="button" class="btn btn-success mymodal" data-bs-toggle="modal" data-bs-target="#modal-video" data-title="'+ob.word+'" data-video="'+ob.video+'">Ver video</button>';
        html += '               </div>';
        html += '           </div>';
        html += '       </div>';
        html += '    </div>';
        html += '</div>';
    });
    html += '</div>';
    return html;
}

function functionAccordion()
{
    $(".accordion-title").click(function(){
        var item = $(this).parent();
        var item_content = item.children("div.accordion-content");
        if (item_content.hasClass("accordion-show")) {
            item_content.siblings().removeClass("accordion-active")
                .children("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");

            item_content.removeClass("accordion-show").addClass("accordion-hide");
        } else if (item_content.hasClass("accordion-hide")) {
            item_content.siblings().addClass("accordion-active")
                .children("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
            item.siblings().children("div.accordion-title")
                .children("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");

            item_content.removeClass("accordion-hide").addClass("accordion-show");
            item.siblings().children("div.accordion-content").removeClass("accordion-show").addClass("accordion-hide");
            item.siblings().children("div.accordion-title").removeClass("accordion-active");
        }
    });
}