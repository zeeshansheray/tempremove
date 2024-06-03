import { enums } from '../enums'
import { utils } from '.'

const Services = (fn) => {
    return async ({toaster, message, error, ...props} = {}) => {
        try {
            const res = await fn(props)
            toaster && utils.showToaster({title: 'Success', message: message || res.data.message, severity: 'success', progress: 0})
            return { response : res.data}

        } catch (err) {
            console.log('API- ERROR',  err, error)
            toaster && utils.showToaster({title: 'Error', message: error || err.response ? err.response.data.error : err.message, severity: 'error', progress: 0})
            // expire error : jwt expired
            if(err.response && err.response.status === enums.ResponseStatus.UNAUTHORIZED) {
                utils.Logout();
                return { error: err.response ? err.response.data : err}
            }

            return { error: err.response ? err.response.data : err}
        }
    }
}

export {
    Services
}