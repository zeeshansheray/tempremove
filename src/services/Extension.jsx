import axios from 'axios'
import { Handlers, utils } from '../utils'
import MainService from './Main'
import env from '../config'
const service  = '/extension'

const Search         = async({payload}) => await axios.post(env.API_URL+service + '/SearchExtension', payload, {headers: await MainService.getTokenHeader()})

const AuthService = {
    Search : Handlers.Services(Search),
}

export default AuthService
