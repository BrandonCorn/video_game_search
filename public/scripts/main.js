$(window).on('load', async e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        if(!validateGamesByLetterSet()){
            let allGames = JSON.parse($('#all-games').text()); 
            await setAllGames(allGames);
            $('#games').html('')
            $('#all-games').html('')
        }
    }    
})

const validateGamesByLetterSet = () => {
    if(!sessionStorage.getItem('games-by-letter-set')) {
        sessionStorage.setItem('games-by-letter-set', 'true')
        return false; 
    }
    else {
        return true; 
    }
}

const setAllGames = games => {
    return new Promise( (resolve, reject) => {
        resolve()
        Object.entries(games).forEach(game => {
            const [key, value] = game; 
            if(sessionStorage.getItem(key) != JSON.stringify(value)) sessionStorage.setItem(key, JSON.stringify(value))
        })
        return resolve()
    })
}

const renderGameList = (start, games, slide) => { 
    var newGames = ``; 
    for(let i = start; i < start + 5 && i != games.length -1; i++){
        newGames += `
        <div class="card my-5 my-md-0 bg-transparent text-center ${slide ? slide : ''}">
            ${games[i].cover ? `<img class="card-img-top mx-auto" src="${games[i].cover.url.replace('t_thumb', 't_cover_big')}" alt="Game Cover">` : `<h1 class = 'text-center card-img-missing'> ? </h1> `}
            <div class="card-body">
                <p class="card-text text-light text-center"> ${games[i].name}</p>
                <a href = '/game/${games[i].id}/${games[i].name}' class = 'stretched-link'> </a> 
            </div>
        </div>`
    }
    $('.alpha-games').html(newGames)
    setTimeout(removeSlideClasses, 900) 
}


const initGameList = games => {
    let start = parseInt(sessionStorage.start); 
    renderGameList(start, games, 'slide-in-right'); 
}

const setCurrentGames = games => {
    sessionStorage.setItem('current', JSON.stringify(games))
}

const getCurrentGames = () => {
    if (typeof sessionStorage.getItem('current') === String || !sessionStorage.getItem('current')) return false; 
    return JSON.parse(sessionStorage.getItem('current'))
}

const setGames = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

const getGames = key => {
    return JSON.parse(sessionStorage.getItem(key))
}

const resetStartGames = () => {
    sessionStorage.setItem('start', 0); 
}


const getGameData = game => {
    let temp = game.split(':'); 
    const data = {
        id: parseInt(temp[0]), 
        name: temp[1]
    } 
    window.location.href = `/game/${data.id}/${data.name}`
}


