import React, { Component } from 'react';
import './Voyages.css';


export class Voyages extends Component {
  render() {
    return (
      <div>
        <h2 className="text-center">Faites vos jeux, on part !</h2>
        <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="tmp/pexels-photo-4678920.jpeg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="h1 font-weight-bold text-white">ROME</h5>
                <p className="h2 text-white font-weight-bold">Comme un Romain tu mangeras !</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="tmp/pexels-photo-1545510.jpeg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="h1 font-weight-bold text-white">LISBONNE</h5>
                <p className="h2 text-white font-weight-bold">Bohème et gourmande.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img src="tmp/pexels-photo-175934.jpeg" className="d-block w-100" alt="..." />
              <div className="carousel-caption d-none d-md-block">
                <h5 className="h1 font-weight-bold text-white">BARCELONE</h5>
                <p className="h2 text-white font-weight-bold">Architecture gothique et tapas sur les Ramblas</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon " aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}

