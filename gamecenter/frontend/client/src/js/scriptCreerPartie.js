//Pour vérifier le choix de la partie (Publique/Privée)
function radioCheck(){
    if(document.getElementById('partiePublique').checked == true){
        document.getElementById('niveauJeu').style.display='block';
        document.getElementById('infoPartiePriv').style.display='none';      
    }
    else if(document.getElementById('partiePrivee').checked == true){
        document.getElementById('niveauJeu').style.display='block';
        document.getElementById('infoPartiePriv').style.display='block';     
    }
}
//Pour choisir l'avatar
function choixAvatar(id){
    if(id === 'avatargreen'){
        document.getElementById(id).style.border='1px solid black';
        document.getElementById('avatarred').style.border='none';
        document.getElementById('avataryellow').style.border='none';
        document.getElementById('avataraqua').style.border='none';
        return document.getElementById('avatargreen');

    }else if(id === 'avatarred'){
        document.getElementById(id).style.border='1px solid black';
        document.getElementById('avatargreen').style.border='none';
        document.getElementById('avataryellow').style.border='none';
        document.getElementById('avataraqua').style.border='none';
        return document.getElementById('avatarred');

    }else if(id === 'avataryellow'){
        document.getElementById(id).style.border='1px solid black';
        document.getElementById('avatargreen').style.border='none';
        document.getElementById('avatarred').style.border='none';
        document.getElementById('avataraqua').style.border='none';
        return document.getElementById('avataryellow');

    }else if(id === 'avataraqua'){
        document.getElementById(id).style.border='1px solid black';
        document.getElementById('avatargreen').style.border='none';
        document.getElementById('avatarred').style.border='none';
        document.getElementById('avataryellow').style.border='none';
        return document.getElementById('avataraqua');
    }
}
// pour récuperer l'avatar choisis
function avatarColor(){
    if(document.getElementById('avatargreen').style.border == '1px solid black'){
        return "green";
    }else if(document.getElementById('avatarred').style.border == '1px solid black'){
        return "red";
    }else if(document.getElementById('avataryellow').style.border == '1px solid black'){
        return "yellow";
    }else if(document.getElementById('avataraqua').style.border == '1px solid black'){
        return "aqua";
    }else return "";
}
//Pour récuperer le type de la partie
function typeChoisis(){
    if(document.getElementById('partiePublique').checked == true)
        return document.getElementById('partiePublique');
    else if(document.getElementById('partiePrivee').checked == true)
        return document.getElementById('partiePrivee');
    else return "";
}

// Pour récuperer le niveau choisis
function niveauChoisis(){
    if(document.getElementById('menuFacile').checked == true){
        return "Facile";
    }else if(document.getElementById('menuIntermediaire').checked == true){
        return "Intermediaire";
    }else if(document.getElementById('menuDifficile').checked == true){
        return "Difficile";
    }
    return "";
}
//Boutton pour creer une partie 
function creer(){
    var nom = "";
    var avatar = "";
    var type = "";
    var niveau = "";
    if(document.getElementById('nomPartie').value == ""){
        alert('saisir le nom svp');
    }else{
        avatar = avatarColor();
        if(avatar == ""){
                alert('choisissez un avatar svp');
        }else if(document.getElementById('partiePublique').checked == true){
            document.getElementById('niveauJeu').style.display='block';
            niveau = niveauChoisis();
            if(niveau == ""){
                alert('veuillez choisir le niveau svp');
            }else{
                nom = document.getElementById('nomPartie').value;//avatar
                type = "Publique";//niveau
                
                alert('creation de la partie... nom :' + nom + ', avatar : '+ avatar +' type :' + type + ', niveau : ' + niveau);
                // CODE DE LA FONCTION CREER PARTIE PUBLIQUE pour envoyé les données au lobby
                return document.getElementById('nomPartie').value,avatar,type,niveau;
            }
        }else if(document.getElementById('partiePrivee').checked == true){
            console.log('privee');
            document.getElementById('niveauJeu').style.display='block';
            niveau = niveauChoisis();
            if(niveau == ""){
                 alert('veuillez choisir le niveau svp');
            }else{
                nom = document.getElementById('nomPartie').value;//avatar
                type = "Publique";//niveau

                alert('creation de la partie... nom :' + nom + ', avatar : '+ avatar +' type :' + type + ', niveau : ' + niveau);
                // CODE DE LA FONCTION CREER PARTIE PRIVEE pour envoyé les données au lobby
                return document.getElementById('nomPartie').value,avatar,type,niveau;
            }                        
        }else{
                alert('veuillez choisir le type de la partie Public/privée');
        }             
    }   
}
