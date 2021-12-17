import io from "../assets/socket.io.js";

import { Maze } from "./classes/Maze.js";

import { Player } from "./classes/Player.js";

import { onClick, onControlClick, onKeyDown } from "./utils/tools.js";

let player;
let ctx;
let canvas;
let maze;

window.onload = function onLoad() {
	this.socket = io("http://gamecenter.leiven.fr:3000");

	this.socket.on("maze", (data) => {
		// Création du canvas et du joueur
		canvas = document.getElementById("mainForm");
		if (canvas) {
			ctx = canvas.getContext("2d");
		}
		player = new Player();
		console.log(data);
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
};

export { canvas, ctx, player, maze };
