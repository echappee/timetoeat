import React, { Component } from 'react';
import './Home.css';


export class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recettes: [],
            voyages: [],
            chefs: []
        };

    }// 
    // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes // /// should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
    componentDidMount() {
        // fetch('/recettes?recetteDuMois=true')
        //     .then(response => response.json())
        //     .then(data => this.setState({ recettes: data.recettes, voyages: this.state.voyages }))
        // fetch('/voyages?voyageDuMois=true')
        //     .then(response => response.json())
        //     .then(data => this.setState({ voyages: data.voyages, recettes: this.state.recettes }))
        // fetch('/chefs?chefDuMois=true')
        //     .then(response => response.json())
        //     .then(data => this.setState({ chefs: data.chefs, voyages: this.state.voyages, recettes: this.state.recettes }))

        Promise.all([
            fetch('/recettes?recetteDuMois=true'),
            fetch('/voyages?voyageDuMois=true'),
            fetch('/chefs?chefDuMois=true')
        ])
            .then(responses => Promise.all(responses.map(response => response.json())))
            .then(([dataRecettes, dataVoyages, dataChefs]) => {
                this.setState({
                    recettes: dataRecettes.recettes,
                    voyages: dataVoyages.voyages,
                    chefs: dataChefs.chefs
                })
            })
    }

    render() {
        return (
            <div>
                {/* <!-- ------------------------RECHERCHE-------------------------------- --> */}
                <div className="quoi">
                    <div className="row">
                        <div className="col-3">
                        </div>

                        <div className="col-8">
                            <p>
                                Je choisis en fonction de mes ingrédients ou du temps que j'ai:
                             </p>
                            <input id="recherche" />
                            <button type="submit" className="btn btn-primary bouton_recherche">Rechercher</button>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                </div>

                {/* // <!-- ---------------------------RECETTES DU MOIS--------------------- --> */}
                {/* // <!-- -------titre-----------> */}
                <div className="selection_du_mois">
                    <div className="row background">
                        <div className="col-4">
                        </div>
                        <div className="col-8">
                            <h2>LES RECETTES DU MOIS</h2>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                    {/* CARD DECK */}
                    <div className="background">
                        <div className="card-deck ">
                            {this.state.recettes.map(recette =>
                                <div key={recette.id_recette} className="card">
                                    <img src={recette.photo_url} className="card-img-top" alt="..." />

                                    <div className="card-body">
                                        <h5 className="card-title">{recette.nom_recette}</h5>
                                        <p className="card-text">{recette.description}</p>
                                        <p className="card-text"><small className="text-muted">temps de préparation: {recette.duree}mn</small></p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>


                {/* LES VOYAGES DU MOIS  */}

                <div className="selection_du_mois">
                    <div className="row background">
                        <div className="col-4">
                        </div>
                        <div className="col-8">
                            <h2>LES VOYAGES DU MOMENT</h2>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                    {/* CARD DECK */}
                    <div className="background">
                        <div className="card-deck">
                            {this.state.voyages.map(voyage =>
                                <div key={voyage.id_voyage} className="card">
                                    <img src={voyage.photo_url} className="card-img-top" alt="..." />

                                    <div className="card-body">
                                        <h5 className="card-title">{voyage.nom_voyage}</h5>
                                        <p className="card-text">{voyage.description}</p>
                                        {/* <p className="card-text"><small className="text-muted">temps de préparation: {voyage.duree}mn</small></p> */}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="selection_du_mois">
                    <div className="row background">
                        <div className="col-4">
                        </div>
                        <div className="col-8">
                            <h2>LE CHEF EN VOGUE</h2>
                        </div>
                        <div className="col-2">
                        </div>
                    </div>
                    {/* CARD DECK */}
                    <div className="background">
                        <div className="card-deck">
                            {/* <div className="card"> */}
                            {this.state.chefs.map(chef =>
                                <div key={chef.id_chef} className="card">
                                    <img src={chef.photo_url} className="card-img-top figure-img img-fluid rounded" alt="photo du chef" />

                                    <div className="card-body">
                                        <h5 className="card-title">{chef.nom_chef}</h5>
                                        <p className="card-text">{chef.description}</p>
                                    </div>
                                </div>
                            )}
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
