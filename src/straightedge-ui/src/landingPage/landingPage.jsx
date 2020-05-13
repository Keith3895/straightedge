import React from 'react';
import './landingPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faFile, faBars } from '@fortawesome/free-solid-svg-icons'

export class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            path: "",
            expandStaus: {
                status: true,
                display: 'flex',
                width: '15%',
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    workspaceSelctor() {
        return (
            <div>
                <button className='primary-button' 
                // onClick={this.handleChange}
                > test</button>
                <h4>{this.state.path}</h4>
            </div>
        );
    }
    handleChange(event) {
        window.postMessage({
            type: 'select-dirs'
        })
        console.log(event)
        window.api.receive("fromMain", (data) => {
            this.setState({ path: data });
            console.log(`Received ${data} from main process`);
        });

    }
    listOfProjects = () => {
        return (
            <ul>
                <li>

                </li>
            </ul>
        );
    }
    header = () => {
        return (
            <div className='row ' style={{ width: '100%' }}>
                <div className='column ' style={{ width: '100%' }}>
                    <div className=' header ' style={{ width: '100%' }}>
                        <h1 style={{
                            padding: !this.state.expandStaus.status ? '.1em' : '.7em'
                        }}
                        >
                            <span style={{
                                display: this.state.expandStaus.status ? 'none' : 'flex'
                            }}>
                                StraightEdge
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        );
    }
    expandHandler = () => {
        return this.state.expandStaus ? "row-75" : "row-80";
    }
    mainContent = () => {
        return (
            <div className='content'>
                {this.header()}
                {this.workspaceSelctor()}
                <h1>landing page is here. {this.props.test}</h1>
            </div>
        );
    }
    changeSidenav = (event) => {
        console.log((this.state.expandStaus.status));
        let PrevStatus = this.state.expandStaus.status;
        this.setState({
            expandStaus: {
                status: !PrevStatus,
                display: PrevStatus ? 'none' : 'flex',
                width: PrevStatus ? '5%' : '15%',
            }
        });
    }
    sidnav() {
        return (
            <div className='side-nav transition-delay' style={{ width: this.state.expandStaus.width }}>
                <div className='row'>
                    <div className=' header' style={{ width: '90%', display: this.state.expandStaus.display }}>
                        <h3>StraightEdge</h3>
                    </div>
                    <button className='side-navButton' style={{
                        width: '10%',
                        padding: this.state.expandStaus.status ? '0px' : '15px'
                    }
                    } onClick={this.changeSidenav} >
                        <FontAwesomeIcon icon={faChevronLeft} color='white' transform="grow-3" style={{ display: this.state.expandStaus.display }} />
                        <FontAwesomeIcon icon={faBars} color='white' transform="grow-3" style={{ display: this.state.expandStaus.status ? 'none' : 'flex' }} />

                    </button>
                </div>
                <div className='side-navContent column'>
                    <div className='side-nav-button'>
                        <FontAwesomeIcon icon={faFile} color='white' transform="grow-3" />
                        <span style={{ display: this.state.expandStaus.display }}>
                            Documents
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className='flex-container'>
                <div className='row ' style={{ width: '100%' }}>
                    {this.sidnav()}
                    {this.mainContent()}
                </div>
            </div>
        );
    }
} 