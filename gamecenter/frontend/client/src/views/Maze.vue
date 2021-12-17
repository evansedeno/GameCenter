<template>
  <div id="play-modal" class="modal">
    <div class="modal__contentPlay">
      <div class="form">
        <div class="canvas">
          <canvas id="mainForm"
            >Votre navigateur ne supporte pas l'application...</canvas
          >
        </div>
      </div>
    </div>
    <div class="opt">
      <div id="contentPlay">
        <div id="totalChests"></div>
        <hr />
        <div class="field" id="temps">
          <div>
            <strong><i class="stopwatch icon"></i> Temps restant</strong>
          </div>
          <div><span id="counter"> </span></div>
        </div>
        <div class="adversaire">
			<span>Le créateur : {{username}}</span>
        </div>
      </div>

      <div class="controls">
        <div id="up" class="up">&#8679;</div>
        <div id="right" class="right">&#8680;</div>
        <div id="down" class="down">&#8681;</div>
        <div id="left" class="left">&#8678;</div>
      </div>
      <div id="quiter2">
        <input
          id="quitterPartie"
          @click="retour"
          type="button"
          value="Quitter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Background from "@/components/Background.vue";
import io from "../assets/socket.io.js";
import Qs from "qs";

import {
  startTimer,
  convertMinutesSecondsToSeconds,
} from "../js/utils/tools.js";
import { monTimer } from "../js/utils/tools.js";

