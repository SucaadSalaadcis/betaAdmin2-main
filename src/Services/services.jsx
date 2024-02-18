import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import ServiceList from './ServiceList';
import { AddService, UpdateService, getAllService, DeleteService } from "./apiCrud";
import { useForm } from "react-hook-form";
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import {  toast } from 'react-toastify';
 import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from "../deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../deleteComponent/deleteHooks";

function services() {

  const queryclient = useQueryClient()    
const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
const [ServId,setServId]=useState('')
const [servdeleteid,setservdeleteid]=useState('')
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }

    const {data:service,isLoading,isError}= useQuery({

      queryKey:['service'],
      queryFn: async ()=>  await getAllService(),
      onError:()=>{
        toast.error("Sory xogta lama keeni karo")
      }
       
  })
  //  console.log(service?.data)
  const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn:async(data)=>await AddService(data),
    onSuccess:()=>{
    
        queryclient.invalidateQueries({queryKey:['service']})
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

return await UpdateService(clid,data)

  },
  onSuccess:()=>{
      queryclient.invalidateQueries({queryKey:['service']})
      toast.success("data has been updated")
      ToggleDailog()
  },

  onError:(e)=>{
  
      toast.error("Sorry Update ma dhicin")
      console.log(e)
  }
})




const AddNewService = async (data)=>{
    if(ServId !==''){
     
    try{
      updateMutate(data)
      
        reset()
      }catch( err){
      console.log("error ayaa jira ",err)
  }
    }
    else {
        try{
          mutate(data)
            ToggleDailog()
             reset()
              } catch( err){
              console.log("error ayaa jira ",err)
              }
    }
}

const UpdateServiceInfo = async (data)=>{
    setValue("title",data.title)
    setValue("Icon",data.Icon)
    setValue("description",data.description)
    setServId(data._id)
    ToggleDailog()

}




//  delete mutate

const {mutate:deleteMutate} = useMutation({
  mutationFn:(id)=>DeleteService(id),
  onSuccess:()=>{
      toast.success("Service has  been deleted")
      deletehook.Toggle()
      queryclient.invalidateQueries({queryKey:['service']})
  },
  onError:()=>{
      toast.error("Sorry client not deleted")
  }


})
const deletehook = useDeleteHook()

const deleteCheck = ()=>{

  // alert("deleted")
  deleteMutate(servdeleteid)
 
}
// cal delete fucntion
const DeleteServiceInfo = async (data)=>{
 deletehook.setMessage(data.title)
  deletehook.Toggle()
  setservdeleteid(data._id)

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

<Typography color="text.primary">Service</Typography>
</Breadcrumbs>


{/* end */}
<Divider sx={{height:10}}/>

 <Alert severity="info">Our Services</Alert>
 <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
     <Typography variant="h6">List Services</Typography>

     <IconButton onClick={ToggleDailog}>
     <AddCircleOutlineSharp />
     </IconButton>
 </Box>

 <Dialog open={dailogOpen} onClose={ToggleDailog}>
     <DialogTitle>New Service</DialogTitle>
     <Box component={"form"} onSubmit={handleSubmit(AddNewService)}>
     <DialogContent>
     <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>




<TextField label="Service Title" {...register("title")} variant="outlined" size="small" fullWidth/>
<TextField label="Service Icon" variant="outlined" {...register("Icon")} size="small" fullWidth/>
<TextField label="Service Description" variant="outlined" {...register("description")} size="small" fullWidth/>
 
 
 </Stack>

 </Box>
     </DialogContent>
     <DialogActions>
       <Button onClick={ToggleDailog}>Cancel</Button>
       <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary.main"}} type="submit"  size="small">

   {ServId !=='' ? "Update" : "Submit"}
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

</Box>) :  <ServiceList deleteService={DeleteServiceInfo} serviceData={service?.data} update={UpdateServiceInfo} />  }
</Box>
 </>


}

export default services