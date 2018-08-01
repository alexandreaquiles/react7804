import React, { Component } from 'react';

class Botao extends Component {

    handleClick = () => {
        console.log(this.props.texto);
    }

    render() {
        return <button  onClick={ this.handleClick } >Botao</button>;
    }
}

export default Botao;