import * as ActionTypes from '../constants/ActionTypes';

const initialState =  [];

const actionsMap = {
    [ActionTypes.REQ_DATA](state, action) {
        return Object.assign({}, state, {
            isFetching: true
        })
    },
    [ActionTypes.RECEIVE_DATA](state, action) {
        return Object.assign({}, state, {
            isFetching: false,
            twitchData: action.twitchData,
            gameName: action.gameName
        })
    },
};

export default function twitch(state = initialState, action) {
    const reduceFn = actionsMap[action.type];
    if (!reduceFn) return state;
    return reduceFn(state, action);
}
