import React, { Component, Fragment } from 'react';
import './App.css';
import Cabecalho from './components/Cabecalho';
import { Botao1, Botao2 } from './components/Botao';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Cabecalho usuario="@alex_aquiles" />
        <Botao1 cor="red" texto="Teste 1"/>
        <Botao1 cor="blue" texto="Teste 2"/>
        <Botao2 tipo="danger">
          Teste Botao 2
        </Botao2>
      </Fragment>
    );
  }
}

export default App;
