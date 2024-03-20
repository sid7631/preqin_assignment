import axios from 'axios';
import config from './config.json';


/**
 * Axios instance for making API requests.
 *
 * @type {import("axios").AxiosInstance}
 */
const api = axios.create({
    baseURL: config.baseURL,
    withCredentials: false
})

/**
 * Retrieves a list of investors.
 * @param {Object} params - The parameters for the API request.
 * @returns {Promise} A promise that resolves to the response data.
 */
export const getInvestors = async (params) => {
    if (params) {
        return api.get(config.endpoints.investors, { params: params })
    } else {
        return api.get(config.endpoints.investors)
    }
}

/**
 * Retrieves the investor commitment for a specific asset class and firm ID.
 *
 * @param {string} assetClass - The asset class to retrieve the commitment for.
 * @param {string} firm_id - The ID of the firm to retrieve the commitment for.
 * @returns {Promise} A promise that resolves to the investor commitment.
 */
export const getInvestorCommitment = async (assetClass,firm_id) => {
    return api.get(config.endpoints.commitments + '/'+ assetClass + '/' + firm_id)
}
