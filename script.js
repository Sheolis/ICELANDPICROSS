
var dessin=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
var hinfos='';
var vinfos=['','','','','','','','','','','','','','','',''];
var case_x;
var case_y;
var test ;
var val_h=0;
var val_v=['','','','','','','','','','','','','','','',''];
var liste_dessin = ['lapin','dog','castle','dragon','poulpe','kirby'];
var fail =0;
var win_condition =0;
var win_check=0;
var blacklist=[];
var errorlist=[];
var k=1;
$('.bouton_choix').on('click',function(){
  $.session.set('selection',this.id[7]);
  location.reload(true);
})

//get image informations, works only for black&white 15x15px base64 pictures
var pixelData ;
var ctx ;
var img = document.getElementById(liste_dessin[$.session.get('selection')]); // mon image
var canvas = document.createElement('canvas'); //une espece de fenetre sur laquelle on va "imprimer" l'image
canvas.width = img.width; //on réccup les dimension de l'image mais on pourrait mettre 15 direct (15px)
canvas.height = img.height;
ctx = canvas.getContext('2d')
ctx.drawImage(img, 0, 0, img.width, img.height); //on imprime en 2D l'image sur le canvas

for (var x = 1; x < 16; x++) {
  for (var y = 1; y < 16; y++) {
    pixelData = canvas.getContext('2d').getImageData(x-1, y-1, 1, 1).data;
    if (pixelData[0]<10) {
      dessin[x][y]=1;
      val_h ++;
      val_v[y] ++;
      win_condition ++;
    }
    else {
      dessin[x][y]=0;
      if (val_h!=0) {
        if (val_h>=10) {
          hinfos+=('-'+val_h+'-');
        }
        else{
          hinfos+=val_h;
        }
        val_h=0;
      }
      if (val_v[y]!=0) {
        if (val_v[y]>=10) {
          vinfos[y]+=('-'+val_v[y]+'-');
        }
        else{
          vinfos[y]+=val_v[y];
        }
        val_v[y]=0;
      }
    }
  }
  if (val_h!=0) {
    if (val_h>=10) {
      hinfos+='-'+val_h+'-';
    }
    else{
      hinfos+=val_h;
    }
    val_h=0;
  }
  $('#annotationV'+x).html(hinfos);
  hinfos='';
  val_h=0;
}


for (var y = 1; y < 16; y++) {
  if (val_v[y]>=10) {
    vinfos[y]+=('-'+val_v[y]+'-');
  }
  else{
    if (val_v[y]!=0){
      vinfos[y]+=val_v[y];
    }
  }
  val_v[y]=0;
  $('#annotationH'+y).html(vinfos[y]);
}

$('.vinfo').mousedown(function(event) {
  test = this.id;
  if (!$('#' + this.id).hasClass('correct') && !$('#' + this.id).hasClass('faux')) {
    switch (event.which) {
        case 3:                         //clic droit
        if ($('#' + this.id).hasClass('annotation1')) {
          $('#' + this.id).removeClass('annotation1');
        }
        else {
          $('#' + this.id).addClass('annotation1');
        }
    }
  }
});
$('.hinfo').mousedown(function(event) {
  test = this.id;
  if (!$('#' + this.id).hasClass('correct') && !$('#' + this.id).hasClass('faux')) {
    switch (event.which) {
        case 3:                         //clic droit
        if ($('#' + this.id).hasClass('annotation1')){
          $('#' + this.id).removeClass('annotation1');
        }
        else {
          $('#' + this.id).addClass('annotation1');
        }
    }
  }
});



$('.case').on('click',function(){ //clic gauche
  case_x = '';
  case_y = '';
  var i =0 ;
  while (this.id[i]!='_') {
    case_x = case_x + (this.id[i]);
    i ++;
  }
  i ++;
  while (this.id[i]!=undefined) {
  case_y = case_y + (this.id[i]);
  i ++;
  }

  if (dessin[case_y][case_x]==1) { //pour une raison non élucidée j'ai dû intervertir x et y ici pour que l'image soit à l'endroit ...
    $('#' + this.id).removeClass('annotation1');
    $('#' + this.id).removeClass('annotation2');
    $('#' + this.id).addClass('correct');
    if (!blacklist.includes(this.id)) {
      blacklist.push(this.id);
      win_check ++;
      if (win_check == win_condition) {
          alert('Le dessin est fini ! Bravo !');
      }
    }
  }
  else {
    if (!errorlist.includes(this.id)) {
      errorlist.push(this.id);
      $('#' + this.id).removeClass('annotation1');
      $('#' + this.id).removeClass('annotation2');
      $('#' + this.id).addClass('faux');
      fail ++;
      $('#score').html(fail);
    }
  }
})

$('.case').mousedown(function(event) {
  test = this.id;
  if (!$('#' + this.id).hasClass('correct') && !$('#' + this.id).hasClass('faux')) {
    switch (event.which) {
        case 3:                         //clic droit
          if ($('#'+this.id).hasClass('annotation1')){
            $('#'+this.id).removeClass('annotation1');
            $('#'+this.id).addClass('annotation2');
          }
          else if ($('#' + this.id).hasClass('annotation2')){
            $('#' + this.id).removeClass('annotation2');
          }
          else if (!$('#' + this.id).hasClass('annotation2') && !$('#' + this.id).hasClass('annotation1')){
            $('#' + this.id).addClass('annotation1');
          }
    }
  }
});
