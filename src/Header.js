import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';



export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu() {
        this.setState({
            open: !this.state.open
        })

    }

    render() {
        return (
            <div>
                <div id="sideBar" className={this.state.open ? "open" : ""}>
                    <i onClick={this.toggleMenu} className="material-icons clear">clear</i>
                    <nav>
                        <Link to={'/'} onClick={this.toggleMenu} className="nav-link"> Home </Link>
                        <Link to={'/recettes'} onClick={this.toggleMenu} className="nav-link"> Recettes </Link>
                        <Link to={'/voyages'} onClick={this.toggleMenu} className="nav-link"> Voyages </Link>
                        <Link to={'/chefs'}  onClick={this.toggleMenu} className="nav-link"> Les chefs </Link>
                        <Link to={'/backend'}  onClick={this.toggleMenu} className="nav-link"> Admin </Link>

                    </nav>
                </div>

                <header>
                    <div className="container-fluid py-3">
                        <div className="row">
                            <div className="col d-flex align-items-center">
                                <div id="burger">
                                    <a href="#">
                                        <i onClick={this.toggleMenu} className="material-icons">list</i>
                                        {this.props.value}
                                    </a>
                                </div>
                            </div>

                            <div className="col d-flex align-items-center">
                                <div className="text-center h1">TIME TO EAT _ </div>
                            </div>
                            <div className="col d-flex flex-row-reverse align-items-center">
                                <input type="text" placeholder="recherche" />
                                <i className="material-icons loupe">search</i>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        );
    }
}
