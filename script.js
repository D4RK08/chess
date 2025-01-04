var concesse = [];
let pezzo_corrente = "";
let casella_corrente = "00";
let caselle = document.getElementsByClassName("caselle");
var current = "b";
var pedone = false;
var king = false
var renero = "04";
var rebianco = "74";
var scaccobianco = false;
var scacconero = false;
var mossibianchi = [false,false,false];
var mossineri = [false,false,false];
var mossescacco = [];
var enpassant = [];
    
[...caselle].forEach(casella => {
  casella.addEventListener("click", function (e) {
        
    let vecchia_casella = document.getElementById(casella_corrente);
    vecchia_casella.style.backgroundColor = "";
        
    let riga = (this.id)[0];
    let colonna = (this.id)[1];
    if(this.classList.contains("pezzi") && this.classList.contains(current)){
      this.style.backgroundColor = "#fffca2";
      nascondimosse();
      concesse=[];
      pedone = false;
      king=false
      tipo=this.innerHTML;
      pezzo_corrente=tipo;
      casella_corrente = this.id;
          
      calcolaconcesse(tipo,riga,colonna,current);
      mostramosse();
          
    }else{
      if(concesse.includes(this.id)){
        let continua = true;
        if(scaccobianco||scacconero){
          if(!mossescacco.includes(this.id) && mossescacco.length > 1){
            continua = false
          }
        }
        if(pedone){
          if((this.id)[1]==concesse[0][1] && this.innerHTML!="" && concesse.length >1){
            continua = false;
          }
          if(this.classList.contains(current)){
            continua = false;
          }
          if(vecchia_casella.id[0]==parseInt(this.id[0])+(current=="n"?-2:2)){
            controllapedone(current,this.id[0],this.id[1])
          }
          if(enpassant.length>0 && this.id==enpassant[1]){
            var pedonepreso = document.getElementById((parseInt(this.id[0])+(current=="n"?-1:1))+this.id[1])
            pedonepreso.innerHTML = ""
            pedonepreso.classList.remove("pezzi")
            pedonepreso.classList.remove("n");
            pedonepreso.classList.remove("b");
          }
        }else if(king){
          if(scacconero||scaccobianco){
            if(mossescacco.includes(this.id)){
                if(concesse.includes(this.id)){
                    if(isscacco(current,this.id[0],this.id[1])){
                        continua = false;
                    }
                }else{
                    continua = false;
                        
                }
            }else{
              continua = true
            }
          }
            
        }
            
        if (continua){
            
          this.innerHTML="";
          this.classList.remove("n");
          this.classList.remove("b");
          vecchia_casella.innerHTML = "";
          vecchia_casella.classList.remove("pezzi");
          this.innerHTML = pezzo_corrente;
          this.classList.add("pezzi");
          this.classList.add(current);
          if(tipo=="K"){
            if(this.id[1]=="6" && (current=="b"?(!mossibianchi[0]):(!mossineri[0])) && (current=="b"?(!mossibianchi[1]):(!mossineri[1]))){
              document.getElementById(this.id[0]+"7").innerHTML="";
              document.getElementById(this.id[0]+"7").classList.remove("pezzi");
              document.getElementById(this.id[0]+"5").innerHTML="T";
              document.getElementById(this.id[0]+"5").classList.add("pezzi");
            }
            if(this.id[1]=="2" && (current=="b"?(!mossibianchi[2]):(!mossineri[2])) && (current=="b"?(!mossibianchi[1]):(!mossineri[1]))){
              document.getElementById(this.id[0]+"0").innerHTML="";
              document.getElementById(this.id[0]+"0").classList.remove("pezzi");
              document.getElementById(this.id[0]+"3").innerHTML="T";
              document.getElementById(this.id[0]+"3").classList.add("pezzi");
            }
            if(current=="n"){
              renero=this.id;
              mossineri[1]=true;
            }else{
              rebianco=this.id;
              mossibianchi[1]=true;
            }
          }
          if(tipo=="T"){
            if(current=="n"){
              renero=this.id;
              if(vecchia_casella.id[1]==0){
                mossineri[0]=true;
              }else if(vecchia_casella.id[1]==7){
                mossineri[2]=true;
              }
            }else{
              rebianco=this.id;
              if(vecchia_casella.id[1]==0){
                mossibianchi[0]=true;
              }else if(vecchia_casella.id[1]==7){
                mossibianchi[2]=true;
              }
            }}
          nascondimosse();
          calcolaconcesse(this.innerHTML,this.id[0],this.id[1],current);
          if(current=="n"){
            if(concesse.includes(rebianco)){
              scaccobianco = true;
            }else{
              scaccobianco = false;
            }
          }else{
            if(concesse.includes(renero)){
              scacconero = true;
            }else{
              scacconero = false;
            }
          }
            
              
              
          if(current=="n"){
            current="b";
          }else{
            current="n";
          }
        }
      }
      nascondimosse();
      concesse=[];
        
      if(scaccobianco){
        var trovata = false
        var tipipezzi = document.getElementsByClassName("b")
        for(var i=0; i<tipipezzi.length && !trovata; i++){
          calcolaconcesse(tipipezzi[i].innerHTML,tipipezzi[i].id[0],tipipezzi[i].id[1],"b")
          if(concesse.length>0){
            trovata = true
          }
        }
        if(!trovata){
          popup("nero")
          console.log("nero vince")
        }
      }
      if(scacconero){
        var tipipezzi = document.getElementsByClassName("n")
        for(var i=0; i<tipipezzi.length && !trovata; i++){
          calcolaconcesse(tipipezzi[i].innerHTML,tipipezzi[i].id[0],tipipezzi[i].id[1],"n")
          if(concesse.length>0){
            trovata = true
          }
        }
        if(!trovata){
          popup("bianco")
          console.log("bianco vince")
        }
      }
          
          
          
          
          
          if(current=="n"){
            if(concesse.includes(rebianco)){
              scaccobianco = true;
            }else{
              scaccobianco = false;
            }
          }else{
            if(concesse.includes(renero)){
              scacconero = true;
            }else{
              scacconero = false;
            }
          }
        }
      })
    });
  
