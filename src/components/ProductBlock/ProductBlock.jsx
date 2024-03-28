import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import classes from "./ProductBlock.module.css";
const ProductBlock = () => {
  return (
    <div className={classes.productBlock_container}>
      <div>
        {" "}
        <Card
          sx={{ maxWidth: 345 }}
          style={{
            backgroundImage: "url('/cartoon.jpg')",
            backgroundSize: "contain",
            // backgroundPosition:"left -20% bottom  10%",
            // backgroundPosition:"bottom 2%",
            backgroundColor:"lightGray",
            backgroundPositionY: "100px",
            backgroundPositionX: "50px",
            backgroundRepeat: "no-repeat",
            height: "400px",
            width: "60dvw",
            border: "1px solid black",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Free Shipping Everywhere!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Special for orders over ₹ 10,000 Pan India Available throughout
                the year.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div>
        <Card
          sx={{ maxWidth: 345 }}
          className={classes.cont1}
          style={{
            backgroundImage: "url('/watch.png')",
            backgroundSize: "fill",
            height: "400px",
            width: "60dvw",
            border: "1px solid black",
           backgroundColor:"lightGray"
           
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Black Friday Clearance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Special for orders over ₹ 10,000 Pan India Available throughout
                the year.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};

export default ProductBlock;
