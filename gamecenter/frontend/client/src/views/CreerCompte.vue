<template>
  <div class="main">

  <div id="navbar" class="d-flex p-2 mx-auto text-white bg-dark col-12 flex-column">
    <header class="mb-auto text-center m-2">
      <h3 id="logo-nom" class="float-md-start mx-5 my-0" @click="Accueil">GAMECENTER</h3>
        <nav  class="nav justify-content-center float-md-end">
          <a class="nav-link active" aria-current="page" @click="Accueil">ACCUEIL</a>
          <a class="nav-link" @click="seConnecter">SE CONNECTER</a>
          <a class="nav-link" @click="creerCompte">INSCRIPTION</a>
        </nav>
    </header>
  </div>


  <div class="row">
    <div class="col-6 center">
      <h2>CREER VOTRE <font color="blue">COMPTE.</font></h2> 
        <form @submit.prevent="createUser">
          <input class="input" type="text" placeholder="Nom..."   v-model="nom" required/>
          <input class="input" type="text"  placeholder="Prenom..." v-model="prenom" required/>
          <input class="input" type="email" placeholder="Email..." v-model="email" required/>
          <input class="input"type="password" placeholder="Mot de passe..."  v-model="password" required/>
          <input class="input" type="password" placeholder="Verifier le mot de passe..." v-model="verPassword" required/>
          <div class="containerButton">
            <button class="btn rounded" type="submit">
              <span class="text-green">s'inscrire</span>
            </button>
          </div>
        </form>
    </div>
  </div>

  <footer class="col-12 bg-dark mt-auto text-white-50">
    <p class="float-right">&copy; Gamecenter. All right reserved</p>
  </footer>

  </div>
</template>

<script>
require("../js/script");

export default {
  name:"CreerCompte",
  props: {
    msg: String,
  },
  data() {
    return {
      nom:'',
      prenom:'',
      email: '',
      password: '',
      verPassword: '',
    };
  },
  methods: {
    createUser() {
      if(this.password === this.verPassword) {
        api.post('users', {
          prenom: this.prenom,
          nom: this.nom,
          email: this.email,
          password: this.password,
          personnage: {
            img: "url:www.img.com/" + this.email.split('@')[0]
          }
        }).then((response) => {
          this.$router.push("/");
        }).catch((error) => {
        });
      } else {
      }
    },
    Accueil() {
      this.$router.push("/");
    },
    seConnecter() {
      this.$router.push("/login");
    },
    creerCompte() {
      this.$router.push("/creercompte");
    },
  },
    
}
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
  height: 100%;
  background-color : #3e3e3e;
}

.center {
  margin : auto;
}

#app {
  height: 100%;
}


.row {
  height : 100%;
}

#app > div.main {
  height: 100%;
  background-color : #3e3e3e;
}

h2 {
  text-align : center;
  padding : 1em;
  color : white;
  font-family : CetaMono;
}

h3 {
  font-family : GAMEGAME;
}

#navbar {
    position: fixed;
    top:0;
    font-family: CetaMono;
    z-index: 99;
}

.center input {
  width: 100%;
  padding: 15px;
  margin: 5px;
  font-family: CetaMono;
  color : black;
}

img.logo {
  display : block;
  margin: auto;
  width: 30%;
  }

.containerButton {
  width: 100%;
  text-align : center;
  
}



.btn {
  margin: 20px auto;
  padding: 10px 44px;
  font-size: 15px;
  position: relative;
  background-color: #103cac;
  color: white;
  font-family: CetaMono;
}

.btn:hover {
  color: white;
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