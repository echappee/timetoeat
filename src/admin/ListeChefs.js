import React, { Component } from 'react';
import axios from 'axios';


export class ListeChefs extends Component {

    constructor(props) {
        super(props);
        this.state = { chefs: [] }; // this.state est un objet, avec en attribut des ingrédients qui sont dans un tableau
    }


    componentDidMount() {
        fetch('/chefs')
            .then(response => response.json())
            .then(data => this.setState({ chefs: data.chefs }))

    }
    handleChangeChefMois(id, event) {
        const data = { chefMois: event.target.checked }
        console.log(this.state.chefs);
        axios.put(`/chef/${id}`, data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.data.message)
                if (res.data.message !== 'ok') {
                }
            })
    }
    deleteChef(id) {
        fetch(`/chef/${id}`, { method: 'DELETE' })
            .then(response => response.json())  //réponse json qui extrait la partie de la réponse du serveur, ici un tableau
            .then(data => {
                console.log(data.message)
                // this state est  un objet, dans lequel il y a un tableau (ingrédient)
                // findIndex permet de retrouver l'index de l'élément du tableau supprimé
                // On passe à findIndex un argument-fonction 
                const index = this.state.chefs.findIndex(chef => chef.id_chef === id);
                // pour supprimer un élément dans un tableau, utiliser la méthode splice (argument = index car c'est l'id qu'on veut supprimer
                const updatedChefs = this.state.chefs; // copie des ingrédients du state
                updatedChefs.splice(index, 1); // supprimer l'ingrédient dans la copie
                this.setState({ chefs: updatedChefs }) //nouvel état d'ingredients
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
                                <th scope="col">Chef du mois</th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.chefs.map(chef =>
                                <tr key={chef.id_chef}>
                                    <td>{chef.nom_chef}</td>
                                    <td>
                                        <img src={chef.photo_url} />
                                    </td>
                                    <td>{chef.description}</td>
                                    <td>
                                        <input className="check-input" type="checkbox"
                                            defaultChecked={chef.chef_mois}
                                            onChange={(event) => this.handleChangeChefMois(chef.id_chef, event)} />
                                    </td>
                                    <td>
                                        <a href="#" onClick={() => this.deleteChef(chef.id_chef)}> <i className="material-icons">delete_outlined</i></a>
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