export default {
  name: "Background",
  props: {
    msg: String,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/base.scss";',
      },
    },
  },
  data() {
    return {
      username: '',
    };
  },
  mounted() {
    //setTimeout(function(){ location.reload()}, 1000);

    let player;
    let ctx;
    let canvas;
    let maze;

    const userList = document.getElementById("users");

    const socket = io("http://gamecenter.leiven.fr:3000");

    const { username, partie, token } = Qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    socket.emit("mazeGenerate", { username, partie, token });



    socket.on("maze", (data) => {
      // Création du canvas et du joueur
      canvas = document.getElementById("mainForm");
      if (canvas) {
        ctx = canvas.getContext("2d");
      }
      player = new Player();
      console.log(data.users);
	  this.username = data.users[0].user.username;
      // Savoir s'il y a déjà un labyrinthe existant
      let mazeGenerated = [];
      // Le labyrinthe
      mazeGenerated = data.labyrinthe.positions;
      // Les coffres du labyrinthe
      mazeGenerated.push(data.labyrinthe.coffres.positions);
      // La clé du labyrinthe
      mazeGenerated.push(data.labyrinthe.cle.position);

      // Nombre de colonnes
      let col = mazeGenerated.length - 2;
      // Nombre de lignes
      let row = mazeGenerated.length - 2;
      // Taille des cellules
      let size = 100;
      // Nombre de coffres
      let chest = mazeGenerated[mazeGenerated.length - 2].length;
      // Durée en minutes du minuteur de la partie
      let minutesNumber;
      if (data.difficulte === 1) {
        minutesNumber = 2;
      } else if (data.difficulte === 2) {
        minutesNumber = 3;
      } else if (data.difficulte === 3) {
        minutesNumber = 4;
      }

      console.log(minutesNumber);
      maze = new Maze(col, row, size, chest, minutesNumber, mazeGenerated);
    });

    let checkMenu = document.getElementById("menuFacile");
    if (checkMenu) {
      checkMenu.checked = true;
    }

    // document.getElementById("quitterPartie").onclick = function() {
    // 	alert("YES quitter");
    // };

    // Les événements
    document.addEventListener("keydown", onKeyDown);

    let generateMaze = document.getElementById("generate");
    if (generateMaze) {
      document.getElementById("generate").addEventListener("click", onClick);
    }

    let onControlClickUp = document.getElementById("up");
    if (onControlClickUp) {
      onControlClickUp.addEventListener("click", onControlClick);
    }

    let onControlClickRight = document.getElementById("right");
    if (onControlClickRight) {
      onControlClickRight.addEventListener("click", onControlClick);
    }

    let onControlClickDown = document.getElementById("down");
    if (onControlClickDown) {
      onControlClickDown.addEventListener("click", onControlClick);
    }

    let onControlClickLeft = document.getElementById("left");
    if (onControlClickLeft) {
      onControlClickLeft.addEventListener("click", onControlClick);
    }

    let mazeHeight;
    let mazeWidth;
    // Variable pour stocker tous les coffres
    let chests = [];
    // Variable pour stocker le nombre de coffres récupérés par l'utilisateur (de base aucun coffre récupéré donc 0)
    let chestsFound = 0;
    // Variable pour stocker la position de la clé
    let key = [];
    // Variable pour gérer le nombre de minutes en fonction du niveau de jeu :
    let minutesNumber;

    // Les cellules du labyrinthe
    class MazeCell {
      constructor(col, row) {
        this.col = col;
        this.row = row;

        this.eastWall = true;
        this.northWall = true;
        this.southWall = true;
        this.westWall = true;

        // this.chest = true;

        this.visited = false;
      }
    }

    class Maze {
      constructor(cols, rows, cellSize, chests, minutesNumber, mazeGenerated) {
        this.backgroundColor = "#5f4b64";
        this.cols = cols;
        // this.endColor = "#88FF88";
        this.mazeColor = "black";
        // this.playerColor = "#880088";
        this.rows = rows;
        this.cellSize = cellSize;

        this.chests = chests;

        // this.chestColor = "#000088";

        this.playerImage = new Image();
        this.playerImage.src = require("../assets/images_maze/player.png");

        this.endImage = new Image();
        this.endImage.src = require("../assets/images_maze/end.png");

        this.chestImage = new Image();
        this.chestImage.src = require("../assets/images_maze/chest.png");

        this.keyImage = new Image();
        this.keyImage.src = require("../assets/images_maze/key.png");

        this.minutesNumber = minutesNumber;

        // Vérifier si le labyrinthe existe déjà
        this.mazeGenerated = mazeGenerated;
        console.log(mazeGenerated);

        this.cells = [];

        if (typeof mazeGenerated !== "undefined" && mazeGenerated.length > 0) {
          this.cells = mazeGenerated;

          console.log("redraw");
          this.redraw(mazeGenerated);
        } else {
          console.log("generate");
          // this.generate();
        }
      }

      generate(idPartie) {
        console.log("on génèreeee");
        // On vide d'abord le tableau des coffres pour éviter qu'ils se cumulent à l'infini lorsqu'on génère un nouveau labyrinthe, de même pour la clé
        chests = [];
        chestsFound = 0;
        key = [];

        // On vide le timer pour ne pas accumuler les minuteurs
        clearInterval(monTimer);

        // Appel de la fonction qui démarre le minuteur
        // minutesNumber = this.minutesNumber * 60 - 1;
        // var display = document.getElementById("counter");
        // startTimer(minutesNumber, display);

        for (let col = 0; col < this.cols; col++) {
          this.cells[col] = [];
          for (let row = 0; row < this.rows; row++) {
            this.cells[col][row] = new MazeCell(col, row);
          }
        }

        let randomColCell = Math.floor(Math.random() * this.cols);
        let randomRowCell = Math.floor(Math.random() * this.rows);

        let stack = [];
        stack.push(this.cells[randomColCell][randomRowCell]);

        let currCell;
        let dir;
        let foundNeighbor;
        let nextCell;

        while (this.hasUnvisited(this.cells)) {
          currCell = stack[stack.length - 1];
          currCell.visited = true;
          if (this.hasUnvisitedNeighbor(currCell)) {
            nextCell = null;
            foundNeighbor = false;
            do {
              dir = Math.floor(Math.random() * 4);
              switch (dir) {
                case 0:
                  if (
                    currCell.col !== this.cols - 1 &&
                    !this.cells[currCell.col + 1][currCell.row].visited
                  ) {
                    currCell.eastWall = false;
                    nextCell = this.cells[currCell.col + 1][currCell.row];
                    nextCell.westWall = false;
                    foundNeighbor = true;
                  }
                  break;
                case 1:
                  if (
                    currCell.row !== 0 &&
                    !this.cells[currCell.col][currCell.row - 1].visited
                  ) {
                    currCell.northWall = false;
                    nextCell = this.cells[currCell.col][currCell.row - 1];
                    nextCell.southWall = false;
                    foundNeighbor = true;
                  }
                  break;
                case 2:
                  if (
                    currCell.row !== this.rows - 1 &&
                    !this.cells[currCell.col][currCell.row + 1].visited
                  ) {
                    currCell.southWall = false;
                    nextCell = this.cells[currCell.col][currCell.row + 1];
                    nextCell.northWall = false;
                    foundNeighbor = true;
                  }
                  break;
                case 3:
                  if (
                    currCell.col !== 0 &&
                    !this.cells[currCell.col - 1][currCell.row].visited
                  ) {
                    currCell.westWall = false;
                    nextCell = this.cells[currCell.col - 1][currCell.row];
                    nextCell.eastWall = false;
                    foundNeighbor = true;
                  }
                  break;
              }
              if (foundNeighbor) {
                stack.push(nextCell);
              }
            } while (!foundNeighbor);
          } else {
            currCell = stack.pop();
          }
        }

        // Fonction pour générer autant de coffres que demandé et chacun à une position aléatoire que l'on stocke dans le tableau "chests"
        for (let chest = 0; chest < this.chests; chest++) {
          // Génération d'une colonne et ligne aléatoire pour la position de chaque coffre
          let randomColChest = Math.floor(Math.random() * this.cols);
          let randomRowChest = Math.floor(Math.random() * this.rows);

          // Boucle de condition pour que le coffre ne puisse pas être généré sur la case de départ, d'arrivée, et pas non plus sur une case déjà occupée par un autre coffre
          while (
            (randomColChest === 0 && randomRowChest === 0) ||
            (randomColChest === this.cols - 1 &&
              randomRowChest === this.rows - 1) ||
            chests.indexOf(this.cells[randomColChest][randomRowChest]) !== -1
          ) {
            randomColChest = Math.floor(Math.random() * this.cols);
            randomRowChest = Math.floor(Math.random() * this.rows);
          }

          // On pousse la position du coffre dans le tableau dédié (variable globale)
          chests.push(this.cells[randomColChest][randomRowChest]);
        }

        // On affiche le nombre total de coffres à l'écran (pour indiquer l'avancée de l'utilisateur)
        let totalChests = document.getElementById("totalChests");
        if (totalChests) {
          totalChests.innerHTML =
            chestsFound + " / " + chests.length + " coffres trouvés";
        }

        // Génération d'une colonne et ligne aléatoire pour la position de la clé
        let randomColKey = Math.floor(Math.random() * this.cols);
        let randomRowKey = Math.floor(Math.random() * this.rows);
        // Boucle de condition pour que la clé ne puisse pas être générée sur la case d'arrivée et pas non plus sur une case déjà occupée par un coffre
        while (
          (randomColKey === this.cols - 1 && randomRowKey === this.rows - 1) ||
          chests.indexOf(this.cells[randomColKey][randomRowKey]) !== -1
        ) {
          randomColKey = Math.floor(Math.random() * this.cols);
          randomRowKey = Math.floor(Math.random() * this.rows);
        }
        // On pousse la position de la clé dans le tableau dédié (variable globale)
        key.push(this.cells[randomColKey][randomRowKey]);
        // console.log(key[0].col);
        // console.log(key[0].row);
        const axios = require("axios");
        // const bearerToken =
        // 	"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTc4NzkyMTQsImV4cCI6MTYxNzg4MjgxNCwiaXNzIjoiaHR0cHM6Ly9hcGkucmFjaW5nbWF6ZS53ZWI6MTAyNDMvY29ubmV4aW9uIiwiYXVkIjoiaHR0cHM6Ly9hcGkucmFjaW5nbWF6ZS53ZWI6MTAyNDMiLCJpZCI6IjYwNmUyMThlMGQyMzVlNDJjOGNmZTA2ZiJ9.iJt3Kmri3UZZcRHwZ_oseHVoKM5lnOIzyDTaBlPAUS0";
        let data = {
          labyrinthe: {
            positions: this.cells,
            coffres: {
              nombre: chests.length,
              img: "img.png",
              positions: chests,
            },
            cle: { position: key[0], img: "img2.png" },
          },
        };
        console.log(data);

        let putLabyrinthe = {
          method: "put",
          url: "http://gamecenter.leiven.fr:3001/parties/" + idPartie + "/labyrinthe",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios(putLabyrinthe)
          .then(function(response) {
            console.log(response.data);
          })
          .catch(function(error) {
            console.log(error);
          });

        // Stocker les données de la génération du labyrinthe
        // var test = JSON.parse(key[0]);
        // console.log(test.col);
        // console.log(key[0]);
        // var json = JSON.stringify(key);
        // console.log(json);
        // var test = JSON.parse(json);
        // console.log(test[0].col);

        // var mazeCells = JSON.stringify(this.cells);
        // this.cells = JSON.parse(mazeCells);
        // console.log(this.cells);

        // this.socket.emit("maze", this.cells);

        // Stocker les données de la génération des coffres
        // var chestsCells = JSON.stringify(chests);
        // chests = JSON.parse(chestsCells);
        // console.log(chests);
        // this.socket.emit("chests", chests);

        //-----------------------------

        this.redraw();
      }

      hasUnvisited() {
        for (let col = 0; col < this.cols; col++) {
          for (let row = 0; row < this.rows; row++) {
            if (!this.cells[col][row].visited) {
              return true;
            }
          }
        }
        return false;
      }

      hasUnvisitedNeighbor(mazeCell) {
        return (
          (mazeCell.col !== 0 &&
            !this.cells[mazeCell.col - 1][mazeCell.row].visited) ||
          (mazeCell.col !== this.cols - 1 &&
            !this.cells[mazeCell.col + 1][mazeCell.row].visited) ||
          (mazeCell.row !== 0 &&
            !this.cells[mazeCell.col][mazeCell.row - 1].visited) ||
          (mazeCell.row !== this.rows - 1 &&
            !this.cells[mazeCell.col][mazeCell.row + 1].visited)
        );
      }

      redraw(mazeGenerated) {
        if (typeof mazeGenerated !== "undefined" && mazeGenerated.length > 0) {
          console.log(mazeGenerated);
          // On récupère tous les coffres qui sont dans l'avant-dernier objet du tableau
          chests = mazeGenerated[mazeGenerated.length - 2];
          // On récupère la clé qui est dans le dernier objet du tableau
          key = mazeGenerated[mazeGenerated.length - 1];

          // Appel de la fonction qui démarre le minuteur
          minutesNumber = this.minutesNumber * 60 - 1;
          var display = document.getElementById("counter");
          if (display) {
            startTimer(minutesNumber, display);
          }

          // On affiche le nombre total de coffres à l'écran (pour indiquer l'avancée de l'utilisateur)
          let totalChests = document.getElementById("totalChests");
          if (totalChests) {
            totalChests.innerHTML =
              chestsFound + " / " + chests.length + " coffres trouvés";
          }
        }

        // Les cellules du labyrinthe
        mazeHeight = this.rows * this.cellSize;
        mazeWidth = this.cols * this.cellSize;

        if (canvas) {
          canvas.height = mazeHeight;
          canvas.width = mazeWidth;
          canvas.style.height = mazeHeight;
          canvas.style.width = mazeWidth;
        }

        if (ctx) {
          // Les grandes bordures du labyrinhe
          ctx.fillStyle = this.backgroundColor;
          ctx.fillRect(0, 0, mazeHeight, mazeWidth);

          // Affichage du labyrinthe
          ctx.strokeStyle = this.mazeColor;
          ctx.strokeRect(0, 0, mazeHeight, mazeWidth);

          for (let col = 0; col < this.cols; col++) {
            for (let row = 0; row < this.rows; row++) {
              if (this.cells[col][row].eastWall) {
                ctx.beginPath();
                ctx.moveTo((col + 1) * this.cellSize, row * this.cellSize);
                ctx.lineTo(
                  (col + 1) * this.cellSize,
                  (row + 1) * this.cellSize
                );
                ctx.stroke();
              }
              if (this.cells[col][row].northWall) {
                ctx.beginPath();
                ctx.moveTo(col * this.cellSize, row * this.cellSize);
                ctx.lineTo((col + 1) * this.cellSize, row * this.cellSize);
                ctx.stroke();
              }
              if (this.cells[col][row].southWall) {
                ctx.beginPath();
                ctx.moveTo(col * this.cellSize, (row + 1) * this.cellSize);
                ctx.lineTo(
                  (col + 1) * this.cellSize,
                  (row + 1) * this.cellSize
                );
                ctx.stroke();
              }
              if (this.cells[col][row].westWall) {
                ctx.beginPath();
                ctx.moveTo(col * this.cellSize, row * this.cellSize);
                ctx.lineTo(col * this.cellSize, (row + 1) * this.cellSize);
                ctx.stroke();
              }
            }
          }
          // Affichage des coffres à partir du tableau "chests" (version avec la couleur)
          // for (var chest in chests) {
          // 	ctx.fillStyle = this.chestColor;
          // 	ctx.fillRect(
          // 		chests[chest].col * this.cellSize + 2,
          // 		chests[chest].row * this.cellSize + 2,
          // 		this.cellSize - 4,
          // 		this.cellSize - 4
          // 	);
          // }

          // Affichage des coffres à partir du tableau "chests" (version avec l'image)
          this.chestImage.onload = () => {
            for (let chest in chests) {
              ctx.drawImage(
                this.chestImage,
                chests[chest].col * this.cellSize + 2,
                chests[chest].row * this.cellSize + 2,
                this.cellSize - 4,
                this.cellSize - 4
              );
            }
          };

          for (let chest in chests) {
            ctx.drawImage(
              this.chestImage,
              chests[chest].col * this.cellSize + 2,
              chests[chest].row * this.cellSize + 2,
              this.cellSize - 4,
              this.cellSize - 4
            );
          }

          // Suppression du coffre lorsque le joueur passe dessus et informations sur le nombre de coffres restants
          if (
            chests.find(
              (element) =>
                element.col === player.col && element.row === player.row
            )
          ) {
            let indexChest = chests.findIndex(
              (element) =>
                element.col === player.col && element.row === player.row
            );
            chests.splice(indexChest, 1);

            // On actualise le nombre de coffres trouvés en rajoutant + 1 à la variable globale "chestsFound" et on modifie le suivi (pour indiquer l'avancée de l'utilisateur)
            let totalChests = document.getElementById("totalChests");
            totalChests.innerHTML = totalChests.innerHTML.replace(
              chestsFound,
              chestsFound + 1
            );
            chestsFound = chestsFound + 1;

            // var item = document.createElement("li");
            // item.textContent = msg;
            // messages.appendChild(item);
            // TESTS
            // let adversaire = document.getElementById("adversaire");

            // socket.emit("adversaire", chestsFound);

            // socket.on("adversaire", function (data) {
            // 	if (data > 1) {
            // 		adversaire.innerHTML = "Antonin : " + data + " coffres trouvés";
            // 	} else {
            // 		adversaire.innerHTML = "Antonin : " + data + " coffre trouvé";
            // 	}
            // });

            // S'il reste encore des coffres dans le labyrinthe, on affiche combien il en reste dans une alerte pour lui indiquer son avancée
            if (chests.length > 0) {
              
            }
            // S'il n'y a plus de coffres à récupérer, il faut vite se diriger vers la sortie !
            else {
            }
          }

          // S'il n'y a plus de coffre dans le labyrinthe et que la clé n'a pas encore été récupérée, on affiche la clé et la sortie
          if (chests.length === 0 && key != null) {
            // Affichage de la position de la clé
            ctx.drawImage(
              this.keyImage,
              key.col * this.cellSize + 2,
              key.row * this.cellSize + 2,
              this.cellSize - 4,
              this.cellSize - 4
            );

            // Affichage de la sortie du labyrinthe (version avec l'image)
            ctx.drawImage(
              this.endImage,
              (this.cols - 1) * this.cellSize,
              (this.rows - 1) * this.cellSize,
              this.cellSize - 4,
              this.cellSize - 4
            );

            // Si le joueur essaye de sortir du labyrinthe sans avoir récupéré la clé (si la variable globale "key" a encore une position), on indique qu'il manque la clé
            if (
              player.col === this.cols - 1 &&
              player.row === this.rows - 1 &&
              key.col != undefined &&
              key.row != undefined
            ) {

            }

            // On supprime de la clé lorsque le joueur passe dessus et on lui indique de se diriger vers la sortie
            if (key.col === player.col && key.row === player.row) {
              // var indexKey = key.indexOf(this.cells[player.col][player.row]);
              delete key.col;
              delete key.row;
              // key.splice(indexKey, 1);

            }
          } else if (chests.length === 0) {
            // Affichage de la sortie du labyrinthe (version avec l'image)
            ctx.drawImage(
              this.endImage,
              (this.cols - 1) * this.cellSize,
              (this.rows - 1) * this.cellSize,
              this.cellSize - 4,
              this.cellSize - 4
            );
          }
          // Alerte pour montrer que le joueur a gagné lorsqu'il touche la sortie en ayant la clé en affichant aussi le temps qu'il a mis pour terminer
            if (
                player.col === this.cols - 1 &&
                player.row === this.rows - 1 &&
                key.col === undefined &&
                key.row === undefined
            ) {
                // clearTimeout(monTimer);
                // Arrêt du minuteur lorsqu'on sort du labyrinthe
                clearInterval(monTimer);

                retour();
            }


          // Affichage du joueur (version avec la couleur)
          // ctx.fillStyle = this.playerColor;
          // ctx.fillRect(
          // 	player.col * this.cellSize + 2,
          // 	player.row * this.cellSize + 2,
          // 	this.cellSize - 4,
          // 	this.cellSize - 4
          // );

          // Affichage du joueur et son avatar (version avec l'image)
          this.playerImage.onload = () => {
            ctx.drawImage(
              this.playerImage,
              player.col * this.cellSize + 2,
              player.row * this.cellSize + 2,
              this.cellSize - 4,
              this.cellSize - 4
            );
          };

          ctx.drawImage(
            this.playerImage,
            player.col * this.cellSize + 2,
            player.row * this.cellSize + 2,
            this.cellSize - 4,
            this.cellSize - 4
          );
        }
      }
    }

    // Fonction pour générer un labyrinthe en fonction du niveau choisi, chaque niveau possède différents paramètres pour générer le labyrinthe (le nombre de colonnes, lignes, coffres, minutes du minuteur)
    function onClick(idPartie) {
      if (player) {
        player.reset();
      }
      let counter = document.getElementById("counter");
      if (counter) {
        counter.innerHTML = "";
      }

      let maze;
      let col, row, size, chest, minutesNumber, mazeGenerated;

      maze = new Maze(col, row, size, chest, minutesNumber, mazeGenerated);

      if (document.getElementById("menuFacile").checked == true) {
        if (maze) {
          maze.cols = 10;
          maze.rows = 10;
          maze.chests = 3;
          maze.minutesNumber = 2;
        }
      } else if (document.getElementById("menuIntermediaire").checked == true) {
        if (maze) {
          maze.cols = 15;
          maze.rows = 15;
          maze.chests = 5;
          maze.minutesNumber = 3;
        }
      } else if (document.getElementById("menuDifficile").checked == true) {
        if (maze) {
          maze.cols = 20;
          maze.rows = 20;
          maze.chests = 7;
          maze.minutesNumber = 4;
        }
      } else {
        return 0;
      }

      maze.generate(idPartie);
    }

    class Player {
      constructor() {
        this.reset();
      }

      reset() {
        this.col = 0;
        this.row = 0;
      }
    }

    // Code pour permettre au joueur de se déplacer en cliquant sur les icones (pratique pour les joueurs mobiles)
    function onControlClick(event) {
      switch (event.target.id) {
        case "left":
          if (!maze.cells[player.col][player.row].westWall) {
            player.col -= 1;
          }
          break;
        case "right":
          if (!maze.cells[player.col][player.row].eastWall) {
            player.col += 1;
          }
          break;
        case "down":
          if (!maze.cells[player.col][player.row].southWall) {
            player.row += 1;
          }
          break;
        case "up":
          if (!maze.cells[player.col][player.row].northWall) {
            player.row -= 1;
          }
          break;
        default:
          break;
      }
      maze.redraw();
    }

    // Variable pour gérer le countdown
    let monTimer;

    function startTimer(duration, display) {
	let timer = duration,
		minutes,
		seconds;
	monTimer = setInterval(function() {
		minutes = parseInt(timer / 60, 10);
		seconds = parseInt(timer % 60, 10);
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		display.innerHTML = minutes + ":" + seconds;
		if (--timer < 0) {
			timer = duration;
			// Si le minuteur arrive à 0 seconde, la partie se termine et le minuteur s'arrête
			if (seconds == 0) {
				alert("Votre temps est écoulé ! La partie est terminée.");
				clearInterval(monTimer);
			}
		}
	}, 1000);
}

	function retour() {
		window.location = 'http://gamecenter.leiven.fr/home';
    localStorage.removeItem('c');
	}

    // Conversion du format mm:ss en secondes pour le résultat du temps qu'a pris le joueur à terminer le labyrinthe
    function convertMinutesSecondsToSeconds(minutesNumber, time) {
      // On récupère les minutes + secondes
      // On enlève les ":"
      let minutesSeconds = time.split(":");
      // On convertit les minutes en secondes et on les additionne avec le reste des secondes
      let seconds = +minutesSeconds[0] * 60 + +minutesSeconds[1];

      // On soustrait le résultat avec le temps du minuteur initial (exemple : 120 (2minutes) - 100 (1minute40))
      let secondsResult = minutesNumber - seconds + 1;
      let mins = Math.floor((secondsResult % 3600) / 60);
      let secs = Math.floor(secondsResult % 60);

      // Conversion des secondes en un format plus lisible pour l'utilisateur
      let result = "";

      if (mins <= 0) {
        result += "" + secs + " secondes";
      } else if (mins === 1) {
        result += "" + mins + " minute " + (secs < 10 ? "0" : "");
        result += "" + secs;
      } else {
        result += "" + mins + " minutes " + (secs < 10 ? "0" : "");
        result += "" + secs;
      }

      return result;
    }

    // Code pour permettre au joueur de se déplacer en utilisant ses flèches directionnelles ou ZQSD
    function onKeyDown(event) {
      switch (event.keyCode) {
        case 37: // Flèche directionnelle gauche
        case 81: // Q
          if (!maze.cells[player.col][player.row].westWall) {
            player.col -= 1;
          }
          break;
        case 39: // Flèche directionnelle droite
        case 68: // D
          if (!maze.cells[player.col][player.row].eastWall) {
            player.col += 1;
          }
          break;
        case 40: // Flèche directionnelle bas
        case 83: // S
          if (!maze.cells[player.col][player.row].southWall) {
            player.row += 1;
          }
          break;
        case 38: // Flèche directionnelle haut
        case 90: // Z
          if (!maze.cells[player.col][player.row].northWall) {
            player.row -= 1;
          }
          break;
        default:
          break;
      }
      maze.redraw();
    }
  },
  components: {
    Background,
  },
  methods: {
    seDeconnecter() {
      this.$router.push("/");
    },

    retour() {
      this.$router.push("/home");
    },

    annuler() {
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Exo:400,700");
@import url("https://fonts.googleapis.com/css2?family=Sigmar+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nerko+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Finger+Paint&family=Fredoka+One&family=Rubik+Mono+One&family=Wendy+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap");

hr {
  width: 80%;
  background: #d8bf5b;
  border-radius: 10px;
  border: 0px solid;
  height: 1vh;
}

body {
  display: grid;
  grid-gap: 10px;
  grid-template-areas:
    "header header"
    "canvas settings"
    "canvas controls"
    "footer footer";
  grid-template-columns: max-content max-content;
  grid-template-rows: max-content max-content max-content max-content;
  height: max-content;
  width: max-content;
}

* {
  font-family: "Fredoka One", cursive;
}

header {
  grid-area: header;
  font-size: 2em;
  font-weight: bold;
  padding: 10px;
  text-align: center;
}

#contentplay {
  width: 100%;
  height: 30vh;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
}

.canvas {
  margin: 0%;
  margin-top: 10%;
  padding: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
}

canvas {
  width: 80vh;
  height: 80vh;
  //center vertical
  position: absolute;
  top: 50%;
  left: 50%;
  border: 10px solid #261b2f;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
    0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
    0 16px 16px rgba(0, 0, 0, 0.1);
  //---
  grid-area: canvas;
}

#typePartie {
  background-color: #8e2ee71f;
  padding: 3%;
  border-radius: 5px;
  border: none !important;
}

.opt {
  background-color: #fbdd65;
  width: 20%;
  height: 100vh;
  border: 10px solid #f8bb47;
}

label {
  display: inline-block;
  width: 75px;
}

#totalChests {
  font-size: 2em;
  color: #f36b2e;
  text-align: center;
  padding: 10%;

  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2vh;
  margin-top: 2vh;
  border-radius: 10px;
  background: #f8bb47;
}

