$("#expWin").ready(function(){
    const numb = document.querySelector(".numb");
    let counter = 0;
    setInterval(()=>{
      if(counter == 15){
        clearInterval();
      }else{
        counter+=1;
        numb.textContent = counter + " EXP";
      }
    }, 125);

    $("#returnLearn").on('click', function(){
        $("[href='learn']").trigger("click");
        $("header").show(100);
    });
    callPoints();
});
