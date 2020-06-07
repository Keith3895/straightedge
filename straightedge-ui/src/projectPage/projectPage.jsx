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
                    <div className="projects" >
                        <div className='diamond'></div>
                        <div style={{ overflow: 'scroll', height: "100%" }}>
                            <ul className="timeline">
                                <li>
                                    <div className="direction-r">
                                        <div className="flag-wrapper">
                                            <span className="flag start">click</span>
                                            <span className="time-wrapper"><span className="time">2013</span></span>
                                        </div>
                                        <div className="desc">
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint fugit fugiat suscipit ullam,
                                            ipsum ut nulla, eligendi est dolor dolores ad natus officiis ducimus quis illum! Soluta quos optio eos.
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint fugit fugiat suscipit ullam,
                                            ipsum ut nulla, eligendi est dolor dolores ad natus officiis ducimus quis illum! Soluta quos optio eos.
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint fugit fugiat suscipit ullam,
                                            ipsum ut nulla, eligendi est dolor dolores ad natus officiis ducimus quis illum! Soluta quos optio eos.
                                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint fugit fugiat suscipit ullam,
                                            ipsum ut nulla, eligendi est dolor dolores ad natus officiis ducimus quis illum! Soluta quos optio eos.
                                        <br />
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint fugit fugiat suscipit ullam,
                                        ipsum ut nulla, eligendi est dolor dolores ad natus officiis ducimus quis illum! Soluta quos optio eos.
                                    </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="direction-r">
                                        <div className="flag-wrapper">
                                            <span className="flag">click</span>
                                            <span className="time-wrapper"><span className="time">2013</span></span>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="direction-l">
                                        <div className="flag-wrapper">
                                            <span className="flag">click</span>
                                            <span className="time-wrapper"><span className="time">2013</span></span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}