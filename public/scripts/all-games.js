$(window).on('load', async e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        if (!sessionStorage.getItem($('#letter').text())){
            sessionStorage.setItem('currentLetter', 'a')
            sessionStorage.setItem($('#letter').text(), JSON.stringify(JSON.parse($('#games').text())))
            initGameList(JSON.parse($('#games').text()))
            let allGames = JSON.parse($('#all-games').text()); 
            await setAllGames(allGames); 
        }
        else{
            sessionStorage.setItem('currentLetter', 'a'); 
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
        sessionStorage.setItem('currentLetter', letter); 
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
            sessionStorage.setItem('currentLetter', letter); 
            newLetterSearch(data, letter); 
        },
        error: (err) => {
            console.log(err)
        }
     }) 
}

const setAllGames = games => {
    return new Promise( (resolve, reject) => {
        resolve()
        console.log(games); 
        Object.entries(games).forEach(game => {
            const [key, value] = game; 
            // sessionStorage.setItem(key, JSON.stringify(value)); 
            if(sessionStorage.getItem(key) != JSON.stringify(value)) sessionStorage.setItem(key, JSON.stringify(value))
        })
        return resolve()
    })
}