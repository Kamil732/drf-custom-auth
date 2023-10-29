import Axios from 'axios'
import { createMessage, returnErrors } from './messages'
import { tokenConfig } from './auth'

import * as actions from './types'

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
    Axios
        .get('/api/leads/', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: actions.GET_LEADS,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

// DELETE LEADS
export const deleteLead = id => (dispatch, getState) => {
    Axios
        .delete(`/api/leads/${id}/`, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ deleteLead: 'Lead Deleted' }))
            dispatch({
                type: actions.DELETE_LEAD,
                payload: id
            })
        })
        .catch(err => console.log(err))
}

// ADD LEADS
export const addLead = lead => (dispatch, getState) => {
    Axios
        .post('/api/leads/', lead, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({ addLead: 'Lead Added' }))
            dispatch({
                type: actions.ADD_LEAD,
                payload: res.data
            })
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}