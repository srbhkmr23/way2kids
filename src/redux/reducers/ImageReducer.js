import {GET_IMAGES} from '../actions'

const INITIAL_STATE = {
    imageList: []
  };
export default function(state = INITIAL_STATE, action) {

    // console.log('action.payload', action.payload);
    switch (action.type) {
      case GET_IMAGES:
        if (
          action.payload &&
          action.payload.data &&
          action.payload.data.assetslist
        ) {
          state.imageList = action.payload.data.assetslist;
        }
        return state;
      default:
        return state;
    }
  }