import {api} from '../../apiConfig/Config'

// homeSetting

export const GetAllHome = async() => {
    return await api.get("/homeSetting")
}

export const GetByIdHome = async(id) => {
    return await api.get(`/homeSetting/${id}`)
}

export const AddHome = async(data) => {
    return await api.post("/homeSetting/",data)
}

export const UpdateHome = async(id,data) => {
    return await api.put(`/homeSetting/${id}`,data)
}

export const DeleteHome = async(id) => {
   return await api.delete(`/homeSetting/${id}`)
}