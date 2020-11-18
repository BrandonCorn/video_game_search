$(window).on('load', e => {
    $('#search-form').trigger('reset');
    sessionStorage.start = 0;
    if (typeof(Storage) !== 'undefined'){ 
        let input = $('#search-input').text()
        let games = getGames(input); 
        if(isNewSearch){ 
            let newGames = JSON.parse($('#games').text())
            setGames(input, newGames); 
            setCurrentGames(newGames); 
            initGameList(newGames);        
        }
        else{ 
            // setCurrentGames(games); 
            // initGameList(games)
            if(!validateGamesSent()) {
                searchByInput(input); 
                console.log('we searched'); 
            }
            console.log('no search'); 
            initGameList(getCurrentGames()); 
        }
    } 
})
//create post request for games if there was an error loading the games

const isNewSearch = () => {
    let newSearch = !!parseInt($('#new-search').text())
    if (!!newSearch) return true
    else return false
}


const newLetterSearch = (letter) => {
    let start = 0; 
    resetStartGames(); 
    let games = getGames(letter); 
    if (typeof games === 'string' || !games){
        console.log('got here');
        const search = {
            letter
        } 
        $.ajax({
            type: 'POST', 
            url: '/search-by-letter', 
            contentType: 'application/json', 
            data: JSON.stringify(search), 
            success: (data) => { 
                // sessionStorage.setItem(letter, JSON.stringify(data));
                setGames(letter, data); 
                // sessionStorage.setItem('current', JSON.stringify(data));  
                setCurrentGames(data); 
                initGameList(data)
            },
            error: (err) => {
                console.log(err) 
            }
        })
    }  
    else {
        // sessionStorage.setItem('current', JSON.stringify(games));
        setCurrentGames(games); 
        initGameList(games);
    } 
}

const validateGamesSent = (games) => {
    if (typeof games === 'string') {
        return false;    
    }
    return true; 
}
const searchByInput = async input => {
    const search = {
        input
    }
    $.ajax({
        type: 'POST', 
        url: '/search-by-input', 
        data: JSON.stringify(search), 
        contentType: 'application/json', 
        success: data => {
            setGames(input, data); 
            setCurrentGames(data); 
            // initGameList(data); 
        },
        error: err => {
            console.log(error); 
        }
    })
}

const nextPage = input => {
    let games = getCurrentGames(); 
    if (parseInt(sessionStorage.start) + 5 >= games.length) return;
    slideOut('slide-out-left')   
    let start = parseInt(sessionStorage.start) + 5; 
    sessionStorage.start = start;   
    setTimeout(() => {
        renderGameList(start, games, 'slide-in-right');
    }, 300) 
}

const prevPage = input => {
    let games = getCurrentGames(); 
    if (parseInt(sessionStorage.start) == 0) return;
    slideOut('slide-out-right')
    let start = parseInt(sessionStorage.start) - 5; 
    sessionStorage.start = start;  
    setTimeout(() => {
        renderGameList(start, games, 'slide-in-left')
    }, 300); 
}


const removeSlideClasses = () => {
    let elements = [...document.querySelectorAll('.card')]
    elements.map(card => {
        card.classList.remove('slide-in-right')
        card.classList.remove('slide-out-right')
        card.classList.remove('slide-in-left')
        card.classList.remove('slide-out-left')
    })
}

const slideOut = (slide) => {
    let elements = [...document.querySelectorAll('.card')]
    elements.map(card => {
        card.classList.add(slide)
    })
}




