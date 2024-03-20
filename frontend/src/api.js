import axios from 'axios';
import config from './config.json';


const api = axios.create({
    baseURL: config.baseURL,
    withCredentials: false
})

export const getInvestors = async (params) => {
    if (params) {
        return api.get(config.endpoints.investors, { params: params })
    } else {
        return api.get(config.endpoints.investors)
    }
}

export const getInvestorCommitment = async (assetClass,firm_id) => {
    return api.get(config.endpoints.commitments + '/'+ assetClass + '/' + firm_id)
}
