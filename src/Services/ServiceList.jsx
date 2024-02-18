import { Box ,IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
export default function ServiceList({serviceData,update,deleteService}) {
 
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'title',
          headerName: 'Service Title',
          width: 150,
          editable: true,
        },
        {
          field: 'Icon',
          headerName: 'Service Icon',
          width: 150,
          editable: true,
        },
        {
          field: 'description',
          headerName: 'Service Description',
          width: 150,
          editable: true,
        },
        {
          field:"Actions",
          headerName:"Actions",
          width:200,
          renderCell:(params)=>{

            return <Box>

              <IconButton onClick={()=>update(params.row)}>
               <DriveFileRenameOutlineIcon sx={{color:"primary.main"}}/>
              </IconButton>
              <IconButton onClick={()=>deleteService(params.row._id)}><DeleteIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },
   ];
 const rows= serviceData ? serviceData : null
//  console.log(serviceData)
    

  return (
   <>
       <Box sx={{ height: 400, width: '100%' }}>
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
