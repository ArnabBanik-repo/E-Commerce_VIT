import { Container, styled, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Item from "./Item";
import Sad from "./assets/sad.png";

const StyledContainer = styled(Container)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "2rem",
  [theme.breakpoints.down("md")]: {
    // gridTemplateColumns: "1fr",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Dashboard = ({ user, setUser }) => {
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/products")
      .then((data) => setData(data.data.data));
  }, []);

  return (
    <StyledContainer>
      {data !== undefined ? (
        data.products.length === 0 ? (
          <Typography
            variant="h2"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "3",
              display: "flex",
              alignItems: "center",
            }}
          >
            No Items on Sale at the moment <img src={Sad} alt="" />
          </Typography>
        ) : (
          data.products.map((item) => (
            <Item key={item._id} product={item} user={user} setUser={setUser} />
          ))
        )
      ) : (
        <Typography variant="h4">Loading...</Typography>
      )}
    </StyledContainer>
  );
};

export default Dashboard;
