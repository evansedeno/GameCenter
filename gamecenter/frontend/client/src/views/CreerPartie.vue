<template>
  <div class="main">
  
    <div id="navbar" class="d-flex p-2 mx-auto text-white bg-dark col-12 flex-column">
      <header class="mb-auto text-center m-2">
        <h3 id="logo-nom" class="float-md-start mx-5 my-0">GAMECENTER</h3>
      </header>
    </div>

    <div class="row back">
      <div class="col-12">
      <h2> CREER VOTRE PARTIE</h2>
				<form>

      <div class="form-control" style="display:none">
						<label for="username">Nom d'utilisateur</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Entrer le nom d'utilisateur..."
							required
						/>
					</div>  
				

					
    <label><span>Nom de la Partie: </span></label>
			<div class="backPartie" id="nomPartie">
			  <input type="text" name="partieName" id="partieName" placeholder="Entrer le nom de la partie..." required v-model="nom" />
      </div>
					
    <label><span>Type de partie :</span></label>
			<div class="backPartie" id="typePartie">

			  <input id="partiePublique" type="radio" name="partietoggle" value="1" checked v-model="type"/>
        <label for="partiePublique">Publique</label>

				<input id="partiePrivee" type="radio" name="partietoggle" value="2" v-model="type"/>
        <label for="partiePrivee">Privee</label>
      </div>
			
      <br />
      
      <label><span>Niveau de jeu : </span></label>
				<div class="backPartie" id="niveauPartie">

					<input id="menuFacile" type="radio" name="niveautoggle" value="1" checked v-model="difficulte"/>
					<label for="menuFacile">Facile</label>
		      
          <input id="menuIntermediaire" type="radio" name="niveautoggle" value="2" v-model="difficulte"/>
					<label for="menuIntermediaire">Intermediaire</label>

					<input id="menuDifficile" type="radio" name="niveautoggle" value="3" v-model="difficulte"/>
					<label for="menuDifficile">Difficile</label>
				</div>

          <button id="btnAnnuler" class="btnPartie" type="reset" @click="retour">
            <span class="text-green">Annuler</span>
          </button>
  

          <button id="btnValider" class="btnPartie" type="submit" @click="createPartie">
            <span class="text-green">Creer la partie</span>
          </button>

		</form>
</div>
</div>

<footer class="col-12 bg-dark mt-auto text-white-50">
    <p class="float-right">&copy; Gamecenter. All right reserved</p>
  </footer>
  </div>
</template>

<script>
import io from "../assets/socket.io.js";
import { onClick } from "../js/utils/tools.js";

export default {
	name: "BlockGame",
	data() {
		return {
			socket: "",
			nom: "",
			difficulte: "1",
			type: "1",
      username,
		};
	},
	created() {
		this.socket = io("http://gamecenter.leiven.fr:3000");
	},
	mounted() {},
	methods: {
		retour() {
			this.$router.push("/home");
		},
		createPartie() {
			const config = {
				headers: { Authorization: `Bearer ${this.$store.state.token}` },
			};
			if (this.nom !== null || this.nom !== "") {
				api
					.post(
						"parties",
						{
							nom: this.nom,
							difficulte: parseInt(this.difficulte, 10),
							type: parseInt(this.type, 10),
						},
						config
					)
					.then((response) => {

						const partie = response.data;
						onClick(partie._id);

						this.$router.push({
							path: "/lobby",
							query: {
								username: this.$store.state.user.username,
								partietoggle:
									partie.type === 1 ? "partiePublique" : "partiePrivee",
								room: partie.type === 1 ? partie.nom : partie.code,
								partie:partie._id,
								token: this.$store.state.token
							},
						});
					})
					.catch((error) => {
					});
			}
		},
		creerPartie() {
			var nomUser = document.getElementById("username");
			var nomPartie = document.getElementById("partieName");
			var difficulte = 0,
				type = 0;
			// Conditions pour Nom partie et l'utilisateur
			this.nomUser = nomUser.value;
			this.nomPartie = nomPartie.value;
			// Conditions pour récuperer le type de la partie :
			if (
				document.getElementById("partiePublique").checked != true &&
				document.getElementById("partiePrivee").checked != true
			) {
			} else if (document.getElementById("partiePublique").checked == true) {
				type = 1;
			} else if (document.getElementById("partiePrivee").checked == true) {
				type = 2;
			}
			if (
				document.getElementById("menuFacile").checked != true &&
				document.getElementById("menuIntermediaire").checked != true &&
				document.getElementById("menuDifficile").checked != true
			) {
			} else if (document.getElementById("menuFacile").checked == true) {
				// Conditions pour récuperer la difficultée de la partie :
				difficulte = 1;
			} else if (document.getElementById("menuIntermediaire").checked == true) {
				difficulte = 2;
			} else if (document.getElementById("menuDifficile").checked == true) {
				difficulte = 3;
			}
			if (
				document.getElementById("menuFacile").checked != true &&
				document.getElementById("menuIntermediaire").checked != true &&
				document.getElementById("menuDifficile").checked != true
			) {
			} else {
				console.log(this.nomUser, this.nomPartie, type, difficulte);
			}
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

a {
  text-decoration: none;
}

h3 {
  font-family : GAMEGAME;
}

h2 {
  text-align : center;
  font-family : CetaMono;
  font-weight : bold;
  padding : 2em;
  padding-top : 0;
}

div.back {
  background-color : #EAE9E8;
  height : 80%;
  padding : 4em;
  padding-bottom : 0;
}

.backPartie {
  background-color : #3e3e3e;
  margin-top : 10px;
  margin-bottom : 10px;
  padding: 1.5%;
  width : 100%;
  color : white;
  text-align : center;
  font-weight : bold;
}

div#nomPartie {
  padding-top : 15px;
  padding-bottom : 15px;
  width : 100%;
  vertical-align: middle;
  

}

input#partieName{
  border: none;  
  background-color : #3e3e3e;
  top : 50%;
  color : white;
  width : 50%;
  text-align : center;

}

input::placeholder {
  color : white;
  width : 100%;
}


#niveauPartie span, 
#niveauPartie input,
#niveauPartie label{
  margin-right: 1em;
}

#typePartie span{
  margin-right: 5%;
}

#typePartie label{
  margin-right: 5%;
}

#typePartie input{
  margin-right: 1%;
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

#btnAnnuler{
  background-color: #ff4655;
}

button#btnValider {
    background-color: #103cac;
}

form {
  margin : auto;
  text-align : center;
   height : 100%;
   font-family : CetaMono;
}

footer {
  background-color: #292828;
  color: white;
  width: 100%;
  text-align: center;
  padding: 4%;
  font-size: 20px;
  font-family : CetaMono;
}
</style>
