import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

  constructor() {
    super();
    this.state = {
      novoTweet: '',
      tweets: []
    };
    this.adicionaTweet = this.adicionaTweet.bind(this);
  }

  render() {

    let tweets;
    if (! this.state.tweets.length) {
        tweets = <p>Tweet algo pra timeline não ficar vazia.</p>;
    } else {
        tweets = this.state.tweets.map(
            (tweetInfo, index) => 
                <Tweet key={ tweetInfo + index} texto={tweetInfo} />
            );
    }

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
                    </form>
                </Widget>
                <Widget>
                    <TrendsArea />
                </Widget>
            </Dashboard>
            <Dashboard posicao="centro">
                <Widget>
                    <div className="tweetsArea">
                        { tweets }                          
                    </div>
                </Widget>
            </Dashboard>
        </div>
      </Fragment>
    );
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
