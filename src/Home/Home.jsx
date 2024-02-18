import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import HomeList from "./HomeList";
import { AddHome, DeleteHome, UpdateHome, GetAllHome } from "./apiCrud";
import { useForm } from "react-hook-form";
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import {  toast } from 'react-toastify';
 import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from "../deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../deleteComponent/deleteHooks";

export const Home = ()=>{
    
const queryclient = useQueryClient()
const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
const [hId,sethId]=useState('')
const [hDeleteId,sethDeleteId]=useState('')
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }
 
const {data:home,isLoading,isError}= useQuery({
    queryKey:['homeSetting'],
    queryFn: async ()=>  await GetAllHome(),
    onError:()=>{
        toast.error("Sorry Data ma imanin")
    }
    
})
const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn:async(data)=>await AddHome(data),
    onSuccess:()=>{
    
        queryclient.invalidateQueries({queryKey:['homeSetting']})
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
 
return await UpdateHome(hId,data)

    },
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['homeSetting']})
        toast.success("Data has been updated")
        ToggleDailog()
    },

    onError:(e)=>{
    
        toast.error("Sorry Data Not Updated")
        console.log(e)
    }
})
 
const AddNewHome = async (data)=>{

    if(hId !==''){

 try{

    updateMutate(data)
// console.log("Data has been Updated")

reset()
    } catch( err){
console.log("Error.. ! ",err)

    }
    }
    else {
        try{
            mutate(data)
            // await AddHome(data)
        
        ToggleDailog()
          reset()
              } catch( err){
          console.log("error ayaa jira ",err)
          
              }

    }
    

   
}
const UpdateHomeInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("title",data.title)
    setValue("logo",data.logo)
    setValue("name",data.name)
    setValue("address",data.address)
    setValue("email",data.email)
    setValue("phone",data.phone)
    setValue("whatsApp",data.whatsApp)
    setValue("facebook",data.facebook)
    setValue("instagram",data.instagram)
    setValue("tiktok",data.tiktok)
    setValue("heroTitle",data.heroTitle)
    setValue("heroDescription",data.heroDescription)
    setValue("heroImage",data.heroImage)
    setValue("footerText",data.footerText)
    sethId(data._id)
    ToggleDailog()

}


//  delete mutate

const {mutate:deleteMutate} = useMutation({
    mutationFn:(id)=>DeleteHome(id),
    onSuccess:()=>{
        toast.success("Home has  been deleted")
        deletehook.Toggle()
        queryclient.invalidateQueries({queryKey:['homeSetting']})
    },
    onError:()=>{
        toast.error("Sorry Home not deleted")
    }


})
const deletehook = useDeleteHook()

const deleteCheck = ()=>{

    // alert("deleted")
    deleteMutate(hDeleteId)
   
}
// cal delete fucntion
const DeleteHomeInfo = async (data)=>{
   deletehook.setMessage(data.title)
    deletehook.Toggle()
    sethDeleteId(data._id)

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
 
  <Typography color="text.primary">Home</Typography>
</Breadcrumbs>


 {/* end */}
 <Divider sx={{height:10}}/>

    <Alert severity="info">Our Home</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List Home</Typography>
  
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New Home</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewHome)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>





<TextField label="title" {...register("title")} variant="outlined" size="small" fullWidth/>
<TextField label="logo" variant="outlined" {...register("logo")} size="small" fullWidth/>
<TextField label="name" {...register("name")} variant="outlined" size="small" fullWidth/>
<TextField label="address" variant="outlined" {...register("address")} size="small" fullWidth/>


<TextField label="email" {...register("email")} variant="outlined" size="small" fullWidth/>
<TextField label="phone" variant="outlined" {...register("phone")} size="small" fullWidth/>
<TextField label="whatsApp" {...register("whatsApp")} variant="outlined" size="small" fullWidth/>
<TextField label="facebook" variant="outlined" {...register("facebook")} size="small" fullWidth/>


<TextField label="instagram" {...register("instagram")} variant="outlined" size="small" fullWidth/>
<TextField label="tiktok" variant="outlined" {...register("tiktok")} size="small" fullWidth/>
<TextField label="heroTitle" {...register("heroTitle")} variant="outlined" size="small" fullWidth/>
<TextField label="heroDescription" variant="outlined" {...register("heroDescription")} size="small" fullWidth/>
<TextField label="heroImage" variant="outlined" {...register("heroImage")} size="small" fullWidth/>
<TextField label="footerText" variant="outlined" {...register("footerText")} size="small" fullWidth/>
    
    
    </Stack>

    </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={ToggleDailog}>Cancel</Button>
          <Button variant="contained" disabled={mutateLoading} sx={{bgcolor:"primary.main"}} type="submit"  size="small">

      {hId !=='' ? "Update" : "Submit"}
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

</Box>) :  <HomeList deleteHome={DeleteHomeInfo} homeData={home?.data} update={UpdateHomeInfo} />  }
 
    
   </Box>
    </>
}


