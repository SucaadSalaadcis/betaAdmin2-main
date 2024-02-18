import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import AboutList from './AboutList'
import { AddAbout, DeleteAbout, UpdateAbout, getAllAbout } from "./apiCrud";
import { useForm } from "react-hook-form";
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import {  toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from '../deleteComponent/ConfirmDelete'

import { useDeleteHook } from "../deleteComponent/deleteHooks";

export const About = ()=>{
    
    const queryclient = useQueryClient()
const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
const [aboutId,setaboutId]=useState('')
const [aboutdeleteId,setaboutdeleteId]=useState('')
    const [dailogOpen,setDailog]=useState(false)
    
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }
 
const {data:about,isLoading,isError}= useQuery({
    queryKey:['about'],
    queryFn: async ()=>  await getAllAbout(),
    onError:()=>{
        toast.error("Sorry Data ma imanin")
    }
    
})
const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn:async(data)=>await AddAbout(data),
    onSuccess:()=>{
    
       queryclient.invalidateQueries({queryKey:['about']})
        // console.log("data has been saved on success")
        toast.success("Data Has been Saved")
    },
    onError:()=>{
    //    console.log("error ayaa jira") 
    toast.error("Error.. !")
    }
})

const {mutate:updateMutate,isLoading:updateLoading} = useMutation({
    mutationFn: async (data)=>{
 
return await UpdateAbout(aboutId,data)

    },
    onSuccess:()=>{
       queryclient.invalidateQueries({queryKey:['about']})
        toast.success("Data has been updated")
        ToggleDailog()
    },

    onError:(e)=>{
    
        toast.error("Sorry Data Not Updated")
        console.log(e)
    }
})
 
const AddNewAbout = async (data)=>{

    if(aboutId !==''){

 
        try{
 
     updateMutate(data)
    reset()
    } catch( err){
    console.log("Error.. ",err)

    }
    }
    else {
        try{
            mutate(data)
            // await AddAbout(data)
        ToggleDailog()
          reset()
              } catch( err){
          console.log("Error.. ",err)
              }
    }
    

   
}
const UpdateAboutInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("fahFahinYar",data.fahFahinYar)
    setValue("fahFahin",data.fahFahin)
    setaboutId(data._id)
    ToggleDailog()

}


//  delete mutate

const {mutate:deleteMutate} = useMutation({
    mutationFn:(id)=>DeleteAbout(id),
    onSuccess:()=>{
        toast.success("About has  been deleted")
        deletehook.Toggle()
       queryclient.invalidateQueries({queryKey:['about']})
    },
    onError:()=>{
        toast.error("Sorry About not deleted")
    }


})
const deletehook = useDeleteHook()

const deleteCheck = ()=>{

    // alert("deleted")
    deleteMutate(aboutdeleteId)
   
}
// cal delete fucntion
const deleteAboutInfo = async (data)=>{
   deletehook.setMessage(data.fahFahinYar)
    deletehook.Toggle()
    setaboutdeleteId(data._id)

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
 
  <Typography color="text.primary">About</Typography>
</Breadcrumbs>


 {/* end */}
 <Divider sx={{height:10}}/>

    <Alert severity="info">About</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List About</Typography>
  
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New about</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewAbout)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="fahFahinYar" {...register("fahFahinYar")} variant="outlined" size="small" fullWidth/>

<TextField label="fahFahin" variant="outlined" {...register("fahFahin")} size="small" fullWidth/>
    
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary.main"}} type="submit"  size="small">

      {aboutId !=='' ? "Update" : "Submit"}
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

</Box>) :  <AboutList deleteAbout={deleteAboutInfo} aboutData={about?.data} update={UpdateAboutInfo} />  }
 
    
   </Box>
    </>
}

 