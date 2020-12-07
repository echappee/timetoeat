import React, { Component } from 'react';
// import './ListeIngredients.css';


export class ListeIngredients extends Component {

    constructor(props) {
        super(props);
        this.state = { ingredients: [] }; // this.state est un objet, avec en attribut des ingrédients qui sont dans un tableau
    }

    
    //Il faut utiliser la méthode componentDidMount pour utiliser fetch //Affichage Ajax
    componentDidMount() {
        fetch('/ingredients')
            .then(response => response.json())
            .then(data => this.setState({ ingredients: data.ingredients }))
    }

    deleteIngredient(id) {
        fetch(`/ingredient/${id}`, { method: 'DELETE' })
            .then(response => response.json())  //réponse json qui extrait la partie de la réponse du Serveur, ici un tableau
            .then(data => {
                console.log(data.message)
                // this state est  un objet, dans lequel il y a un tableau (ingrédient)
                // findIndex permet de retrouver l'index de l'élément du tableau supprimé
                // On passe à findIndex un argument-fonction 
                const index = this.state.ingredients.findIndex(ingredient => ingredient.id_ingredient === id);
                // pour supprimer un élément dans un tableau, utiliser la méthode splice (argument = index car c'est l'id qu'on veut supprimer
                const updatedIngredients = this.state.ingredients; // copie des ingrédients du state
                updatedIngredients.splice(index, 1); // supprimer l'ingrédient dans la copie
                this.setState({ ingredients: updatedIngredients }) //nouvel état d'ingredients
            })

    }

    render() {
        return (
            <div className="row">
                <div className="col-2"></div>
                <div className="col-7">
                    <table className="table" >
                        <thead>
                            <tr>
                                <th scope="col">Nom</th>
                                <th scope="col">Catégorie</th>
                                <th scope="col">Vegetarien </th>
                                <th scope="col">Supprimer</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.state.ingredients.map(ingredient =>
                                <tr key={ingredient.id_ingredient}>
                                    <td>{ingredient.nom}</td>
                                    <td>{ingredient.categorie}</td>
                                    <td>
                                        {(ingredient.vegetarien === true) ?
                                            <i className="material-icons">done</i> :
                                            <i className="material-icons">clear</i>
                                        }
                                    </td>
                                    <td>
                                        <a href="#" onClick={() => this.deleteIngredient(ingredient.id_ingredient)}> <i className="material-icons">delete_outlined</i></a>
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
