import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Modal from '../../components/Modal'

import Tweet from '../../containers/TweetPadrao'
import * as TweetsAPI from '../../api/TweetsAPI'

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
                  texto={this.state.tweetAtivo.conteudo||''}
                  tweetInModal={true}
                  tweetInfo={this.state.tweetAtivo}
                  />
              </Widget>
            </Modal>
            {this.context.store.getState().notificacao && (
                <div className="notificacaoMsg">
                    {this.context.store.getState().notificacao}
                </div>
                )}
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
            tweets: this.context.store.getState().tweets.lista,
            tweetAtivo: this.context.store.getState().tweets.tweetAtivo
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
    this.context.store.dispatch(TweetsAPI.carrega());
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
                       handleAbreModalParaTweet={ event => this.abreModalParaTweet(event, tweetInfo._id) } />
            );
    }
  }

  adicionaTweet = (event) => {
    event.preventDefault();
    this.context.store.dispatch(TweetsAPI.adiciona(this.state.novoTweet));
    this.setState({
        novoTweet: ''
    });
  }

  abreModalParaTweet = (event, idSelecionado) => {
    const isTweetFooter = event.target.closest('.tweet__footer');
    if ( isTweetFooter ) {
        return false;
    }
    const tweetSelecionado = this.state.tweets.find( tweet => tweet._id === idSelecionado);
    this.context.store.dispatch({type: 'ADD_TWEET_ATIVO', tweetSelecionado});
  }

  fechaModal = event => {
      const isModal = event.target.closest('.widget');
      if (!isModal) {
        this.context.store.dispatch({type: 'REMOVE_TWEET_ATIVO'});
      }
  }
}

Home.contextTypes = {
    store: PropTypes.object
}

export default Home;
