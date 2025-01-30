import { useState } from "react";
import { Card, CardContent, Typography, Grid, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DownloadIcon from "@mui/icons-material/Download";
import TabBar from "../../components/core/TabBar";
import Details from "./Details";
import Players from "./Players";
import Questions from "./Questions";

const ReportDetails = () => {
  const [selectedTab, setSelectedTab] = useState("details_tab");

  const tabsData = [
    { label: "Details", value: "details_tab" },
    { label: "Players", value: "players_tab" },
    { label: "Questions", value: "questions_tab" },
  ];

  const titleStyle = { color: "#18181B" };

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };

  return (
    <Card sx={{ width: "100%", margin: 1, boxShadow: "none" }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid
            item
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" sx={titleStyle}>
              Android
            </Typography>
          </Grid>
          <Grid item>
            <IconButton>
              <DownloadIcon />
            </IconButton>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <TabBar
              tabsData={tabsData}
              value={selectedTab}
              onTabChange={handleTabChange}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            {selectedTab === "details_tab" && <Details />}
            {selectedTab === "players_tab" && <Players />}
            {selectedTab === "questions_tab" && <Questions />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReportDetails;
