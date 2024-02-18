import {api} from '../../apiConfig/Config'

//contactForm

export const getAllCon = async()=> {
    return await api.get('/contactForm')
}

export const GetByIdCon = async(id)=> {
    return await api.get(`/contactForm/${id}`)
}

export const AddCon = async(data)=> {
    return await api.post('/contactForm',data)
}

export const UpdateCon = async(id,data)=> {
    return await api.put(`/contactForm/${id}`,data)
}

export const DeleteCon = async(id)=> {
    return await api.delete(`/contactForm/${id}`)
}