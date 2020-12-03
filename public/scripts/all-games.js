const newLetterSearch = (games, letter) => {
    let start = 0; 
    sessionStorage.start = start; 
    sessionStorage.setItem(letter, JSON.stringify(games)); 
    renderGameList(start, games); 
}

const searchByLetter = letter => {
    window.location.href = `search-games/${letter}`
}
