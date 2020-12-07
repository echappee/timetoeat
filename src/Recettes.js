import React, { Component } from 'react';
import './Recettes.css';


export class Recettes extends Component {
  render() {

    return (
      <div>
        <div className="text-center">
          <h2>Les recettes </h2>
        </div>

        <div className="card mb-3" style={{ Width: '100%' }}>
          <div className="row no-gutters">
            <div className="col-md-7">
              <img src="tmp/pexels-photo-5702980.jpeg" className="card-img" alt="repas de Noël" />
            </div>

            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">Les recettes de Noël</h5>
                <p className="card-text">A la recherche d'une recette traditionnelle ou d'une recette pour épater vos invités, nos équipes ont regroupé la crème de la crème des recettes de fin d'année !</p>
                <button className="btn btn-dark"> voir les recettes</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card mb-3" style={{ Width: '100%' }}>
          <div className="row no-gutters">
            <div className="col-md-7">
              <img src="tmp/pexels-roman-odintsov-4553378.jpg" className="card-img" alt="repas de Noël" />
            </div>

            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">Les linguines au homard</h5>
                <p className="card-text">L'alliance des pâtes et du homard. Simple et chic. </p>
                <button className="btn btn-dark"> voir la recette</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

