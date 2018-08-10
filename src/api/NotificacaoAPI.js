export const notifica = mensagem => {
    return dispatch => {
        dispatch({ type: 'ADD_NOTIFICACAO', notificacao: mensagem})
        setTimeout(() => {
            dispatch( { type: 'REMOVE_NOTIFICACAO'})
        }, 2000);
    }
}

