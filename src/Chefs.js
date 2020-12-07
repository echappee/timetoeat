
import React, { Component } from 'react';
import './Chefs.css';


export class Chefs extends Component {
  render() {
    return (
      <div>
        <h2>Les repas de chef à se faire livrer </h2>
        <div className="card mb-3" style={{ Width: '100%' }}>
          <div className="row no-gutters">
            <div className="col-md-7">
              <img src="tmp/IMG_1793.jpeg" className="card-img" alt="repas de Noël" />
            </div>

            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">Septime à la maison</h5>
                <p className="card-text">Un menu qui change chaque semaine. Des plats différents  chaque jour. Une option menu végétarien. Comme d'habitude tout est bien réfléchi chez Septime.
                Et possibilité de s'accompagner de belles quilles choisies par le sommelier.</p>
                <button className="btn btn-dark"> voir le menu</button>
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-3" style={{ Width: '100%' }}>
          <div className="row no-gutters">
            <div className="col-md-7">
              <img src="tmp/Viande-01_750x500_crop_center.progressive.jpg" className="card-img" alt="repas de Noël" />
            </div>

            <div className="col-md-4">
              <div className="card-body">
                <h5 className="card-title">Frenchie at Home</h5>
                <p className="card-text">Un menu qui change chaque semaine. Une exécution parfaite des plats qui retrouvent leur superbe dans votre cuisine.
                </p>
                <button className="btn btn-dark"> voir le menu</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