function mostramosse(){
    if(!king&&(scaccobianco||scacconero)){
        var temp=[]
        for(var i=0;i<concesse.length;i++){
            if(mossescacco.includes(concesse[i])){
                temp.push(concesse[i])
            }
        }
        concesse=temp
    }
    for(let celle in concesse){
        if(concesse[celle][0]<0 || concesse[celle][0]>7 || concesse[celle][1]<0 || concesse[celle][1]>7 || concesse[celle].length>2){
            continue;
        }else{
            let cella = document.getElementById(concesse[celle]);
          
          
            if(pedone){
                if((cella.id)[1]==concesse[0][1] && cella.innerHTML!="" && concesse.length >1){
                    console.log("195")
                    cella.style.backgroundColor = "";
                }
                else if(cella.classList.contains(current)){
                    cella.style.backgroundColor = "";
                }else if(king && mossescacco.includes(cella.id)){
                    cella.style.backgroundColor = "";
                  
                }else if(enpassant.length>0 && cella.id == enpassant[1]){
                    cella.style.backgroundColor = "red";
                  
                }else{
                    if(cella.innerHTML == ""){
                        cella.style.backgroundColor = "green";
                    }else if (cella.classList.contains(current == "n" ? "b" : "n")){
                        cella.style.backgroundColor = "red";
        
                    }
                }
          } else if(king && (scacconero||scaccobianco) &&mossescacco.includes(cella.id)){
                if(mossescacco.includes(concesse[celle])){
                    if(mossescacco.length==1){
                        cella.style.backgroundColor = "red";
                      
                    }else{
                        cella.style.backgroundColor = "";
                    }
              }
              
              
            }else{
            if(cella.innerHTML == ""){
              cella.style.backgroundColor = "green";
            }else if (cella.classList.contains(current == "n" ? "b" : "n")){
              cella.style.backgroundColor = "red";
        
            }
          }
        }
      }
      
}
    