.cols {
  grid-area: cols;
}

.rows {
  grid-area: rows;
}

.generate {
  grid-area: generate;
}

#contentPlay {
  height: 71vh;
}

.controls {
  display: grid;
  grid-template-areas:
    ". up ."
    "left . right"
    ". down .";
  grid-template-columns: max-content max-content max-content;
  grid-template-rows: max-content max-content max-content;
  width: 100%;
  height: 20vh;
  align-content: center;
  justify-content: center;
}

#quiter2 {
  input {
    background-color: #ff4655 !important;
    color: white;
    width: 100%;
    height: 5vh;
    border: none;
    cursor: pointer;

    &:hover {
      background: #8e2ee7;
    }
  }
}

.up,
.right,
.down,
.left {
  background-color: #524c4f;
  display: flex;
  justify-content: center;
  color: #f6faed;
  cursor: pointer;
  font-size: 1.5em;
  border-radius: 10px;
  font-weight: bold;
  height: 6vh;
  width: 6vh;
}

.up {
  grid-area: up;
}

.right {
  grid-area: right;
}

.down {
  grid-area: down;
}

.left {
  grid-area: left;
}

footer {
  grid-area: footer;
  text-align: center;
}

footer > a:hover {
  background-color: lightgrey;
}

@media (max-width: 640px) {
  body {
    grid-template-areas:
      "header header"
      "canvas canvas"
      "settings controls"
      "footer footer";
    grid-template-columns: max-content max-content;
    grid-template-rows: max-content max-content max-content max-content;
  }
}

