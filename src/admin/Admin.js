import React, { Component } from 'react';
// CreationIngredient se trouve dans Admin dc ps besoin de le rajouter dans App.js
import { CreationIngredient } from './CreationIngredient';
import { ListeIngredients } from './ListeIngredients';

import { ListeRecettes } from './ListeRecettes';
import { AjoutRecette } from './AjoutRecette';

import { AjoutVoyage } from './AjoutVoyage';
import { ListeVoyages } from './ListeVoyages';

import { AjoutChef } from './AjoutChef';
import { ListeChefs } from './ListeChefs';


export class Admin extends Component {
    render() {
        return (

            <div>
                <ul className="nav nav-tabs"  role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="ingredients-tab" data-toggle="tab" href="#ingredients" role="tab" aria-controls="ingredients" aria-selected="true">Ingrédients</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="recettes-tab" data-toggle="tab" href="#recettes" role="tab" aria-controls="recettes" aria-selected="false">Recettes</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="voyages-tab" data-toggle="tab" href="#voyages" role="tab" aria-controls="voyages" aria-selected="false">Voyages</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="chefs-tab" data-toggle="tab" href="#chefs" role="tab" aria-controls="chefs" aria-selected="false">Chefs</a>
                    </li>
                </ul>
                <div className="tab-content" >
                    <div className="tab-pane fade show active" id="ingredients" role="tabpanel" aria-labelledby="ingredients-tab">
                        <CreationIngredient />
                        <ListeIngredients />
                    </div>
                    <div className="tab-pane fade" id="recettes" role="tabpanel" aria-labelledby="recettes-tab">
                        <AjoutRecette />
                        <ListeRecettes />
                    </div>
                    <div className="tab-pane fade" id="voyages" role="tabpanel" aria-labelledby="voyages-tab">
                        <AjoutVoyage/>
                        <ListeVoyages />
                    </div>
                    <div className="tab-pane fade" id="chefs" role="tabpanel" aria-labelledby="chefs-tab">
                        <AjoutChef/>
                        <ListeChefs />
                    </div>
                </div>
            </div>
        )
    }
}