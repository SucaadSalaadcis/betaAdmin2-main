import {api} from '../apiConfig/Config'


export const GetAll = async(endpoint)=> {
    return await api.get(endpoint).then((res=> res.data))
}

export const GetById = async(endpoint,id)=> {
    return await api.get(`${endpoint}/${id}`).then((res=> res.data))
}


export const AddNew = async(endpoint,data)=> {
    return await api.get(`${endpoint}/${data}`).then((res=> res.data))
}
export const Update = async(endpoint,id,data)=> {
    return await api.get(`${endpoint}/${id}`,data).then((res=> res.data))
}
