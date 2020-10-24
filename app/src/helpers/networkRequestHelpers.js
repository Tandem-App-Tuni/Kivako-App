import constantList from '../config_constants'


const {
    APPLICATION_URL,
} = constantList

export const getApiUrl = (urlInfo={}) => (
    `${APPLICATION_URL}/api/${urlInfo.version}/${urlInfo.endpoint}`
)

export const getApiData = (urlInfo={}, options={}) => fetch (
    getApiUrl(urlInfo),
    options
)
