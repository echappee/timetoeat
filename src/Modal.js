import React, { Component } from 'react';
// import './Modal.css';


export class Modal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            // < !--Scrollable modal-- >
            // <!-- Button trigger modal -->
            <div>
                {/* <button type="button" className"btn btn-primary" data-toggle="modal" data-target="#staticBackdrop" /> */}

                <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Politique de confidentialité</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">

                                Nous et nos nos partenaires utilisons et stockons des informations non sensibles par le dépôt de cookies ou équivalent sur votre appareil. Le traitement de vos données personnelles, comme votre adresse IP, nous permettent de mesurer notre audience et de vous proposer, par exemple, des fonctionnalités et contenus personnalisés.
                                Cliquez sur "Accepter" pour consentir ou paramétrez vos choix. Vous pouvez modifier vos préférences à tout moment sur notre site.
                                Certains partenaires ne demandent pas votre consentement et traitent vos données d’après leur l’intérêt commercial légitime. Vous pouvez vous y opposer en cliquant sur "Gérer mes choix".
                                Avec nos partenaires, nous traitons les données suivantes en nous basant sur votre consentement et/ou notre intérêt légitime:
                                Données de géolocalisation précises et identification par analyse du terminal, Publicités et contenu personnalisés, mesure de performance des publicités et du contenu, données d’audience et développement de produit, Stocker et/ou accéder à des informations sur un terminal
                        </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Understood</button>
                            </div>
                        </div>
                    </div>
                </div >
            </div >

        )
    }

}