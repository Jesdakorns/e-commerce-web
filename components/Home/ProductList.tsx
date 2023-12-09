import { Box, Divider, Typography, Grid, Skeleton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/system';
import { AppDispatch, useAppSelector } from '@/store';
import { useDispatch } from 'react-redux';
import { productsStore } from '@/store/actions';
import InfiniteScroll from 'react-infinite-scroll-component';
import ButtonCT from '../Button/Button';
import { useRouter } from 'next/navigation';
import { gsap } from "gsap";
import store from 'store2';
import ProductItem from '../Item/ProductItem';
import useCustomRouter from '@/hook/useCustomRouter';

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

export const LoadingProduct = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {Array.from(Array(4)).map((val, idx) =>
          <Grid key={idx} item xs={6} sm={4} md={3} lg={2}>
            <StyledBoxItem>
              <Box width={'100%'} p={2}>
                <Skeleton variant="rectangular" className="img" />
              </Box>
              <Box component='p'><Skeleton variant="text" /></Box>

            </StyledBoxItem>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

const ProductList = () => {
  const products = useAppSelector((state) => state.products)
  console.log(`🚀 ~ file: ProductList.tsx ~ line 96 ~ ProductList ~ products`, products)
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const refProduct = useRef<any[]>([]);
  const [position, setPosition] = useState(0)
  const { pushRouter } = useCustomRouter()

  const fetchMoreData = () => {
    // setTimeout(() => {
    setPosition(products.data.data.length)
    try {
      dispatch(productsStore({ val: products.data.data, page: products.data.meta?.nextPage ?? 1, max: 24 }))
    } catch (error) {

    }
    // }, 2000);
  };

  useEffect(() => {
    if (products.isSetData) return
    dispatch(productsStore({}))
    store.session.remove("hasMore")
  }, [])

  useEffect(() => {
    if (store.session.get('hasMore')) return
    const el = refProduct.current.filter((val, idx) => (idx >= position) && val)
    gsap.fromTo(el, {
      opacity: 0,
      scale: 0,
      duration: 0,
    }, { opacity: 1, duration: 0.5, stagger: 0.1, scale: 1, });
    return () => {
      if (!products.hasMore) {
        store.session.set("hasMore", true)
      }
    }
  }, [position, products])

  return (
    <Box>
      <Typography variant="h5">สินค้า</Typography>
      <Divider sx={{ my: 3 }} flexItem />
      <InfiniteScroll
        dataLength={products.data.data.length}
        next={fetchMoreData}
        hasMore={products?.hasMore ?? false}
        loader={<LoadingProduct />}
        endMessage={<Box display="flex" justifyContent='center' p={2}><ButtonCT size='large' onClick={() => router.push('search')}>Show More</ButtonCT></Box>}
      >
        <Grid container spacing={2}>
          {products.data.data.map((val, idx) =>
            <Grid key={val.id} item xs={6} sm={4} md={3} lg={2} ref={e => refProduct.current[idx] = e}>
              <Box onClick={() => pushRouter(`/${val.id}`)}><ProductItem title={val.title} image={val.coverPhoto?.[0]} totalSales={val.salesAmount} price={val.price} discount={val.discount} rating={2} /></Box>
            </Grid>
          )}
        </Grid>
      </InfiniteScroll>
    </Box >
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
    height: 'auto',
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
