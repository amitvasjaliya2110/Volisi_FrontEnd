/* eslint-disable react/prop-types */
import { TabList, TabPanel, TabContext } from "@mui/lab";
import { Grid, Tab } from "@mui/material";

const TabBar = ({ tabsData, value, onTabChange }) => {
  const handleChange = (event, newValue) => {
    onTabChange(newValue);
  };

  return (
    <Grid container direction="row" justifyContent="flex-start">
      <TabContext value={value}>
        <Grid display={"flex"} flexDirection={"column"} item xs={12}>
          <Grid item>
            <TabList
              onChange={handleChange}
              className="p-4"
              sx={{
                "& .MuiTabs-indicator": {
                  backgroundColor: "#71717A",
                },
              }}
            >
              {tabsData?.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                  margin={0}
                  sx={{
                    border: "1px solid #71717A",
                    borderRadius: "2px",
                    height: "40px",
                    backgroundColor:
                      value === tab.value ? "#71717A" : "#FFFFFF",
                    color:
                      value === tab.value ? "#FFFFFF !important" : "#3F3F46",
                  }}
                />
              ))}
            </TabList>
          </Grid>
          <Grid item xs={12} md={12}>
            {tabsData?.map((tab) => (
              <TabPanel
                key={tab.value}
                value={tab.value}
                sx={{ color: "black", margin: 0, padding: 0 }}
              ></TabPanel>
            ))}
          </Grid>
        </Grid>
      </TabContext>
    </Grid>
  );
};

export default TabBar;
