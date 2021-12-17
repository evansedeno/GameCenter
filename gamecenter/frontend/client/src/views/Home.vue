<template>          
<div class="main text-white mx-auto my-auto justify-content">

<div id="navbar" class="d-flex p-2 mx-auto text-white bg-dark col-12 flex-column">
  <header class="mb-auto text-center m-2">
    <h3 id="logo-nom" class="float-md-start mx-5 my-0">GAMECENTER</h3>
         
    <div class="options justify-content-center">

      <div class="wrapper">

				<a class="white" href="#instructions-modal">
          <span class="text" id="one">
            <i class="info circle icon"></i>Intructions
          </span>
				</a>

        <a class="white" href="#profil-modal">
          <span id="two" class="text">
            <i class="user icon"></i>{{username}}
          </span>
			  </a>

        <a class="white">
          <span id="three" class="text" @click="seDeconnecter">
            <i class="sign-out icon" ></i>Deconnexion
          </span>
        </a>

        <a class="white" href="http://gamecenter.leiven.fr:81">
          <span class="text" id="four">
              <img src="../assets/morpion.png" class="morpion"  />
             JOUER AU MORPION ICI
          </span>
        </a>

      </div>

      </div>

    </header>
  </div>

        <div class="row back">
          <div class="col-12">
        	  <img src="../assets/logo_maze.png" class="logo_maze" />
            <span> Bienvenue {{username}} ! <br> 
            Joue avec tes amis et remporte la clee avant tout le monde ! 
            <img src="../assets/key.png" class="key_logo" />
            </span>
          </div>
          <div class="col-md-4 col-12">
            <div id="card1" class="card">
              <div class="content">
                <h2 class="title"  @click="creerPartie">CREER PARTIE</h2>
                </div>
              </div>
            </div>

            <div class="col-md-4 col-12">
            <div id="card2" class="card">
            <div class="content">
                <h2 class="title" @click="rejoindrePublique">PARTIE PUBLIQUE</h2>
                </div>
            </div>
            
            </div>

            <div class="col-md-4 col-12">
            <div id="card3" class="card">
              <div class="content">
                <h2 class="title" @click="rejoindrePrivee">PARTIE PRIVEE</h2>
                </div>
              </div>
            </div>

        </div>


 <footer class="col-12 bg-dark mt-auto text-white-50">
    <p class="float-right">&copy; Gamecenter. All right reserved</p>
</footer>



   <div id="instructions-modal" class="modal">
      <div class="modal__content">
        <div class="title">
          <span><i class="info circle icon"></i>INSTRUCTIONS</span>
        </div>

        <div class="text">
          <p>
            Pour se deplacer vers le haut, le bas, la gauche ou la droite dans
            le labyrinthe, vous avez deux possibilites :<br/><br/>
            <i class="hand point right icon yellow"></i> Utilisez les fleches de
            votre clavier.<br/><br/>
            <i class="hand point right icon yellow"></i> Appuyez sur les boutons
            affiches sur l'ecran lorsque vous commencez le jeu.
          </p>
        </div>
        <div class="img">
          <img src="../assets/touches.png" class="logo"/>
        </div>
        <a href="#" class="modal__close">&times;</a>
      </div>
    </div>

    <div id="profil-modal" class="modal">
      <div class="modal__contentProfil">
        <div class="form">
          <div class="title">
            <span><h2>MON PROFIL</h2></span>
            <div id="opt" class="ui button" tabindex="0">
            </div>
          </div>
          <form class="ui form" @submit.prevent="modifyUser">
            <h4
                style="
								font-family: 'Fredoka One', cursive;
								margin-top: 2%;
								margin-bottom: 5%;
								text-align: center;
							"
            >
              <i class="address book icon"></i>Vous trouverez ici vos
              informations personnelles, que vous pourrez modifier si vous le
              souhaitez.
            </h4>

            <div class="field">
              <div class="two fields">
                <div class="field">
                  <label><i class="user icon"></i>Nom</label>
                  <input type="text" name="" v-model="nom" required/>
                </div>
                <div class="field">
                  <label><i class="user icon"></i>Prénom</label>
                  <input type="text" name="" v-model="prenom" required/>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="fields">
                <div class="twelve wide field">
                  <label><i class="envelope icon"></i>Courriel</label>
                  <input type="email" v-model="email" required/>
                </div>
                <div class="four wide field">
                  <label><i class="child icon"></i>Nom d'utilisateur</label>
                  <input type="text" name="" v-model="username" required/>
                </div>
              </div>
            </div>
            <h5
                class="ui dividing header"
                style="font-family: 'Fredoka One', cursive; color: #ff5e78"
            >
              SECURITE
            </h5>
            <div class="two fields">
              <div class="field">
                <label><i class="lock icon"></i>Mot de passe</label>
                <input type="password" name="" v-model="password" required/>
              </div>
              <div class="field">
                <label><i class="lock icon"></i>Verifier le mot de passe</label>
                <input type="password" name="" v-model="verPassword" required/>
              </div>
            </div>
            <div id="button" class="ui button" tabindex="0">
              <button type="submit">MODIFIER</button>
            </div>
          </form>
        </div>
        <a href="#" class="modal__close">&times;</a>
      </div>
    </div>






            

  </div>
