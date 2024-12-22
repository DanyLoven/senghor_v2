
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ICitation } from './citations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @Input() valeur:number=0;
  listOfWords : any[] = [];
  listShuffle : any[] = [];
  validateList : any[] = [];
  listOfCitation : any[] = [];
  sentense : string='';
  jokerOneRight: number=0;
  wordSelect="";
  //counterForSelect=0;
  previousIndex: number=0;
  currentIndex: number=0;
  btJokerEnable="auto";
  b=0;
  jokerList : any[] = [];
  jokerPosiShow=0;
  jokerUse=0;
  congrulation = "";
  correct=false;
  theAuthorName="";
  theAuthorImage="";
  randomIndexMention=0;
  falseCitation:boolean=false;
  mo:boolean=false;
  jokerClass=['jokerListElement','validCitation','failSentence'];
  currentJokerClass="";
  private _url:string="../assets/data_citations/citations.json";
  theMentions=['Fantastique!', 'Très Bien!', 'Super!', 'Excellent!', 'Extra!', 'Génial!', 'Remarquable!','Sensationnelle!','Bravo!','Parfait!','Formidable!'];
  pathSound=
    {succesSound:"../assets/sound/success_sound.mp3",
    failSound:"../assets/sound/fail_sound.mp3",
    clickSelectSound:"../assets/sound/click_select.mp3",
    clickBackSound:"../assets/sound/click_back.wav",
    startSound:"../assets/sound/start.mp3"}
  ;
  //dragBox=document.getElementsByClassName("task");


  constructor(private http:HttpClient) {}

   theListOfCitations():Observable<ICitation[]>{
    return this.http.get<ICitation[]>(this._url)
   }
   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnInit(): void {
    this.theListOfCitations().subscribe(data=>(this.listOfCitation=data));
    this.currentJokerClass=this.jokerClass[0];
   }

   soundEffect(path:string){
    var audio= new Audio();
    audio.src=path;
    audio.load();
    audio.play();
  }


  startTestProperty(){
    this.soundEffect(this.pathSound.startSound);
    this.correct=false;
    this.jokerPosiShow=0;
    this.jokerList=[];
    this.jokerList.length=this.listOfWords.length;
    //this.jokerList=[];
    this.jokerUse=0;
    this.jokerOneRight=0;
    this.currentJokerClass=this.jokerClass[0];
   /* const list=document.getElementsByClassName('jokerListElement');

    for(let j=0; j<this.listOfWords.length;j++){
      (list![j] as  HTMLElement).style.cssText += 'background-color: black; color: white; box-shadow: 0 0 10px #ffd534; margin-bottom=30px';
      (list![j] as  HTMLElement).style.pointerEvents='auto';
    }*/


  }


  successTestProperty(){

    this.soundEffect(this.pathSound.succesSound);
    this.currentJokerClass=this.jokerClass[1];
   /* const just=document.getElementsByClassName('jokerListElement');

    //this.isDraggable="false"
    for(let j=0; j<this.jokerList.length;j++){
      (just![j] as  HTMLElement).style.cssText += 'background-color: black; color: #7dc734; box-shadow: 0 0 10px #7dc734; margin-bottom=0';
      (just![j] as  HTMLElement).style.pointerEvents='none';
    };*/
    this.correct=true;
  }

  failTestProperty(){
    this.soundEffect(this.pathSound.failSound);
    this.currentJokerClass=this.jokerClass[2];
    this.falseCitation=true;
    /*const fail=document.getElementsByClassName('jokerListElement');
    for(let j=0; j<this.jokerList.length;j++){
      (fail![j] as  HTMLElement).style.cssText += 'background-color: black; color: #fc100d;box-shadow: 0 0 10px #fc100d';
    }*/
   /* window.setTimeout(()=>{
      for(let j=0; j<this.jokerList.length;j++){
        (fail![j] as  HTMLElement).style.cssText += 'background-color: black; color: white;box-shadow: 0 0 10px #ffd534';
      }
      this.currentJokerClass=this.jokerClass[0];
    },450);
    return;*/
  }

  takeSentence(){
    var sLenght= this.listOfCitation.length,indexRandom;
    this.randomIndexMention=Math.floor(Math.random()*this.theMentions.length);
    indexRandom=Math.floor(Math.random()*sLenght);
    this.sentense= this.listOfCitation[indexRandom].citation.trim();
    this.theAuthorName=this.listOfCitation[indexRandom].author.trim();
    this.theAuthorImage=this.listOfCitation[indexRandom].authorImage.trim();
    this.startTestProperty();
    this.catchWords();
  }



  theShuffle(list:any[]){
    //const just=document.getElementsByClassName('task');
    var lLenght= list.length, element, indexRandom;
    while(0 !== lLenght){
      indexRandom=Math.floor(Math.random()*lLenght);
      lLenght--;
      element = list[lLenght];
      list[lLenght] = list[indexRandom];
      list[indexRandom] = element;
    }
    this.jokerList.length=this.listOfWords.length;
    //(just![] as  HTMLElement).style.pointerEvents='none';
    return list;
  }

  catchWords(){
    var word=""
    var i =0;
    this.listOfWords=[]
    /*for (this.sentense[i]!='\0';i++){
      while (this.sentense[i]!="") {
        word+=this.sentense[i];
      }
      this.listOfWords.push(word);
      word=""
      if
    }*/
    console.log(this.sentense.length);

    while (i<this.sentense.length) {
      if(this.sentense[i]!=" "){
        word+=this.sentense[i];
      }
      if(this.sentense[i]==" "){
        /*this.listOfWords.push(word);
        word="";*/
        this.listOfWords.push(word);
        word=""
      }
      if(i==this.sentense.length-1){
        /*this.listOfWords.push(word);
        word="";*/
        this.listOfWords.push(word);
        this.sentense="";

      }
      i++;
    }

    this.listShuffle = this.listOfWords.slice();
    this.listShuffle= this.theShuffle(this.listShuffle);

    console.log(this.listOfWords);
    console.log(this.listShuffle);
    //this.listOfWords=[]

  }

  selectWord(i: number){
    this.soundEffect(this.pathSound.clickSelectSound);
    const wordSelectL = document.getElementsByClassName('task');
    for(let a=0; a<this.jokerList.length;a++){
      if(this.jokerList[a]==null){
        this.jokerList[a]=this.listShuffle[i];
        this.listShuffle.splice(i,1);
        if(!this.listShuffle.length){
          this.validSentence();
        }
        return;
      }
    }
   /* if(this.select==false){
      this.currentIndex=i;
      for(let j=0; j<this.listShuffle.length;j++){
        (wordSelectL![j] as  HTMLElement).style.cssText += 'background-color: #ffd534; color: black;box-shadow: 0 4px #9c6404;opacity:1';
      }

      (wordSelectL![this.currentIndex] as HTMLElement).style.cssText+= 'box-shadow:0 0 #9c6404; opacity:0.8';
      this.select=true;
      this.wordSelect= this.listShuffle[this.currentIndex];
      return this.wordSelect;
    }
    else{

      if(this.currentIndex==i){
        (wordSelectL![this.currentIndex] as HTMLElement).style.cssText+= 'box-shadow:0 4px #9c6404; opacity:1';
        this.select=false;
        return null;
      }
      else{
        this.currentIndex=i;
        for(let j=0; j<this.listShuffle.length;j++){
          (wordSelectL![j] as  HTMLElement).style.cssText += 'background-color: #ffd534; color: black;box-shadow: 0 4px #9c6404;opacity:1';
        }

        (wordSelectL![this.currentIndex] as HTMLElement).style.cssText+= 'box-shadow:0 0 #9c6404; opacity:0.8';
        this.select=true;
        this.wordSelect= this.listShuffle[this.currentIndex];
        return this.wordSelect;
      }
    }*/
  }

  undoWord(i:number){
    this.soundEffect(this.pathSound.clickBackSound);
    var word=this.jokerList[i];
    if(this.falseCitation==true){
      this.currentJokerClass=this.jokerClass[0];
      this.falseCitation=false;
    }

    if(this.jokerList[i]!=null){
      this.jokerList[i]=null;
      this.listShuffle.push(word);
    }
   /* const wordSelectL = document.getElementsByClassName('task');
    var word=this.jokerList[i];
    if(this.select==true && word==null){
      this.jokerList[i]=this.wordSelect;
      this.listShuffle.splice(this.currentIndex,1);
      this.select=false;
      for(let j=0; j<this.listShuffle.length;j++){
        (wordSelectL![j] as  HTMLElement).style.cssText += 'background-color: #ffd534; color: black;box-shadow: 0 4px #9c6404;opacity:1';
      }
    }
    else if(this.select==true && word!=null){
      this.jokerList.splice(i,1);
      this.jokerList.splice(i,0,this.wordSelect);
      this.jokerList[i]=this.wordSelect;
      this.listShuffle.splice(this.currentIndex,1);
      this.listShuffle.push(word);
      this.select=false;
      for(let j=0; j<this.listShuffle.length;j++){
          (wordSelectL![j] as  HTMLElement).style.cssText += 'background-color: #ffd534; color: black;box-shadow: 0 4px #9c6404;opacity:1';
        }
    }
    else if(this.select==false && word!=null){
      this.jokerList[i]=null;
      this.listShuffle.push(word);
      this.select=false;
      for(let j=0; j<this.listShuffle.length;j++){
        (wordSelectL![j] as  HTMLElement).style.cssText += 'background-color: #ffd534; color: black;box-shadow: 0 4px #9c6404;opacity:1';
      }
    }*/
  }

  mention(){

    if(this.jokerUse>=1 && this.listOfWords.length<=8){
      return  this.congrulation="";
    }
    else if(this.jokerUse>=2 && this.listOfWords.length<=11){
      return  this.congrulation="";
    }
    else if(this.jokerUse>=3 && this.listOfWords.length<=14){
      return  this.congrulation="";
    }
    else{
     return this.congrulation=this.theMentions[this.randomIndexMention];
    }
   }

  validSentence(){
    var i= this.listOfWords.length
    while(i--){
      if(this.listOfWords[i]!==this.jokerList[i]){
        return this.failTestProperty();
      }
    }
    return this.successTestProperty();;
  }

  test(){
    this.jokerOneRight
  }

  oneRightPosition(){
    var i = 0;
    this.jokerUse+=1;
    while(i<this.listOfWords.length){
      if(this.jokerOneRight<this.listOfWords.length){
        var word=this.listOfWords[this.jokerOneRight];
        this.listShuffle.splice(this.listShuffle.indexOf(word),1);
        this.jokerList[this.jokerOneRight]=word;
        this.jokerOneRight+=1;
        return;
      }
      i++;
    }

  }


  allRightPosition(){
    var i = 0;
    this.jokerUse+=1;
    while(i<this.listOfWords.length){
      if(this.listShuffle[i]==this.listOfWords[i]){
        this.jokerList[i] = this.listOfWords[i].slice();
      }
      else{
        this.jokerList[i]=null;
      }
      i++;
    }

  }

  theDrag(e:DragEvent){

    if(this.correct == false){

      e.dataTransfer!.setData("text/plain",this.listShuffle[Number((e.target as HTMLElement).id)]);
   console.log(this.listShuffle[Number((e.target as HTMLElement).id)]);
   //(e.target as HTMLElement).style.cssText += 'cursor: move;background-color: #ffd17b; opacity:1';
   this.previousIndex=Number((e.target as HTMLElement).id);
   this.currentIndex=this.previousIndex;


   console.log(this.listShuffle);
    }
    else{
      return;
    }

  }

  allowDrop(e:DragEvent){
    if(this.correct == false){
      e.preventDefault();

    if((e.target as HTMLElement).id!="tasks"){
      this.b=Number((e.target as HTMLElement).id);
      this.currentIndex=this.b;
      //console.log(this.currentIndex);

    }
    else{
      this.currentIndex=this.b
    }

    }
    else{
      return;
    }

  }

  theDrop(e:DragEvent){
    if(this.correct == false){
      e.preventDefault();
    //let wordAtIndex=this.listShuffle[this.currentIndex];
    const data=e.dataTransfer?.getData("text/plain");
      this.listShuffle.splice(this.previousIndex,1);
      this.listShuffle.splice(this.currentIndex,0,data);

    console.log(this.currentIndex);
    //(e.target as HTMLElement).parentElement?.insertBefore((e.target as HTMLElement),(e.target as HTMLElement).parentElement);
    }
    else{
      return;
    }

   }

   /*touchStart(e:TouchEvent){
   // this.el!=e.target;
    if((e.target as HTMLElement).getAttribute('draggable')=='true'){
     // this.avail='available';
     (e.target as HTMLElement).click();

    }
    else{
      e.preventDefault();
    }

   }


   touchMove(e:TouchEvent){
    var touchLocation=e.targetTouches[0];
        (e.target as HTMLElement).style.left=touchLocation.pageX + 'px';
        (e.target as HTMLElement).style.top=touchLocation.pageY + 'px';*/
       /* if(this.avail=='available'){
          (e.target as HTMLElement).style.position="absolute";
          (e.target as HTMLElement).style.left=e.touches[0].pageX + 'px';
          (e.target as HTMLElement).style.top=e.touches[0].pageY + 'px';
        }
        else{
          e.preventDefault();
        }

   }*/

   /*touchEnd(e:TouchEvent){
    console.log('end'+e);
   }

   test(){
    (this.dragBox[this.previousIndex] as HTMLElement).addEventListener('click',()=>{
      console.log("clicked");

    })
   }*/

}

