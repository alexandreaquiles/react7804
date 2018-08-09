export const carrega = () => {
    return dispatch => {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
            .then(response => response.json())
            .then( tweets => {
                dispatch({ type: 'CARREGA_TWEETS', tweets });
            });
    }
}