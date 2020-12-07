import React, { Component } from 'react';
import './Reseaux.css';

export class Reseaux extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div id="reseaux">
                <a href="https://www.instagram.com/"> <i className="material-icons">camera</i> </a>
                <a href="https://twitter.com/"> <i className="material-icons">anchor</i></a>
                <a href="https://www.facebook.com/"> <i className="material-icons">facebook</i></a>
            </div>
        );
    }
}