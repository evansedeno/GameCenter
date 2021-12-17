<template>
  <div class="main text-white mx-auto my-auto justify-content">

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


    <div class="row col-md-12">
      <div class="col-md-6 my-auto">
        <img id="logo2" alt="logo" src="../assets/logo.png"/>
      </div>

      <div class="col-md-6 justify-content mx-auto my-auto px-5">
        <h1 class="m pb-5">Bienvenue dans <font color="blue">Gamecenter.</font></h1>
        <h2>Ici vous pourrez jouer a vos jeux favoris, en solo ou multijoueurs et egalement consultes vos scores
        mais avant de pouvoir jouer vous devais vous connecter ou creer un compte.</h2>  
      </div>
    
    </div>

     	<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>

				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>

    <footer class="col-12 bg-dark mt-auto text-white-50">
      <p class="float-right">&copy; Gamecenter. All right reserved</p>
    </footer>

  </div>
</template>

<script>
export default {
  methods: {
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
    margin: 0;
    padding:0;
    width : 100%;
    height: 100%;
}

#app {
  height: 100%;
}

#app > div.main {
  height: 100%;
  background-color : #3e3e3e;
}

.row {
  height: 80%;
}

img#logo2 {
  display: block;
  margin: auto;
}

h1{
  font-family: CetaMono;
}

h2 {
  font-family: CetaMono;
}

h3 {
  font-family: GAMEGAME;
}

#navbar {
    position: fixed;
    top:0;
    font-family: CetaMono;
    z-index: 99;
}
p {
    text-justify: auto;
}

#logo {
  width : 400px;
  height : 50px;
}

#logo2 {
  width : 400px;
  height : 400px;
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

/***** EFFETS BULLES ****/

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 5s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

</style>
 