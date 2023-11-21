import { Box, Divider, Typography, Grid } from '@mui/material'
import React from 'react'
import { styled } from '@mui/system';


const items = [
  {
    title: 'ชุดนอน',
    image: 'https://down-th.img.susercontent.com/file/7d8907e60eea0277f9b61c3ed8a85987',
    to: 'อาหารเสริมและผลิตภัณฑ์สุขภาพ'
  }, {
    title: 'นาฬิกาและแว่นตา',
    image: 'https://down-th.img.susercontent.com/file/th-50009109-aaf0f6ab54c913a4b747e017b0f1e649_xhdpi',
    to: 'นาฬิกาและแว่นตา'
  },
  {
    title: 'ไม้ถูพื้น',
    image: 'https://down-th.img.susercontent.com/file/d2a8f8f04ed84b8697f99589cf8b4675',
    to: 'รองเท้าผู้ชาย'
  }, {
    title: 'เคสApple iPhone',
    image: 'https://down-th.img.susercontent.com/file/58c97fdd4bef3bf9fe7451c4755b1133',
    to: 'คอมพิวเตอร์และแล็ปท็อป'
  },
  {
    title: 'ชั้นวางของในห้องน้ำ',
    image: 'https://down-th.img.susercontent.com/file/ed85a887641f93c5f6006a41d229d592',
    to: 'รองเท้าผู้หญิง'
  },
  {
    title: 'กางเกง Boxer',
    image: 'https://down-th.img.susercontent.com/file/4a3a8abcedba58d8491a43f1a23b6ac7',
    to: 'เครื่องใช้ในบ้าน'
  },
  {
    title: 'ชั้นวางของในห้องน้ำ',
    image: 'https://down-th.img.susercontent.com/file/ed85a887641f93c5f6006a41d229d592',
    to: 'รองเท้าผู้หญิง'
  },
  {
    title: 'กางเกง Boxer',
    image: 'https://down-th.img.susercontent.com/file/4a3a8abcedba58d8491a43f1a23b6ac7',
    to: 'เครื่องใช้ในบ้าน'
  },
  {
    title: 'ชั้นวางของในห้องน้ำ',
    image: 'https://down-th.img.susercontent.com/file/ed85a887641f93c5f6006a41d229d592',
    to: 'รองเท้าผู้หญิง'
  },
  {
    title: 'กางเกง Boxer',
    image: 'https://down-th.img.susercontent.com/file/4a3a8abcedba58d8491a43f1a23b6ac7',
    to: 'เครื่องใช้ในบ้าน'
  },
  {
    title: 'ชั้นวางของในห้องน้ำ',
    image: 'https://down-th.img.susercontent.com/file/ed85a887641f93c5f6006a41d229d592',
    to: 'รองเท้าผู้หญิง'
  },
  {
    title: 'กางเกง Boxer',
    image: 'https://down-th.img.susercontent.com/file/4a3a8abcedba58d8491a43f1a23b6ac7',
    to: 'เครื่องใช้ในบ้าน'
  },
];

const ProductList = () => {
  return (
    <Box>
      <Typography variant="h5">สินค้า</Typography>
      <Divider sx={{ my: 3 }} flexItem />
      <Grid container spacing={2}>
        {[...items,...items,...items].map((val, idx) => {
          return (

            <Grid key={idx} item xs={6} sm={4} md={3} lg={2}>
              <StyledBoxItem>
                <Box component="div" className="img" sx={{ background: `url("${val.image}")` }}></Box>
                <Box component='p'>{val.title}</Box>
              </StyledBoxItem>
            </Grid>

          )
        })}
      </Grid>
    </Box>
  )
}

export default ProductList


const StyledBoxItem = styled(Box)(({ theme }) => ({
  gap: 10,
  width: '100% ',
  height: '100%',
  textAlign: 'center',
  borderRadius: '10px',
  display: 'flex !important',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  cursor: 'pointer',
  backgroundColor: '#ffff',
  '&:hover': {
    // borderRadius: '10px',
    boxShadow: `0px 2px 14px -9px ${theme.palette.primary.main}`,
    backgroundColor: '#fff',
    ['@media (max-width: 666px)']: {
      margin: 'auto'
    }
  },
  '& .img': {
    width: '100%',
    // height: '250px',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
    objectFit: 'cover',
    aspectRatio: '2/2'
  },
  '& p': {
    width: '90%',
    color: '#2E2E2E',
    fontSize: '1.2rem',
    letterSpacing: '0.5',
    textAlign: 'center',
    height: '60px',
    overflow: 'hidden',
  },
}));
