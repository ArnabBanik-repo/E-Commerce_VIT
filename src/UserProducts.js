import { Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import Item from "./Item";

const UserProducts = ({ history, user }) => {
  if (user) console.log(user);
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{ textAlign: "center", marginBottom: "2rem" }}
      >
        Your Listings
      </Typography>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "2rem",
        }}
      >
        {user ? (
          user.listedItems.map((item) => (
            <Item key={item.title} product={item} user={user} />
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </Container>
    </Box>
  );
};

export default UserProducts;