</template>

<script>


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
    document.getElementById("navbar").style.padding = "30px 10px";
    document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("navbar").style.padding = "80px 10px";
    document.getElementById("logo").style.fontSize = "35px";
  }
}

	
export default {
  name: "Login",
  props: {
    msg: String,
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/scss/base.scss";',
      },
    },
  },
  data() {
    return {
      nom: '',
      prenom: '',
      username: '',
      email: '',
      password: '',
      verPassword: '',
    };
  },
  mounted() {
    this.$bus.$on('get_user',this.getUser);
    this.getUser();
    this.setData();

    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }


  //setTimeout(location.reload(),1);
  },
  methods: {
    setData() {
      this.nom = this.$store.state.user.nom;
      this.prenom = this.$store.state.user.prenom;
      this.username = this.$store.state.user.username;
      this.email = this.$store.state.user.email;
    },
    seDeconnecter() {
      this.$store.commit("setUser", false);
      this.$store.commit("setToken", false);
      this.$router.push("/");
    },
    // creerPartie() {
    //   this.$router.push("/partie");
    // },
    creerPartie() {
      this.$router.push("/creerPartie");
    },
    getUser() {
      const config = {
        headers: {Authorization: `Bearer ${this.$store.state.token}`},
      };
      api.get('users/'+this.$store.state.user._id,
        config
      ).then((response)=>{
        this.$store.commit("setUser", response.data);
        this.setData();
      }).catch((error)=>{
        console.log("Error ========>", error);
      });
    },
    modifyUser() {
      if (this.password === this.verPassword) {
        const config = {
          headers: {Authorization: `Bearer ${this.$store.state.token}`},
        };
        api.put("users",
          {
            prenom: this.prenom,
            nom: this.nom,
            email: this.email,
            password: this.password,
            username: this.username,
            personnage: {
              img: "url:www.img.com/e.halphen"
            }
          },
          config
        ).then((response) => {
          this.$bus.$emit('get_user');
          alert('Changement bien effectué');
          console.log(response);
        }).catch((error) => {
          alert('Error: ' + error);
          console.log("Error ========>", error);
        });
      } else {
        alert('Les mots de passe ne sont pas égaux');
      }
    },
    rejoindrePublique() {
			this.$router.push("/rejoindrePartie");
		},
		rejoindrePrivee() {
			this.$router.push("/rejoindrePartiePrivee");
		},
  },
};
</script>

<style lang="scss">
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

div.back {
  background-color : #EAE9E8;
  padding : 4rem;
}

h3 {
  font-family: GAMEGAME;
}

img + span {
  color : black;
  font-weight : bold;
  margin : auto;
  text-align : center;
  font-size : 2.5em;
  font-family : CetaMono;
}

a {text-decoration: none;} 

span {
  font-family : CetaMono;
  font-size : 15px;
}

.game1 {
  margin : auto;
  height : 500px;
  border : solid 2px black;
  margin-top : 50px;
  margin-bottom : 50px;
  position: relative;
  color: whitesmoke;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
  0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
  0 16px 16px rgba(0, 0, 0, 0.1);
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
 .logo_maze {
    width: 400px;
    height: 150px;
    display: block;
    margin: auto;
 }

#content1 {
  width: 90%;
  height: 50%;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 0.25em;
  box-shadow: 0 0 0.25em rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  left: 50%;
  padding: 10vmin;
  float: left;
  display: flex;
  text-align: center;
  top: 5%;
  transform: translate(-50%, -50%);
}


//card

