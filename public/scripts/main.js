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

const nextPage = games => {
    if (parseInt(sessionStorage.start) + 10 >= games.length) return; 
    let start = parseInt(sessionStorage.start) + 10; 
    sessionStorage.start = start;   
    renderGameList(start, games); 
}

const prevPage = games => {
    if (parseInt(sessionStorage.start) == 0) return; 
    let start = parseInt(sessionStorage.start) - 10; 
    sessionStorage.start = start;  
    renderGameList(start, games); 
}

const nextPageAllGames = () => {
    let games = JSON.parse(sessionStorage.allGames); 
    nextPage(games); 
}

const prevPageAllGames = () => {
    let games = JSON.parse(sessionStorage.allGames); 
    prevPage(games); 
}

const nextPageSearchGames = () => {
    let games = JSON.parse(sessionStorage.searchGames);  
    console.log(sessionStorage.searchGames); 
    nextPage(games); 
}

const prevPageSearchGames = () => {
    let games = JSON.parse(sessionStorage.searchGames); 
    prevPage(games); 
}


const getGameData = game => {
    let temp = game.split(':'); 
    const data = {
        id: parseInt(temp[0]), 
        name: temp[1]
    } 
    window.location.href = `/game/${data.id}/${data.name}`
}

