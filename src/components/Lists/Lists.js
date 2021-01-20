import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import HotelIcon from '@material-ui/icons/Hotel';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import CommuteIcon from '@material-ui/icons/Commute';
import LocalSeeIcon from '@material-ui/icons/LocalSee';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import List from './List';

const useStyles = makeStyles((theme) => ({
  ...theme.classes,
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function SimpleTabs() {
  const classes = useStyles();

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} centered>
          <Tab
            className={classes.listTab}
            icon={
              <Tooltip title="Lodging" placement="top">
                <HotelIcon />
              </Tooltip>
            }
            aria-label="Lodging"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.listTab}
            icon={
              <Tooltip title="Restaurants" placement="top">
                <RestaurantIcon />
              </Tooltip>
            }
            aria-label="Restaurants"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.listTab}
            icon={
              <Tooltip title="Transportation" placement="top">
                <CommuteIcon />
              </Tooltip>
            }
            aria-label="Transportation"
            {...a11yProps(2)}
          />
          <Tab
            className={classes.listTab}
            icon={
              <Tooltip title="Sights and Activities" placement="top">
                <LocalSeeIcon />
              </Tooltip>
            }
            aria-label="Sights and Activities"
            {...a11yProps(3)}
          />
          <Tab
            className={classes.listTab}
            icon={
              <Tooltip title="Other" placement="top">
                <MoreVertIcon />
              </Tooltip>
            }
            aria-label="Other"
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List tabType="Lodging" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List tabType="Restaurants" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <List tabType="Transportation" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <List tabType="Activities" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <List tabType="Other" />
      </TabPanel>
    </React.Fragment>
  );
}

export default SimpleTabs;
