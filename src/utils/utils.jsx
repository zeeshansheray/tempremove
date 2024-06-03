const getQueryString = (query) => {
    return Object.entries(query).map(entry => entry[0]+'='+entry[1]).join('&')
}
export {
    getQueryString,
}