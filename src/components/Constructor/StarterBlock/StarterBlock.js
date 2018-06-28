import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class StarterBlock extends Component {
    render() {
        return (
            <div className="featured-texts">
                <div className="container">
                    <h2 className="featured-text-title head-line-big white-st">DIGITALE KAPITALMARKTKONZEPTE</h2>
                    <p className="featured-text-pera sub-line">Innovativ. Unkorreliert. Volle Transparenz.</p>
                </div>
                <div
                    className="featured-line-and-text featured-line-style w-inline-block"
                >
                    <img alt="" src="img/pfeil-xl.svg" className="featured-line-image w-hidden-tiny" />
                    <img alt="" src="img/pfeil-s.svg"
                         className="featured-line-and-text featured-line-image-sm w-hidden-main
                         w-hidden-medium w-hidden-small"
                    />
                    <NavLink to="/products" className="featured-name btn-arrow-big white-st">PRODUKTE</NavLink>
                </div>
            </div>
        
        );
    }
}

export default StarterBlock;

