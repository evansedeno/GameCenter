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

  <div class="row ">
    <div class="col-6 center">
      <h2> CONNECTEZ-<font color="blue">VOUS.</font></h2> 
      <form @submit.prevent="Connexion">
        <input class="input" type="email" placeholder="Email..." required v-model="email"/>
        <input class="input" type="password" placeholder="Mot de passe..." required v-model="password"/>
        <div class="containerButton">
          <button class="btn rounded" type="submit">
            <span class="text-green">Se connecter</span>
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
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    Connexion() {
      api({
        url: 'users/login',
        method: "POST",
        auth: {
          username: this.email,
          password: this.password,
        },
      }).then(
        (response) => {
          this.$store.commit("setUser", response.data.user);
          this.$store.commit("setToken", response.data.token);
          this.$router.push("/loading");
        },
        (error) => {
        }
      ).catch((error) => {
      });
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
  height: 100%;
  background-color : #3e3e3e;
}

#app > div.main {
  height: 100%;
  background-color : #3e3e3e;
}

.center {
  margin : auto;
}

h2 {
  text-align : center;
  padding : 1em;
  color : white;
  font-family: CetaMono;
}

h3{
  font-family: GAMEGAME;
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
  width: 100%;;
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

#navbar {
    position: fixed;
    top:0;
    font-family: CetaMono;
    z-index: 99;
}


footer {
  background-color: #292828;
  color: white;
  width: 100%;
  text-align: center;
  padding: 4%;
  font-family: CetaMono;
  font-size: 20px;
}
</style>
