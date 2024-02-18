import { Button, Stack, TextField, Box, Alert, Divider , Typography, Grid} from '@mui/material'
import React from 'react'
import Chip from '@mui/material/Chip'; 
import { useParams } from 'react-router-dom'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { useState , useEffect } from 'react'
import { imageDb } from './Config'
import { ref , uploadBytes , listAll , getDownloadURL   } from 'firebase/storage'
import { v4 } from 'uuid'


export default function ImagesFolder() {
  // imageUpload
  const [img,setImg] = useState('')
  const [imgUrl,setImgUrl] = useState([])

  const handleClick = () => {
  const imgRef = ref(imageDb,`files/${v4()}`)
  uploadBytes(imgRef,img)
  }

  useEffect(()=>{
    listAll(ref(imageDb,"files")).then(imgs=>{
      // console.log(imgs)
      imgs.items.forEach(val => {
          getDownloadURL(val).then(url=>{
              setImgUrl(data=>[...data,url])
          })
      });
    })
  },[])

  // console.log(imgUrl ,"imgUrl")
// 



   /*  const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
          author: '@bkristastucchio',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
          author: '@rollelflex_graphy726',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
          author: '@helloimnik',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
          author: '@nolanissac',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
          author: '@silverdalex',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
          author: '@shelleypauls',
        },
      ]; */
   
      const {id,houseType} = useParams()
    // console.log(houseType)
  return (
    <>
    
    <Box sx={{marginTop:"20px",marginLeft:"15px"}}>

      <Alert severity='info'>
        Type : {houseType} {" "} Ref ID : {id}
      </Alert>

        <Divider sx={{height:20}}/>
        <Stack direction={'row'} spacing={1} sx={{marginTop: '15px'}}>
            <TextField fullWidth type='text' size='small' label="Title" variant='outlined'></TextField>
            <TextField fullWidth type='file' size='small' variant='outlined' 
             onChange={(e)=>setImg(e.target.files[0])}></TextField>
            <Button variant='contained' size='small' onClick={handleClick}>Upload</Button>
        </Stack>
        <Divider/>
        <Stack direction={'row'} spacing={3} sx={{marginTop: '20px'}}>
          {
            imgUrl.map((dataVal,index)=><Box>
                <img  key={index}src={dataVal} height= '200px' width= '300px'/>
            </Box>)
           }
        </Stack>
       

{/* imageList */}

  {/*  <Box>
   <Divider sx={{height:10}}/>
   <Grid container spacing={2}>

   {itemData.map((item,index)=>{
   return <Grid item xs={12} sm={8} md={6} lg={4} sx={{marginTop:'10px'}}> <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      key={index}
      sx={{ height: 140 }}
      image={item.img}
      title="green iguana"
    />
    <CardContent>
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
      <Typography variant="body2" color="text.secondary">
        {item.title}
      </Typography>
      <Chip  size="small"  label="See More" variant="outlined"/>
      </Box>
    </CardContent>
  </Card>
   </Grid>
   })}
   </Grid>
   </Box> */}
  
    </Box>
    
    </>
  )
}
