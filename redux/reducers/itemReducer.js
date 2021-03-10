import {
    FETCHING_ITEM_DATA,
    FETCHING_ITEM_DATA_SUCCESS,
    FETCHING_ITEM_DATA_FAIL
} from '../../utils/actionTypes'

const initialReducer = {
    isFetching: null,
    data: [],
    message: null,
    status: null,
    process: null
}

const itemReducer = (state = initialReducer, action) => {
    switch (action.type) {
        case FETCHING_ITEM_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                data: null,
                message: 'PROCESS',
                status: null,
                process: 'FETCH',
                error: null
            })

        case FETCHING_ITEM_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                message: null,
                status: null,
                process: 'DONE',
                error: null
            })

        case FETCHING_ITEM_DATA_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                message: null,
                status: null,
                process: 'FAILED',
                error: null
            })

        default:
            return state;
    }
}

export default itemReducer