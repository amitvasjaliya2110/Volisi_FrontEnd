/* eslint-disable react/jsx-key */
import { useState, useContext } from "react";
import { Typography, IconButton, Box, Grid } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridRowModes,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import FolderIcon from "@mui/icons-material/Folder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import useAxios from "../../app/hooks/useAxios";
import { API_ENDPOINT, MESSAGES } from "../../constants/constants";
import ActionItems from "./ActionItems";
import { notification } from "antd";
import volisiContext from "../../app/contexts/VolisiContext";

const FolderList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { folders, fetchFolders } = useContext(volisiContext);
  const [rowModesModel, setRowModesModel] = useState({});
  const [editedFolderId, setEditedFolderId] = useState(null);
  const { del, put } = useAxios();
  const navigate = useNavigate();

  const handleFolderClick = (folderId, folderName) => {
    navigate(`/folders/${folderId}`, { state: { folderName } });
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    del(`${API_ENDPOINT.COLLECTION}/${id}`, true)
      .then(() => {
        notification.success({
          message: "Success",
          description: MESSAGES.FOLDER_DELETE_SUCCESS,
        });
        fetchFolders();
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: MESSAGES.FOLDER_CAN_NOT_DELETE,
        });
        console.error("Error deleting folder:", error);
      });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const handleBack = () => {
    navigate("/library");
  };

  const handleClick = (event, folderId) => {
    setAnchorEl(event.currentTarget);
    setEditedFolderId(folderId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = {
      ...newRow,
      isNew: false,
      updatedDate: new Date().toISOString(),
    };
    put(
      `${API_ENDPOINT.COLLECTION}`,
      { id: newRow.id, name: newRow.name, date: newRow.updatedDate },
      true
    )
      .then(() => {
        notification.success({
          message: "Success",
          description: MESSAGES.FOLDER_UPDATE_SUCCESS,
        });
        fetchFolders();
        setTimeout(() => {
          window.location.reload(false);
        }, 1000);
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: MESSAGES.FOLDER_ERROR,
        });
        console.error("Error updating folder:", error);
      });
    return updatedRow;
  };

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "id",
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      width: 400,
      sortable: false,
      editable: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Grid
          onClick={() => handleFolderClick(params.row.id, params.row.name)}
          style={{ cursor: "pointer" }}
        >
          <GridActionsCellItem
            icon={<FolderIcon />}
            label="Folder"
            color="inherit"
          />
          {params.value}
        </Grid>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      width: 400,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => <Grid>{params.value}</Grid>,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const isInEditMode =
          rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(params.id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              color="inherit"
              onClick={handleCancelClick(params.id)}
            />,
          ];
        }

        return [
          <IconButton onClick={(event) => handleClick(event, params.id)}>
            <MoreVertIcon color="action" />
          </IconButton>,
        ];
      },
    },
  ];

  const rows = folders.map((folder) => ({
    id: folder.id,
    name: folder.name,
    date: new Date(folder.updatedDate).toLocaleDateString(),
  }));

  const menuItems = [
    {
      name: "Edit",
      icon: EditIcon,
      iconClass: "text-[#18181B]",
      textClass: "",
      onClick: () => {
        handleEditClick(editedFolderId)();
        handleClose();
      },
    },
    {
      name: "Delete",
      icon: DeleteForeverIcon,
      iconClass: "text-[#EF4444]",
      textClass: "text-[#E93E3A]",
      onClick: () => {
        handleDeleteClick(editedFolderId)();
        handleClose();
      },
    },
  ];

  return (
    <Grid container sx={{ margin: 3 }}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" sx={{ marginBottom: "30px" }}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ color: "#18181B", fontSize: 24 }}>
            My Folders
          </Typography>
        </Box>
        <Box
          border={1}
          borderColor="#E4E4E7"
          borderRadius="12px"
          overflow="hidden"
        >
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
          />
          <ActionItems
            anchorEl={anchorEl}
            handleClose={handleClose}
            menuItems={menuItems}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FolderList;
