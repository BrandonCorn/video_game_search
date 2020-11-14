$(window).on('load', e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        let sameSearch = !!parseInt($('#same-search').text())
        if(!sameSearch){
            sessionStorage.searchGames = JSON.stringify(JSON.parse($('#games').text())) 
            initGameList(JSON.parse($('#games').text()))
        }
        else{
            initGameList(JSON.parse(sessionStorage.searchGames))
        }
    } 
})