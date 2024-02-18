import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import ClientList from "./ClientList";
import { AddClient, DeleteClient, UpdateClient, getAllClient } from "./apiCrud";
import { useForm } from "react-hook-form";
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import {  toast } from 'react-toastify';
 import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from "../deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../deleteComponent/deleteHooks";

export const Clients = ()=>{
    
const queryclient = useQueryClient()
const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
const [clid,setclid]=useState('')
const [cldeleteid,setcldeleteid]=useState('')
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }
 
const {data:client,isLoading,isError}= useQuery({
    queryKey:['ourClient'],
    queryFn: async ()=>  await getAllClient(),
    onError:()=>{
        toast.error("Sory xogta lama keeni karo")
    }
    
})
const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn:async(data)=>await AddClient(data),
    onSuccess:()=>{
    
        queryclient.invalidateQueries({queryKey:['ourClient']})
        // console.log("data has been saved on success")
        toast.success("Data Has been Saved")
    },
    onError:()=>{
    //    console.log("error ayaa jira") 
    toast.error("Error ayaa jiro !")
    }
})

const {mutate:updateMutate,isLoading:updateLoading} = useMutation({
    mutationFn: async (data)=>{
 
return await UpdateClient(clid,data)

    },
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['ourClient']})
        toast.success("data has been updated")
        ToggleDailog()
    },

    onError:(e)=>{
    
        toast.error("Sorry Update ma dhicin")
        console.log(e)
    }
})
 
const AddNewClient = async (data)=>{

    if(clid !==''){

 try{
    // console.log(data)
//   update section
updateMutate(data)
// console.log("Data has been Updated")

reset()
    } catch( err){
console.log("error ayaa jira ",err)

    }
    }
    else {
        try{
            mutate(data)
            // await AddClient(data)
        
        ToggleDailog()
          reset()
              } catch( err){
          console.log("error ayaa jira ",err)
          
              }

    }
    

   
}
const UpdateClientInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("clientName",data.clientName)
    setValue("clientLogo",data.clientLogo)
    setclid(data._id)
    ToggleDailog()

}


//  delete mutate

const {mutate:deleteMutate} = useMutation({
    mutationFn:(id)=>DeleteClient(id),
    onSuccess:()=>{
        toast.success("Client has  been deleted")
        deletehook.Toggle()
        queryclient.invalidateQueries({queryKey:['ourClient']})
    },
    onError:()=>{
        toast.error("Sorry client not deleted")
    }


})
const deletehook = useDeleteHook()

const deleteCheck = ()=>{

    // alert("deleted")
    deleteMutate(cldeleteid)
   
}
// cal delete fucntion
const deleteClientInfo = async (data)=>{
   deletehook.setMessage(data.clientName)
    deletehook.Toggle()
    setcldeleteid(data._id)

    // console.log("Xogta la rabo in la delete gareyo",data._id   

}

    return <>
   <Box p={4}>

<ConfirmDelete open={deletehook.open} toggle={deletehook.Toggle} message={deletehook.message} confirm={deleteCheck} />

 {/* breadcrumbs */}

 <Breadcrumbs aria-label="breadcrumb">
  <Link underline="hover" color="inherit" href="#">
    Dashboard {import.meta.env.VITE_APP_NAME}
  </Link>
 
  <Typography color="text.primary">Client</Typography>
</Breadcrumbs>


 {/* end */}
 <Divider sx={{height:10}}/>

    <Alert severity="info">Our Clients</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List Clients</Typography>
  
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Client</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewClient)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="Client Name" {...register("clientName")} variant="outlined" size="small" fullWidth/>

<TextField label="Client logo" variant="outlined" {...register("clientLogo")} size="small" fullWidth/>
    
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary.main"}} type="submit"  size="small">

      {clid !=='' ? "Update" : "Submit"}
          </Button>
 
        </DialogActions>

        </Box>
      </Dialog>


{/* Delete conformation */}
<Divider/>

 

{isError ? (<Box sx={{ display:'flex',justifyContent:'center',textAlign:'center',alignItems:"center",p:10}}>

<Box>

<ErrorOutlineOutlined sx={{fontSize:"58px" }} />
<Typography >Data noy found!</Typography>
    </Box>

</Box>): isLoading ? (<Box sx={{ display:'flex',justifyContent:'center',textAlign:'center',alignItems:"center",p:10}}>

<Box>

<CircularProgress sx={{fontSize:"58px" }} />
<Typography >Loading...</Typography>
    </Box>

</Box>) :  <ClientList deleteClient={deleteClientInfo} clientsData={client?.data} update={UpdateClientInfo} />  }
 
    
   </Box>
    </>
}

 