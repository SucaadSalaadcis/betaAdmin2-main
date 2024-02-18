import { Box ,IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
export default function HomeList({homeData, update , deleteHome})  {
   
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: "title" ,headerName: "title" ,width: 150,editable: true,},
        { field: 'logo',headerName: 'logo',width: 150,editable: true,},
        { field: 'name',headerName: 'name',width: 150,editable: true,},
        { field: 'address',headerName: 'address',width: 150,editable: true,},
        { field: 'email',headerName: 'email',width: 150,editable: true,},
        { field: 'phone',headerName: 'phone',width: 150,editable: true,},
        { field: 'whatsApp',headerName: 'whatsApp',width: 150,editable: true,},
        { field: 'facebook',headerName: 'facebook',width: 150,editable: true,},
        { field: 'instagram',headerName: 'instagram',width: 150,editable: true,},
        { field: 'tiktok',headerName: 'tiktok',width: 150,editable: true,},
        { field: 'heroTitle',headerName: 'heroTitle',width: 150,editable: true,},
        { field: 'heroDescription',headerName: 'heroDescription',width: 150,editable: true,},
        { field: 'heroImage',headerName: 'heroImage',width: 150,editable: true,},
        { field: 'footerText',headerName: 'footerText',width: 150,editable: true,},
        { field:"Actions", headerName:"Actions", width:200, renderCell:(params)=>{

            return <Box>

              <IconButton onClick={()=>update(params.row)}>
               <DriveFileRenameOutlineIcon sx={{color:"primary.main"}}/> 
              </IconButton>
              <IconButton onClick={()=>deleteHome(params.row)}><DeleteIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },
   ];
 const rows= homeData ? homeData : null
    

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns}  getRowId={(row) => row._id}
          initialState={{ pagination: {  paginationModel: { pageSize: 5, },},}}
           pageSizeOptions={[5]}
           disableRowSelectionOnClick/>
    </Box>
   </>
  )
}
