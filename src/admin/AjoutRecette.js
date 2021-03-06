import React, { Component } from 'react';
import axios from 'axios';

export class AjoutRecette extends Component {

    constructor(props) {
        super(props);
        this.state = { nom: '', photo: '', selectedFile: null, description: '', duree: null};
        this.handleChangeNom = this.handleChangeNom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeDuree = this.handleChangeDuree.bind(this);


    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log(JSON.stringify(this.state));

        const data = new FormData()
        data.append('file', this.state.selectedFile)
        data.append('nom', this.state.nom)
        data.append('description', this.state.description)
        data.append('duree', this.state.duree)

        console.log(data)
        axios.post("/recette", data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => { // then print response status
                console.log(res.data.message)
            })

        //Fetch est une requete AJax 
        // fetch('/recette', {
        //     method: 'POST',
        //     body: JSON.stringify(this.state), // stringify prend un obj et le transforme en txt (l'inverse = parser)
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // }).then(response => response.json())
        //     .then(data => console.log(data))
    }
    handleChangeNom(event) {
        console.log(event.target.value);
        this.setState({ nom: event.target.value });
    }
    handleChangeFile(event) {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleChangeDescription(event) {
        console.log(event.target.value);
        this.setState({description: event.target.value});
    }

    handleChangeDuree(event) {
        console.log(event.target.value);
        this.setState({duree: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="post">
                <div className="form-row">
                    <div className="col-2">  </div>

                    <div className="col-5 mb-2">
                        <input type="text" onChange={this.handleChangeNom} className="form-control" placeholder="Nom recette" />
                    </div>

                    <div className="col">
                        <input type="file" name="photo" classs="form-control" onChange={this.handleChangeFile} />
                    </div>

                    <div className="col-2">  </div>

                    <div className="col-5">
                        <input type="text" className="form-control"  onChange={this.handleChangeDescription} placeholder="Description" />
                    </div>

                    <div className="col-2">
                        <input type="textarea" className="form-control" onChange={this.handleChangeDuree} placeholder="temps préparation" />
                    </div>

                    <div className="col-auto my-1">
                        <button ype="submit" className="btn btn-secondary" >Ajouter</button>
                    </div>
                </div>
            </form>
        )
    }
}
