import * as citations from './citations.json'
export class GenerateCitationOfChallenge {
  listOfWords : any[] = [];
  listShuffle : any[] = [];
  sentense : string='';
  randomIndexMention=0;
  listOfCitation : any[]=(citations as any).default;
  theAuthorName="";
  theAuthorImage="";


  takeSentence(){

    var sLenght= this.listOfCitation.length,indexRandom;

    indexRandom=Math.floor(Math.random()*sLenght);
    this.sentense= this.listOfCitation[indexRandom].citation.trim();
    this.theAuthorName=this.listOfCitation[indexRandom].author.trim();
    this.theAuthorImage=this.listOfCitation[indexRandom].authorImage.trim();
    //this.startTestProperty();
    this.catchWords();
  }

  theShuffle(list:any[]){
    var lLenght= list.length, element, indexRandom;
    while(0 !== lLenght){
      indexRandom=Math.floor(Math.random()*lLenght);
      lLenght--;
      element = list[lLenght];
      list[lLenght] = list[indexRandom];
      list[indexRandom] = element;
    }
    //this.jokerList.length=this.listOfWords.length;
    return list;
  }

  catchWords(){
    var word=""
    var i =0;
    this.listOfWords=[]
    console.log(this.sentense.length);

    while (i<this.sentense.length) {
      if(this.sentense[i]!=" "){
        word+=this.sentense[i];
      }
      if(this.sentense[i]==" "){
        this.listOfWords.push(word);
        word=""
      }
      if(i==this.sentense.length-1){
        this.listOfWords.push(word);
        this.sentense="";

      }
      i++;
    }

    this.listShuffle = this.listOfWords.slice();
    this.listShuffle= this.theShuffle(this.listShuffle);

    console.log(this.listOfWords);
    console.log(this.listShuffle);

  }



}
