import React, { Component } from 'react'
import Widget from '../../components/Widget'

import './loginPage.css'


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mostraErro: false
        }
    }

    render() {
        return (
            <div className="loginPage">
                <div className="container">
                    <Widget>
                        <h1 className="loginPage__title">Twitelum</h1>
                        <form 
                            onSubmit={ this.fazerLogin }
                            className="loginPage__form" action="/">
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="login">Login</label> 
                                <input 
                                    ref={ inputLogin => this.inputLogin = inputLogin }
                                    onChange={ this.onUpdateLogin }
                                    className="loginPage__input" type="text" id="login" name="login"/>
                            </div>
                            <div className="loginPage__inputWrap">
                                <label className="loginPage__label" htmlFor="senha">Senha</label> 
                                <input 
                                    ref={ inputSenha => this.inputSenha = inputSenha }
                                    className="loginPage__input" type="password" id="senha" name="senha"/>
                            </div>
                            { this.state.mostraErro && <div className="loginPage__errorBox">
                                Usuário e/ou senha inválidos.
                            </div> }
                            <div className="loginPage__inputWrap">
                                <button className="loginPage__btnLogin" type="submit">
                                    Logar
                                </button>
                            </div>
                        </form>
                    </Widget>
                </div>
            </div>
        )
    }

    fazerLogin = event => {
        event.preventDefault();

        const dadosDeLogin = {
            login: this.inputLogin.value,
            senha: this.inputSenha.value
        }

        fetch('https://twitelum-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(dadosDeLogin)
        })
        .then(response => {
            if (!response.ok)
                throw response;
            return response.json();
        })
        .then(responseEmJSON => { 
            console.log(responseEmJSON)
            return responseEmJSON;
        })
        .then(responseEmJSON => {
            localStorage.setItem('TOKEN', responseEmJSON.token);
            localStorage.setItem('LOGIN', dadosDeLogin.login);
            this.props.history.push('/');
        })
        .catch(responseError => {
            responseError.json().then(erroEmJSON => {
                console.error(erroEmJSON);
                this.setState({ mostraErro: true });
            });
        });
    }


    onUpdateLogin = () => {
        if (this.inputLogin.value.length >= 10) {
            this.inputSenha.focus();
        }
    }
}


export default LoginPage