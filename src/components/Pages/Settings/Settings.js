import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { Select, Popover, Button, Input, Spin } from 'antd';
import 'antd/lib/select/style/index.css';
import 'antd/lib/popover/style/index.css';
import 'antd/lib/button/style/index.css';
import 'antd/es/spin/style/index.css';
import MaskedInput from 'react-text-mask'
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import InputMask from 'react-input-mask';
import * as configActions from '../../../actions/configActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as filesActions from "../../../actions/filesActions";
import DashboardMenu from '../../Constructor/DashboardMenu/DashboardMenu'
import NavOverlay from '../../WebActions/NavOverlay/NavOverlay'
import FooterMini from '../../Constructor/FooterMini/FooterMini'

class Settings extends Component {
    constructor(props) {
        super(props);
        const {
            personalType,
            surname,
            firstname,
            birthday,
            placeOfBirth,
            birthCountry,
            maritalStatus,
            street,
            postcode,
            place,
            country,
            phoneNumber,
            mobileNumber,
            emailAddress,
            pepStatus,
            currentOccupation,
            education
        } = props.investmentPlanData;
        this.state = {
            ...props.investmentPlanData,
            fixedHeader: false,
            personalType,
            surname,
            firstname,
            birthday,
            placeOfBirth,
            birthCountry,
            maritalStatus,
            street,
            postcode,
            place,
            country,
            phoneNumber,
            mobileNumber,
            emailAddress,
            pepStatus: pepStatus ? pepStatus : 2,
            currentOccupation,
            education,
            errorMessage: false,
            type: [],
            maritalStatusChoices: [],
            countryChoices: [],
            birthCountryChoices: []
        };

        this.nextStep = this.nextStep.bind(this);
        this.onChange = this.onChange.bind(this);
        this.getCustomerData = this.getCustomerData.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.showFixedHeader = this.showFixedHeader.bind(this);
        this.toggleList = this.toggleList.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.updateWidth);
        window.addEventListener('scroll', this.showFixedHeader, true);
        this.getCustomerData();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWidth);
    }

    updateWidth() {
        this.setState({windowWidth: window.innerWidth})
    }

    showFixedHeader() {
        // console.log(document.documentElement.offsetTop <= window.scrollY);
        // console.log(document.documentElement.offsetTop);
        const menuHeight = document.getElementById('main-menu');
        if(!menuHeight) return;

        if(window.scrollY > (menuHeight.offsetHeight - 70)) {
            this.setState({
                fixedHeader: true
            })
        } else {
            this.setState({
                fixedHeader: false
            })
        }
    }

    toggleList(event){

        event.preventDefault();
        const li = event.target.classList.contains('settings-list') ? event.target : event.target.closest('.settings-list');

        if(event.target.classList.contains('stop-prop') || event.target.closest('.stop-prop')) return;

        if(!li) return;

        if(event.target.classList.contains('settings-list') || event.target.closest('.settings-list')){

            let element_classes = (" "+li.children[1].className+" ").replace(/[\n\t\r]/g, " "),
                remove_class    = "slide-down",
                add_class       = "slide-up",
                is_showing      = element_classes.indexOf(" "+remove_class+" ") > -1;

            if ( ! is_showing) {
                // Switch variable values
                remove_class = [add_class, add_class = remove_class][0];
                li.classList.add('active');
            } else{
                li.classList.remove('active');
            }

            // Remove the previous class (if present) and add the new class
            li.children[1].className = (element_classes.replace(" "+remove_class+" ", "") + " "+add_class+" ").trim();

            return false;
        }

    }

    getCustomerData(){
        const {filesActions} = this.props;
        this.setState({spin: true});

        filesActions.pullCustomerData()
            .then(res => {
                res.forEach((item, i) => {
                    switch (item.parameter) {
                        case 'type': this.setState({ personalType: item.value });
                            const type = [];
                            const obj = item.choices;

                            for (let key in obj){
                                type.push(obj[key]);
                            }

                            this.setState({ type });
                            break;
                        case 'first_name': this.setState({ firstname: item.value }); break;
                        case 'last_name': this.setState({ surname: item.value }); break;
                        case 'additional_email': this.setState({ emailAddress: item.value }); break;
                        case 'adviser': break;
                        case 'birthcountry':
                            const birthCountryArr = [];
                            const birthCountryObj = item.choices;

                            for (let key in birthCountryObj){
                                birthCountryArr.push(birthCountryObj[key]);
                            }

                            this.setState({ birthCountryChoices: birthCountryArr });
                            if(item.value) {
                                this.setState({ birthCountry: item.value });
                            }
                            break;
                        case 'birthday': this.setState({ birthday: item.value }); break;
                        case 'birthplace': this.setState({ placeOfBirth: item.value }); break;
                        case 'country':
                            const countryArr = [];
                            const countryObj = item.choices;

                            for (let key in countryObj){
                                countryArr.push(countryObj[key]);
                            }

                            this.setState({ countryChoices: countryArr });
                            if(item.value) {
                                this.setState({ country: item.value });
                            }
                            break;
                        case 'current_occupation': this.setState({ currentOccupation: item.value }); break;
                        case 'marital_status':
                            const msArr = [];
                            const msObj = item.choices;

                            for (let key in msObj){
                                msArr.push(msObj[key]);
                            }

                            this.setState({ maritalStatusChoices: msArr });
                            if(item.value) {
                                this.setState({ maritalStatus: item.value });
                            }
                            break;
                        case 'mobile': this.setState({ mobileNumber: item.value }); break;
                        case 'pep_status':
                            if(!item.value) break;
                            this.setState({ pepStatus: item.value });break;
                        case 'phone': this.setState({ phoneNumber: item.value }); break;
                        case 'place': this.setState({ place: item.value }); break;
                        case 'postcode': this.setState({ postcode: item.value }); break;
                        case 'qualification': this.setState({ education: item.value }); break;
                        case 'street_address': this.setState({ street: item.value }); break;

                        default: return;
                    }
                });
                // console.log(res);
                this.setState({spin: false});
            })
            .catch(e => {
                console.error(e.message);
                this.setState({spin: false});
            });
    }

    nextStep(){
        return () => {
            const {
                personalType,
                surname,
                firstname,
                birthday,
                placeOfBirth,
                birthCountry,
                maritalStatus,
                street,
                postcode,
                place,
                country,
                phoneNumber,
                mobileNumber,
                emailAddress,
                pepStatus,
                currentOccupation,
                education
            } = this.state;

            const {
                configActions,
                filesActions
            } = this.props;

            // Collect IP data in Redux
            const data = {
                personalType,
                surname,
                firstname,
                birthday,
                placeOfBirth,
                birthCountry,
                maritalStatus,
                street,
                postcode,
                place,
                country,
                phoneNumber,
                mobileNumber,
                emailAddress,
                pepStatus,
                currentOccupation,
                education
            };

            const data2 = {
                personalType,
                surname,
                firstname,
                birthday,
                phoneNumber,
                mobileNumber,
                emailAddress
            };

            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!re.test(emailAddress)){
                console.log('wrong email');
                this.setState({
                    emailValid: true,
                    errorMessage: true
                });
                return false;
            } else {
                this.setState({
                    emailValid: false
                });
            }

            if(personalType === 1){

                if(!data.personalType
                    || !data.surname
                    || !data.firstname
                    || !data.birthday
                    || !data.placeOfBirth
                    || !data.birthCountry
                    || !data.maritalStatus
                    || !data.street
                    || !data.postcode
                    || !data.place
                    || !data.country
                    || !data.phoneNumber
                    || !data.mobileNumber
                    || !data.emailAddress
                    || !data.pepStatus
                    || !data.currentOccupation
                    || !data.education) {

                    this.setState({
                        errorMessage: true
                    });
                    return false;
                } else {
                    this.setState({
                        errorMessage: false
                    });
                }

                // Collect IP data for Back-end
                const dataAPI = {
                    additional_email: emailAddress,
                    birthcountry: birthCountry,
                    birthday,
                    birthplace: placeOfBirth,
                    country,
                    current_occupation: currentOccupation,
                    first_name: firstname,
                    last_name: surname,
                    marital_status: maritalStatus,
                    mobile: mobileNumber,
                    pep_status: pepStatus,
                    phone: phoneNumber,
                    place,
                    postcode,
                    qualification: education,
                    street_address: street,
                    type: personalType
                };

                const dataJSON = JSON.stringify(dataAPI);

                filesActions.pushCustomerData(dataJSON)
                    .then(res => {
                        // console.log(res);
                        configActions.collectInvestmentPlanData(data);
                    })
                    .catch(e => {
                        // console.error(e.message);
                        this.setState({
                            validationOnBE: e.message
                        })
                    });


            } else {

                if(!data2.personalType
                    || !data2.surname
                    || !data2.firstname
                    || !data2.birthday
                    || !data2.phoneNumber
                    || !data2.mobileNumber
                    || !data2.emailAddress) {

                    this.setState({
                        errorMessage: true
                    });
                    return false;
                } else {
                    this.setState({
                        errorMessage: false
                    });
                }

                // Collect IP data for Back-end
                const dataAPI2 = {
                    additional_email: emailAddress,
                    birthday,
                    first_name: firstname,
                    last_name: surname,
                    mobile: mobileNumber,
                    phone: phoneNumber,
                    type: personalType
                };

                const dataJSON2 = JSON.stringify(dataAPI2);

                filesActions.pushCustomerData(dataJSON2)
                    .then(res => {
                        // console.log(res);
                        configActions.collectInvestmentPlanData(data2);
                    })
                    .catch(e => {
                        // console.error(e.message);
                        this.setState({
                            validationOnBE: e.message
                        })
                    });
            }
        }
    }

    onChange(field) {
        return e => {
            this.setState({
                [field]: e.target.value
            })
        }
    }

    onChangeSelect(field) {
        return value => {
            this.setState({ [field]: value })
        }
    }

    render(){

        const Option = Select.Option;

        const {errorMessage, personalType, emailValid, spin, validationOnBE, maritalStatusChoices,
            countryChoices, birthCountryChoices} = this.state;

        const autoCorrectedDatePipe = createAutoCorrectedDatePipe('dd/mm/yyyy');

        let {windowWidth, fixedHeader} = this.state;

        windowWidth = windowWidth || window.innerWidth;

        // Change menu layout on width size
        const isIPad = windowWidth <= 1366;
        const isMobile = windowWidth < 768;

        const content = (
            <div className="ip-popover__content">
                <p>Klärung PEP (Politisch exponierte Person) ist bei jeder natürlichen Person erforderlich.
                    Bitte ankreuzen, sofern Sie Parlamentsmitglied/Diplomat/hochrangiger Offizier bei den
                    Streitkräften/Botschafter/Mitglied der Leitungs-, Verwaltungs- und Aufsichtsgremien
                    staatlicher Unternehmen sind. Bitte auch ankreuzen, sofern Sie ein Familienangehöriger
                    eines PEP oder eine dem PEP nahestehende Person sind oder in den vergangenen 12 Monaten waren.</p>
            </div>
        );

        return (
            <div className="wrapper dashboard settings">
                <header
                    className={`${fixedHeader ? 'fixed' : ''}`}
                >
                    <NavOverlay />
                    <DashboardMenu />
                </header>
                {isMobile &&
                <div className="layout">
                    <div className="mobile-view">
                        <div className="dashboard-title">
                            <span>Einstellungen</span>
                        </div>
                    </div>
                </div>
                }
                <div className="dashboard__content layout">
                    <div className="dashboard__inner">
                        <div className="investment-plan__content">
                            {spin &&
                            <div className="spin-active">
                                <Spin size="large" />
                            </div>
                            }
                            {!spin &&
                            <ul>
                                <li onClick={this.toggleList} className="settings-list active">
                                    <div className="investment-plan__title">
                                        <img alt="" src="img/plus.svg" className="settings-plus-icon" />
                                        {` `}
                                        Personenbezogene Daten
                                    </div>
                                    {(personalType === 1) &&
                                    <ul className="slide-down stop-prop">
                                        <li>
                                            <div className="investment-plan__subtitle">
                                                Persönliche Daten
                                            </div>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input bigger">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.surname) && "not-filled"}`}
                                                        placeholder="Nachname"
                                                        maxLength={50}
                                                        onChange={this.onChange('surname')}
                                                        value={this.state.surname}
                                                    />
                                                </div>
                                                <div className="investment-plan__input bigger">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.firstname) && "not-filled"}`}
                                                        placeholder="Vorname"
                                                        maxLength={50}
                                                        onChange={this.onChange('firstname')}
                                                        value={this.state.firstname}
                                                    />
                                                </div>
                                                <div className="investment-plan__input">
                                                    <MaskedInput
                                                        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                                                        className={`${(errorMessage &&
                                                            !this.state.birthday) && "not-filled"} ant-input`}
                                                        placeholder="Geburtsdatum"
                                                        guide={true}
                                                        keepCharPositions={true}
                                                        pipe={autoCorrectedDatePipe}
                                                        onChange={this.onChange('birthday')}
                                                        value={this.state.birthday}
                                                    />
                                                </div>
                                                <div className="investment-plan__input">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.placeOfBirth) && "not-filled"}`}
                                                        placeholder="Geburtsort"
                                                        maxLength={100}
                                                        onChange={this.onChange('placeOfBirth')}
                                                        value={this.state.placeOfBirth}
                                                    />
                                                </div>
                                                <div className="investment-plan__select size2">
                                                    <Select
                                                        className={`${(errorMessage &&
                                                            !this.state.birthCountry) && "not-filled"}`}
                                                        showSearch
                                                        style={{width: '100%'}}
                                                        placeholder="Geburtsland"
                                                        optionFilterProp="children"
                                                        dropdownClassName="ip-land"
                                                        value={this.state.birthCountry}
                                                        onChange={this.onChangeSelect('birthCountry')}
                                                        maxTagCount={3}
                                                        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                                    >
                                                        {birthCountryChoices.map((value, i) => {
                                                            return <Option
                                                                className="investment-plan__option"
                                                                value={i + 1}
                                                                key={i + 1}
                                                            >
                                                                {value}
                                                            </Option>
                                                        })}

                                                    </Select>
                                                </div>
                                                <div className="investment-plan__select size3">
                                                    <Select
                                                        className={`${(errorMessage &&
                                                            !this.state.maritalStatus) && "not-filled"}`}
                                                        showSearch
                                                        style={{width: '100%'}}
                                                        placeholder="Familienstand"
                                                        optionFilterProp="children"
                                                        dropdownClassName="ip-land"
                                                        value={this.state.maritalStatus}
                                                        onChange={this.onChangeSelect('maritalStatus')}
                                                        maxTagCount={3}
                                                        filterOption={
                                                            (input, option) =>
                                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {maritalStatusChoices.map((value, i) => {
                                                            return <Option
                                                                className="investment-plan__option"
                                                                value={i + 1}
                                                                key={i + 1}
                                                            >
                                                                {value}
                                                            </Option>
                                                        })}
                                                    </Select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="investment-plan__subtitle">
                                                Adresse
                                            </div>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input full-size">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.street) && "not-filled"}`}
                                                        placeholder="Straße"
                                                        maxLength={100}
                                                        onChange={this.onChange('street')}
                                                        value={this.state.street}
                                                    />
                                                </div>
                                                <div className="investment-plan__input bigger">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.postcode) && "not-filled"}`}
                                                        placeholder="PLZ"
                                                        minLength={5}
                                                        maxLength={5}
                                                        onChange={this.onChange('postcode')}
                                                        value={this.state.postcode}
                                                    />
                                                </div>
                                                <div className="investment-plan__input bigger">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.place) && "not-filled"}`}
                                                        placeholder="Ort"
                                                        onChange={this.onChange('place')}
                                                        value={this.state.place}
                                                    />
                                                </div>

                                                <div className="investment-plan__select size2">
                                                    <Select
                                                        className={`${(errorMessage &&
                                                            !this.state.country) && "not-filled"}`}
                                                        showSearch
                                                        style={{width: '100%'}}
                                                        placeholder="Land"
                                                        optionFilterProp="children"
                                                        dropdownClassName="ip-land"
                                                        value={this.state.country}
                                                        onChange={this.onChangeSelect('country')}
                                                        maxTagCount={3}
                                                        filterOption={
                                                            (input, option) =>
                                                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                        }
                                                    >
                                                        {countryChoices.map((value, i) => {
                                                            return <Option
                                                                className="investment-plan__option"
                                                                value={i + 1}
                                                                key={i + 1}
                                                            >
                                                                {value}
                                                            </Option>
                                                        })}
                                                    </Select>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="investment-plan__subtitle">
                                                Kontakt
                                            </div>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input ">
                                                    <InputMask
                                                        mask="+4\9\ (0) 99999999999999999"
                                                        className={`${(errorMessage &&
                                                            !this.state.phoneNumber) && "not-filled"} ant-input`}
                                                        placeholder="Telefonnummer"
                                                        maskChar=" "
                                                        onChange={this.onChange('phoneNumber')}
                                                        value={this.state.phoneNumber || ''}
                                                    />
                                                </div>
                                                <div className="investment-plan__input ">
                                                    <InputMask
                                                        mask="+4\9\ (0) 999 99999999999999"
                                                        className={`${(errorMessage &&
                                                            !this.state.mobileNumber) && "not-filled"} ant-input`}
                                                        placeholder="Mobil"
                                                        maskChar=" "
                                                        onChange={this.onChange('mobileNumber')}
                                                        value={this.state.mobileNumber || ''}
                                                    />
                                                </div>
                                                <div className="investment-plan__input big">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.emailAddress) && "not-filled"}`}
                                                        type="email"
                                                        placeholder="E-Mail Adresse"
                                                        maxLength={50}
                                                        onChange={this.onChange('emailAddress')}
                                                        value={this.state.emailAddress}
                                                    />
                                                    {emailValid &&
                                                    <p className="invalid-error">
                                                        Bitte geben Sie eine gültige E-Mail-Adresse an
                                                    </p>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="investment-plan__subtitle">
                                                PEP-Status
                                                <div className="ip-info">
                                                    <Popover
                                                        content={content}
                                                        placement="bottomRight"
                                                        trigger={`${isIPad ? 'click' : 'hover'}`}
                                                        overlayClassName="ip-popover"
                                                    >
                                                        <Button>i</Button>
                                                    </Popover>
                                                </div>
                                            </div>
                                            <div className="investment-plan__select size1">
                                                <Select
                                                    className={`${(errorMessage &&
                                                        !this.state.pepStatus) && "not-filled"}`}
                                                    showSearch
                                                    style={{width: '100%'}}
                                                    placeholder="Nein"
                                                    optionFilterProp="children"
                                                    dropdownClassName="ip-land"
                                                    value={this.state.pepStatus}
                                                    onChange={this.onChangeSelect('pepStatus')}
                                                    maxTagCount={3}
                                                    filterOption={
                                                        (input, option) =>
                                                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    <Option
                                                        className="investment-plan__option"
                                                        value={1}>Ja
                                                    </Option>
                                                    <Option
                                                        className="investment-plan__option"
                                                        value={2}>Nein
                                                    </Option>
                                                </Select>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="investment-plan__subtitle">
                                                Berufliche Situation
                                            </div>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input full-size">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.currentOccupation) && "not-filled"}`}
                                                        placeholder="Gegenwärtiger Beruf"
                                                        maxLength={100}
                                                        onChange={this.onChange('currentOccupation')}
                                                        value={this.state.currentOccupation}
                                                    />
                                                </div>
                                                <div className="investment-plan__input full-size">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.education) && "not-filled"}`}
                                                        placeholder="Ausbildung/berufliche Qualifikation"
                                                        maxLength={100}
                                                        onChange={this.onChange('education')}
                                                        value={this.state.education}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    }
                                    {(personalType !== 1) &&

                                    <ul className="slide-down stop-prop">
                                        <li>
                                            <div className="investment-plan__subline">
                                                Vielen Dank für Ihr Interesse als Geschäftskunde.
                                                Bitte hinterlassen Sie uns Ihre Kontaktdaten.
                                                Wir werden uns im Anschluss persönlich bei Ihnen melden.
                                            </div>
                                            <div className="investment-plan__subtitle">
                                                Persönliche Daten
                                            </div>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input bigger">
                                                    <Input
                                                        className={`${(errorMessage && !this.state.surname) &&
                                                        "not-filled"}`}
                                                        placeholder="Nachname"
                                                        onChange={this.onChange('surname')}
                                                        value={this.state.surname}
                                                    />
                                                </div>
                                                <div className="investment-plan__input bigger">
                                                    <Input
                                                        className={`${(errorMessage && !this.state.firstname) &&
                                                        "not-filled"}`}
                                                        placeholder="Vorname"
                                                        onChange={this.onChange('firstname')}
                                                        value={this.state.firstname}
                                                    />
                                                </div>
                                                <div className="investment-plan__input">
                                                    <MaskedInput
                                                        mask={[/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]}
                                                        className={`${(errorMessage && !this.state.birthday) &&
                                                        "not-filled"} ant-input`}
                                                        placeholder="Geburtsdatum"
                                                        guide={true}
                                                        keepCharPositions={true}
                                                        pipe={autoCorrectedDatePipe}
                                                        onChange={this.onChange('birthday')}
                                                        value={this.state.birthday}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="investment-plan__subtitle">
                                                Kontakt
                                            </div>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input ">
                                                    <InputMask
                                                        mask="+4\9\ (0) 99999999999999999"
                                                        maskChar=" "
                                                        className={`${(errorMessage &&
                                                            !this.state.phoneNumber) && "not-filled"} ant-input`}
                                                        placeholder="Telefonnummer"
                                                        onChange={this.onChange('phoneNumber')}
                                                        value={this.state.phoneNumber || ''}
                                                    />
                                                </div>
                                                <div className="investment-plan__input ">
                                                    <InputMask
                                                        mask="+4\9\ (0) 999 99999999999999"
                                                        maskChar=" "
                                                        className={`${(errorMessage &&
                                                            !this.state.mobileNumber) && "not-filled"} ant-input`}
                                                        placeholder="Mobil"
                                                        onChange={this.onChange('mobileNumber')}
                                                        value={this.state.mobileNumber || ''}
                                                    />
                                                </div>
                                                <div className="investment-plan__input big">
                                                    <Input
                                                        className={`${(errorMessage &&
                                                            !this.state.emailAddress) && "not-filled"}`}
                                                        type="email"
                                                        placeholder="E-Mail Adresse"
                                                        maxLength={50}
                                                        onChange={this.onChange('emailAddress')}
                                                        value={this.state.emailAddress}
                                                    />
                                                    {emailValid &&
                                                    <p className="invalid-error">
                                                        Bitte geben Sie eine gültige E-Mail-Adresse an
                                                    </p>
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    }
                                </li>
                                <li onClick={this.toggleList} className="settings-list active">
                                    <div className="investment-plan__title">
                                        <img alt="" src="img/plus.svg" className="settings-plus-icon" />
                                        {` `}
                                        Investmenziele
                                    </div>
                                    <ul className="slide-down stop-prop">
                                        <li>
                                            1
                                        </li>
                                    </ul>
                                </li>
                                <li onClick={this.toggleList} className="settings-list active">
                                    <div className="investment-plan__title">
                                        <img alt="" src="img/plus.svg" className="settings-plus-icon" />
                                        {` `}
                                        Verknüpftes Konto
                                    </div>
                                    <ul className="slide-down stop-prop">
                                        <li>
                                            <div className="investment-plan__field-data">
                                                <div className="investment-plan__input full-size">
                                                    <Input
                                                        placeholder="Kontoinhaber"
                                                        maxLength={100}
                                                        onChange={this.onChange('accountOwner')}
                                                        value={this.state.accountOwner}
                                                    />
                                                </div>
                                                <div className="investment-plan__input full-size">
                                                    <Input
                                                        placeholder="Bankenname"
                                                        maxLength={100}
                                                        onChange={this.onChange('bankName')}
                                                        value={this.state.bankName}
                                                    />
                                                </div>
                                                <div className="investment-plan__input full-size">
                                                    <Input
                                                        placeholder="IBAN"
                                                        maxLength={100}
                                                        onChange={this.onChange('iban')}
                                                        value={this.state.iban}
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                                {errorMessage &&
                                <div className="investment-plan__error">
                                    Alle hier gestellten Fragen sind Pflichtangaben.
                                    Bitte füllen Sie alle Punkte sorgfältig aus.
                                </div>
                                }
                                {validationOnBE &&
                                <div className="investment-plan__error">
                                    {validationOnBE}
                                </div>
                                }
                                <div className="investment-plan__btn-area">
                                    <div
                                        className="investment-plan__btn"
                                        onClick={this.nextStep()}
                                    >
                                        <span>Speichern</span>
                                    </div>
                                </div>
                            </ul>
                            }
                        </div>
                    </div>
                    <div className="dashboard__aside">

                    </div>
                </div>
                <FooterMini />
            </div>
        )

    };
}

Settings.propTypes = {
    configActions: PropTypes.object.isRequired,
    filesActions: PropTypes.object.isRequired,
    investmentPlanData: PropTypes.object.isRequired
};

function mapStateToProps(state){
    return {
        investmentPlanData: state.config.investmentPlanData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        configActions: bindActionCreators(configActions, dispatch),
        filesActions: bindActionCreators(filesActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);