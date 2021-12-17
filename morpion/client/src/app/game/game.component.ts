import { Component, ElementRef, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';

import io from 'socket.io-client';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor(public game: Gamelogic, private elem: ElementRef) { }

  positionHold : Array<number> = [];
  win: boolean=false;
  subfieldSocket:any;
  socket: any;
  id: number=-1;
  isTurn: boolean = false;
  stateGame: string = 'Waiting for an opponent...';
  playerOne: any;
  playerTwo: any;
  currentPlayer : any;
  information: any;
  element : any;
  displayPlayer: boolean = false;

  ngOnInit(): void {
    this.socket = io("http://gamecenter.leiven.fr:4000");

    this.socket.on("isFull", (bool:any)=>{
      if(!bool){
        this.startGame(this.id);
        this.isTurn = false;
    }else
        this.setTitle('This room is full !');
    });
  }

  clearFieldVisual(): void{
    for(let i=0 ; i < 9 ; i++){
      this.element = document.querySelector('.position'+i);
      if(this.element?.classList.contains('player-one')){

        this.element?.classList.remove('player-one');

      }
      if(this.element?.classList.contains('player-two')){
        this.element?.classList.remove('player-two');
      }

    }
  }

  startGame (idRoom: number): void{
    this.id = idRoom;
    this.game.gameStart();
    this.setTitle("Waiting for an opponent...");

    this.socket.emit("joinRoom", idRoom);
    this.socket.on("position", (data: any)=>{
      this.clickSubfieldSocket(data);
    });

    this.socket.on("onStart", (Vrai:any) =>{
      this.setDisplayPlayer(true).then(()=>{
        this.setTurnHTML();
      });
    });

    this.socket.on("hasLeft", (id:any)=>{
      if(id == this.id){
        this.setTitle("Opponent left... Waiting for an opponent...");
        this.isTurn = false;
        this.game.gameStart();
        this.clearFieldVisual();
      }
    });

    this.socket.on("isTurn",(_turn: any) => {
      if(_turn == true){
      this.isTurn = true;
      this.turn();
      }else{
        this.isTurn = false;
        this.turn();
      }
    });
  }

  async setDisplayPlayer(bool:boolean): Promise<void>{
    this.displayPlayer = bool;
  };

  async setTurnHTML(){
    if(this.isTurn == true){
    document.querySelector('.playerOne')!.innerHTML = 'You';
    document.querySelector('.playerTwo')!.innerHTML = 'Opponent';
  }

    else if(this.isTurn == false){
      document.querySelector('.playerOne')!.innerHTML = 'Opponent';
      document.querySelector('.playerTwo')!.innerHTML = 'You';
    }
  }

  turn(): void{
    if(this.isTurn == true)
        this.setTitle("Your turn !");
    else
        this.setTitle("Opponent's turn !");
  }

  async checkJoinRoom(bool:boolean): Promise<boolean>{
    return bool;
  }

  onSubmit(idRoom: NgForm): void{
    if(idRoom.value.idRoom >= 1){
      this.id = idRoom.value.idRoom;
      this.socket.emit("isFull",true);
  }
};

  setTitle(msg : string ): void{
    this.currentPlayer =  msg;
    this.information = document.querySelector('.current-status');
    this.information!.innerHTML = this.currentPlayer;
  }

  leave() : void{
    this.socket.emit("leave",(this.id));
    this.game.gameStatus = 0;
    this.id = -1;
    this.setTitle('Start the game by clicking the button below');
  }

  async clickSubfieldSocket(subfield: any):Promise<void>{
    if(this.game.gameStatus == 1 && !this.isTurn){
      this.isTurn = true;
      this.turn();
      const position = subfield.position;
      const elements = document.querySelector('.position'+position);
      if(position != this.positionHold[0]){
        this.game.setField(position, this.game.currentTurn);
        const color = this.game.getPlayerColorClass();
        elements!.classList.add(color);
        await this.game.checkGameEndWinner().then((end: boolean) => {
          this.win = end;
            if(this.game.gameStatus === 0 && end) {
              if(this.isTurn == true){
              this.setTitle('You lost');
              this.socket.emit("leaveRoom", this.id);
              this.id = -1;
            }
            }
          });
          if(!this.win){
        await this.game.checkGameEndFull().then((end: boolean) => {
            if(this.game.gameStatus === 0 && end) {
              this.setTitle('No winner, draw');
              this.socket.emit("leaveRoom", this.id);
              this.id = -1;
            }
          });
        }
        this.game.changePlayer();
      }
      try{
        this.positionHold.pop();
        this.positionHold = [position];
      }
      catch (e){
        // Do nothing
      }

    }
  }

  async clickSubfield(subfield: any):Promise<void>{
    if(this.game.gameStatus == 1 && this.isTurn){
      const position = subfield.currentTarget.getAttribute('position');
      if(this.game.gamefield[position] == 0){
      if(position != this.positionHold[0]){
        this.subfieldSocket={
          'position': subfield.currentTarget.getAttribute('position'),
          'currentTarget': subfield.currentTarget,
        }
        this.socket.emit("move", this.subfieldSocket,this.id);
        this.isTurn = false;
        this.turn();
        this.game.setField(position, this.game.currentTurn);
        const color = this.game.getPlayerColorClass();
        subfield.currentTarget.classList.add(color);

        await this.game.checkGameEndWinner().then((end: boolean) => {
          this.win = end;
            if(this.game.gameStatus === 0 && end) {
              if(this.isTurn == false){
              this.setTitle('You won ! ');
              this.socket.emit("leaveRoom", this.id);
              this.id = -1;
            }
            }
          });
          if(!this.win){
        await this.game.checkGameEndFull().then((end: boolean) => {
            if(this.game.gameStatus === 0 && end) {
              this.setTitle('No winner, draw');
              this.socket.emit("leaveRoom", this.id);
              this.id = -1;

            }
          });
        }


        this.game.changePlayer();
      }
      try{
        this.positionHold.pop();
        this.positionHold = [position];
      }
      catch (e){
        // Do nothing
      }

    }
  }
  }
}
