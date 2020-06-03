import React from 'react';
import './projectPage.scss';

export class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            path: "",
            showNewProject: false,
            expandStaus: {
                status: true,
                display: 'flex',
                width: '15%',
            }
        };
    }
    componentDidMount = () => {

        console.log(this.props.location);
    }
    scenarioPicker = () => {
        return (
            <div className='side-nav transition-delay' style={{ width: '20%' }}>
                <div className='side-navContent column'>
                    <div className="side-nav-title">
                        Scenarios
                    </div>
                    <div className='side-nav-button'>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className='column ' style={{ width: '100%' }}>
                <div className=' header' style={{ width: '100%' }}>
                    <h3>StraightEdge</h3>
                </div>
                <div className='row'>
                    {this.scenarioPicker()}
                    <div className="projects">
                    <div className='diamond'></div>
                    </div>
                </div>

            </div>
        );
    }
}