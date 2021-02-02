let villeChoisie; //= "saint-saulve"; //*2.1 on supprime la valeur de la variable villeChoisie

//recevoirTemperature(villeChoisie); //*2.2 on commente l'appel de la fonction recevoirTemperature(villeChoisie) pour éviter l'affichage des popups

// *2.3 Vérifier que la geolocation soit disponible
if ('geolocation' in navigator) {
    navigator.geolocation.watchPosition((position) => {
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude); //les coordonnées sont bien affichées dans la console

        //*2.3 mise en place requête AJAX
        // modification de l'url (site API)
        const url = 'https://api.openweathermap.org/data/2.5/weather?lon=' + position.coords.longitude + '&lat=' + position.coords.latitude + '&appid=dc8c9152e8adaad0ec8bf635818c0d42&units=metric';
        //console.log(url);
        let requete = new XMLHttpRequest(); // Nous créons un objet qui nous permettra de faire des requêtes
        requete.open('GET', url); // Nous récupérons juste des données
        requete.responseType = 'json'; // Nous attendons du JSON
        requete.send(); // Nous envoyons notre requête

        // Dès qu'on reçoit une réponse, cette fonction est executée
        requete.onload = function () {
            if (requete.readyState === XMLHttpRequest.DONE) {
                if (requete.status === 200) {
                    let reponse = requete.response;
                    // console.log(reponse);
                    let temperature = reponse.main.temp;
                    let ville = reponse.name;
                    // console.log(temperature);
                    document.querySelector('#temperature_label').textContent = temperature;
                    document.querySelector('#ville').textContent = ville;
                }
                else {
                    alert('Un problème est intervenu, merci de revenir plus tard.');
                }
            }
        }
    }, erreur, options);

}
else {
    //alert('Le navigateur ne supporte pas la geolocalisation'); //et si c'est le cas afficher la geolocalisation de San Francisco par défaut
    villeChoisie = 'San Francisco';
    recevoirTemperature(villeChoisie);
}

var options = {
    enableHighAccuracy: true
}

let changerDeVille = document.querySelector('#changer');
changerDeVille.addEventListener('click', () => {
    villeChoisie = prompt('Quelle ville souhaitez-vous voir ?');
    recevoirTemperature(villeChoisie);
});

//*2.4 Création de la fonction erreur
function erreur() {
    villeChoisie = 'San Francisco';
    recevoirTemperature(villeChoisie);
}

//Fonction 
function recevoirTemperature(ville) {

    //URL du site qui renvoie le document JSON
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=9475ab79b57072017a830d1a4ab5da82&units=metric';

    //Requete AJAX
    let requete = new XMLHttpRequest();
    requete.open('GET', url);
    requete.responseType = 'json';
    requete.send();

    requete.onload = function () {
        if (requete.readyState === XMLHttpRequest.DONE) {
            if (requete.status === 200) {
                let reponse = requete.response;
                //console.log(reponse);
                let temperature = reponse.main.temp;
                document.querySelector('#temperature_label').textContent = temperature;
                //let reponseVille = requete.response;
                let ville = reponse.name;
                document.querySelector('#ville').textContent = ville;
            } else {
                alert('Un problème est survenu, veuillez entrer un nom de ville valide.');
            }
        }
    }

}


  //*Etape 2.0.0: Mise en place de la géolocalisation automatique de l'user sur l'app