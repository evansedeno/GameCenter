<template>


<div class="main text-white mx-auto my-auto justify-content">


        <div id="navbar" class="d-flex p-2 mx-auto text-white bg-dark col-12 flex-column">
    <header class="mb-auto text-center m-2">
      <h3 id="logo-nom" class="float-md-start mx-5 my-0">GAMECENTER</h3>

    </header>
  </div>

 <div class="row back">
      <div class="col-12">

  

        <header class="chat-header">
          <h1>Salle d'attente</h1>
          <button id="btnQuitter" class="btnPartie">
            <span class="text-green" @click="seDeconnecter">Quitter</span>
            </button>
        </header>

         <div class="row">
      <div class="col-6">



          <div class="chat-sidebar">
            <div id="divCodeAcces" style="display: none;">
              <h3><i class="fas fa-search"></i> Code d'acces :</h3>
              <h2 id="code-acces">XXX</h2>
            </div>
            <h3><i class="fas fa-comments"></i> Code :</h3>
            <h2 id="room-name"></h2>
            <h3>Joueurs :</h3>
            <ul id="users"></ul>
          </div>
        
        </div>

        <div class="col-6">
        <div class="message">
              <div class="chat-messages"></div>
          </div>
         </div>
      </div>

      
        <div class="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Entrer votre message"
              required
              autocomplete="off"
            />

            <button id="btnEnvoyer" class="btnPartie">
              <span class="text-green">Envoyer</span>
            </button>
            <!--<button class="btn">
              <i class="fas fa-paper-plane"></i> Envoyer
            </button>-->
            
          </form>

          <button id="btnStart"  class="btnPartie" @click="maze">
              <span class="text-green">Commencer</span>
            </button>
        </div>
   
</div>

  </div>

  <footer class="col-12 bg-dark mt-auto text-white-50">
    <p class="float-right">&copy; Gamecenter. All right reserved</p>
</footer>
  </div>
</template>

<script>
import Qs from "qs";
import io from "../assets/socket.io.js";

require("../assets/socket.io");
//require("../js/main");

export default {
  name: "BlockGame",
  data() {
    return {
      /*chatForm: document.getElementById("chat-form"),
      chatMessages: document.querySelector(".chat-messages"),
      roomName: document.getElementById("room-name"),
      userList: document.getElementById("users"),*/
    };
  },
  created() {},
  mounted() {
    const socket = io("http://gamecenter.leiven.fr:3000");

    const chatForm = document.getElementById("chat-form");
    const chatMessages = document.querySelector(".chat-messages");
    const roomName = document.getElementById("room-name");
    const userList = document.getElementById("users");

    const checkPublicParty = document.getElementById("partiePublique");
    const checkPrivateParty = document.getElementById("partiePrivee");

    // Get username and room from URL
    const { username, partietoggle, room, partie, token } = Qs.parse(
      location.search,
      {
        ignoreQueryPrefix: true,
      }
    );
    // Creation de la partie :
    socket.emit("joindrePartie", { username, room });
    socket.on("roomUsers", ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
    });

    // Message from server
    socket.on("message", (message) => {
      outputMessage(message);

      // Scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Message submit
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get message text
      let msg = e.target.elements.msg.value;

      msg = msg.trim();

      if (!msg) {
        return false;
      }

      // Emit message to server
      socket.emit("chatMessage", msg);

      // Clear input
      e.target.elements.msg.value = "";
      e.target.elements.msg.focus();
    });

    // Output message to DOM
    function outputMessage(message) {
      const div = document.createElement("div");
      div.classList.add("message");
      const p = document.createElement("p");
      p.classList.add("meta");
      p.innerText = message.username;
      p.innerHTML += `<span>${message.time}</span>`;
      div.appendChild(p);
      const para = document.createElement("p");
      para.classList.add("text");
      para.innerText = message.text;
      div.appendChild(para);
      document.querySelector(".chat-messages").appendChild(div);
    }

    // Add room name to DOM
    function outputRoomName(room) {
      roomName.innerText = room;
    }

    // Add users to DOM
    function outputUsers(users) {
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerText = user.username;
        userList.appendChild(li);
      });
    }
  },
  methods: {
    maze() {
      const socket = io("http://gamecenter.leiven.fr:3000");

      const { username, room, code, partie, token } = Qs.parse(
        location.search,
        {
          ignoreQueryPrefix: true,
        }
      );
      //socket.emit("mazeGenerate", { username, partie, token });

      this.$router.push({
        path: "/maze",
        query: {
          username: username,
          partie: partie,
          token: token,
        },
      });
    },
    seDeconnecter() {
      this.$router.push("/home");
    },
  },
};
</script>

