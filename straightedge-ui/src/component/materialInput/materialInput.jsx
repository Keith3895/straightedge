import React from 'react';
import './materialInput.scss';
export class MaterialInput extends React.Component {
    state = {
        value: ""
    };
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        this.props.value(e.target.value);
        this.setState({ value: e.target.value });
    }
    render() {
        return (
            <div>
                <div className={`app-div ${this.state.value ? 'is-completed' : ''}`}>
                    <label htmlFor="id" className="app-label" >{this.props.placeHolder}</label>
                    <input data-testid={this.props.uid || new Date().getTime()} className="app-input" value={this.state.value} onChange={this.handleChange} />
                </div>
            </div>
        );
    }
}