.card {
  margin-top : 50px;
  margin-bottom : 50px;
  position: relative;
  width : 100%;
  height : 300px;
  z-index: 1;
  align-items: flex-end;
  overflow: hidden;
  padding: 2rem;
  margin : 5 auto;
  width: 100%;
  text-align: left;
  color: whitesmoke;
  border-radius: 20px;
  background-color: whitesmoke;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
  0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
  0 16px 16px rgba(0, 0, 0, 0.1);
}


.card:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-size: cover;
  background-position: 0 0;
  transition: transform calc(var(--d) * 1.5) var(--e);
  pointer-events: none;
  filter: brightness(0.2);
}

.card:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  pointer-events: none;
}

.card:hover {
  filter: brightness(1.75);
  box-shadow: 0.5px 5px 20px 5px rgba(0, 0, 0, 0.445);
}

#card1:before {
  background-image: url(https://i.gifer.com/7UUW.gif);
}

#card2:before {
  background-image: url(https://media1.giphy.com/media/8FDhJzbSLQvhmDVeTW/giphy.gif);
}

#card3:before {
  background-image: url(https://i.gifer.com/HLRg.gif);
}



.content {
  position: relative;
  display: flex;
  flex-direction: column;
  text-align : center;
  align-items: center;
  padding: 2%;
  z-index: 1;
  margin-left : 200px;
}

.title {
  font-size: 2rem;
  font-family: CetaMono;
  font-weight: bold;
  line-height: 1.2;
  letter-spacing: 1px;
}

.copy {
  text-align : center;
  font-size: 1.5vh;
  font-family: "Comfortaa", cursive;
  line-height: 1.35;
}

.btn {
  cursor: pointer;
  margin-top: 2%;
  padding: 0.75rem 1.5rem;
  font-size: 0.65rem;
  font-size: 1.3vh;
  font-family: "Fredoka One", cursive;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: #ff5e78;
  border: none;
  width: 100px;
  border-radius: 10px;
}

.btn:hover {
  background-color: #f9f871;
  color: black;
}

.btn:focus {
  outline: 1px dashed yellow;
  outline-offset: 3px;
}

//options
$base: #0f1923;
$white: #ece8e1;


.options {
  padding : 0;
  margin : 0;

  & a {
    font-size: 0.8rem;
    font-weight: 700;
    text-align: right;
    font-family : GAMEGAME;

    &.white > p {
      color: blue;
    }
    & p {
      z-index: 1;
      left: 0;
      width: 50%;
      margin : 0;

      & span.base {
        z-index: 2;
        width: 100%;
        height: 100%;
        left: 0;
        border: none;
        font-family : GAMEGAME;
      }

      & span.bg {
        height: 100%;
        z-index: 3;
        font-family : GAMEGAME;
      }

      & span.text {
        z-index: 4;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        font-size: 200px;
        font-family : GAMEGAME;
      }
    }

  }
}

//modal

.modal {
  visibility: hidden;
  opacity: 0;
  z-index: 50;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.938);
  height: 100vh;
  transition: all 0.4s;
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  border-radius: 10px;
  position: relative;
  width: 40vh;
  height: 35vh;
  background: #fff;

  & > .title {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 3vh;
    font-family: "Fredoka One", cursive;
    background-image: url("https://image.freepik.com/vector-gratis/fondo-colorido-abstracto_23-2148462458.jpg");
    padding: 4%;
    text-align: center;
    color: black;
  }

  & > .text {
    padding: 5%;
    padding-top: 10%;
    font-size: 1.3vh;
    font-family: "Fredoka One", cursive;
    float: left;
    width: 60%;
    font-family: CetaMono;
  }

  & > .img {
    float: right;
    width: 40%;

    & > img {
      align-items: center;
      width: 15vh;
      float: right;
      margin-right: 10%;
      padding-top: 30%;
    }
  }
}

