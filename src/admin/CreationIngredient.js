import React, { Component } from 'react';
import './CreationIngredients.css';


export class CreationIngredient extends Component {

    // Creation de la liste catgerie ingredient (réutilsable)
    static categories = [
        'fruit',
        'legume',
        'viande',
        'poisson'
    ]

    constructor(props) {
        super(props);
        this.state = { nom: '', categorie: '', vege:'' };
        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.handleChangeCategorie = this.handleChangeCategorie.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeVege = this.handleChangeVege.bind(this);


    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(JSON.stringify(this.state));
        //Fetch est une requete AJax 
        fetch('/ingredient', {
            method: 'POST',
            body: JSON.stringify(this.state), // stringify prend un obj et le transforme en txt (l'inverse = parser)
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => console.log(data))
    }

    handleChangeNom(event) {
        console.log(event.target.value);
        this.setState({ nom: event.target.value });
    }

    handleChangeCategorie(event) {
        console.log(event.target.value);
        this.setState({ categorie: event.target.value });
    }

    handleChangeVege(event) {
        console.log(event.target.checked);
        this.setState({ vege: event.target.checked });
    }



    render() {
        return (
            <div className="row">
                <div className="col-2">  </div>
                <div className="col-8">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-row align-items-center">
                            <div className="col-sm-3 my-1">
                                <label className="sr-only" htmlFor="inlineFormInputName">Nom ingrédient</label>
                                <input type="text" onChange={this.handleChangeNom} className="form-control" id="inlineFormInputName" placeholder="Nom ingrédient" />
                            </div>

                            <div className="col-sm-3 my-1">
                                <div className="input-group">

                                    <select className="form-control" onChange={this.handleChangeCategorie} id="inlineFormInputCategorie">
                                        <option></option>
                                        {CreationIngredient.categories.map(categorie =>
                                            <option key={categorie}>{categorie}</option>)}
                                    </select><br />
                                </div>
                            </div>
                            <div className="col-auto my-1">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox"  onChange={this.handleChangeVege} />
                                    <label className="form-check-label" htmlFor="autoSizingCheck2">
                                        Option végétarienne
                                    </label>
                                </div>
                            </div>
                            <div className="col-auto my-1">
                                <button type="submit" className="btn btn-secondary">Ajouter</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        )


    }
}