import React, {Component} from 'react';
import './Loader.css'

class Loader extends Component {
    render(){
        return (
            <div className="loader">
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
                <span className="loader-block"/>
            </div>
        )
    };
}

export default Loader;