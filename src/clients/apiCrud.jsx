import { api } from "../../apiConfig/Config"

// "ourClient"

export const getAllClient = async()=>{

    return await api.get("/ourClient")
}

export const GetByIdClient = async (id)=>{
    return await api.get(`/ourClient/${id}`)
}

export const  AddClient = async (data)=>{
    return await api.post("/ourClient",data)
}


export const  UpdateClient = async (id,data)=>{
    return await api.put(`/ourClient/${id}`,data)
}

export const  DeleteClient = async (id)=>{
    return await api.delete(`/ourClient/${id}`)
}