<style>

@font-face {
    font-family: GAMEGAME;
    src: url("../fonts/GAMEGAME.TTF")
   
}

@font-face {
    font-family: CetaMono;
    src: url("../fonts/GUARALDO PERSONAL USE.ttf")
}

html { 
    margin: 0;
    padding:0;
    width : 100%;
    height: 100%;
}

#app {
  height: 100%;
}

div.main {
  height : 100%;
}

ul {
  list-style: none;
}

h3 {
  font-family : GAMEGAME;
}

.btn {
  cursor: pointer;
  padding: 5px 15px;
  border: none;
  border-radius: 100px;
  font-size: 17px;
  background-color: #ff4655;
  color: rgb(255, 255, 255);
  font-family: "Fredoka One" !important;
  
}
.btn:hover {
  background-color: #8e2ee7;
  color:white
}

.back {
  background-color : #EAE9E8;
  padding : 4rem;
}

.col-12 {
  background-color : #292828;
  padding : 1em;
}

.row > .col-12 {
 border-radius : 10px;
}

.chat-header {

  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.chat-header h1{
  font-family : CetaMono;
}

.chat-sidebar {
  padding: 20px 20px 60px;
}

.chat-sidebar h2 {
  color: white;
  text-align: center;
  font-family: "Comfortaa", cursive !important;
}


.chat-sidebar h3 {
  margin-bottom: 15px;
  color: #ff4655;
  font-family : CetaMono;
  size: 10em;
}

.chat-sidebar ul {
  background: #8e2ee71f;
  margin: 5%;
  border-radius: 10px;
  text-align: center;
  color: white;
  padding: 2%;
  font-size: 1em;
}

.chat-messages {
  padding: 30px;
  color: white;
  overflow-wrap: break-word;
  max-height: 500px;
  overflow-y: scroll;
}

.chat-messages .message {
  padding: 10px;
  margin-bottom : 15px;
  color: white;
  background-color: #8e2ee71f;
  border-radius: 5px;
  overflow-wrap: break-word;
  font-family: "Comfortaa", cursive !important;

}

.chat-messages .message .meta {

  font-size: 0.5;
  font-weight: bold;
  color: #ff4655;
  font-family: "Comfortaa", cursive !important;
  
}

.chat-form-container form {
  display: flex;
}

.chat-form-container input[type="text"] {
  font-size: 13px;
  padding: 5px;
  height: 40px;
  flex: 1;
  margin-right: 1%;
  border: none;
  text-decoration: none;
}

.btnPartie {
  padding: 10px 44px;
  margin-right : 20px;
  margin-top : 10px;
  font-size: 15px;
  color: white;
}

.btnPartie:hover {
  color: white;
}

#btnEnvoyer{
  background-color: #103cac;
  color:white;
}

#btnQuitter {
    background-color: #ff4655;
    color:white;
}

#btnStart{
  width: 100%;
  margin-top: 5%;
  background-color: #103cac;
  color: white;
}

#btnStart:hover{
  background-color: #2c75ff;
  color:white;
}

footer {
  background-color: #292828;
  color: white !important;
  width: 100%;
  text-align: center;
  padding: 4%;
  font-family: CetaMono;
  font-size: 20px;
}



</style>
