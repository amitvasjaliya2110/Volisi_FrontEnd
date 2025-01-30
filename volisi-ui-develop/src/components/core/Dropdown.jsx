import * as React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Dropdown = ({ label, items = [], selectedValue, onChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ minWidth: 234, marginBottom: 2 }}>
      <FormControl fullWidth>
        <Select
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: "8px",
                border: "1px solid #A1A1AA",
                marginTop: "8px",
              },
            },
            MenuListProps: {
              sx: {
                padding: 0,
              },
            },
          }}
          id={`select-${label}`}
          value={selectedValue}
          onChange={onChange}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          displayEmpty
          IconComponent={() =>
            open ? (
              <KeyboardArrowUpIcon onClick={() => setOpen(!open)} />
            ) : (
              <KeyboardArrowDownIcon onClick={() => setOpen(!open)} />
            )
          }
          sx={{
            width: "234px",
            height: "40px",
            padding: "8px 0px",
            borderRadius: "8px",
            border: "1px solid #A1A1AA",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {Array.isArray(items) &&
            items.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
