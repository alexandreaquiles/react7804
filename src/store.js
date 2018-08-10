import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

function tweetsReducer(state={lista: [], tweetAtivo: {}}, action={}) {
    if (action.type === 'CARREGA_TWEETS') {
        return {
            ...state,
            lista: action.tweets
        }
    }

    if (action.type === 'ADICIONA_TWEETS') {
        return {
            ...state,
            lista: [action.novoTweet, ...state.lista]
        }
    }

    if (action.type === 'REMOVE_TWEET') {
        const listaDeTweetsAtualizada = state.lista.filter( tweet => tweet._id !== action.idTweetQueVaiSerRemovido );
        return {
            ...state,
            lista: listaDeTweetsAtualizada
        }
    }

    if (action.type === 'REMOVE_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: {}
        }
    }

    if (action.type === 'ADD_TWEET_ATIVO') {
        return {
            ...state,
            tweetAtivo: action.tweetSelecionado
        }
    }

    if (action.type === 'LIKE') {
        const listaDeTweetsAtualizada = state.lista.filter(tweet => {
            if (tweet._id === action.idTweetLikeado) {
                const { likeado, totalLikes } = tweet;
                if (tweet.likeado) {
                    tweet.likes = tweet.likes.filter(like => like.usuario.login !== action.liker);
                } else {
                    tweet.likes = [ { usuario: { login: action.liker } }, ...tweet.likes ]
                }
                tweet.likeado = !likeado;
                tweet.totalLikes = likeado ? totalLikes - 1 : totalLikes + 1;
            }
            return tweet
        });
        const tweetAtivoAtualizado = listaDeTweetsAtualizada.find( tweet => tweet._id === state.tweetAtivo._id);
        return {
            tweetAtivo: { ...tweetAtivoAtualizado } || {},
            lista: listaDeTweetsAtualizada
        }
    }

    return state;
}

const store = createStore(tweetsReducer, applyMiddleware(thunk));

console.log(`Primeira versão da store: `, store.getState());

window.store = store;

export default store;