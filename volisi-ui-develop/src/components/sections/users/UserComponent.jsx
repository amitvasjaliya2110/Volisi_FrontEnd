import React, { useState, useEffect } from "react";
import useAxios from "../../../app/hooks/useAxios";
import { API_ENDPOINT } from "../../../constants/constants";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";

const CenteredBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  textAlign: "center",
});

const UserComponent = () => {
  const { get, post, put, del } = useAxios();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await get(API_ENDPOINT.USERS);
        setUsers(response || []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await post(API_ENDPOINT.USERS, { name, email });
      setName("");
      setEmail("");
      const response = await get(API_ENDPOINT.USERS); // Refresh data
      setUsers(response || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      setLoading(true);
      await del(`${API_ENDPOINT.USERS}/${userId}`);
      const response = await get(API_ENDPOINT.USERS); // Refresh data
      setUsers(response || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (userId, newName, newEmail) => {
    try {
      setLoading(true);
      await put(`${API_ENDPOINT.USERS}/${userId}`, {
        name: newName,
        email: newEmail,
      });
      const response = await get(API_ENDPOINT.USERS);
      setUsers(response || []);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <CenteredBox>
        <Typography component="h1" variant="h5">
          User Form
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            Add User
          </Button>
        </Box>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error: {error.message}</Typography>}
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() =>
                        handleUpdate(
                          user.id,
                          "Updated Name",
                          "updated@example.com"
                        )
                      }
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(user.id)}
                      sx={{ ml: 1 }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CenteredBox>
    </Container>
  );
};

export default UserComponent;