.modal__contentProfil {
  border-radius: 10px;
  position: relative;
  width: 90%;
  height: 90vh;
  background-size: 100%;
  font-family: "Fredoka One", cursive;
  display: flex;
  justify-content: center;
  align-items: center;

  #opt {
    border: none;
    background-color: rgb(255, 255, 255);
    grid-column: 3/4;
    grid-row: 1/1;
    text-align: center;
    width: 100%;
    height: 100%;
    border: none;

    & button {
      text-align: center;
      border: none;
      cursor: pointer;
      color: rgb(255, 255, 255);
      padding: 5%;
      border-radius: 10px;
      margin-left: 2%;
      float: right;
      font-size: 3vh;

      &:first-of-type {
        background-color: #ff5e78;
        color: #fcd5db;
        transition: 0.5s;

        &:hover {
          background-color: #fcd5db;
          color: #ff5e78;
        }
      }

      &:last-of-type {
        background-color: #00eeff;
        color: #d7fcff;
        transition: 0.5s;

        &:hover {
          background-color: #d7fcff;
          color: #00eeff;
        }
      }
    }
  }

  & > .form {
    border-radius: 10px;
    box-shadow: 10px $base;
    background-color: rgb(255, 255, 255);
    padding: 5%;
    padding-bottom: 2%;
    font-size: 1.3vh;
    margin: 5%;
    width: 100%;

    & input {
      background-color: #30303015;
      height: 4vh;
      border: none;

      &:hover {
        background-color: #8f6abe3b;
        border: 1px solid #8f6abe3b;
      }
    }

    & .title {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      color: #8e2ee7;
      text-align: center;
      font-size: 4vh;

      & span {
        grid-column: 2/3;
        grid-row: 1/1;
      }
    }

    & #button {
      display: flex;
      justify-content: center;
      background-color: white;

      & button {
        border-radius: 100px;
        width: 50%;
        height: 5vh;
        border: none;
        background-color: #8e2ee7;
        color: white;
        cursor: pointer;


        &:hover {
          background-color: #ff5e78;
          transition: 0.5s;
        }
      }
    }
  }
}

.modal__contentStatistiques {
  border-radius: 10px;
  position: relative;
  width: 90%;
  height: 90vh;
  background-image: url("https://image.freepik.com/vector-gratis/fondos-papel-colores-pastel-superponen-sobre-otros-causando-sombras-ve-hermosa-moderna_68708-876.jpg");
  background-size: 100%;
  font-family: "Fredoka One", cursive;
  display: flex;
  justify-content: center;
  align-items: center;

  & > .content {
    border-radius: 10px;
    box-shadow: 10px $base;
    background-color: rgb(255, 255, 255);
    padding: 10%;
    padding-top: 5%;
    font-size: 1.3vh;
    margin: 5%;
    width: 100%;

    & .title {
      display: grid;
      justify-content: center;
      align-items: center;
      grid-template-columns: repeat(3, 1fr);
      color: #8e2ee7;
      text-align: center;
      font-size: 4vh;
      padding-bottom: 5%;

      & span {
        grid-column: 2/3;
        grid-row: 1/1;
      }
    }

    & #text {
      padding: 5%;
      padding-left: 10%;
      background-color: #fff4bb;
      border-radius: 10px;
      color : black;
      width: 60%;
      font-family: CetaMono;
      text-transform: uppercase;

      p {
        font-size: 1.5em;
        color : black !important;
        font-family: CetaMono;

        span {
          font-size: 1.5em;
          color: #ff06ea;
        }
      }
    }

    & #img {
      position: relative;
      display: block;
      border-radius: 10px;
      width: 40%;

      & div:first-of-type {
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 60%;
        }
      }

      & div:last-of-type {
        text-align: center;
        margin-top: 10%;

        span {
          font-size: 4vh;
        }
      }
    }
  }
}

.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ffffff;
  font-size: 30px;
  text-decoration: none;

  &:hover {
    color: #f9f871;
  }
}

//small
@media (min-width: 500px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    height: 100%;
  }

  .navbar {
    margin-bottom: 5%;
    padding-top: 3%;
    grid-template-columns: repeat(3, 1fr);

    & > .opt {
      margin-top: 15%;
      margin-left: 60%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }

    & > .logo {
      width: 100%;
    }
  }


  .modal__content {
    border-radius: 10px;
    position: relative;
    width: 60vh;
    height: 35vh;
    background: #fff;

    & > .title {
      font-size: 200%;
      font-family: "Fredoka One", cursive;
      background-color: #ff5e78;
      padding: 4%;
      text-align: center;
      color: white;
    }

    & > .text {
      padding: 5%;
      padding-top: 10%;
      font-size: 1.3vh;
      font-family: "Fredoka One", cursive;
      float: left;
      font-family: CetaMono;
      width: 60%;
    }

    & > .img {
      float: right;
      width: 40%;

      & > img {
        align-items: center;
        width: 15vh;
        float: right;
        margin-right: 10%;
        padding-top: 15%;
      }
    }
  }
}

//medium
@media (min-width: 800px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
  }

  .navbar {
    margin-bottom: 5%;
    padding-top: 3%;
    grid-template-columns: repeat(3, 1fr);

    & > .opt {
      margin-top: 15%;
      margin-left: 60%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }

    & > .logo {
      width: 100%;
    }
  }

