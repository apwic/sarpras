import React from "react";
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }
    render(){
        console.log(this.props.isOpen);
        if (!this.props.isOpen) return null;
        return(
            <div className="container__modal">
                <div className="overlay__modal"></div>
                <div className="modal__content">
                    <div className="modal__header">
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className="modal__body">
                        <div className="search__bar">
                            <input type="text" placeholder="Pencarian"/>
                        </div>
                        <div className="row__staff__modal">
                            <div className="name__staff__modal">
                                <h2>Sopo Jarwo</h2>
                                <p>sopoJarwo@gmail.com</p>
                            </div>
                        </div>
                        <div className="row__staff__modal">
                            <div className="name__staff__modal">
                                <h2>Sopo Jarwo</h2>
                                <p>sopoJarwo@gmail.com</p>
                            </div>
                        </div>
                    </div>    
                    <div className="modal__footer">
                        <div className="cancel__side">
                            <button className="button__cancel" onClick={this.props.onClose}>Cancel</button>
                        </div>
                        <div className="add__side">
                            <button className="button__add" onClick={this.props.onClose}>Tambah</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Modal