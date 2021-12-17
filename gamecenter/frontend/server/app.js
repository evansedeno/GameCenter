const Express = require("express")();
const Http = require("http").Server(Express);
const formatMessage = require("../client/src/js/utils/messages");
const Socketio = require("socket.io")(Http, {
	cors: {
		origin: "*",
	},
});

const axios = require("axios");

const {
	userJoin,
	getCurrentUser,
	userLeave,
	getRoomUsers,
} = require("../client/src/js/utils/users");

const botName = "Racing Maze";

// Run when client connects
Socketio.on("connection", (socket) => {
	// nomPartie = nomPartie.value;
	socket.emit("creerPartie", ({ nomPartie }) => {
		//console.log(nomPartie);
	});


	socket.on("mazeGenerate", ({ username, partie, token }) => {
		const idPartie = partie;

		const bearerToken = "Bearer "+token;

		var getPartie = {
			method: "get",
			url: "http://gamecenter.leiven.fr:3001/parties/" + idPartie + "/id",
			headers: {
				Authorization: bearerToken,
			},
		};

		axios(getPartie)
			.then(function (response) {
				let maze = response.data;
				console.log('MAZE---MAZE...');
				console.log(maze);
				socket.emit("maze", maze);
			})
			.catch(function (error) {
				console.log(error);
		});

	});

	socket.on("joindrePartie", ({ username, room }) => {
		const user = userJoin(socket.id, username, room);
		socket.join(user.room);

		// Welcome current user
		socket.emit(
			"message",
			formatMessage(
				botName,
				"Bonjour à Racing Maze ! "
			)
		);

		// Broadcast when a user connects
		socket.broadcast
			.to(user.room)
			.emit("message", formatMessage(botName, `${user.username} est là !`));

		// Send users and room info
		Socketio.to(user.room).emit("roomUsers", {
			room: user.room,
			users: getRoomUsers(user.room),
		});
	});


	// Listen for chatMessage
	socket.on("chatMessage", (msg) => {
		const user = getCurrentUser(socket.id);

		Socketio.to(user.room).emit("message", formatMessage(user.username, msg));
	});

	// Runs when client disconnects
	socket.on("disconnect", () => {
		const user = userLeave(socket.id);

		if (user) {
			Socketio.to(user.room).emit(
				"message",
				formatMessage(botName, `${user.username} est partie !`)
			);

			// Send users and room info
			Socketio.to(user.room).emit("roomUsers", {
				room: user.room,
				users: getRoomUsers(user.room),
			});
		}
	});
});

Http.listen(3000, () => {
	console.log("Listening at :3000...");
});
