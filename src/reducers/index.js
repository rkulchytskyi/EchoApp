import { combineReducers } from 'redux';
import config from './configReducer';
import userSetting from './userReducer';
import dashboardSetting from './dashboardSettingReducer';

const rootReducer = combineReducers({
	config,
    userSetting,
    dashboardSetting
});

export default rootReducer