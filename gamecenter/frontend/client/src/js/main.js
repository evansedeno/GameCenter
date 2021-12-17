import qs from 'qs';
import io from "../assets/socket.io.js";

const chatForm = document.querySelector('#chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const checkPublicParty = document.getElementById('partiePublique');
const checkPrivateParty = document.getElementById('partiePrivee');

// Get username and room from URL
const { username, room } = qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();
console.log(socket);

// Creation de la partie : 

function creerPartie() {
  var nomUser = document.getElementById('username');
  var nomPartie = document.getElementById('partieName');
  var difficulte = 0, type = 0;
  // Conditions pour Nom partie et l'utilisateur
  nomUser = nomUser.value;
  nomPartie = nomPartie.value;
    // Conditions pour récuperer le type de la partie : 
    if(document.getElementById('partiePublique').checked != true && document.getElementById('partiePrivee').checked != true){
      alert('choisir le type');
    }else
    if(document.getElementById('partiePublique').checked == true){
      type = 1;
    }else if(document.getElementById('partiePrivee').checked == true){
      type = 2;
    }
    if(document.getElementById('menuFacile').checked != true && document.getElementById('menuIntermediaire').checked != true && document.getElementById('menuDifficile').checked != true){
      alert('choisir la difficulté');
    }else if(document.getElementById('menuFacile').checked == true){
      // Conditions pour récuperer la difficultée de la partie : 
        difficulte = 1;
      }else if(document.getElementById('menuIntermediaire').checked == true){
        difficulte = 2;
      }else if(document.getElementById('menuDifficile').checked == true){
        difficulte = 3; 
      } 
      if(document.getElementById('menuFacile').checked != true && document.getElementById('menuIntermediaire').checked != true && document.getElementById('menuDifficile').checked != true){
        alert('choisir la difficulté');
      }else{
        console.log(nomUser, nomPartie, type, difficulte);
      }
  }
  
 
  

// Joindre la partie (Publique Ou Privée) 
socket.emit('joindrePartiePublique', { username, room });
// socket.emit('joindrePartiePrivee', { username, codeAcces });
// creer partie 


// Get room and users
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  let msg = e.target.elements.msg.value;

  msg = msg.trim();

  if (!msg) {
    return false;
  }

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  const p = document.createElement('p');
  p.classList.add('meta');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.classList.add('text');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
  userList.innerHTML = '';
  users.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.username;
    userList.appendChild(li);
    
  });
  
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
  const leaveRoom = confirm('Êtes-vous sûr de vouloir quitter le LOBBY?');
  if (leaveRoom) {
    window.location = '../index.html';
  } else {
  }
});
