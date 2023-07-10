"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";

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
  const [matchs, setmatchs] = React.useState([]);

  axios({
    method: "get",
    url: "http://localhost:8080/v1/getAllMatch",
    baseURL: process.env.BACKEND,
  }).then((res) => {
    setmatchs(res.data.data);
  });

  return (
    <Box sx={{ margin: 2 }}>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 5 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {matchs?.map((item, index) => (
          <Item sx={{}} key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontSize: 14, fontWeight: 700 }}>
                {item?.team_match_teamid1Toteam?.name}{" "}
              </Box>
              <Box sx={{ padding: 1 }}>vs</Box>
              <Box sx={{ fontSize: 14, fontWeight: 700 }}>
                {item?.team_match_teamid2Toteam?.name}{" "}
              </Box>
            </Box>
            <Box>{item?.results}</Box>
            <Box>League : {item?.league?.name}</Box>
            <Box>stadium: {item?.stadium?.name}</Box>
          </Item>
        ))}
      </Masonry>
    </Box>
  );
}
