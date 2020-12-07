import React, { Component } from 'react';
import axios from 'axios';

export class ListeVoyages extends Component {
    constructor(props) {
        super(props);
        this.state = { voyages: [] }; // this.state est un objet, avec en attribut des voyages qui sont dans un tableau
        this.handleChangeVoyageMois = this.handleChangeVoyageMois.bind(this);
        this.deleteVoyage = this.deleteVoyage.bind(this)

    }

    componentDidMount() {
        fetch('/voyages')
            .then(response => response.json())
            .then(data => this.setState({ voyages: data.voyages }))

    }

    handleChangeVoyageMois(id, event) {
        const data = {voyageMois:event.target.checked}
        console.log(this.state.voyages);
        axios.put(`/voyage/${id}`, data)
            .then(res => {
                console.log(res.data.message)
                if(res.data.message !== 'ok') {
                }
            })
    }
    deleteVoyage(id) {
        fetch(`/voyage/${id}`, { method: 'DELETE' })
        .then(response => response.json())  //réponse json qui extrait la partie de la réponse du Serveur, ici un tableau
        .then(data => {
            console.log(data.message)
            // this state est  un objet, dans lequel il y a un tableau (ingrédient)
            // findIndex permet de retrouver l'index de l'élément du tableau supprimé
            // On passe à findIndex un argument-fonction 
            const index = this.state.voyages.findIndex(voyage => voyage.id_recette === id);
            // pour supprimer un élément dans un tableau, utiliser la méthode splice (argument = index car c'est l'id qu'on veut supprimer
            const updatedVoyages = this.state.voyages; // copie des ingrédients du state
            updatedVoyages.splice(index, 1); // supprimer l'ingrédient dans la copie
            this.setState({ voyages: updatedVoyages }) //nouvel état d'ingredients
        })
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-11">
                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">photo</th>
                                <th scope="col">Description</th>
                                <th scope="col">Voyages du mois</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.voyages.map(voyage =>
                                <tr key={voyage.id_voyage}>
                                    <td>{voyage.nom_voyage}</td>
                                    <td>
                                        <img src={voyage.photo_url}/>
                                        </td>
                                    <td>{voyage.description}</td>
                                    <td>
                                        <input className="check-input" type="checkbox"
                                         defaultChecked={voyage.voyage_mois} 
                                         onChange={(event) => this.handleChangeVoyageMois(voyage.id_voyage, event)} />
                                    </td>
                                    <td>
                                        <a href="#" onClick={() => this.deleteVoyage(voyage.id_voyage)}> <i className="material-icons">delete_outlined</i></a>
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
