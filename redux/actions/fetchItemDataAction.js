import axios from 'axios'
import { apiBaseURL } from '../../utils/constants'
import {
    FETCHING_ITEM_DATA,
    FETCHING_ITEM_DATA_SUCCESS,
    FETCHING_ITEM_DATA_FAIL
} from '../../utils/actionTypes'

const fetchItemDataAction = () => {
    const axiosConfig = {
        headers: {}
    }

    return dispatch => {
        dispatch({ type: FETCHING_ITEM_DATA })

        return axios.get(`${apiBaseURL}/items?_sort=created_at&_order=desc`, axiosConfig)
            .then((res) => {
                return dispatch({ type: FETCHING_ITEM_DATA_SUCCESS, payload: res.data })
            })
            .catch((err) => {
                return dispatch({ type: FETCHING_ITEM_DATA_FAIL, payload: err.data })
            })
    }
}

export default fetchItemDataAction