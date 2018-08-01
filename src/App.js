import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      novoTweet: '',
      tweets: [],
      valor: 100
    };
    this.adicionaTweet = this.adicionaTweet.bind(this);
  }

  render() {

    return (
      <Fragment>
        <Cabecalho>
          <NavMenu usuario="@alex_aquiles" />
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
                        <button style={{marginRight: 10}}
                            onClick={ this.clickHandler }
                            className="novoTweet__envia">Incrementar { this.state.valor } </button>
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
        </div>
      </Fragment>
    );
  }

  clickHandler = () => {
    this.incrementa();
    this.incrementa();
  }

  incrementa() {
      this.setState( { valor: this.state.valor + 1 });
  }

  getTweets() {
    if (! this.state.tweets.length) {
        return <p>Tweet algo pra timeline não ficar vazia.</p>;
    } else {
        return this.state.tweets.map(
            (tweetInfo, index) => 
                <Tweet key={ tweetInfo + index} texto={tweetInfo} />
            );
    }
  }

  adicionaTweet(event) {
    event.preventDefault();
    const novoTweet = this.state.novoTweet;
    const tweetsAntigos = this.state.tweets;
    if (novoTweet) {
        this.setState({
            tweets: [ novoTweet, ...tweetsAntigos ],
            novoTweet: ''
        });
    }
  }
}

export default App;
