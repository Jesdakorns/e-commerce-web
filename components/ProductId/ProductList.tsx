import Image from "next/image";
import styles from "./page.module.css";
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Fab,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import Button from "@/components/Button/Button";
import React from "react";
import { styled } from "@mui/material/styles";
import ButtonCT from "@/components/Button/Button";
var _ = require("lodash");
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { FaCirclePlus, FaCircleMinus, FaTrash } from "react-icons/fa6";
import OrderList from "@/components/Product/OrderList";
import numeral from "numeral";

export interface Messages {
  id: number;
  primary: string;
  secondary: string;
  person: string;
  mode: string;
}

interface Props {
  data: Messages[];
}

const ProductList = ({ data }: Props) => {
  const dataOrder = _.groupBy(data, "mode");

  return (
    <Box sx={{ overflow: "auto", height: "90vh" }}>
      {Object.keys(dataOrder).map((val, id) => {
        const res: Messages[] = dataOrder[val];
        return (
          <React.Fragment key={id}>
            <Typography variant="h5" component="h2" sx={{ my: 2 }}>
              {val}
            </Typography>

            <Grid container spacing={2}>
              {res.map((valMap, idx) => {
                return (
                  <Grid item xs={12} sm={12} md={6} lg={4} xl={2} key={idx}>
                    <Card>
                      <CardActionArea
                        sx={{
                          display: { xs: "flex", md: "block" },
                          justifyContent: "flex-start",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: { xs: 152, md: "100%" },
                            height: { xs: 152, md: 180 },
                          }}
                          image="https://images.immediate.co.uk/production/volatile/sites/30/2013/05/spaghetti-carbonara-382837d.jpg?resize=768,574"
                          alt="green iguana"
                        />
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent sx={{ flex: { xs: "1 0 auto" } }}>
                            <Typography component="div" variant="h6">
                              Live From Space
                            </Typography>
                            <Typography
                              variant="h6"
                              component="div"
                              color="primary"
                            >
                              {numeral(0).format("0,0.0")}
                            </Typography>
                          </CardContent>
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default ProductList;
