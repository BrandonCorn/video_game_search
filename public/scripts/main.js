$(window).on('load', async e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        if(!validateGamesByLetterSet()){
            let allGames = JSON.parse($('#all-games').text()); 
            await setAllGames(allGames); 
        }
    }    
})

const validateGamesByLetterSet = () => {
    if(!sessionStorage.getItem('games-by-letter-set')) {
        sessionStorage.setItem('games-by-letter-set', 'true')
        return false; 
    }
    else {
        return true; 
    }
}

const setAllGames = games => {
    return new Promise( (resolve, reject) => {
        resolve()
        Object.entries(games).forEach(game => {
            const [key, value] = game; 
            if(sessionStorage.getItem(key) != JSON.stringify(value)) sessionStorage.setItem(key, JSON.stringify(value))
        })
        return resolve()
    })
}

const renderGameList = (start, games) => {  
    var newGames =``; 
    for(let i = start; i < start + 10 && i != games.length -1; i++){
        newGames += `<button type = 'submit' onclick = 'getGameData(this.value)' value = "${games[i].id}:${games[i].name}" class="search-games list-group-item list-group-item-action flex-column align-items-start">
        <div class="float-left">
            <h5 class="mb-1"> ${games[i].name}</h5>
        </div>
        ${games[i].cover ? `<img class = 'float-right' src = '${games[i].cover.url}' alt = 'game image' />` :  ``}
        </button> `
    }
    $('.alpha-games').html(newGames);
}


const initGameList = games => {
    let start = parseInt(sessionStorage.start); 
    renderGameList(start, games); 
}

const nextPage = input => {
    let games = JSON.parse(sessionStorage.getItem(input));
    if (parseInt(sessionStorage.start) + 10 >= games.length) return;   
    let start = parseInt(sessionStorage.start) + 10; 
    sessionStorage.start = start;   
    renderGameList(start, games); 
}

const prevPage = input => {
    let games = JSON.parse(sessionStorage.getItem(input));
    if (parseInt(sessionStorage.start) == 0) return;
    let start = parseInt(sessionStorage.start) - 10; 
    sessionStorage.start = start;  
    renderGameList(start, games); 
}

const getGameData = game => {
    let temp = game.split(':'); 
    const data = {
        id: parseInt(temp[0]), 
        name: temp[1]
    } 
    window.location.href = `/game/${data.id}/${data.name}`
}

