
import { Box ,Stack,Typography,Drawer} from "@mui/material"
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HouseIcon from '@mui/icons-material/House';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CollectionsIcon from '@mui/icons-material/Collections';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import SendIcon from '@mui/icons-material/Send';
import RoundaboutRightIcon from '@mui/icons-material/RoundaboutRight';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = ({DrawerOpen,DrawerClose})=>{

  const [selectedMenu,setMenu]=useState('')
 
     
    return<>
<Drawer open={DrawerOpen} onClose={DrawerClose}>
<Box sx={{width:"300px"}}> 
  

<Box sx={{p:4}}>

<Stack direction={'row'} spacing={1}>
<Box>
<AddHomeWorkIcon sx={{color:"pink",height:30, fontSize:50 }} />
</Box>

<Box><Typography variant="h6" > BetaHouse</Typography></Box>
</Stack>
</Box>
    
    


    {/* Mlist */}
   <Box>
   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}component="nav">
      <ListItemButton>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <Link to={'homeSetting'}>
      <ListItemButton
      sx={[selectedMenu === 'homeSetting' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('homeSetting')
        DrawerClose()
      }}>
        <ListItemIcon>
          <MapsHomeWorkIcon sx={[selectedMenu==='homeSetting' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="HomeSettings" />
      </ListItemButton>

      </Link>

      <Link to={'house'}>
      <ListItemButton sx={[selectedMenu === 'house' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('house')
        DrawerClose()

      }}>
        <ListItemIcon>
          <HouseSidingIcon  sx={[selectedMenu==='house' && {color:"white"}]}  />
        </ListItemIcon>
        <ListItemText primary="house"/>  
      </ListItemButton>
      </Link>

      <Link to={'gallery'}>
      <ListItemButton sx={[selectedMenu === 'gallery' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('gallery')
        DrawerClose()

      }}>
        <ListItemIcon>
          <CollectionsIcon  sx={[selectedMenu==='gallery' && {color:"white"}]}  />
        </ListItemIcon>
        <ListItemText primary="Gallery"/>  
      </ListItemButton>
      </Link>


      <Link to={'services'}>
      <ListItemButton sx={[selectedMenu === 'services' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('services')
        DrawerClose()

      }}>
        <ListItemIcon>
          <MiscellaneousServicesIcon  sx={[selectedMenu==='services' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Service" />
        
      </ListItemButton>
      </Link>




      <Link to={'client'}>
      <ListItemButton sx={[selectedMenu === 'client' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('client')
        DrawerClose()

      }}>
        <ListItemIcon>
          <InboxIcon  sx={[selectedMenu==='client' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        
      </ListItemButton>
      </Link>


      
      <Link to={'about'}>
      <ListItemButton sx={[selectedMenu === 'about' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('about')
        DrawerClose()

      }}>
        <ListItemIcon>
          <InboxIcon  sx={[selectedMenu==='about' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="about" />
        
      </ListItemButton>
      </Link>




      <Link to={'contactForm'}>
      <ListItemButton sx={[selectedMenu === 'contactForm' && {bgcolor:"primary.main",color:"white",":hover":{
        bgcolor:"primary.dark"
      }}]}
      onClick={()=>{
        setMenu('contactForm')
        DrawerClose()

      }}>
        <ListItemIcon>
          <ContactEmergencyIcon  sx={[selectedMenu==='contactForm' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Contacts" />
        
      </ListItemButton>
      </Link>

    </List>
    </Box> 
    </Box>
</Drawer>

{/* big screen menu */}
    <Box sx={{width:"300px",height:"100vh",display:{
        xs:"none",
       
        md:"block"
    },borderRight:1,borderColor:"#eee"}}> 
  

<Box sx={{p:4}}>

<Stack direction={'row'} spacing={1}>
<Box>
<AddHomeWorkIcon sx={{color:"purple",height:30, fontSize:50 }} />

</Box>

<Box><Typography variant="h6" > BetaHouse</Typography></Box>
</Stack>
</Box>
    
    


    {/* Menu list */}
    

   <Box>
   <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
 
    >
      <ListItemButton >
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    
    
    <Link to={'homeSetting'} style={{textDecoration:"none"}}>
      <ListItemButton onClick={()=>setMenu('homeSetting')}  sx={[ selectedMenu==='homeSetting' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}>
        <ListItemIcon>
          <MapsHomeWorkIcon sx={[ selectedMenu==='homeSetting' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="HomeSettings" />
      </ListItemButton>
      </Link>

      <Link to={'house'} style={{textDecoration:"none"}}>
      <ListItemButton onClick={()=>setMenu('house')}  sx={[ selectedMenu==='house' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}>
        <ListItemIcon>
          <HouseSidingIcon sx={[ selectedMenu==='house' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="House" />
      </ListItemButton>
      </Link>

      <Link to={'gallery'} style={{textDecoration:"none"}}>
      <ListItemButton onClick={()=>setMenu('gallery')}  sx={[ selectedMenu==='gallery' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}>
        <ListItemIcon>
          <CollectionsIcon sx={[ selectedMenu==='gallery' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Gallery" />
      </ListItemButton>
      </Link>
     
     
      <Link to={'services'} style={{textDecoration:"none"}}>
      <ListItemButton  sx={[selectedMenu ==='services' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('services')} >
        <ListItemIcon>
          <MiscellaneousServicesIcon sx={[selectedMenu === 'services' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Service" />
        
      </ListItemButton>
      </Link>
      

      <Link to={'client'} style={{textDecoration:"none"}}>
      <ListItemButton  sx={[selectedMenu ==='client' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('client')} >
        <ListItemIcon>
          <EmojiPeopleIcon sx={[selectedMenu === 'client' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Clients" />
        
      </ListItemButton>
      </Link>

      <Link to={'about'} style={{textDecoration:"none"}}>
      <ListItemButton  sx={[selectedMenu ==='about' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('about')} >
        <ListItemIcon>
          <RoundaboutRightIcon sx={[selectedMenu === 'about' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="About" />
        
      </ListItemButton>
      </Link>


      <Link to={'contactForm'} style={{textDecoration:"none"}}>
      <ListItemButton  sx={[selectedMenu ==='contactForm' && {bgcolor:"primary.main",color:"white",":hover":{bgcolor:"primary.dark"}}]}
      onClick={()=>setMenu('contactForm')} >
        <ListItemIcon>
          <ContactEmergencyIcon sx={[selectedMenu === 'contactForm' && {color:"white"}]} />
        </ListItemIcon>
        <ListItemText primary="Contacts" />
        
      </ListItemButton>
      </Link>

    </List>
    </Box> 
    </Box>
    </>
}