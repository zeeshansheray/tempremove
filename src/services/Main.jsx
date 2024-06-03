import env from '../config';

const getTokenHeader = async () => {
    return { 'access_token': env.ACCESS_TOKEN, "Access-Control-Allow-Origin" : "*"}
}

const MainService = {
    getTokenHeader
}

export default MainService