import {api} from '../../apiConfig/Config'

// house

export const GetAllHouse = async() => {
    return await api.get("/house")
}

export const GetByIdHouse = async(id) => {
    return await api.get(`/house/${id}`)
}

export const AddHouse = async(data) => {
    return await api.post("/house/",data)
}

export const UpdateHouse = async(id,data) => {
    return await api.put(`/house/${id}`,data)
}

export const DeleteHouse = async(id) => {
   return await api.delete(`/house/${id}`)
}