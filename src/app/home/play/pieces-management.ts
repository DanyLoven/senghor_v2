
export class PiecesManagement {

  getPiecesNormalMode(pieceStockage:number,listLenght:number){
    var b=listLenght;
    var addPiece=setInterval(()=>{
      b--;
      pieceStockage++;
      if(b===0){
        clearInterval(addPiece);
       }
  },30);

  }


  getPiecesSurvivalMode(){

  }
}
