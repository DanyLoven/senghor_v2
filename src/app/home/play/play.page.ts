
import { Component } from '@angular/core';
import { GenerateCitationOfChallenge } from './generate-citation-of-challenge';
import { SoundEffect } from './sound-effect';
import { PiecesManagement } from './pieces-management';


@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage {


  validateList : any[] = [];


  jokerValidateWord:any[] = [];
  clickToChoiceW: boolean=false;
  wordSelect="";
  //counterForSelect=0;

  jokerList : any[] = [];
  jokerPosiShow=0;
  jokerUse=0;
  congrulation = "";
  correct=false;

  randomIndexMention=0;
  falseCitation:boolean=false;
  classGenCitOfChallenge=new GenerateCitationOfChallenge();
  listOfWords : any[] = [];
  listShuffle : any[] = [];
  theAuthorName="";
  theAuthorImage="";
  soundEffect=new SoundEffect();
  addPiece=new PiecesManagement();

  pieceStockage=0;
  nbrCoin=0;
  nextClick:boolean=false;

  jokerClass=['jokerListElement','validCitation','failSentence','wordChoiceToRight'];
  currentJokerClass="";
  // private _url:string="../assets/data_citations/citations.json";
  theMentions=['Fantastique!', 'Très Bien!', 'Super!', 'Excellent!', 'Extra!', 'Génial!', 'Remarquable!','Sensationnelle!','Bravo!','Parfait!','Formidable!'];



  constructor() {}

   // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
   ngOnInit(): void {
   this.currentJokerClass=this.jokerClass[0];
   this.startTestProperty();
   }

  startTestProperty(){
    this.nextClick=false;
    this.soundEffect.start();
    this.correct=false;
    this.jokerPosiShow=0;
    this.jokerList=[];
    this.classGenCitOfChallenge.takeSentence();
    this.listOfWords=this.classGenCitOfChallenge.listOfWords;
    this.listShuffle=this.classGenCitOfChallenge.listShuffle;
    this.theAuthorName=this.classGenCitOfChallenge.theAuthorName;
    this.theAuthorImage=this.classGenCitOfChallenge.theAuthorImage;
    this.jokerList.length=this.listOfWords.length;
    this.nbrCoin=this.jokerList.length;
    this.jokerUse=0;
    this.jokerValidateWord=[];
    this.currentJokerClass=this.jokerClass[0];
  }

  next(){
    this.nextClick=true;
    var b=this.jokerList.length;
    var addPieces=setInterval(()=>{
      b--;
      this.soundEffect.coin();
      this.pieceStockage++;
      this.nbrCoin--;
      if(b==0){
        clearInterval(addPieces);
        setTimeout(()=>{this.startTestProperty();},500);
       }
  },30);


  }

  successTestProperty(){
    this.soundEffect.success();
    this.currentJokerClass=this.jokerClass[1];
    this.correct=true;
  }

  failTestProperty(){
    this.soundEffect.fail();
    this.currentJokerClass=this.jokerClass[2];
    this.falseCitation=true;
  }

  selectWord(i: number){

    if(this.clickToChoiceW==true){
      this.wordRightPosition(i);
      //renitialiser le button choice
      this.choiceWordToRightPosition();
    }else{
      this.soundEffect.clickSelect();
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
    }

  }

  undoWord(i:number){
    //renitialiser le button choice si appuyé
    if(this.clickToChoiceW==true){
      this.choiceWordToRightPosition();
    }

    this.soundEffect.clickBack();
    var word=this.jokerList[i];
    if(this.falseCitation==true){
      this.currentJokerClass=this.jokerClass[0];
      this.falseCitation=false;
    }

    if(this.jokerList[i]!=null){
      this.jokerList[i]=null;
      this.listShuffle.push(word);
    }
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
    this.randomIndexMention=Math.floor(Math.random()*this.theMentions.length);
    return this.successTestProperty();;
  }

  oneRightPosition(){
    //prévenir le click sur le joker choice qand la liste alétoire est vide au moment de la soumission d'une citation inexacte
    if(this.listShuffle.length!=0){

      //renitialiser le button choice si appuyé
    if(this.clickToChoiceW==true){
      this.choiceWordToRightPosition();
    }
    var i = 0;
    while(i<this.listOfWords.length){
      //vérifier si le joker a déja été utilisé à cet index
      if(this.jokerValidateWord[i]!=i){
        this.soundEffect.joker();
        //stocker le mot exact qui doit être à cet index
        var word=this.listOfWords[i];
        //recupérer l'index où se trouve le mot dans la liste aléatoire
        var id=this.listShuffle.indexOf(word);
        //vérifier si le contenu de l'index en cours dans la liste de validation est null
        if(this.jokerList[i]==null){
          //ajouter le mot valide à cet index dans la liste de validation
          this.jokerList[i]=word;
          //supprimer le mot équivalent de la liste aléatoire
          this.listShuffle.splice(id,1);
        }
        //vérifier si le contenu de l'index en cours dans la liste de validation n'est pas null et contient un mot erroné
        else if(this.jokerList[i]!=null && this.jokerList[i]!=word){
          this.soundEffect.joker();
          //supprimer le mot équivalent de la liste aléatoire
          this.listShuffle.splice(id,1);
          //ajouter à la liste à aléatoire le mot qui est présent à l'index en cours dans la liste de validation
          this.listShuffle.push(this.jokerList[i]);
          //ajouter le mot valide à cet index dans la liste de validation
          this.jokerList[i]=word;

        }
        //enregistrer les index où le joker a déjà été utilisé
        this.jokerValidateWord[i]=i;
        //sommer l'utilisation des joker
        this.jokerUse+=1;
        if(this.listShuffle.length==0){
          return this.validSentence();
        }
        return;
      }
      i++;
    }

    }


  }

  choiceWordToRightPosition(){
    //prévenir le click sur le joker choice qand la liste alétoire est vide au moment de la soumission d'une citation inexacte
    if(this.listShuffle.length!=0){

      const btChoice = document.getElementsByClassName('btChoice');
    if(this.clickToChoiceW==false){
      (btChoice![0] as HTMLElement).style.cssText+= '--box-shadow:0 0 #555353; top: 0.5vh; opacity: 0.8';
      this.clickToChoiceW=true;
    }
    else{
      (btChoice![0] as HTMLElement).style.cssText+= '--box-shadow:0 0.5vh #555353; top: 0; opacity: 1';
      this.clickToChoiceW=false;
    }

    }
  }

  wordRightPosition(i: number){
    var word = this.listShuffle[i];
    var indexOfWord=this.listOfWords.indexOf(word);
    for(let a=0; a<this.jokerList.length;a++){
      //vérifier si le joker a déja été utilisé à cet index
      if(this.jokerValidateWord[indexOfWord]!=indexOfWord && this.jokerList[indexOfWord]==null){
        this.soundEffect.joker();
        //ajouter le mot à son bon index dans la liste de validation
        this.jokerList[indexOfWord]=word;
        //supprimer le mot de la liste aléatoire
        this.listShuffle.splice(i,1);
        //enregistrer les index où le joker a déjà été utilisé
        this.jokerValidateWord[indexOfWord]=indexOfWord;
        //sommer l'utilisation des joker
        this.jokerUse+=1;
      }
      else if(this.jokerValidateWord[indexOfWord]!=indexOfWord && this.jokerList[indexOfWord]!=null){
        this.soundEffect.joker();
        //supprimer le mot de la liste aléatoire
        this.listShuffle.splice(i,1);
        //renvoyer le mot dans la liste aléatoire
        this.listShuffle.push(this.jokerList[indexOfWord]);
        //ajouter le mot à son bon index dans la liste de validation
        this.jokerList[indexOfWord]=word;
        //enregistrer les index où le joker a déjà été utilisé
        this.jokerValidateWord[indexOfWord]=indexOfWord;
        //sommer l'utilisation des joker
        this.jokerUse+=1;
      }
      if(!this.listShuffle.length){
        this.validSentence();
      }
      return;
    }
  }



}

