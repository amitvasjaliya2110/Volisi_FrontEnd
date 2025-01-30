import React, { useContext } from "react";
import { Grid, InputAdornment, Menu, MenuItem, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { AccountCircle } from "@mui/icons-material";
import Button from "../../components/core/Button";
import ProfileMenuItem from "../../components/core/ProfileMenuItem";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../constants/constants";
import { notification } from "antd";
import volisiContext from "../../app/contexts/VolisiContext";
const DashBoardHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dropdownAnchorEl, setDropdownAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { searchQuery, setSearchQuery, selectedOption, setSelectedOption } =
    useContext(volisiContext);
  const { post } = useAxios();

  const dropdownOpen = Boolean(dropdownAnchorEl);
  const dropdownOptions = ["Quiz", "Reports", "Folders"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate("/library");
  };

  const handleDropdownOpen = (event) => {
    setDropdownAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (option) => {
    if (option) {
      setSelectedOption(option);
    }
    setDropdownAnchorEl(null);
  };
  const handleCreateQuiz = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in local storage");
      return;
    }

    const quizData = {
      name: "Volisi Quiz " + Math.floor(Math.random() * 1000),
      description: "This is Volisi quiz",
      coverImage: "src/assets/images/No CoverImg.svg",
      status: "DRAFT",
      user: {
        id: userId,
      },
    };

    post(API_ENDPOINT.QUIZDETAIL, quizData, true)
      .then((response) => {
        const quizId = response.data.id;
        localStorage.setItem("quizId", quizId);
        navigate("/quiz");
      })
      .catch((error) => {
        console.error("Error creating quiz:", error);
        notification.error({
          message: "Quiz Creation Failed",
          description:
            "There was an error creating the quiz. Please try again later.",
        });
      });
  };
  return (
    <Grid container alignItems="center" justifyContent="space-between">
      <Grid item xs={4}>
        <TextField
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search"
          variant="outlined"
          size="small"
          sx={{ height: 40, width: 492 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={handleDropdownOpen}
                >
                  <span>{selectedOption}</span>
                  <ArrowDropDownIcon />
                </div>
              </InputAdornment>
            ),
          }}
        />
        <Menu
          anchorEl={dropdownAnchorEl}
          open={dropdownOpen}
          onClose={() => handleDropdownClose(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {dropdownOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleDropdownClose(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
      <Grid item xs={4} container alignItems="center" justifyContent="flex-end">
        <Button
          sx={{
            height: "38px",
            padding: "8px 16px",
            marginRight: "16px",
          }}
          name="Create Quiz"
          width="144px"
          onClick={handleCreateQuiz}
        />
        <AccountCircle
          id="profile-ui"
          onClick={handleClick}
          sx={{ height: 40, width: 40, color: "#3F3F46" }}
        />
        <ProfileMenuItem
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
      </Grid>
    </Grid>
  );
};

export default DashBoardHeader;