import React from 'react';
import './newProject.scss';
export class NewProjectModal extends React.Component {
    state = {
        value:''
    };
    constructor(props) {
        super(props);
    }
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };
    onCloseOut = e => {
        let container = document.querySelector('.modal-container');
        if (e.target === container)
            this.props.onClose && this.props.onClose(e);
    };
    createProjectForm() {
        return (
            <div>
                <div className={`app-div ${this.state.value?'is-completed':''}`}>
                    <label htmlFor="id" className="app-label" >Project Name</label>
                    <input className="app-input" value={this.state.value} onChange={this.handleChange}  />
                </div>
            </div>
        );
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className='modal-container' onClick={this.onCloseOut}>
                <div className='modal' id="modal">
                    <h2>Create New Project</h2>
                    <div className="content">
                        {this.createProjectForm()}
                    </div>
                    <div className="actions">
                        <button className="toggle-button" onClick={this.onClose}>
                            close
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}