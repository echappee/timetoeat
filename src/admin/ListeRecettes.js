import React, { Component } from 'react';
import axios from 'axios';

import './ListeRecettes.css';



export class ListeRecettes extends Component {

    constructor(props) {
        super(props);
        this.state = { recettes: [] }; // this.state est un objet, avec en attribut des recettes qui sont dans un tableau
        this.handleChangeRecetteMois = this.handleChangeRecetteMois.bind(this);
        this.deleteRecette = this.deleteRecette.bind(this)

    }

    componentDidMount() {
        fetch('/recettes')
            .then(response => response.json())
            .then(data => this.setState({ recettes: data.recettes }))

    }
    handleChangeRecetteMois(id, event) {
        const data = {recetteMois:event.target.checked}
        console.log(this.state.recettes);
        axios.put(`/recette/${id}`, data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.data.message)
                if(res.data.message !== 'ok') {
                }
            })
    }
    deleteRecette(id) {
        fetch(`/recette/${id}`, { method: 'DELETE' })
        .then(response => response.json())  //réponse json qui extrait la partie de la réponse du Serveur, ici un tableau
        .then(data => {
            console.log(data.message)
            // this state est  un objet, dans lequel il y a un tableau (ingrédient)
            // findIndex permet de retrouver l'index de l'élément du tableau supprimé
            // On passe à findIndex un argument-fonction 
            const index = this.state.recettes.findIndex(recette => recette.id_recette === id);
            // pour supprimer un élément dans un tableau, utiliser la méthode splice (argument = index car c'est l'id qu'on veut supprimer
            const updatedRecettes = this.state.recettes; // copie des ingrédients du state
            updatedRecettes.splice(index, 1); // supprimer l'ingrédient dans la copie
            this.setState({ recettes: updatedRecettes }) //nouvel état d'ingredients
        })
    }
    render() {
        return (
            <div className="row">
                {/* <div className="col"></div> */}
                <div className="col-11">
                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">photo</th>
                                <th scope="col">Description</th>
                                <th scope="col">Temps de préparation</th>
                                <th scope="col">Recette mois</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.recettes.map(recette =>
                                <tr key={recette.id_recette}>
                                    <td>{recette.nom_recette}</td>
                                    <td>
                                        <img src={recette.photo_url}/>
                                        </td>
                                    <td>{recette.description}</td>
                                    <td>{recette.duree}</td>
                                    <td>
                                        <input className="check-input" type="checkbox"
                                         defaultChecked={recette.recette_mois} 
                                         onChange={(event) => this.handleChangeRecetteMois(recette.id_recette, event)} />
                                    </td>
                                    <td>
                                        <a href="#" onClick={() => this.deleteRecette(recette.id_recette)}> <i className="material-icons">delete_outlined</i></a>
                                    </td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="col-2"></div>
            </div>

        )
    }

}


