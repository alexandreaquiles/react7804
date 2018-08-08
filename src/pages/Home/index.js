import React, { Component, Fragment } from 'react';
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      novoTweet: '',
      tweets: [],
      tweetAtivo: {}
    };
    this.adicionaTweet = this.adicionaTweet.bind(this);
  }

  render() {

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario={ `@${localStorage.getItem('LOGIN')}` } />
        </Cabecalho>
        <div className="container">
            <Dashboard>
                <Widget>
                    <form className="novoTweet" onSubmit={ this.adicionaTweet }>
                        <div className="novoTweet__editorArea">
                            <span className={`
                                novoTweet__status
                                ${ this.state.novoTweet.length > 140 ? 'novoTweet__status--invalido' : ''}
                            `}> { this.state.novoTweet.length } /140</span>
                            <textarea className="novoTweet__editor" 
                                value={ this.state.novoTweet }
                                onInput={ (event) => this.setState({novoTweet: event.target.value}) }
                                placeholder="O que está acontecendo?"></textarea>
                        </div>
                        <button type="submit" 
                            disabled={ this.state.novoTweet.length > 140 ? true : false }
                            className="novoTweet__envia">Tweetar</button>
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        { this.getTweets() }                          
                    </div>
                </Widget>
            </Dashboard>
            <Modal fechaModal={this.fechaModal} isAberto={!!this.state.tweetAtivo._id}>
              <Widget>
                <Tweet
                  key={this.state.tweetAtivo._id}
                  removeHandler={event => this.removeTweet(this.state.tweetAtivo._id)}
                  texto={this.state.tweetAtivo.conteudo||''}
                  tweetInModal={true}
                  tweetInfo={this.state.tweetAtivo}
                  />
              </Widget>
            </Modal>
        </div>
      </Fragment>
    );
  }

  componentDidMount() {
    this.listarTweets();
    console.log('componentDidMount');
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.context.store.subscribe(() => {
        this.setState({
            tweets: this.context.store.getState()
        });
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  listarTweets() {
    fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then(response => response.json())
      .then(tweets => {
        console.log('Tweets recuperados');
        this.context.store.dispatch({ type: 'CARREGA_TWEETS', tweets });
      });
  }

  getTweets() {
    if (! this.state.tweets.length) {
        return <p>Tweet algo pra timeline não ficar vazia.</p>;
    } else {
        return this.state.tweets.map(
            (tweetInfo, index) => 
                <Tweet key={ tweetInfo._id }
                       texto={ tweetInfo.conteudo }
                       tweetInfo={ tweetInfo }
                       removeHandler={ event => this.removeTweet(tweetInfo._id) }
                       handleAbreModalParaTweet={ event => this.abreModalParaTweet(event, tweetInfo._id) } />
            );
    }
  }

  adicionaTweet(event) {
    event.preventDefault();
    const novoTweet = this.state.novoTweet;
    const tweetsAntigos = this.state.tweets;
    if (novoTweet) {
        fetch(`https://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        { method: 'POST', body: JSON.stringify( { conteudo: novoTweet }) })
        .then( response => response.json() )
        .then( novoTweetRegistradoNoServer => {
            this.setState({
                tweets: [ novoTweetRegistradoNoServer, ...tweetsAntigos ],
                novoTweet: ''
            });
        });
    }
  }

  removeTweet(idTweetQueVaiSerRemovido) {
    console.log(idTweetQueVaiSerRemovido);
    fetch(`https://twitelum-api.herokuapp.com/tweets/${idTweetQueVaiSerRemovido}/?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
      {method: 'DELETE'})
      .then(response => response.json())
      .then(response => {
        console.log(response);
        const listaDeTweetsAtualizada = this.state.tweets.filter( tweets => tweets._id !== idTweetQueVaiSerRemovido );
        this.setState({
          tweets: listaDeTweetsAtualizada,
          tweetAtivo: { }
        });
      })
  }

  abreModalParaTweet = (event, idSelecionado) => {
    const isTweetFooter = event.target.closest('.tweet__footer');
    if ( isTweetFooter ) {
        return false;
    }
    const tweetSelecionado = this.state.tweets.find( tweet => tweet._id === idSelecionado);

    this.setState({
        tweetAtivo: tweetSelecionado
    })
  }

  fechaModal = event => {
      const isModal = event.target.closest('.widget');
      if (!isModal) {
          this.setState({
              tweetAtivo: {}
          });
      }
  }
}

Home.contextTypes = {
    store: null
}

export default Home;
