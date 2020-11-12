
$(window).on('load', e => {
    if (typeof(Storage) !== 'undefined'){ 
        sessionStorage.games = JSON.stringify(JSON.parse($('#games').text()));
        sessionStorage.start = 0; 
    } 
    $('#search-form').trigger('reset');   
})

const newLetterSearch = games => {
    let start = 0; 
    sessionStorage.start = start;
    sessionStorage.games = JSON.stringify(games);    
    var newGames =``; 
    for(let i = start; i < start + 10; i++){
        newGames += `<button type = 'submit' onclick = '' class="search-games list-group-item list-group-item-action flex-column align-items-start">
        <div class="float-left">
            <h5 class="mb-1"> ${games[i].name}</h5>
        </div>
        ${games[i].cover ? `<img class = 'float-right' src = '${games[i].cover.url}' alt = 'game image' />` :  ``}
        </button> `
    }
    $('.alpha-games').html(newGames);
}

const searchByLetter = letter => {
    if (JSON.parse(sessionStorage.games)[0].name.startsWith(letter)) return; 
    const search = {
        letter
    } 
    $.ajax({
        type: 'POST', 
        url: '/search-by-letter', 
        contentType: 'application/json', 
        data: JSON.stringify(search), 
        success: (data) => {
            newLetterSearch(data); 
        },
        error: (err) => {
            console.log(err)
        }
     }) 
}

//NEED TO ADD ONCLICK FUNCTION TO NAVIGATE TO PAGE WITH ALL THE GAMES DETAILS
const nextPage = () => {
    if (parseInt(sessionStorage.start) == JSON.parse(sessionStorage.games).length -10) return; 
    let start = parseInt(sessionStorage.start) + 10; 
    sessionStorage.start = start;
    let games = JSON.parse(sessionStorage.games);   
    var newGames =``; 
    for(let i = start; i < start + 10 || start == games.length -1; i++){
        newGames += `<button type = 'submit' onclick = '' class="search-games list-group-item list-group-item-action flex-column align-items-start">
        <div class="float-left">
            <h5 class="mb-1"> ${games[i].name}</h5>
        </div>
        ${games[i].cover ? `<img class = 'float-right' src = '${games[i].cover.url}' alt = 'game image' />` :  ``}
        </button> `
    }
    $('.alpha-games').html(newGames); 
}

//NEED TO ADD ONCLICK FUNCTION TO NAVIGATE TO PAGE WITH ALL THE GAMES DETAILS
const prevPage = () => {
    if (parseInt(sessionStorage.start) == 0) return; 
    let start = parseInt(sessionStorage.start) - 10; 
    sessionStorage.start = start;
    let games = JSON.parse(sessionStorage.games);   
    var newGames =``; 
    for(let i = start; i < start + 10; i++){
        newGames += `<button type = 'submit' onclick = '' class="search-games list-group-item list-group-item-action flex-column align-items-start">
        <div class="float-left">
            <h5 class="mb-1"> ${games[i].name}</h5>
        </div>
        ${games[i].cover ? `<img class = 'float-right' src = '${games[i].cover.url}' alt = 'game image' />` :  ``}
        </button> `
    }
    $('.alpha-games').html(newGames); 
}


