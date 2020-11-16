$(window).on('load', async e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        if (!sessionStorage.getItem($('#letter').text())){
            sessionStorage.setItem($('#letter').text(), JSON.stringify(JSON.parse($('#games').text())))
            initGameList(JSON.parse($('#games').text()))
        }
        else{
            let games = JSON.parse(sessionStorage.getItem($('#letter').text()))
            let allGames = JSON.parse($('#all-games').text())  
            initGameList(games)
            await setAllGames(allGames); 
        }
    }    
})


const newLetterSearch = (games, letter) => {
    let start = 0; 
    sessionStorage.start = start; 
    sessionStorage.setItem(letter, JSON.stringify(games)); 
    renderGameList(start, games); 
}

const searchByLetter = letter => {
    if (sessionStorage[letter]) {
        let games = JSON.parse(sessionStorage.getItem(letter))
        renderGameList(parseInt(sessionStorage.start), games)
        return; 
    }
    const search = {
        letter
    } 
    $.ajax({
        type: 'POST', 
        url: '/search-by-letter', 
        contentType: 'application/json', 
        data: JSON.stringify(search), 
        success: (data) => {
            newLetterSearch(data, letter); 
        },
        error: (err) => {
            console.log(err)
        }
     }) 
}

