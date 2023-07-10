"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Box sx={{ margin: 2 }}>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 5 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {heights.map((height, index) => (
          <Item sx={{}} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <Box>Team1</Box> <Box>0</Box>
              </Box>
              :
              <Box>
                <Box>Team2</Box> <Box>0</Box>
              </Box>
            </Box>
            <Box>League : League</Box>
            <Box>stadium: stadium</Box>
          </Item>
        ))}
      </Masonry>
    </Box>
  );
}
