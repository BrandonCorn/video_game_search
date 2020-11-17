$(window).on('load', e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        let input = $('#search-input').text()
        let games = sessionStorage.getItem(input)
        let newSearch = !!parseInt($('#new-search').text())
        if(isNewSearch){
            let newGames = JSON.parse($('#games').text())
            sessionStorage.setItem(input, JSON.stringify(newGames))
            initGameList(newGames);        
        }
        else{
            initGameList(JSON.parse(games))
        }
    } 
})

const isNewSearch = () => {
    let newSearch = !!parseInt($('#new-search').text())
    if (!!newSearch) return true
    else return false
}


