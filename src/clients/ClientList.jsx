import { Box ,IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
export default function ClientList({clientsData,update,deleteClient}) {
   
    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
          field: 'clientName',
          headerName: 'Client Name',
          width: 150,
          editable: true,
        },
        {
          field: 'clientLogo',
          headerName: 'Logo',
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
              <IconButton onClick={()=>deleteClient(params.row)}><DeleteIcon sx={{color:"error.main"}} /></IconButton>
              
            </Box>
          }
        },
   ];
 const rows= clientsData ? clientsData : null
    

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
