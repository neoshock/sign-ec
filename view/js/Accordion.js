function buildAccordion(config)
{
    var html = "";
    html += '<div class="accordion accordion-flush" id="accordionFlushExample">';
    $.each(config, function(i, o){
        html += '<div class="accordion-item">';
        html += '  <h2 class="accordion-header" id="flush-heading'+i+'">';
        html += '    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse'+i+'" aria-expanded="false" aria-controls="flush-collapse'+i+'">';
        html += '      '+o.title+'';
        html += '    </button>';
        html += '  </h2>';
        html += '  <div id="flush-collapse'+i+'" class="accordion-collapse collapse" aria-labelledby="flush-heading'+i+'" data-bs-parent="#accordionFlushExample">';
        html += '    <div class="accordion-body">'+ buildPersonalizedCard(o.content) +'</div>';
        html += '  </div>';
        html += '</div>';
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

