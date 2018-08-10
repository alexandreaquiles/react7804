import { connect } from 'react-redux';

import * as TweetsAPI from '../api/TweetsAPI';
import * as NotificacaoAPI from '../api/NotificacaoAPI';

import Tweet from '../components/Tweet';

const mapStateToProps = state => ({ quantidade: state.length })

const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id));
            dispatch(NotificacaoAPI.notifica('Tweet excluído com sucesso'));
        },
        likeHandler: () => {
            dispatch(TweetsAPI.like(propsRecebidas.tweetInfo._id));
        }
    }
}

const TweetPadraoContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPadraoContainer;