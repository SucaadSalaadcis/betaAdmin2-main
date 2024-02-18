import { Box ,Divider,IconButton, Stack, Typography} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Chip from '@mui/material/Chip'; 
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Link } from 'react-router-dom';
export default function ClientList({houseData,update,deleteHouse}) {

  const [dailOpen,setDail] = useState(false);
  const [XogtaGuriga,setXogta] = useState()   
  const Toggle = () => {
        setDail(!dailOpen)
   } 
  
   
  const seeMore = (data) => {
     console.log(data)
    setXogta(data)
    Toggle()
}
    const columns = [
        {
          field: 'houseType',
          headerName: 'houseType', 
          width: 150,
          editable: true,
          renderCell:(params)=>{
          return <Box>  {params.row.houseType} {" "}
          <Chip onClick={()=>seeMore(params.row)}  size="small"  label="See More" variant="outlined"/>
          </Box>
          }
       
        },
        {
          field: 'houseAddress', headerName: 'houseAddress', width: 150, editable: true,},
        {
          field: 'houseRent', headerName: 'houseRent', width: 150, editable: true,},
        {
          field: 'houseStatus', headerName: 'houseStatus', width: 150, editable: true,},
        {
          field:"Actions", headerName:"Actions", width:200,
          renderCell:(params)=>{

            return <Box>

              <IconButton onClick={()=>update(params.row)}>
               <DriveFileRenameOutlineIcon sx={{color:"primary.main"}}/> 
              </IconButton>
              <IconButton onClick={()=>deleteHouse(params.row)}><DeleteIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },
        {
          field: 'images', headerName: 'image', width: 150, editable: true,
          renderCell:(params)=>{
            return <Link to={`/dashboard/gallery`}>
              {/* <Link to={`/dashboard/gallery/${params.row._id}/${params.row.houseType}`}></Link> */}
              <Chip size='small' label="Image Folder" variant='outlined'></Chip>
            </Link>
          }
        },
   ];
 const rows= houseData ? houseData : null
    

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>
         {/* Dialog */}
     <Dialog
       open={dailOpen}
      onClose={Toggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">
       Type : {" "} {XogtaGuriga?.houseType}  || Status : {" "} {XogtaGuriga?.houseStatus}
      </DialogTitle>
  <DialogContent>
    <DialogContentText id="alert-dialog-description">

   <Stack direction={'column'} spacing={2}>
          <Box sx={{p:2,width:500}}>

        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> HouseAddres : </Typography>
        <Box>{XogtaGuriga?.houseAddress}</Box>
        </Box>
        <Divider/>
        <Stack direction={'row'}>
        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Age : </Typography>
        <Box>{XogtaGuriga?.houseAge}</Box>
        </Box>
        </Stack>
        <Divider/>
       
        <Stack direction={'row'} spacing={1}>
        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Rent : </Typography>
        <Box>{XogtaGuriga?.houseRent}</Box>
        </Box>
        <Divider/>

        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Deposit : </Typography>
        <Box>{XogtaGuriga?.houseDeposit}</Box>
        </Box>
        </Stack>
        <Divider/>

        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Parking: </Typography>
        <Box>{XogtaGuriga?.houseParking}</Box>
        </Box>
        <Divider/>   

        <Stack direction={'row'} spacing={1}>
        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Rooms : </Typography>
        <Box>{XogtaGuriga?.houseRooms}</Box>
        </Box>
        <Divider/>

        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Toilet : </Typography>
        <Box>{XogtaGuriga?.houseToilet}</Box>
        </Box>
        </Stack>
        <Divider/>

        <Stack direction={'row'} spacing={1}>
        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House Desc : </Typography>
        <Box>{XogtaGuriga?.houseDescription}</Box>
        </Box>
        <Divider/>

        <Box sx={{display:'flex', gap:2, alignItems:'center'}}>
        <Typography variant={'h6'}> House MasterRoom : </Typography>
        <Box>{XogtaGuriga?.houseMasterRoom}</Box>
        </Box>
        </Stack>
        <Divider/>

        

        </Box>
    </Stack>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Toggle} autoFocus>Close</Button>
        </DialogActions>
      </Dialog>
        
        {/*  */}
      <DataGrid
    
       rows={rows}
        columns={columns}
         getRowId={(row) => row._id}
          initialState={{
            pagination: {
             paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
     
        disableRowSelectionOnClick
      />

    </Box>
   </>
  )
}