#typePartie {
  border: 1px solid black;
}

#niveauJeu {
  width: 100%;
  padding: 2%;
  margin-top: 5%;
  margin-bottom: 5%;
  & .field {
    width: 100%;
  }
}

#temps {
  justify-content: center;
  text-align: center;
  padding: 10%;
  margin-left: 5%;
  margin-right: 5%;
  margin-bottom: 2vh;
  border-radius: 10px;
  background: #f8bb47;

  & strong {
    color: #238291;
    font-size: 2em;
  }

  & div:last-of-type {
    padding-top: 10%;
  }
  & span {
    color: #67a597;
    font-size: 3em;
    padding: 5%;
  }

  img {
    filter: hue-rotate(200deg) !important;
    height: 3vh;
    //margin-right: 5%;
  }
}

.adversaire {
  color: #d8538c;
  margin-left: 5%;
  margin-right: 5%;
  padding-top: 10%;
  font-size: 2em;
  text-align: center;
  height: 37vh;
  border-radius: 10px;
  background: #f8bb47;

  span {
    color: #b9316c;
    padding-bottom: 5%;
  }

  div {
    padding-top: 10%;
    padding: 10%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2vh;
    height: 29vh;
    border-radius: 10px;
    background: #dda640;
  }
}
//-----------------------------------------------------------------//
.navbar {
  position: relative;
  z-index: 40;
  overflow: hidden;
  margin-bottom: 5%;
  padding-top: 3%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  & > .opt {
    grid-column: 3/4;
    grid-row: 1/1;
    margin-top: 20%;
    display: block;
    margin-left: 33%;
    font-size: 3vh;
    font-weight: bold;

    & > a {
      color: #000000;
      cursor: pointer;
      margin: 1%;

      &:hover {
        color: #ff5e78;
      }
    }
  }
  & > .logo {
    width: 100%;
    grid-column: 2/3;
    grid-row: 1/1;
    display: block;
    margin: auto;
  }
}

$base: #0f1923;
$white: #ece8e1;
$pink: #ff4655;
$height: 7vh;
$transition: 0.3s ease-out all;

#options {
  width: 100%;
  display: flex;
  text-align: center;

  div {
    width: 50%;

    & input {
      border-radius: 100px;
      width: 90%;
      background-color: #00eeff;
      font-family: "Fredoka One", cursive;
    }
  }
}

#quiter {
  input {
    background-color: #ff4655 !important;
    color: white;
  }
}
//modal

.modal {
  //opacity: 0;
  z-index: 50;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.938);
  height: 100vh;
  transition: all 0.4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__contentPlay {
  position: relative;
  width: 80%;
  height: 100vh;
  background-image: url("../assets/background.jpg");
  background-size: 120% 100vh;
  background-repeat: no-repeat;
  //backdrop-filter: blur(50000px);
  background-color: #444444;
}

.modal__contentConfig {
  border-radius: 10px;
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("https://image.freepik.com/vector-gratis/fondos-papel-colores-pastel-superponen-sobre-otros-causando-sombras-ve-hermosa-moderna_68708-876.jpg");
  background-size: 100%;
  font-family: "Fredoka One", cursive;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .form {
    border-radius: 10px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
      0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.1);
    background-color: rgb(255, 255, 255);
    padding: 5%;
    padding-bottom: 2%;
    font-size: 1.5vh;
    margin: 5%;
    width: 60%;
    color: #8e2ee7;

    label {
      font-size: 1.2em;
    }

    & input {
      background-color: #30303015;
      height: 4vh;
      border: none;

      &:hover {
        background-color: #8f6abe3b;
        border: 1px solid #8f6abe3b;
      }
    }
    & .title {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      text-align: center;
      font-size: 5vh;

      & span {
        grid-column: 2/3;
        grid-row: 1/1;
      }
    }

    & #button {
      display: flex;
      justify-content: center;
      background-color: white;

      & button {
        border-radius: 100px;
        width: 50%;
        height: 5vh;
        border: none;
        background-color: #8e2ee7;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: #ff5e78;
          transition: 0.5s;
        }
      }
    }
  }
}