function nascondimosse(){
  if(concesse.length>0){
    for(let celle in concesse){
        if(concesse[celle][0]<0 || concesse[celle][0]>7 || concesse[celle][1]<0 || concesse[celle][1]>7 || concesse[celle].length>2){
            continue;
        }else{
            let cella = document.getElementById(concesse[celle]);
            cella.style.backgroundColor = "";
        }
    }
  }
}
    
function calcolaconcesse(tipo,riga,colonna, player){
    concesse=[];
    if(tipo=="P"){
        if(player=="n" && riga==1){
          if(document.getElementById((parseInt(riga)+2)+colonna).innerHTML==""){
            concesse = [parseInt(riga)+1+colonna, parseInt(riga)+2+colonna];
            
          }
        }else if(player=="b" && riga==6){
          if(document.getElementById((parseInt(riga)-2)+colonna).innerHTML==""){
            concesse = [parseInt(riga)-1+colonna, parseInt(riga)-2+colonna];
          }
        }else if(document.getElementById(((player=="n") ? parseInt(riga)+1 : parseInt(riga)-1)+""+colonna).innerHTML==""){
            var nuovariga = (player=="n") ? parseInt(riga)+1 : parseInt(riga)-1;
            concesse = [nuovariga+""+colonna];
        }
        if(parseInt(colonna)+1<8){
          if(document.getElementById(((player=="n") ? parseInt(riga)+1 : parseInt(riga)-1)+""+(parseInt(colonna)+1)).innerHTML!=""){
            concesse.push(((player=="n") ? parseInt(riga)+1 : parseInt(riga)-1)+""+(parseInt(colonna)+1));
          }
        }
        if(parseInt(colonna)-1>=0){
          if(document.getElementById(((player=="n") ? parseInt(riga)+1 : parseInt(riga)-1)+""+(parseInt(colonna)-1)).innerHTML!=""){
            concesse.push(((player=="n") ? parseInt(riga)+1 : parseInt(riga)-1)+""+(parseInt(colonna)-1));
          } 
        }
        if(enpassant.length>0 && enpassant[0][0] == riga && enpassant[0][1] == colonna){
          concesse.push(enpassant[1])
        }
        pedone = true;
    }else if(tipo=="T"){
        var id = "vuoto";
        var cont = 0
        cont = parseInt(riga)
        while(cont<8 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = cont+colonna;
              concesse.push(id);
            }
            id = "vuoto";
            cont = parseInt(colonna)
            while(cont<8 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = riga+cont;
              concesse.push(id);
            }
            id = "vuoto";
            cont = parseInt(riga)
            while(cont<8 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = cont+colonna;
              concesse.push(id);
            }
            id = "vuoto";
            cont = 0
            cont = parseInt(colonna)
            while(cont<8 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = riga+cont;
              concesse.push(id);
            }
            console.log("concesse torre: "+concesse)
          }else if(tipo=="J"){
            var id = "vuoto";
            var contr = parseInt(riga);
            var contc = parseInt(colonna);
            while(contc<8 && contc>=0 && contr<8 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc++;
              id = contr+""+contc;
              concesse.push(id);
            }
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>=0 && contr<8 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc--;
              id = contr+""+contc;
              concesse.push(id);
            }
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>=0 && contr<8 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc--;
              id = contr+""+contc;
              concesse.push(id);
            }
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>=0 && contr<8 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc++;
              id = contr+""+contc;
              concesse.push(id);
            }
          }else if(tipo=="H"){
            var id = "vuoto";
            var contr = parseInt(riga);
            var contc = parseInt(colonna);
            concesse.push((contr+1)+""+(contc+2));
            concesse.push((contr+2)+""+(contc+1));
            concesse.push((contr-1)+""+(contc-2));
            concesse.push((contr-2)+""+(contc-1));
            concesse.push((contr-1)+""+(contc+2));
            concesse.push((contr-2)+""+(contc+1));
            concesse.push((contr+1)+""+(contc-2));
            concesse.push((contr+2)+""+(contc-1));
            console.log("concesse cavallo: "+concesse)
            
          }else if(tipo=="Q"){
            var id = "vuoto";
            var cont = parseInt(riga)
            while(cont<8 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = cont+colonna;
              concesse.push(id);
            }
            id = "vuoto";
            cont = parseInt(riga)
            while(cont<8 && cont>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = cont+colonna;
              concesse.push(id);
            }
            
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>=0 && contr<8 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc++;
              id = contr+""+contc;
              concesse.push(id);
            }
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>0 && contr<8 && contr>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc--;
              id = contr+""+contc;
              concesse.push(id);
            }
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>0 && contr<8 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc--;
              id = contr+""+contc;
              concesse.push(id);
            }
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>=0 && contr<8 && contr>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc++;
              id = contr+""+contc;
              concesse.push(id);
            }
            
          }else if(tipo=="K"){
            king=true
            if(!isscacco(player,(parseInt(riga)+1),colonna)){
                concesse.push((parseInt(riga)+1)+colonna);
            }
            if(!isscacco(player,(parseInt(riga)-1),colonna)){
                concesse.push((parseInt(riga)-1)+colonna);
            }
            if(!isscacco(player,riga,(parseInt(colonna)+1))){
                concesse.push(riga+(parseInt(colonna)+1));
            }
            if(!isscacco(player,riga,(parseInt(colonna)-1))){
                concesse.push(riga+(parseInt(colonna)-1));
            }
            if(!isscacco(player,(parseInt(riga)+1),(parseInt(colonna)+1))){
                concesse.push((parseInt(riga)+1)+""+(parseInt(colonna)+1));
            }
            if(!isscacco(player,(parseInt(riga)-1),(parseInt(colonna)-1))){
                concesse.push((parseInt(riga)-1)+""+(parseInt(colonna)-1));
            }
            if(!isscacco(player,(parseInt(riga)-1),(parseInt(colonna)+1))){
                concesse.push((parseInt(riga)-1)+""+(parseInt(colonna)+1));
                
            }
            if(!isscacco(player,(parseInt(riga)+1),(parseInt(colonna)-1))){
                concesse.push((parseInt(riga)+1)+""+(parseInt(colonna)-1));
                
            }
            if(parseInt(colonna)+2<8 && parseInt(colonna)-3>=0){
                if(document.getElementById(riga+(parseInt(colonna)+2)).innerHTML=="" && document.getElementById(riga+(parseInt(colonna)+1)).innerHTML==""){
                    if(player=="n"){
                        if(!mossineri[1] && !mossineri[2]){
                            if(!isscacco(player,riga,parseInt(colonna)+2)){
                                concesse.push(riga+(parseInt(colonna)+2))
                            }
                        }
                    }else{
                        if(!mossibianchi[1] && !mossibianchi[2]){
                            if(!isscacco(player,riga,parseInt(colonna)+2)){
                                concesse.push(riga+(parseInt(colonna)+2))
                            }
                        }
                    }
                }
            if(document.getElementById(riga+(parseInt(colonna)-2)).innerHTML=="" && document.getElementById(riga+(parseInt(colonna)-1)).innerHTML=="" && document.getElementById(riga+(parseInt(colonna)-3)).innerHTML==""){
              if(player=="n"){
                if(!mossineri[0] && !mossineri[1]){
                            if(!isscacco(player,riga,parseInt(colonna)-2)){
                  concesse.push(riga+(parseInt(colonna)-2))}
                }
              }else{
                if(!mossibianchi[0] && !mossibianchi[1]){
                            if(!isscacco(player,riga,parseInt(colonna)-2)){
                  concesse.push(riga+(parseInt(colonna)-2))
                                
                            }
                }
              }
            }
          }
          }
          var tipotemp = document.getElementById(riga+colonna).innerHTML
          document.getElementById(riga+colonna).innerHTML=""
          calcolamossescacco(player,(player=="n"?renero[0]:rebianco[0]),(player=="n"?renero[1]:rebianco[1]))
          if(mossescacco.length>1){
            let temp=[]
            for(let i=0;i<concesse.length;i++){
              if(tipo=="K"?(!mossescacco.includes(concesse[i])):mossescacco.includes(concesse[i])){
                temp.push(concesse[i])
              }
            }
            concesse = temp
          }else if(mossescacco.length==1){
            let temp=[]
            if(tipo=="K"){
              calcolamossescacco(player,mossescacco[0][0],mossescacco[0][1])
              if(mossescacco.length<1){
                temp.push(mossescacco[0])
              }
            }else{
              if(concesse.includes(mossescacco[0])){
                temp.push(mossescacco[0])
                
              }
            }
            concesse = temp
          }
          document.getElementById(riga+colonna).innerHTML=tipotemp
}

