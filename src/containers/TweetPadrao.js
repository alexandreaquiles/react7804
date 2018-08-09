import { connect } from 'react-redux';

import * as TweetsAPI from '../api/TweetsAPI';
import Tweet from '../components/Tweet';

const mapStateToProps = state => {}

const mapDispatchToProps = (dispatch, propsRecebidas) => {
    return {
        removeHandler: () => {
            dispatch(TweetsAPI.remove(propsRecebidas.tweetInfo._id));
        }
    }
}

const TweetPadraoContainer = connect(mapStateToProps, mapDispatchToProps)(Tweet);

export default TweetPadraoContainer;