.foot {
  background-color: #292828;
  color: white;
  width: 100%;
  text-align: center;
  padding: 4%;
  font-family: "Comfortaa", cursive;
  font-size: 10px;
}

//small
@media (min-width: 500px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
  }

  .navbar {
    margin-bottom: 5%;
    padding-top: 3%;
    grid-template-columns: repeat(3, 1fr);

    & > .opt {
      margin-top: 15%;
      margin-left: 60%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }
    & > .logo {
      width: 100%;
    }
  }

  .options {
    margin-top: 10vh;
    grid-template-columns: repeat(3, 1fr);
  }

  .modal__content {
    border-radius: 10px;
    position: relative;
    width: 60vh;
    height: 35vh;
    background: #fff;

    & > .title {
      font-size: 200%;
      font-family: "Fredoka One", cursive;
      background-color: #ff5e78;
      padding: 4%;
      text-align: center;
      color: white;
    }

    & > .text {
      padding: 5%;
      padding-top: 10%;
      font-size: 1.3vh;
      font-family: "Fredoka One", cursive;
      float: left;
      width: 60%;
    }

    & > .img {
      float: right;
      width: 40%;

      & > img {
        align-items: center;
        width: 15vh;
        float: right;
        margin-right: 10%;
        padding-top: 15%;
      }
    }
  }
}

