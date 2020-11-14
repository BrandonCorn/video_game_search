$(window).on('load', e => {
    if (typeof(Storage) !== 'undefined'){ 
        sessionStorage.searchGames = JSON.stringify(JSON.parse($('#games').text()))
        sessionStorage.start = 0; 
    } 
    
    $('#search-form').trigger('reset');   
})