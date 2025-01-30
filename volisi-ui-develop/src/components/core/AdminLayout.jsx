/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useContext } from "react";
import QuizList from "../../pages/library/QuizList";
import FolderList from "./FolderList";
import volisiContext from "../../app/contexts/VolisiContext";
import { SEARCH_DROPDOWN } from "../../constants/constants";
function AdminLayout(props) {
  const { selectedOption } = useContext(volisiContext);
  return (
    <Grid className="h-screen overflow-hidden">
      <Grid container direction="column" className="h-full">
        <Grid item>
          <Header />
        </Grid>
        <Grid container item className="flex-1 overflow-hidden">
          <Grid item xs={2} className="h-full">
            <Sidebar />
          </Grid>
          <Grid item xs={10} className="flex h-full">
            {props.PageComponent ? (
              props.PageComponent
            ) : (
              <>
                {selectedOption === SEARCH_DROPDOWN.QUIZ && <QuizList />}
                {selectedOption === SEARCH_DROPDOWN.FOLDER && <FolderList />}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default AdminLayout;