//medium
@media (min-width: 800px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
  }

  .navbar {
    margin-bottom: 5%;
    padding-top: 3%;
    grid-template-columns: repeat(3, 1fr);

    & > .opt {
      margin-top: 15%;
      margin-left: 60%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }
    & > .logo {
      width: 100%;
    }
  }

  .options {
    margin-top: 40vh;
    grid-template-columns: repeat(3, 1fr);
  }

  .modal__content {
    width: 100vh;
    height: 50vh;

    & > .title {
      font-size: 200%;
    }

    & > .text {
      padding-top: 6%;
      font-size: 2.4vh;
      float: left;
      width: 60vh;
    }

    & > .img {
      float: right;
      width: 40vh;

      & > img {
        width: 30vh;
        margin-right: 10%;
        padding-top: 3vh;
      }
    }
  }
}

//big-medium
@media (min-width: 900px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
  }

  .navbar {
    margin-bottom: 2%;
    padding-top: 3%;

    & > .opt {
      margin-top: 9%;
      margin-left: 60%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }
    & > .logo {
      width: 60%;
    }
  }

  .options {
    margin-top: 40vh;
    grid-template-columns: repeat(3, 1fr);
  }

  .modal__content {
    width: 100vh;
    height: 50vh;

    & > .title {
      font-size: 200%;
    }

    & > .text {
      padding-top: 6%;
      font-size: 2.4vh;
      float: left;
      width: 60vh;
    }

    & > .img {
      float: right;
      width: 40vh;

      & > img {
        width: 30vh;
        margin-right: 10%;
        padding-top: 3vh;
      }
    }
  }
}

