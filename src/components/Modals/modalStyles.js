import _ from 'lodash';

const umbrella = {
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    content: {
        position: 'relative',
        background: 'transparent',
        borderRadius: '0',
        border: 'none',
        padding: '0'
    }
};

const shared = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        position: 'relative',
        background: 'transparent',
        borderRadius: '0',
        border: 'none',
        padding: '0'
    }
};

const desktop = _.defaultsDeep({
    overlay: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        margin: '30px auto',
        borderRadius: '0',
        maxWidth: '980px',
        width: '100%',
        overflow: 'visible',
        maxHeight: '600px',
        height: '100%'
    },
}, shared);

const tablet = _.defaultsDeep({
    overlay: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        margin: '30px auto',
        borderRadius: '0',
        maxWidth: '780px',
        width: '100%',
        overflow: 'visible',
        maxHeight: '600px',
        height: '100%'
    },
}, shared);

const mobile = _.defaultsDeep({
    overlay: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        margin: '30px auto',
        borderRadius: '0',
        maxWidth: '496px',
        width: '90%',
        overflow: 'visible',
        maxHeight: '600px',
        height: '90vh'
},
}, shared);

const desktopUmbrella = _.defaultsDeep({
    overlay: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        margin: '30px auto',
        borderRadius: '0',
        maxWidth: '980px',
        width: '100%',
        overflow: 'visible',
        maxHeight: '600px',
        height: '100%'
    },
}, umbrella);

const tabletUmbrella = _.defaultsDeep({
    overlay: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        margin: '30px auto',
        borderRadius: '0',
        maxWidth: '780px',
        width: '100%',
        overflow: 'visible',
        maxHeight: '600px',
        height: '100%'
    },
}, umbrella);

const mobileUmbrella = _.defaultsDeep({
    overlay: {
        width: '100%',
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        margin: '30px auto',
        borderRadius: '0',
        maxWidth: '496px',
        width: '90%',
        overflow: 'visible',
        maxHeight: '600px',
        height: '90vh'
    },
}, umbrella);

export default {
    desktop,
    tablet,
    mobile,
    desktopUmbrella,
    tabletUmbrella,
    mobileUmbrella
};
