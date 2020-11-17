const newLetterSearch = (games, letter) => {
    let start = 0; 
    sessionStorage.start = start; 
    sessionStorage.setItem(letter, JSON.stringify(games)); 
    renderGameList(start, games); 
}

const searchByLetter = letter => {
    window.location.href = `search-games/${letter}`
    // if (JSON.parse(sessionStorage.getItem(letter))[0]) {
    //     let games = JSON.parse(sessionStorage.getItem(letter))
    //     window.location.href = `search-games/${letter}`
    //     return; 
    // }
    
    // const search = {
    //     letter
    // } 
    // $.ajax({
    //     type: 'POST', 
    //     url: '/search-by-letter', 
    //     contentType: 'application/json', 
    //     data: JSON.stringify(search), 
    //     success: (data) => { 
    //         // newLetterSearch(data, letter);
    //         sessionStorage.setItem(letter, data); 
    //         window.location.href = `search-games/${letter}`
    //     },
    //     error: (err) => {
    //         console.log(err) 
    //     }
    //  }) 
}
