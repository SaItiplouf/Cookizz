async function getMessage(){
    let response = await fetch('./handler.php');
    let data = await response.json();

    const html = data.reverse().map(function(message) { // on va donner un modèle , et l'incrémenter avec les données qui seront saisies et on va inverser le tableau pour avoir les derniers messages saisis en bas :
        return `  
        <div class = 'message'>
        <span class = 'author' style='color : ${message.color}'> ${message.name} : </span>
        <span class = 'content'> ${message.content}</span>
        </div>
        `
    }).join('');

    const messages = document.querySelector('.messages') 
    messages.innerHTML = html;
    messages.scrollTop = messages.scrollHeight; 
}

async function getUser(){
    let response = await fetch('./handler.php');
    let data = await response.json();

    const html = data.map(function(message) { // on va donner un modèle , et l'incrémenter avec les données qui seront saisies et on va inverser le tableau pour avoir les derniers messages saisis en bas :
        return `  
        <div class = 'message'>
        <span class = 'author' style='color : ${message.color}'> ${message.name} </span>
        </div>
        `
    }).join('');

    const messages = document.querySelector('.nicknames') 
    messages.innerHTML = html;
    messages.scrollTop = messages.scrollHeight; 
}

async function postMessage(event) {
    event.preventDefault();
    let form = document.querySelector('#formulaire');
    let content = document.querySelector('#content').value.trim();

    if (!author || !content) {
        return; // Sortir de la fonction si les champs ne sont pas remplis
    }

    let data = new FormData(form);

    fetch('./handler.php?task=write', {
        method: 'post',
        body: data,
    }).then(() => getMessage()).then(() => getUser())

    content.value = '';
}

getMessage();
getUser();