.options {
    grid-template-columns: repeat(3, 1fr);
  }

  .modal__content {
    width: 100vh;
    height: 50vh;

    & > .title {
      font-size: 200%;
    }

    & > .text {
      padding-top: 6%;
      font-size: 2.4vh;
      float: left;
      width: 60vh;
      color : black;
      font-family: CetaMono;
    }

    & > .img {
      float: right;
      width: 40vh;

      & > img {
        width: 30vh;
        margin-right: 10%;
        padding-top: 3vh;
      }
    }
  }
}

//big-medium
@media (min-width: 900px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    height: 50%;
    font-family: CetaMono;
  }

  .navbar {
    margin-bottom: 2%;
    padding-top: 3%;

    & > .opt {
      margin-top: 9%;
      margin-left: 60%;
      font-size: 35px;

      & > a {
        margin: 2%;
      }
    }

    & > .logo {
      width: 60%;
    }
  }

  .options {
    grid-template-columns: repeat(3, 1fr);
  }

  .modal__content {
    width: 100vh;
    height: 50vh;

    & > .title {
      font-size: 200%;
    }

    & > .text {
      padding-top: 6%;
      font-size: 2.4vh;
      float: left;
      width: 60vh;
      color : black;
      font-family: CetaMono;
    }

    & > .img {
      float: right;
      width: 40vh;

      & > img {
        width: 30vh;
        margin-right: 10%;
        padding-top: 3vh;
      }
    }
  }
}

//big
@media (min-width: 1192px) {
  .page-content {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    padding-left: 4rem;
    padding-right: 4rem;
    height: 50%;
    font-family: CetaMono;
  }

  .navbar {
    margin-bottom: 2%;
    padding-top: 3%;

    & > .opt {
      margin-top: 9%;
      margin-left: 70%;
      font-size: 35px;

      & > a {
        margin: 2%;
        font-family: CetaMono;
      }
    }

    & > .logo {
      width: 60%;
    }
  }

  .options {
    grid-template-columns: repeat(3, 1fr);
  }

  .circles {
    height: 100vh;
  }

  .modal__content {
    width: 100vh;
    height: 50vh;

    & > .title {
      font-size: 200%;
      font-family: CetaMono;
    }

    & > .text {
      padding-top: 6%;
      font-size: 2.4vh;
      float: left;
      width: 60vh;
      color : black;
      font-family: CetaMono;
    }

    & > .img {
      float: right;
      width: 40vh;

      & > img {
        width: 30vh;
        margin-right: 10%;
        padding-top: 3vh;
      }
    }
  }
}

//form
@media (max-width: 767px) {
  .modal__contentProfil {
    width: 90%;
    height: 90vh;
    font-family: CetaMono;

    #opt {
      width: 100%;
      height: 100%;

      & button {
        padding: 5%;
        border-radius: 10px;
        margin-left: 2%;
        font-size: 3vh;
      }
    }

    & > .form {
      padding: 5%;
      padding-bottom: 2%;
      margin: 5%;
      width: 100%;

      & label {
        font-size: 1.5vh;
        font-family: CetaMono;
      }

      & input {
        height: 3.5vh;
        font-family: CetaMono;
      }

      & .title {
        font-size: 2.5vh;
        font-family: CetaMono;
      }

      & #button {
        & button {
          width: 70%;
          height: 4vh;
          font-family: CetaMono;
        }
      }
    }
  }
}

@media (max-width: 500px) {
  .modal__contentProfil {
    #opt {
      grid-column: 1/4;
      grid-row: 2/3;
      text-align: center;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      border: none;
      font-family: CetaMono;

      & button {
        border-radius: 10px;
        margin-left: 2%;
        float: right;
        padding: 1% !important;
        font-size: 3vh;
        border: none;
        font-family: CetaMono;
      }
    }

    & > .form {
      & .title {
        font-size: 1.7vh;
      }
    }
  }
}

.field {
  font-family: CetaMono;
}

h4 {
  font-family: CetaMono;
  color : black;
  font-weight: bold;
}

h2 {
  font-family: CetaMono;
  font-weight: bold;
}

#button {
  font-family: CetaMono;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.one {
  grid-column: 1/3 ;
}

.two {
  grid-column: 3/5;
}
.three {
  grid-column: 3/5;
}
.four {
  grid-column: 3/5;


}
a.white {
  vertical-align:middle;
  line-height: 70px;
  height : 70px;
}

.morpion {
  height : 70px;
  width : 70px;
}
</style>

