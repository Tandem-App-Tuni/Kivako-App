import constantList from '../config_constants'  //list that holds the url


const {
    APPLICATION_URL,
} = constantList

export const getApiUrl = (urlInfo={}) => {
    const apiVersion = urlInfo.version ? `/api/${urlInfo.version}` : '';

    return `${APPLICATION_URL}${apiVersion}/${urlInfo.endpoint}`;
}

export const getApiData = (urlInfo={}, options={}) => fetch (
    getApiUrl(urlInfo),
    options
)
