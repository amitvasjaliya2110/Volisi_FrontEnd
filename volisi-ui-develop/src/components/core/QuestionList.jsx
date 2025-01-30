import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Box,
  Checkbox,
  Radio,
  Container,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import { QuestionListData } from "../../util/jsonData";
import TextFields from "./TextField";
import { Fragment, useState } from "react";

const columns = [
  {
    field: "id",
    headerName: "#",
    headerAlign: "Left",
    align: "center",
    sortable: false,
    filterable: false,
    width: 2,
  },
  {
    field: "question",
    headerName: "Questions",
    align: "left",
    sortable: false,
    filterable: false,
    width: 350,
  },
  {
    field: "type",
    headerName: "Type",
    headerAlign: "center",
    align: "center",
    sortable: false,
    filterable: false,
    width: 20,
  },
];

const QuestionList = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Adjust rowsPerPage as needed

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Pagination code is commented out because it may be used in the future.

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0); // Reset page number when rowsPerPage changes
  // };

  const handleQuestionClick = (questionId) => {
    if (selectedQuestion === questionId) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(questionId);
    }
  };

  return (
    <TableContainer
      sx={{
        height: "92vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingRight: 1.1,
      }}
    >
      <Grid
        sx={{
          width: "calc(100% - 8px)",
          borderRadius: 4,
          border: "1px solid #D4D4D8",
          overflow: "hidden",
          marginTop: "15px",
        }}
      >
        <Grid item xs={12}>
          {QuestionListData.length === 0 ? (
            <Typography align="center">No Questions Found</Typography>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        sx={{
                          fontSize: "18px",
                          fontWeight: 500,
                          color: "#18181B",
                          padding: "17px",
                          backgroundColor: "#E4E4E7",
                        }}
                        key={column.field}
                        align={column.align}
                        width={column.width}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? QuestionListData.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : QuestionListData
                  ).map((row) => (
                    <Fragment key={row.id}>
                      <TableRow
                        hover
                        onClick={() => handleQuestionClick(row.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell align="center">{row.id} </TableCell>
                        <TableCell align="left">{row.question}</TableCell>
                        <TableCell align="center">
                          {row.questionType.name}
                        </TableCell>
                      </TableRow>
                      {selectedQuestion === row.id && (
                        <TableRow>
                          <TableCell sx={{ padding: 0, width: 20 }}></TableCell>
                          <TableCell
                            colSpan={1}
                            sx={{
                              paddingTop: 0,
                              paddingRight: 0,
                              paddingBottom: 0,
                              paddingLeft: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                marginBottom: 1,
                                fontSize: "17px",
                                fontWeight: 500,
                                color: "#18181B",
                              }}
                            >
                              Options
                            </Typography>
                            <Grid container spacing={0}>
                              {row.questionType.id === 3 ? (
                                <Grid item xs={10}>
                                  <TextFields
                                    multiline
                                    variant="outlined"
                                    value={row.questionAnswers
                                      .map((item) => item.questionOption)
                                      .join("\n")}
                                    fullWidth
                                    rows={3}
                                    InputProps={{
                                      disableUnderline: true,
                                    }}
                                    sx={{
                                      padding: "8px",
                                      borderRadius: "8px",
                                      backgroundColor: "#F4F4F5",
                                      "& .MuiOutlinedInput-notchedOutline": {
                                        display: "none",
                                        borderBottom: "none",
                                      },
                                      "& .MuiInputBase-input": {
                                        fontSize: "17px",
                                      },
                                      "& .MuiOutlinedInput-root": {
                                        height: "65px",
                                      },
                                    }}
                                    disabled
                                  />
                                </Grid>
                              ) : (
                                row.questionAnswers.map((item, index) => (
                                  <Grid item xs={6} key={index}>
                                    <Grid
                                      container
                                      justifyContent="space-evenly"
                                      sx={{
                                        width: "93%",
                                        height: "40px",
                                        borderRadius: "8px",
                                        backgroundColor: "#F4F4F5",
                                        marginBottom:
                                          index < row.questionAnswers.length - 1
                                            ? "8px"
                                            : 0,
                                      }}
                                    >
                                      <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        direction="column"
                                        sx={{
                                          width: "40px",
                                          height: "40px",
                                          flexShrink: 0,
                                        }}
                                      >
                                        <Box
                                          borderRight={2}
                                          height={40}
                                          borderColor="grey.500"
                                        >
                                          <Typography
                                            sx={{
                                              fontSize: "17px",
                                              padding: "8px",
                                            }}
                                          >
                                            {String.fromCharCode(65 + index)}
                                          </Typography>
                                        </Box>
                                      </Grid>

                                      <Grid
                                        justifyContent="left"
                                        alignItems="center"
                                        container
                                        sx={{
                                          flex: 1,
                                          height: "100%",
                                          marginLeft: "16px",
                                        }}
                                      >
                                        <Typography
                                          sx={{
                                            fontSize: "17px",
                                            padding: "8px",
                                          }}
                                        >
                                          {item.questionOption}
                                        </Typography>
                                      </Grid>

                                      <Grid
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        sx={{
                                          width: "40px",
                                          height: "100%",
                                          flexShrink: 0,
                                        }}
                                      >
                                        {row.questionType.id === 1 &&
                                        row.answerOption.id === 2 ? (
                                          <Checkbox
                                            checked={item.correct}
                                            disabled={true}
                                            sx={{
                                              width: "40px",
                                              height: "40px",
                                              color: item.correct
                                                ? "green"
                                                : "default",
                                              "&.Mui-checked": {
                                                color: "green",
                                              },
                                            }}
                                          />
                                        ) : (
                                          <Radio
                                            checked={item.correct}
                                            disabled={true}
                                            style={{
                                              fontSize: "40px",
                                              color: "#22C55E",
                                            }}
                                          />
                                        )}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                ))
                              )}
                            </Grid>
                          </TableCell>
                          <TableCell sx={{ padding: 0, widht: 20 }}></TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
      <Grid>
        <TablePagination
          style={{
            marginBottom: "15px",
            display: "flex",
            justifyContent: "center",
            alignSelf: "center",
          }}
          rowsPerPageOptions={[5]}
          component="div"
          count={QuestionListData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          // onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </TableContainer>
  );
};

export default QuestionList;
