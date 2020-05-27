import React from 'react';
import './modal.scss';
export class Modal extends React.Component {
    state = {
        value: '',
        showLoader: 'none'
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
    submit = (e) => {
        this.props.onSubmit && this.props.onSubmit(e);
    }
    showCancel = () => {
        return this.props.showCancel ? 'block' : 'none';
    }
    showSubmit = () => {
        return this.props.showSubmit ? 'block' : 'none';
    }
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className='modal-container' onClick={this.onCloseOut}>
                <div className='modal' id="modal">
                    <h2>{this.props.title}</h2>
                    <div className="content">
                        {this.props.children}
                    </div>
                    <div className="actions row">
                        <button className="button pent-button" onClick={this.onClose} style={{ 'display': this.showCancel() }}>
                            Cancel
                        </button>
                        {/* will call onSubmit callback */}
                        <button className="button primary-button" onClick={this.submit} style={{ 'display': this.showSubmit() }}>
                            Submit
                        </button>
                    </div>
                </div>
            </div >
        );
    }
}