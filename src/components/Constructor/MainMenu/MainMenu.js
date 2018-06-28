import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import scrollToComponent from 'react-scroll-to-component'
import LoginModal from '../../Modals/LoginModal';
import * as configActions from '../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fixedMenu: false
        };

	    this.showFixedMenu = this.showFixedMenu.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.toggleLogin = this.toggleLogin.bind(this);
        this.onChangeLink = this.onChangeLink.bind(this);
    }

	componentDidMount() {
		window.addEventListener('scroll', this.showFixedMenu, true);
		scrollToComponent(document.getElementById(window.location.hash && window.location.hash.slice(1)), { offset: 0, align: 'middle', duration: 500, ease:'inCirc'});
		this.showFixedMenu();
    }

	onChangeLink(event){
        event.preventDefault();
        const links = document.querySelectorAll('.nav-link');
        const tagA = event.target.nodeName === "a" ? event.target : event.target.closest('a');
        const href = tagA && tagA.dataset.href;
        const element = document.getElementById(href);
        const menuBtn = document.querySelector('.menu-button');
        
        links.forEach((item) => {
            item.classList.remove('active');
        });
        
        event.target.classList.add('active');
        
        if (!element) {
            this.setState({redirectToLogin: href})
        }
        scrollToComponent(element, { offset: -60, align: 'top', duration: 500, ease:'inCirc'});
        setTimeout(() => window.location.hash = href, 500);
        menuBtn.click();
    }
    
    /* Login popup */
    toggleLogin(){
        const {configActions, isNavOverlayOpen, isLoginPopupOpen} = this.props;
        isNavOverlayOpen && configActions.toggleNavOverlay(!isNavOverlayOpen);
        isLoginPopupOpen ? configActions.toggleLoginPopup(false) : configActions.toggleLoginPopup(true);
    }
    
	showFixedMenu(){
		const element = this.mainMenuNode;
        if(!element) return;
		let rect = element.getBoundingClientRect();
		let visibleY = function() {
			return rect.bottom > 0 &&
				rect.right > 0 &&
				rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
				rect.top >= -60;
		};

		if(!visibleY(element)){

		    this.setState({
                fixedMenu: true
            });
		    
			const elem = document.querySelector('.fixed-nav');
			const elemSvg = document.querySelector('.hero-graphic');
			if(elem) elem.classList.add('active');
			if(elemSvg) elemSvg.classList.add('active');

			if(rect.top === 0 && elem){
                this.setState({
                    fixedMenu: false
                });
				elem.classList.remove('active');
				if(elemSvg) elemSvg.classList.remove('active');
			}
			
		}

	}
    
    toggleMenu(){
        const {configActions, isNavOverlayOpen} = this.props;
        configActions.toggleNavOverlay(!isNavOverlayOpen);
    }

    render() {
        const {
            isNavOverlayOpen,
            isLoginPopupOpen
        } = this.props;
        
        const { redirectToLogin, fixedMenu } = this.state;

        // fix cursor in right place for login modal
        const iOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);

        iOS &&
        isLoginPopupOpen ?
            document.body.style.position = 'fixed' :
            document.body.setAttribute('style', '');
        
        if (redirectToLogin) return <Redirect to={`/#${redirectToLogin}`}/>;
        
        return (
            <div id="main-menu" ref={node => this.mainMenuNode = node} className={` ${fixedMenu ? 'fixed': ' ' } main-menu `}>
                <div className="fixed-nav w-nav">
                    <div className="last-button w-inline-block" onClick={this.toggleLogin}>
                        <div className="w-hidden-small w-hidden-tiny">KONTAKT</div>
                        <div className="last-button-line w-hidden-small w-hidden-tiny"/>
                        <img alt="" src="https://daks2k3a4ib2z.cloudfront.net/598ee498c327c10001ed9e40/59944aa60ffdc50001cc3834_Investieren_Button.svg" className="w-hidden-main w-hidden-medium"/>
                    </div>
                    <nav className={`nav-menu w-nav-menu ${isNavOverlayOpen ? 'slide-down' : 'slide-up'}`}>
                        <div className="nav-menu__content">
                            <a href="/" className="invest-menu w-hidden-main w-inline-block">
                                <div>Investieren</div>
                                <div className="invest-underline"/>
                            </a>
                            <NavLink to="/about" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>ÜBER</span></NavLink>
                            <NavLink to="/strategy" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>STRATEGIE</span></NavLink>
                            <NavLink to="/products" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>PRODUKTE</span></NavLink>
                            <NavLink to="/career" onClick={this.toggleMenu} className="nav-link nav-stl w-nav-link"><span>KARRIERE</span></NavLink>
                            <a data-href='kontakt' href="#kontakt" className="nav-link nav-stl w-nav-link" onClick={this.onChangeLink}>
                                <span>Kontakt</span>
                            </a>
                        </div>
                    </nav>
                    <div className="container w-container">
                        <NavLink to="/" className="brand w-nav-brand w--current">
                            <img src={`${this.props.logoStyle ? 'https://daks2k3a4ib2z.cloudfront.net/598ee498c327c10001ed9e40/59ae92631c303d0001fed5d6_Radenbrock_Wort-Bildmarke_grau.svg' : 'https://daks2k3a4ib2z.cloudfront.net/598ee498c327c10001ed9e40/598eea2a22e8860001afd9fa_Radenbrock_Wort-Bildmarke.svg'}`}
                                 width="135"
                                 className="image-1"
                                 alt=""
                            />

                            <img alt="" src="img/Radenbrock_Wortmarke.svg" className="image-2" />
                        </NavLink>
                        <div onClick={this.toggleMenu} className={`${isNavOverlayOpen ? 'active' : ''} menu-button w-nav-button`}>
                            <div className="nav-top-line"/>
                            <div className="nav-middle-line"/>
                            <div className="nav-bottom-line"/>
                        </div>
                    </div>
                </div>
                {isLoginPopupOpen && <LoginModal
                    closeModal={this.toggleLogin}
                />}
            </div>
        );
    }
}

function mapStateToProps(state){
	return {
		isNavOverlayOpen: state.config.isNavOverlayOpen,
        isRetailInvestor: state.config.isRetailInvestor,
        isInstitutionalInvestor: state.config.isInstitutionalInvestor,
        isLoginPopupOpen: state.config.isLoginPopupOpen
	}
}

function mapDispatchToProps(dispatch) {
	return {
		configActions: bindActionCreators(configActions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu)