function calcolamossescacco(player,riga,colonna){
  mossescacco=[]
  var id = "vuoto"
  if((parseInt(riga)+1)<8&&(parseInt(colonna)+1)<8){
  id = (parseInt(riga)+1)+""+(parseInt(colonna)+1)
  if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
    mossescacco.push(id);
  }}
            
  if((parseInt(riga)-1)>=0&&(parseInt(colonna)-1)>=0){
    id = (parseInt(riga)-1)+""+(parseInt(colonna)-1)
    if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
      mossescacco.push(id);
    }
  }
  if((parseInt(riga)+1)<8&&(parseInt(colonna)-1)>=0){
    id = (parseInt(riga)+1)+""+(parseInt(colonna)-1)
    if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
      mossescacco.push(id);
    }
  }
            if((parseInt(riga)-1)>=0&&(parseInt(colonna)+1)<8){
            id = (parseInt(riga)-1)+""+(parseInt(colonna)+1)
            if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            
            //cavallo
            if((parseInt(riga)+1)<8&&(parseInt(colonna)+2)<8){
            id = (parseInt(riga)+1)+""+(parseInt(colonna)+2)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }}
            
            if((parseInt(riga)+1)<8&&(parseInt(colonna)-2)>=0){
            id = (parseInt(riga)+1)+""+(parseInt(colonna)-2)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            if((parseInt(riga)+2)<8&&(parseInt(colonna)+1)<8){
            id = (parseInt(riga)+2)+""+(parseInt(colonna)+1)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            if((parseInt(riga)-2)>=0&&(parseInt(colonna)+1)<8){
            id = (parseInt(riga)-2)+""+(parseInt(colonna)+1)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            if((parseInt(riga)+2)<8&&(parseInt(colonna)-1)>=0){
            id = (parseInt(riga)+2)+""+(parseInt(colonna)-1)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }}
            
            if((parseInt(riga)-2)>=0&&(parseInt(colonna)-1)>=0){
            id = (parseInt(riga)-2)+""+(parseInt(colonna)-1)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            if((parseInt(riga)-1)>=0&&(parseInt(colonna)+2)<8){
            id = (parseInt(riga)-1)+""+(parseInt(colonna)+2)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            if((parseInt(riga)-1)>=0&&(parseInt(colonna)-2)>=0){
            id = (parseInt(riga)-1)+""+(parseInt(colonna)-2)
            if(document.getElementById(id).innerHTML=="H" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push(id);
            }
            }
            
            let temp=[]
            id = "vuoto";
            var cont = parseInt(riga)
            while(cont<7 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = cont+colonna;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            id = "vuoto";
            cont = parseInt(colonna)
            while(cont<7 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = riga+cont;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            id = "vuoto";
            cont = parseInt(riga)
            while(cont<7 && cont>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = cont+colonna;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            id = "vuoto";
            cont = parseInt(colonna)
            while(cont<7 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = riga+cont;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<7 && contc>=0 && contr<7 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc++;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            
            while(contc<8 && contc>0 && contr<8 && contr>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc--;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>0 && contr<7 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc--;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            temp=[]
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<7 && contc>0 && contr<8 && contr>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc++;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              mossescacco.push.apply(mossescacco, temp);
            }
            
}

function isscacco(player,riga,colonna){
    if(riga>7||riga<0||colonna<0||colonna>7){
        return false
    }
    riga = riga+""
    colonna=colonna+""
    var id = "vuoto"
    if((parseInt(riga)+1)<8&&(parseInt(colonna)+1)<8){
        id = (parseInt(riga)+1)+""+(parseInt(colonna)+1)
        if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
            return true
        }
        
    }
            
    if((parseInt(riga)-1)>=0&&(parseInt(colonna)-1)>=0){
        id = (parseInt(riga)-1)+""+(parseInt(colonna)-1)
        if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
            return true
        }
    }
    if((parseInt(riga)+1)<8&&(parseInt(colonna)-1)>=0){
        id = (parseInt(riga)+1)+""+(parseInt(colonna)-1)
        if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
            return true
        }
    }
    if((parseInt(riga)-1)>=0&&(parseInt(colonna)+1)<8){
        id = (parseInt(riga)-1)+""+(parseInt(colonna)+1)
        if(document.getElementById(id).innerHTML=="P" && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
            return true
        }
    }
            
            
            
            
            
            
            
    id = "vuoto"
    const direzioni = [
        [1, 1], [-1, -1], [1, -1], [-1, 1], // Diagonali
        [1, 0], [-1, 0], [0, -1], [0, 1],  // Verticali e orizzontali
    ];

    for (const [dr, dc] of direzioni) {
        const nuovaRiga = parseInt(riga) + dr;
        const nuovaColonna = parseInt(colonna) + dc;

        if (nuovaRiga >= 0 && nuovaRiga < 8 && nuovaColonna >= 0 && nuovaColonna < 8) {
            const id = nuovaRiga + "" + nuovaColonna;
            const cella = document.getElementById(id);

            if (
                cella.innerHTML === "K" &&
                cella.classList.contains(player === "n" ? "b" : "n")
            ) {
                return true;
            }
        }
    }
            let temp=[]
            id = "vuoto";
            var cont = parseInt(riga)
            while(cont<7 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = cont+colonna;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            id = "vuoto";
            cont = parseInt(colonna)
            while(cont<7 && cont>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont++;
              id = riga+cont;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            id = "vuoto";
            cont = parseInt(riga)
            while(cont<7 && cont>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = cont+colonna;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            id = "vuoto";
            cont = parseInt(colonna)
            while(cont<7 && cont>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              cont--;
              id = riga+cont;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="T") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<7 && contc>=0 && contr<7 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc++;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            
            while(contc<8 && contc>0 && contr<8 && contr>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc--;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<8 && contc>0 && contr<7 && contr>=0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr++;
              contc--;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
            temp=[]
            id = "vuoto";
            contr = parseInt(riga);
            contc = parseInt(colonna);
            while(contc<7 && contc>0 && contr<7 && contr>0 && (document.getElementById(id).innerHTML=="" || document.getElementById(id).innerHTML=="K")){
              contr--;
              contc++;
              id = contr+""+contc;
              temp.push(id);
            }
            if((document.getElementById(id).innerHTML=="Q"||document.getElementById(id).innerHTML=="J") && document.getElementById(id).classList.contains(player=="n"?"b":"n")){
              return true
            }
    
}
        
    
function controllapedone(player,riga,colonna){
  enpassant=[]
  colonna=parseInt(colonna)
  if(colonna+1<8 ){
    if(document.getElementById(riga+(colonna+1)).innerHTML=="P" && !document.getElementById(riga+(colonna+1)).classList.contains(player)){
      enpassant=[riga+(colonna-1),(parseInt(riga)+(player=="n"?-1:1))+""+colonna]
    }
      
  }
  if(colonna-1>=0){
    if(document.getElementById(riga+(colonna-1)).innerHTML=="P"){
      enpassant=[riga+(colonna-1),(parseInt(riga)+(player=="n"?-1:1))+""+colonna]
    }
  }
  

}  

function popup(vincitore, causa="scacco matto", vincita=true){
  popup = document.getElementById("popup")
  popup.style.display = "block"
  if(vincita){
    scritta = document.getElementById("vincita")
    giocatore = document.getElementById("vincitore")
    giocatore.innerHTML = vincitore
    causale = document.getElementById("causa")
    causale.innerHTML = causa
  }else{
    
    scritta = document.getElementById("patta")
    causale = document.getElementById("causa")
    causale.innerHTML = causa
  }
  scritta.style.display = "block"
}