//big
@media (min-width: 1192px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    padding-left: 4rem;
    padding-right: 4rem;
    height: 50%;
  }

  .navbar {
    margin-bottom: 2%;
    padding-top: 3%;

    & > .opt {
      margin-top: 9%;
      margin-left: 70%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }
    & > .logo {
      width: 60%;
    }
  }

  .options {
    margin-top: 40vh;
    padding-left: 4rem;
    padding-right: 4rem;
    grid-template-columns: repeat(3, 1fr);
  }

  .circles {
    height: 100vh;
  }

  .modal__content {
    width: 100vh;
    height: 50vh;

    & > .title {
      font-size: 200%;
    }

    & > .text {
      padding-top: 6%;
      font-size: 2.4vh;
      float: left;
      width: 60vh;
    }

    & > .img {
      float: right;
      width: 40vh;

      & > img {
        width: 30vh;
        margin-right: 10%;
        padding-top: 3vh;
      }
    }
  }
}

//form
@media (max-width: 767px) {
  .modal__contentProfil {
    width: 90%;
    height: 90vh;

    #opt {
      width: 100%;
      height: 100%;

      & button {
        padding: 5%;
        border-radius: 10px;
        margin-left: 2%;
        font-size: 3vh;
      }
    }

    & > .form {
      padding: 5%;
      padding-bottom: 2%;
      margin: 5%;
      width: 100%;

      & h4 {
        font-size: 1.5vh;
      }
      & label {
        font-size: 1.5vh;
      }
      & input {
        height: 3.5vh;
      }
      & .title {
        font-size: 2.5vh;
      }

      & #button {
        & button {
          width: 70%;
          height: 4vh;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .modal__contentProfil {
    #opt {
      grid-column: 1/4;
      grid-row: 2/3;
      text-align: center;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      border: none;

      & button {
        border-radius: 10px;
        margin-left: 2%;
        float: right;
        padding: 1% !important;
        font-size: 3vh;
        border: none;
      }
    }

    & > .form {
      & .title {
        font-size: 1.7vh;
      }
    }
  }
}
</style>
