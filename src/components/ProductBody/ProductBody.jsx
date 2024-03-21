import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import { TabPanel } from "../TabPanel";
import { Row, Col } from "react-bootstrap";
const ProductBody = (props) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const { brand, description, category } = props.item;
  console.log(props.item);
  console.log("brand : ", brand);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Tabs
          onChange={handleChange}
          value={value}
          aria-label="Tabs where selection follows focus"
          selectionFollowsFocus
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Specification" {...a11yProps(1)} />
          <Tab label="Return" {...a11yProps(2)} />
          <Tab label="Reviews" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <section>
            {/* <Row>
                    <Col>Brand : </Col>
                    <Col> {brand}</Col>
                </Row>
                <Row>
                    <Col>Display : </Col>
                    <Col>Full HD 1920*1080</Col>
                </Row> */}
            <h5>{description}</h5>
          </section>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <section>
            <Row>
              <Col>Brand : </Col>
              <Col> {brand}</Col>
            </Row>
            <Row>
              <Col>Display : </Col>
              <Col>Full HD 1920*1080</Col>
            </Row>
          </section>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Return
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Reviews
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

export default ProductBody;
