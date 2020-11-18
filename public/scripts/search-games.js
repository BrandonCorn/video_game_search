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
            if(!validateGames(games)) {
                searchByInput(input); 
            }
            else{
                initGameList(getCurrentGames()); 
            }
        }
    } 
})

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
        const search = {
            letter
        } 
        $.ajax({
            type: 'POST', 
            url: '/search-by-letter', 
            contentType: 'application/json', 
            data: JSON.stringify(search), 
            success: (data) => { 
                setGames(letter, data);  
                setCurrentGames(data); 
                initGameList(data)
            },
            error: (err) => {
                console.log(err) 
            }
        })
    }  
    else {
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
    const search = { input }

    $.ajax({
        type: 'POST', 
        url: '/search-by-input', 
        data: JSON.stringify(search), 
        contentType: 'application/json', 
        success: data => {
            setGames(input, data); 
            setCurrentGames(data);
            initGameList(data);  
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




