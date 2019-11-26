import {take, put} from 'redux-saga/effects';
// import {} from 'reselect';

export const ENTITIY_CREATE = 'ENTITIES_CREATE';
export const ENTITIY_UPDATE = 'ENTITIES_UPDATE';
export const ENTITIY_DELETE = 'ENTITIES_DELETE';

export const ENTITIY_FETCH = 'ENTITIY_FETCH';
export const ENTITIY_FETCH_LOADING = 'ENTITIY_FETCH_LOADING';
export const ENTITIY_FETCH_LOADED = 'ENTITIY_FETCH_LOADED';
export const ENTITIY_FETCH_ERROR = 'ENTITIY_FETCH_ERROR';

const USER_DATA = {
    firstName: 'Илья',
    secondName: 'Сычев',
    skill: 'Frontend',
};


export const entityCreate = (payload) => ({
    type: ENTITIY_CREATE,
    payload,
});

export const entityUpdate = (payload) => ({
    type: ENTITIY_UPDATE,
    payload,
});

export const entityDelete = (payload) => ({
    type: ENTITIY_DELETE,
    payload,
});
export const entityFetch = (payload) => ({
    type: ENTITIY_FETCH,
    payload,
});


export const entitiesReducer = (state = {}, action) => {
    const {type, payload = {}} = action;
    const {entityAlias, data} = payload;
    if (!entityAlias) {
        return state;
    }
    switch (type) {
        case ENTITIY_CREATE: {
            return {
                ...state,
                [entityAlias]: {
                    status: 'LOADED',
                    data,
                }
            }
        }
        case ENTITIY_UPDATE: {
            return {
                ...state,
                [entityAlias]: {
                    status: 'LOADED',
                    data,
                }
            }
        }
        case ENTITIY_DELETE: {
            return {
                ...state,
                [entityAlias]: undefined
            }
        }
        case ENTITIY_FETCH_LOADING: {
            return {
                ...state,
                [entityAlias]: {
                    status: 'LOADING',
                    data: state[entityAlias] ? state[entityAlias].data : null,
                }
            }
        }
        case ENTITIY_FETCH_LOADED: {
            return {
                ...state,
                [entityAlias]: {
                    status: 'LOADED',
                    data: data || null,
                }
            }
        }

        default:
            return state;
    }
};

export const selectorEntity = (state, props) => {
    const {entityAlias} = props;
    if (state && state.entities && state.entities[entityAlias]) {
        return state.entities[entityAlias];
    }
    return {
        status: null,
        data: null,
    }
};

export const selectorEntityData = (state, props) => {
    return selectorEntity(state, props).data;
};

export const selectorEntityStatus = (state, props) => {
    return selectorEntity(state, props).status;
};

export function* sagaFetchEntity() {
    while (true) {
        const action = yield take(ENTITIY_FETCH);
        const {payload} = action;
        yield put({
            type: ENTITIY_FETCH_LOADING,
            payload,
        });
        yield put({
            type: ENTITIY_FETCH_LOADED,
            payload: {
                ...payload,
                data: USER_DATA
            },
        })
    }
}
