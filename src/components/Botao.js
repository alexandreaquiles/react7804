import React, { Component } from 'react';

class Botao extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log(this.props.texto);
    }

    render() {
        return <button  onClick={ this.handleClick } >Botao</button>;
    }
}

export default Botao;