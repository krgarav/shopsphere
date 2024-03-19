import React from "react";
import Paper from "@mui/material/Paper";
import classes from "./ImageHeader.module.css";
import { Button } from "@mui/material";
const ImageHeader = () => {
  return (
    <Paper elevation={12} className={classes.paper}>
      <div className={classes.content}>
        <h3>
          Your One-Stop
          <br /> Shoping Mart
        </h3>
        <p>
          Welcome to our vibrant e-shop, where buying and selling your products
          is not just convenient, but an enjoyable experience! Dive into a world
          of endless possibilities as you explore our diverse range of
          offerings.
        </p>
        <Button color="secondary" variant="contained">
          Shop Now
        </Button>
      </div>
      <img src="/laptopimg.png" image-contain="true"  alt=" Laptop image" className={classes.image} />
    </Paper>
  );
};

export default ImageHeader;
