//URL du site qui renvoie le document JSON

let ville = "Douala";
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
            alert('Un problème est survenu, merci de revenir plus tard.');
        }
    }
}
