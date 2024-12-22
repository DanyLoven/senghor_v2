
export class SoundEffect {
  pathSound=
  {succesSound:"../assets/sound/success_sound.mp3",
  failSound:"../assets/sound/fail_sound.mp3",
  clickSelectSound:"../assets/sound/click_select.mp3",
  clickBackSound:"../assets/sound/click_back.mp3",
  startSound:"../assets/sound/start.mp3",
  coinSound:"../assets/sound/coin_sound.wav",
  jokerSound:"../assets/sound/joker_sound.mp3"};

  soundEffect(path:string){
    var audio= new Audio();
    audio.src=path;
    audio.load();
    audio.play();
  }

  start=()=>this.soundEffect(this.pathSound.startSound);
  success=()=>this.soundEffect(this.pathSound.succesSound);
  fail=()=>this.soundEffect(this.pathSound.failSound);
  clickSelect=()=>this.soundEffect(this.pathSound.clickSelectSound);
  clickBack=()=>this.soundEffect(this.pathSound.clickBackSound);
  coin=()=>this.soundEffect(this.pathSound.coinSound);
  joker=()=>this.soundEffect(this.pathSound.jokerSound);
}
