import { connect } from 'react-redux';

import * as TweetsAPI from '../api/TweetsAPI';
import Tweet from '../components/Tweet';

const mapStateToProps = state => ({ quantidade: state.length })

const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id));
        },
        likeHandler: () => {
            dispatch(TweetsAPI.like(propsRecebidas.tweetInfo._id));
        }
    }
}

const TweetPadraoContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPadraoContainer;