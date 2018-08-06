import React from 'react'
import { withRouter } from 'react-router';
import './navMenu.css'

const NavMenu  = function (props) {
    function fazerLogout() {
        localStorage.removeItem('TOKEN');
        props.history.push('/login');
    }

        return (
            <nav className="navMenu">
                <ul className="navMenu__lista">
                <li className="navMenu__item">
                    <a className="navMenu__link">
                        Bem vindo(a): <br />
                        <strong>{ props.usuario }</strong>
                    </a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" href="">Página Inicial</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link">Hashtags</a>
                </li>
                <li className="navMenu__item">
                    <a className="navMenu__link" onClick={ fazerLogout }>Logout</a>
                </li>
                </ul>
            </nav>
        )
}

export default withRouter(NavMenu);