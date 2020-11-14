$(window).on('load', e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        if (!sessionStorage.allGames) {
            sessionStorage.allGames = JSON.stringify(JSON.parse($('#games').text())); 
            initGameList(JSON.parse($('#games').text())) 
        } 
        else{
            initGameList(JSON.parse(sessionStorage.allGames))
        }
    }    
})


const newLetterSearch = games => {
    let start = 0; 
    sessionStorage.start = start;
    sessionStorage.allGames = JSON.stringify(games);    
    renderGameList(start, games); 
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