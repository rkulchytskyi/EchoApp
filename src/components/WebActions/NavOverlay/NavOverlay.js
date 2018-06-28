import React, { Component } from 'react'
import * as configActions from '../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class NavOverlay extends Component {
    
    constructor(props) {
        super(props);
        
        this.closeOverlay = this.closeOverlay.bind(this);
    }
    
    // nav overlay
    closeOverlay(){
        const {configActions, isNavOverlayOpen} = this.props;
        configActions.toggleNavOverlay(!isNavOverlayOpen);
    }
    
    render() {
        const {isNavOverlayOpen} = this.props;
        
        return(
           <div className={`${isNavOverlayOpen ? 'active': ''} nav-overlay`} onClick={this.closeOverlay}/>
        )
    }
}

function mapStateToProps(state){
    return {
        isNavOverlayOpen: state.config.isNavOverlayOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavOverlay)
