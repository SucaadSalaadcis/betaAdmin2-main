import { useQuery , useMutation} from "@tanstack/react-query";
import { AddNew, GetAll } from "./api";


export const GetQuery = (endpoint,queryKey)=>{

    return useQuery({
        queryKey:[queryKey],
        queryFn:()=>GetAll(endpoint)
    })
}
export const AddQuery = (endpoint,queryKey)=>{

    return useMutation({
        mutationFn: (data)=>AddNew(endpoint,data)
    })
}
