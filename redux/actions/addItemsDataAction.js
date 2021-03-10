import axios from 'axios'
import { apiBaseURL } from '../../utils/constants'
import {
    ADD_ITEM_DATA,
    ADD_ITEM_DATA_SUCCESS,
    ADD_ITEM_DATA_FAIL
} from '../../utils/actionTypes'

const addItemDataAction = (data) => {
    const axiosConfig = {
        headers: {}
    }

    return dispatch => {
        dispatch({ type: ADD_ITEM_DATA })

        return axios.post(`${apiBaseURL}/items`, data, axiosConfig)
            .then((res) => {
                return dispatch({ type: ADD_ITEM_DATA_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                return dispatch({ type: ADD_ITEM_DATA_FAIL, payload: err.data })
            })
    }
}

export default addItemDataAction