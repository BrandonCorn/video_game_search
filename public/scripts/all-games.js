$(window).on('load', e => {
    if (typeof(Storage) !== 'undefined'){ 
        if (!sessionStorage.allGames) sessionStorage.allGames = JSON.stringify(JSON.parse($('#games').text()))
        sessionStorage.start = 0; 
    } 
    
    $('#search-form').trigger('reset');   
})



const newLetterSearch = games => {
    let start = 0; 
    sessionStorage.start = start;
    sessionStorage.allGames = JSON.stringify(games);    
    var newGames =``; 
    for(let i = start; i < start + 10; i++){
        newGames += `<button type = 'submit' onclick = 'getGameData(this.value)' value = "${games[i].id}:${games[i].name}" class="search-games list-group-item list-group-item-action flex-column align-items-start">
        <div class="float-left">
            <h5 class="mb-1"> ${games[i].name}</h5>
        </div>
        ${games[i].cover ? `<img class = 'float-right' src = '${games[i].cover.url}' alt = 'game image' />` :  ``}
        </button> `
    }
    $('.alpha-games').html(newGames);
}

const searchByLetter = letter => {
    if (JSON.parse(sessionStorage.allGames)[0].name.startsWith(letter)) return; 
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