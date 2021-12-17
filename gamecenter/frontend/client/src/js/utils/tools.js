import { player, maze } from "../script.js";
import { Maze } from "../classes/Maze.js";

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
		alert("veuillez choisir le niveau de jeu");
		return 0;
	}

	// Condition pour vérifier que le nombre de coffres n'est pas trop élevé
	if (maze.chests > maze.cols * maze.rows - 2) {
		alert(
			"Impossible d'avoir plus de coffres que de cellules moins celle de l'arrivée et de départ."
		);
	} else {
		maze.generate(idPartie);
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

// Variable pour gérer le countdown
let monTimer;

// Fonction pour chronométrer le temps de la partie (minuteur) :
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

export {
	onClick,
	onControlClick,
	onKeyDown,
	startTimer,
	convertMinutesSecondsToSeconds,
};
export { monTimer };
