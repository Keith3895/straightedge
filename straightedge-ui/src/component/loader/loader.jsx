import React from 'react';

export class Loader extends React.Component {
    render() {
        return (
            <div >
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
        );
    }
}