<template>

<div class="main text-white mx-auto my-auto justify-content">


        <div id="navbar" class="d-flex p-2 mx-auto text-white bg-dark col-12 flex-column">
    <header class="mb-auto text-center m-2">
      <h3 id="logo-nom" class="float-md-start mx-5 my-0">GAMECENTER</h3>

    </header>
  </div>

   <div class="row back">
      <div class="col-12">
				<form class="ui form" @submit.prevent="getPartiePrivee">

      


            <h2>Partie privee</h2>
            <input
                id="code"
                v-model="code"
                name="code"
                placeholder="Entrer le code d'acces..."
                type="text"
                required
            />

          <br>

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
//import io from "../assets/socket.io.js";
//import qs from 'qs';
//require("../js/main");

export default {
  data() {
    return {
      code: '',
    };
  },
  methods: {
    lobby() {
      this.$router.push("/lobby");
    },

    retour() {
      this.$router.push("/home");
    },

    getPartiePrivee() {
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token}`},
      };
      api.get(
          "parties/" + this.code + "/code",
          config
      ).then((response) => {
        if(response.data !== null){
          console.log(response.data);
          const partie = response.data;
          this.$router.push({
            path: '/lobby',
            query: {
              username: this.$store.state.user.username,
              partietoggle: (partie.type === 1) ? 'partiePublique' : 'partiePrivee',
              room: this.code,
              partie:partie._id,
						  token: this.$store.state.token
            }
          });
        } else {
        }
      }).catch((error) => {
      });
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
padding : 1em;
font-weight : bold;
font-family : CetaMono;
}

h3 {
font-family : GAMEGAME;
}

#app {
  height: 100%;
}

div.main {
  height : 100%;
}

div.back {
  background-color : #EAE9E8;
  height : 80%;
  padding : 1em;
  
}


input#code::placeholder {
  color : white;
  width : 100%;
  font-family : CetaMono;

}

.btnPartie {
  padding: 10px 44px;
  margin-right : 20px;
  margin-top : 10px;
  font-size: 15px;
  color: white;
  font-family : CetaMono;


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

input#code {
  width : 60%;
  margin : auto;
  padding : 1em;
  font-family : CetaMono;
  background-color : #3e3e3e;
  
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
