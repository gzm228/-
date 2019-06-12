$(function () {
  let poker = [];
  let box =$('.box');
  let colorArr = ['s','h','d','c'];
  let flag = [];
  for(let i=0;i<52;i++){
      let index = Math.floor(Math.random()*colorArr.length);
      let color =colorArr[index];
      let number =Math.round(Math.random()*12 +1);
      while(flag[color+'-'+number]){
          index = Math.floor(Math.random()*colorArr.length);
          color =colorArr[index];
          number =Math.round(Math.random()*12 +1);
      }
      flag[color+'-'+number]=true;
      poker.push({color,number});

  }
  let index=-1;
  for (let i=0;i<7;i++){
      for(let j=0;j<=i;j++){
          index++;
          let obj=poker[index];
          let lefts=350-50*i+100*j,tops =50*i;
          $('<div>').addClass('poker')
              .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg`})
              .appendTo('.box')
              .attr('id',i+'-'+j)
              .data('number',obj.number)
              .delay(index*100)
              .animate({left:lefts,top:tops,opacity:1});

      }
  }
  for(;index<52;index++){
      let obj=poker[index];
      $('<div>').addClass('poker').addClass('left')
          .css({backgroundImage:`url(./imgs/${obj.number}${obj.color}.jpg`})
          .appendTo('.box')
          .attr('id',-2+'-'+-2)
          .data('number',obj.number)
          .delay(index*100)
          .animate({left:0,top:440,opacity: 1});
  }


    let first =null;
box.on('click','.poker',function () {
    let _this =$(this);
    let [i,j] = _this.attr('id').split('-');
    let id1=i*1+1+'-'+j,id2=i*1+1+'-'+(j*1+1);
    if ($('#'+id1).length || $('#'+id2).length){
        return;
    }else{
        if(_this.hasClass('active')){
            $(this).removeClass('active').animate({top:'+=20px'});
        }else{
            $(this).addClass('active').animate({top:'-=20px'});
        }
    }


   if (!first){
       first= _this;
   }else{
       let num1=first.data('number'),num2=_this.data('number');
       if(num1+num2===14){
           $('.active').animate({top:0,left:710,opacity:0},function () {
               $(this).remove();
           })
       }else{
           $('.active').animate({top:'+=20px'},function () {
               $(this).removeClass('active');
           });
       }
       first = null;
   }
});

    let n = 0;
    let rightbtn=$('.rightbtn');
    rightbtn.on('click',function () {
        let left=$('.left');
        left.last().animate({left:700,zIndex:n++},function () {
            $(this).removeClass('left').addClass('right');
        });


    });
    let leftbtn=$('.leftbtn');
    leftbtn.on('click',function () {
        let right=$('.right');

        right.first().animate({left:0,zIndex:n++},function () {
            $(this).removeClass('right').addClass('left');
        });


    });
    while(poker.length==0){
        document.write('congratulations!!')

    }
});