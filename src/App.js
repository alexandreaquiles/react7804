import React, { Component, Fragment } from 'react';
import './App.css';
import Cabecalho from './components/Cabecalho';
import { Botao1, Botao2 } from './components/Botao';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho usuario="@alex_aquiles" />
      </Fragment>
    );
  }
}

export default App;
