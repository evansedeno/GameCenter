<template>


<div class="main text-white mx-auto my-auto justify-content">


        <div id="navbar" class="d-flex p-2 mx-auto text-white bg-dark col-12 flex-column">
    <header class="mb-auto text-center m-2">
      <h3 id="logo-nom" class="float-md-start mx-5 my-0">GAMECENTER</h3>

    </header>
  </div>

  <div class="row back">
      <div class="col-12">
				<form @submit.prevent="lobby" class="ui form">
  
					
    <h2>Partie disponibles</h2>

          <div class="form-control" style="display:none">
						
						<label for="username">Nom d'utilisateur</label>
						<input
							type="text"
							name="username"
							id="username"
							v-model="username"
							placeholder="Entrer le nom d'utilisateur..."
							required
						/>
					</div>
          
            <!-- On peut récuperer les données des parties publique est les afficher ici -->
            <select multiple="multiple" name="room" id="room" v-model="nom">
              <option v-for="partie in this.listPartiesPubliques" :value="partie._id">{{ partie.nom }}</option>


             
            </select>
           <button id="btnAnnuler" class="btnPartie" type="reset" @click="retour">
            <span class="text-green">Annuler</span>
          </button>
  

          <button id="btnValider" class="btnPartie" type="submit">
            <span class="text-green">Rejoindre la partie</span>
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


export default {
  name: "BlockGame",
  data() {
    return {
      listPartiesPubliques: [],
      username: this.$store.state.user.username,
      nom: '',
      id: ''
    };
  },
  mounted() {
    this.afficherlistPartiesPubliques();

  },
  created() {
    this.listPartiesPubliques = [];
  },
  methods: {
    retour() {
      this.$router.push("/home");
    },

    id(id){
      this.id = id;
      console.log(this.id);
    },

    lobby() {
      if(this.nom !== null || this.nom !== ''){
        this.$router.push({
          path: "/lobby",
          query: {
            username: this.username,
            partietoggle: "partiePublique",
            room: this.nom[0],
            partie: this.nom,
						token: this.$store.state.token
          },
        });
      }
    },
    afficherlistPartiesPubliques() {

      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token}`},
      };

      api.get("parties/publiques", config)
          .then(
              (response) => {
                this.listPartiesPubliques = [];

                console.log('ok');

                console.log(response.data[0]);

                this.listPartiesPubliques[0] = response.data[0];

                if (response.data.length > 0) {
                  for (var i = 0; i < response.data.length; i++) {
                    this.listPartiesPubliques[i] = response.data[i];
                  }
                  console.log(this.listPartiesPubliques);
                } else {
                  this.listPartiesPubliques = [];
                }
              }
          )
          .catch((error) => {
          });
    }
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


select#room {
background-color : #EAE9E8;
border : none;
height : 80%;
}


 option {
    background-color: #3e3e3e;
    margin: 3%;
    color : white;
    padding: 1.7%;
    padding-left: 3%;
    
  }

  form {
  margin : auto;
  text-align : center;
   height : 100%;
}

html { 
    margin: 0;
    padding:0;
    width : 100%;
    height: 100%;
}


h2 {
color : black;
text-align : center;
padding-top : 1em;
font-weight : bold;
font-family : CetaMono;
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

div.back {
  background-color : #EAE9E8;
  height : 100%;
  padding : 1em;
  font-family : CetaMono;
}

form.ui.form {
  height : 100%;
}

h3{
  font-family : GAMEGAME;
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
