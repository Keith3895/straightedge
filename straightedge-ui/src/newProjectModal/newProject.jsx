import React from 'react';
import './newProject.scss';
import { MaterialInput } from '../materialInput/materialInput';
import axios from 'axios';
export class NewProjectModal extends React.Component {
    state = {
        value: '',
        showLoader:'none'
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
                <MaterialInput value={this.setprojectName} placeHolder='Project Name' />
                <MaterialInput value={this.setprojectDescription} placeHolder='Project Description' />
            </div>
        );
    }
    setprojectName = (name) => {
        this.setState({
            projectName: name
        });
    }
    setprojectDescription = (description) => {
        this.setState({
            projectDescription: description
        });
    }
    submit = (e) => {
        this.setState({
            showLoader:'block'
        });
        let projectInfo = {
            projectName: this.state.projectName,
            projectDescription: this.state.projectDescription
        }
        e['projectInfo'] = projectInfo;
        axios.post('http://localhost:3001/createProject', projectInfo).then(res => {
            this.setState({
                showLoader:'none'
            });
            this.onClose(e);
        });
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
                    <div className="actions row">
                        <button className="button pent-button" onClick={this.onClose}>
                            Cancel
                        </button>
                        <button className="button primary-button" onClick={this.submit}>
                            Submit
                        </button>
                        <div style={{ 'display': this.state.showLoader }}>
                            <div className="loader">
                                <div className="loader--dot"></div>
                                <div className="loader--dot"></div>
                                <div className="loader--dot"></div>
                                <div className="loader--dot"></div>
                                <div className="loader--dot"></div>
                                <div className="loader--dot"></div>
                                <div className="loader--text"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}