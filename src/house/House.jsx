import { Box,Stack,IconButton,Typography,Alert,TextField,Button, Divider, Breadcrumbs} from "@mui/material"
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";
import HouseList from './HouseList'
import { AddHouse, DeleteHouse, UpdateHouse, GetAllHouse } from "./apiCrud";
import { useForm } from "react-hook-form";
import { AddCircleOutlineSharp, ErrorOutlineOutlined } from "@mui/icons-material";
import {  toast } from 'react-toastify';
 import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import ConfirmDelete from "../deleteComponent/ConfirmDelete";
import {  useDeleteHook } from "../deleteComponent/deleteHooks";

export const House = ()=>{
    
const queryclient = useQueryClient()
const {register,handleSubmit,reset,setValue,formState:{errors}} = useForm()
const [hId,sethId]=useState('')
const [hDeleteId,sethDeleteId]=useState('')
    const [dailogOpen,setDailog]=useState(false)
    const ToggleDailog = ()=>{
        setDailog(!dailogOpen)
    }
 
const {data:house,isLoading,isError}= useQuery({
    queryKey:['house'],
    queryFn: async ()=>  await GetAllHouse(),
    onError:()=>{
        toast.error("Sorry Data ma imanin")
    }
    
})
const {mutate,isLoading:mutateLoading} = useMutation({
    mutationFn:async(data)=>await AddHouse(data),
    onSuccess:()=>{
    
        queryclient.invalidateQueries({queryKey:['house']})
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
 
return await UpdateHouse(hId,data)

    },
    onSuccess:()=>{
        queryclient.invalidateQueries({queryKey:['house']})
        toast.success("Data has been updated")
        ToggleDailog()
    },

    onError:(e)=>{
    
        toast.error("Sorry Data Not Updated")
        console.log(e)
    }
})
 
const AddNewHouse = async (data)=>{

    if(hId !==''){

 try{
    // console.log(data)
//   update section
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
            // await AddHouse(data)
        
        ToggleDailog()
          reset()
              } catch( err){
          console.log("error ayaa jira ",err)
          
              }

    }
    

   
}
const UpdateHouseInfo = async (data)=>{
// console.log("xogta la rabbo in la update gareeyo",data)
    setValue("houseType",data.houseType)
    setValue("houseArea",data.houseArea)
    setValue("houseAddress",data.houseAddress)
    setValue("houseAge",data.houseAge)
    setValue("houseRent",data.houseRent)
    setValue("houseDeposit",data.houseDeposit)
    setValue("houseParking",data.houseParking)
    setValue("images",data.images)
    setValue("houseStatus",data.houseStatus)
    setValue("houseRooms",data.houseRooms)
    setValue("houseToilet",data.houseToilet)
    setValue("houseMasterRoom",data.houseMasterRoom)
    setValue("houseDescription",data.houseDescription)
    sethId(data._id)
    ToggleDailog()

}


//  delete mutate

const {mutate:deleteMutate} = useMutation({
    mutationFn:(id)=>DeleteHouse(id),
    onSuccess:()=>{
        toast.success("Client has  been deleted")
        deletehook.Toggle()
        queryclient.invalidateQueries({queryKey:['house']})
    },
    onError:()=>{
        toast.error("Sorry client not deleted")
    }


})
const deletehook = useDeleteHook()

const deleteCheck = ()=>{

    // alert("deleted")
    deleteMutate(hDeleteId)
   
}
// cal delete fucntion
const DeleteHouseInfo = async (data)=>{
   deletehook.setMessage(data.houseType)
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
 
  <Typography color="text.primary">House</Typography>
</Breadcrumbs>


 {/* end */}
 <Divider sx={{height:10}}/>

    <Alert severity="info">Our House</Alert>
    <Box sx={{display:"flex",justifyContent:"space-between"}} my={4}>
        <Typography variant="h6">List House</Typography>
  
        <IconButton   onClick={ToggleDailog}>
<AddCircleOutlineSharp />
        </IconButton>
    </Box>

    <Dialog open={dailogOpen} onClose={ToggleDailog}>
        <DialogTitle>New House</DialogTitle>
        <Box component={"form"} onSubmit={handleSubmit(AddNewHouse)}>
        <DialogContent>
        <Box sx={{width:"400px"}} mt={2}>



<Stack  spacing={2} direction={'column'}>



<TextField label="houseType" {...register("houseType")} variant="outlined" size="small" fullWidth/>
<TextField label="houseArea" variant="outlined" {...register("houseArea")} size="small" fullWidth/>
<TextField label="houseAddress" {...register("houseAddress")} variant="outlined" size="small" fullWidth/>
<TextField label="houseAge" variant="outlined" {...register("houseAge")} size="small" fullWidth/>


<TextField label="houseRent" {...register("houseRent")} variant="outlined" size="small" fullWidth/>
<TextField label="houseDeposit" variant="outlined" {...register("houseDeposit")} size="small" fullWidth/>
<TextField label="houseParking" {...register("houseParking")} variant="outlined" size="small" fullWidth/>
<TextField label="images" variant="outlined" {...register("images")} size="small" fullWidth/>


<TextField label="houseStatus" {...register("houseStatus")} variant="outlined" size="small" fullWidth/>
<TextField label="houseRooms" variant="outlined" {...register("houseRooms")} size="small" fullWidth/>
<TextField label="houseToilet" {...register("houseToilet")} variant="outlined" size="small" fullWidth/>
<TextField label="houseMasterRoom" variant="outlined" {...register("houseMasterRoom")} size="small" fullWidth/>
<TextField label="houseDescription" variant="outlined" {...register("houseDescription")} size="small" fullWidth/>
    
    
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

</Box>) :  <HouseList deleteHouse={DeleteHouseInfo} houseData={house?.data} update={UpdateHouseInfo} />  }
 
    
   </Box>
    </>
}

 