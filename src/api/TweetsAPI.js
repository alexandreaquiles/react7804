export const carrega = () => {
    return dispatch => {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then( tweets => {
                dispatch({ type: 'CARREGA_TWEETS', tweets });
            });
    }
}

export const adiciona = novoTweet => {
    return dispatch => {
        if (novoTweet) {
            fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            { method: 'POST', body: JSON.stringify( { conteudo: novoTweet }) })
            .then( response => response.json() )
            .then( novoTweetRegistradoNoServer => {
                dispatch({ type: 'ADICIONA_TWEETS', novoTweet: novoTweetRegistradoNoServer});
            });
        }
    }
}

export const remove = idTweetQueVaiSerRemovido => {
    return dispatch => {
        fetch(`https://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}/?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
            {method: 'DELETE'})
            .then(response => response.json())
            .then(response => {
                console.log(response);
               dispatch({ type: 'REMOVE_TWEET', idTweetQueVaiSerRemovido});
            })
    }
}

