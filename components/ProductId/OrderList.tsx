import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import ButtonCT from "../Button/Button";
import numeral from "numeral";
import { IoChatboxEllipses, IoTrash } from "react-icons/io5";

const OrderList = () => {
  const order = [
    {
      id: 1,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 500,
    },
    {
      id: 2,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 240,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 2,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 2,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 10000.7,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 2,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 10000.7,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 2,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 0.0,
    },
    {
      id: 3,
      title: "สปาเก็ตตี้",
      image:
        "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574",
      price: 10000.7,
    },
  ];

  return (
    <Box
      sx={{
        position: `relative`,
        height: `calc(100vh - 104px)`,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ my: 2 }}>
        รายการ โต๊ะ 6-2
      </Typography>
      <Box
        sx={
          {
            // width: "100%",
            height: "calc(100% - 125px)",
            overflowY: `scroll`,
            // bgcolor: "background.paper",
            // mb: 2,
          }
        }
      >
        {order.map(({ id, title, image, price }) => {
          return (
            <Card sx={{ position: "relative", mb: 1 }} key={id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: 152,
                    height: 152,
                  }}
                  image={image}
                  alt="green iguana"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h6">
                      {title}
                    </Typography>
                    <Typography variant="h6" component="div" color="primary">
                      {numeral(price).format("0,0.0")}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      pl: 1,
                      pb: 1,
                    }}
                  >
                    <IconButton aria-label="minus" color="primary" size="large">
                      <FaCircleMinus />
                    </IconButton>
                    <Typography component="div" variant="h6">
                      1
                    </Typography>
                    <IconButton aria-label="plus" color="primary" size="large">
                      <FaCirclePlus />
                    </IconButton>
                    <IconButton aria-label="chatbox" size="large">
                      <IoChatboxEllipses />
                    </IconButton>
                    <IconButton aria-label="trash" size="large" color="error">
                      <IoTrash />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Card>
          );
        })}
      </Box>
      {/* <Box sx={{ height: "90%" }}></Box> */}
      <Box
        sx={{
          position: `absolute`,
          bottom: 0,
          width: `100%`,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <ButtonCT
              variant="contained"
              size="large"
              color="secondary"
              fullWidth
            >
              ยกเลิก
            </ButtonCT>
          </Grid>
          <Grid item xs={6}>
            <ButtonCT variant="contained" size="large" fullWidth>
              สั่งอาหาร
            </ButtonCT>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OrderList;
