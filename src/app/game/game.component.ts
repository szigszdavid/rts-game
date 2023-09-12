import { Component, Renderer2, Input, OnInit, ElementRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  workers = [
    {
      name: 'worker1',
      top: '10vh',
      left: '0vw',
      mine: '',
      currentPlace: 'start',
      time: 0,
      gold: 0,
    },
    {
      name: 'worker2',
      top: '12vh',
      left: '0vw',
      mine: '',
      currentPlace: 'start',
      time: 0,
      gold: 0,
    },
    {
      name: 'worker3',
      top: '14vh',
      left: '0vw',
      mine: '',
      currentPlace: 'start',
      time: 0,
      gold: 0,
    },
    {
      name: 'worker4',
      top: '16vh',
      left: '0vw',
      mine: '',
      currentPlace: 'start',
      time: 0,
      gold: 0,
    },
    {
      name: 'worker5',
      top: '18vh',
      left: '0vw',
      mine: '',
      currentPlace: 'start',
      time: 0,
      gold: 0,
    },
  ];
  mines = [
    {
      name: 'Mine1',
      top: Math.floor(Math.random() * 80) + 10,
      left: Math.floor(Math.random() * 89) + 1,
    },
    {
      name: 'Mine2',
      top: Math.floor(Math.random() * 80) + 10,
      left: Math.floor(Math.random() * 89) + 1,
    },
    {
      name: 'Mine3',
      top: Math.floor(Math.random() * 80) + 10,
      left: Math.floor(Math.random() * 89) + 1,
    },
    {
      name: 'Mine4',
      top: Math.floor(Math.random() * 80) + 10,
      left: Math.floor(Math.random() * 89) + 1,
    },
    {
      name: 'Mine5',
      top: Math.floor(Math.random() * 80) + 10,
      left: Math.floor(Math.random() * 89) + 1,
    },
  ];
  images = {
    enemy: "assets/enemy.PNG",
    worker: "assets/worker.PNG",
    warrior: "assets/warrior.PNG",
    mine: "assets/mine.PNG",
    start: "assets/start.PNG",
    barrack: "assets/barrack.PNG"
  }
  enemy = {
    position: 'absolute',
    healthPoints: 150,
    top: Math.floor(Math.random() * 80) + 10,
    left: Math.floor(Math.random() * 89) + 1,
  };
  warriorNumber = 0;
  selectedWorker = '';
  selectedMine = '';
  @Input() username: string = '';
  gameOver = false;
  intervalOn = true;
  interval: any = undefined;
  deposit = 0;
  barracks: { time: number, top: string, left: string }[] = []
  dialogVisible: boolean = false
  warriors: { time: number, name: string, top: string, left: string, travellingTime: number, currentPlace: string }[] = []
  currentBarrackIndex: number | undefined = undefined
  time: number = 0
  clock: string = "00:00"

  ngOnInit() {
    this.startTimer()
  }

  checkGameOver() {
    if(this.enemy.healthPoints === 0) {
      this.gameOver = true
      clearInterval(this.interval)
    }
  }

  constructor(private renderer: Renderer2) {}

  gameMovement(index: number) {
    
    if (this.workers != undefined) {
      if (this.workers[index].mine !== '') {

          if (this.workers[index].time !== 0) {
            this.workers[index].time--;
          }
  
          else {
  
            if (this.workers[index].currentPlace === 'mine') {
              
              if(this.workers[index].gold !== 10)
                this.workers[index].gold++;
              
              else {
                const selectedworkerNode = document.querySelector(`#${this.workers[index].name}`);
      
                this.renderer.setStyle(selectedworkerNode, 'position', 'absolute');
                this.renderer.setStyle(selectedworkerNode, 'left', this.workers[index].left);
                this.renderer.setStyle(selectedworkerNode, 'top', this.workers[index].top);
      
                this.workers[index].time = 5
                this.workers[index].currentPlace = 'start'
              }
    
            } 
  
            else if(this.workers[index].currentPlace === 'start') {
  
              if(this.workers[index].gold !== 0) {
                this.workers[index].gold = 0;
                this.deposit += 10
              }
                
  
              else {
                const selectedworkerNode = document.querySelector(`#${this.workers[index].name}`);
            
                if (selectedworkerNode) {
                  const currentMine = this.mines.find((mine: any) => mine.name === this.workers[index].mine)
                  
                  this.renderer.setStyle(selectedworkerNode, 'z-index', 1);
                  this.renderer.setStyle(selectedworkerNode, 'position', 'absolute');
                  this.renderer.setStyle(selectedworkerNode, 'left', `${currentMine!.left}vw`);
                  this.renderer.setStyle(selectedworkerNode, 'top', `${currentMine!.top}vh`);
                }
                
                this.workers[index].time = 5
                this.workers[index].currentPlace = 'mine'
              }
            }
          } 
        }
        
      }
  }

  handleBarrackOnClick(index: number, barrack: { time: number, top: string, left: string }) {
    if(barrack.time === 0) {
      this.dialogVisible = true
      this.currentBarrackIndex = index
    }
  }

  handleDialogClose() {
    this.dialogVisible = false
    this.currentBarrackIndex = undefined
  }

  handleCreateWarriorsRequest(warriorNumber: number) {
    
    for (let index = 0; index < warriorNumber; index++) {
      this.warriors.push({
        time: 10,
        name: 'warrior' + (this.warriors.length + 1),
        top: this.barracks[this.currentBarrackIndex!].top + 'vh',
        left: this.barracks[this.currentBarrackIndex!].left + 'vw',
        travellingTime: 5,
        currentPlace: 'barrack'
      }) 
    }

    this.handleDialogClose()
  }

  onRightClick(event: MouseEvent) {

    event.preventDefault();

    for (let index = 0; index < this.mines.length; index++) {
        if(this.mines[index].left * window.innerWidth / 100 <= event.clientX && event.clientX <= (this.mines[index].left + 10) * window.innerWidth / 100
        && this.mines[index].top * window.innerHeight / 100 <= event.clientY && event.clientY <= (this.mines[index].top + 10) * window.innerHeight / 100) {
          return
        }
    }

    if(this.enemy.left * window.innerWidth / 100 <= event.clientX && event.clientX <= (this.enemy.left + 10) * window.innerWidth / 100
        && this.enemy.top * window.innerHeight / 100 <= event.clientY && event.clientY <= (this.enemy.top + 10) * window.innerHeight / 100) {
          return
        }

    const selectedworkerNode = document.querySelector(`#${this.selectedWorker}`);

    if(this.selectedWorker.includes("worker")) {
      const currentWorker = this.workers.find((worker) => worker.name === this.selectedWorker)

      if (currentWorker != undefined) {
        currentWorker.time = 5;
        currentWorker.currentPlace = 'field';
        currentWorker.left = (event.clientX / window.innerWidth) * 100 + 'vw'
        currentWorker.top = (event.clientY / window.innerHeight) * 100 + 'vh'
      }
    }

    else {
      const currentWarrior = this.warriors.find((warrior) => warrior.name === this.selectedWorker)

      if (currentWarrior != undefined) {
        currentWarrior.travellingTime = 5;
        currentWarrior.currentPlace = 'field';
        currentWarrior.left = (event.clientX / window.innerWidth) * 100 + 'vw'
        currentWarrior.top = (event.clientY / window.innerHeight) * 100 + 'vh'
      }
    }

    

    this.renderer.setStyle(selectedworkerNode, 'z-index', 1);
    this.renderer.setStyle(selectedworkerNode, 'position', 'absolute');
    this.renderer.setStyle(selectedworkerNode, 'left', `${event.clientX}px`);
    this.renderer.setStyle(selectedworkerNode, 'top', `${event.clientY}px`);
    
  }

  handleBuildBarrack() {

    this.deposit -= 200

    this.barracks.push({
      top: this.workers.find(worker => worker.name === this.selectedWorker)!.top,
      left: this.workers.find(worker => worker.name === this.selectedWorker)!.left,
      time: 10
    })

    const newBarrack = this.renderer.createElement('div');
    this.renderer.addClass(newBarrack, 'barrack');
  }

  handleStopTimer() {
    clearInterval(this.interval);
    this.intervalOn = false;
  }

  startTimer() {
    this.interval = setInterval(async () => {
      for (let index = 0; index < 5; index++) {
        await this.gameMovement(index);
      }

      for (let index = 0; index < this.barracks.length; index++) {
        if(this.barracks[index].time > 0) {
          this.barracks[index].time--
        }
      }

      for (let index = 0; index < this.warriors.length; index++) {
        if(this.warriors[index].time > 0) {
          this.warriors[index].time--
        }

        if(this.warriors[index].travellingTime === 0 && this.warriors[index].currentPlace === 'enemy') {
          this.enemy.healthPoints -= 5
        }

        else {
          this.warriors[index].travellingTime--
        }
        
        this.checkGameOver()
      }

      this.time++
      this.clock = (Math.floor(this.time / 60) < 10 ? "0" + Math.floor(this.time / 60) : Math.floor(this.time / 60))  + ":" + (this.time % 60 < 10 ? "0" + this.time % 60 : this.time % 60) 
    }, 1000);
  }

  hadleResumeTimer() {
    this.startTimer()
  }

  handeSelectworker(worker: string) {
    this.selectedWorker = worker;
  }

  handeSelectMine(mine: string) {
    this.selectedMine = mine;
  }

  onMineRightClick(event: Event, selectedMine: string) {
    event.preventDefault();

    if(this.selectedWorker !== '') {
    
      const selectedworkerNode = document.querySelector(`#${this.selectedWorker}`);
      const currentWorker = this.workers.find((worker) => worker.name === this.selectedWorker)

      if (currentWorker != undefined) {
        currentWorker.mine = selectedMine;
        currentWorker.time = 5;
        currentWorker.currentPlace = 'mine';
      }

      if (selectedworkerNode) {
        const currentMine = this.mines.find((mine: any) => mine.name === selectedMine)
        
        this.renderer.setStyle(selectedworkerNode, 'z-index', 1);
        this.renderer.setStyle(selectedworkerNode, 'position', 'absolute');
        this.renderer.setStyle(selectedworkerNode, 'left', `${currentMine!.left}vw`);
        this.renderer.setStyle(selectedworkerNode, 'top', `${currentMine!.top}vh`);
      }
    }
  }

  onEnemyRightClick(event: Event) {
    event?.preventDefault()

    if(this.selectedWorker !== '') {
    
      const selectedWarriorNode = document.querySelector(`#${this.selectedWorker}`);
      const currentWarriot = this.warriors.find((warrior) => warrior.name === this.selectedWorker)

      if(currentWarriot != undefined) {
        currentWarriot.currentPlace = "enemy"
        currentWarriot.travellingTime = 5
        currentWarriot.left = this.enemy.left.toString()
        currentWarriot.top = this.enemy.top.toString()
      }

      if (selectedWarriorNode) {
        
        this.renderer.setStyle(selectedWarriorNode, 'z-index', 1);
        this.renderer.setStyle(selectedWarriorNode, 'position', 'absolute');
        this.renderer.setStyle(selectedWarriorNode, 'left', `${this.enemy!.left}vw`);
        this.renderer.setStyle(selectedWarriorNode, 'top', `${this.enemy!.top}vh`);
      }
    }
  }

  handleGameOverDialogClose() {
    this.gameOver = false
  }
}
