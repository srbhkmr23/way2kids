import { combineReducers } from 'redux';
import ImageReducer from './ImageReducer';
const appReducer = combineReducers({
    state: (state = {}) => state,
    imageListInfo: ImageReducer
  });
  
  const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
      state = undefined;
    }
    return appReducer(state, action);
  };
  
  export default rootReducer;
  