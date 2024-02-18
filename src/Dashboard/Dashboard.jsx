import { Box,Stack,IconButton,Typography } from "@mui/material"
import { Sidebar } from "./SideBar"
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { Outlet } from "react-router-dom";
 
export const Dashboard = () => {
const [draweOpen,setDrawer]=useState(false)

const ToggleDrawer = ()=>{
setDrawer(!draweOpen)
}
    return <>
      <Box>

<Stack direction={'row'}>

<Sidebar DrawerOpen={draweOpen} DrawerClose={ToggleDrawer}/>
{/* content box */}
<Box sx={{width:"100%"}}>
{/* top header */}

<Box sx={{bgcolor:"purple",color:"white",display:"flex",justifyContent:{
    xs:"space-between",
    md:"end"
}}} p={2}>
    
<IconButton sx={{p:0,display:{
    xs:"block",
    md:"none"
}}} onClick={()=>ToggleDrawer()}>
    <MenuIcon sx={{color:"white"}}/>
</IconButton>

<Typography > User : SuSu@gmail.com</Typography>
</Box>
<Outlet/>
 


 
</Box>
</Stack>
      </Box>

    </>
}