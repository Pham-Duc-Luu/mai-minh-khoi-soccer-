"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [teams, setteams] = React.useState([]);

  axios({
    method: "get",
    url: "http://localhost:8080/v1/getAllTeam",
    baseURL: process.env.BACKEND,
  }).then((res) => {
    setteams(res.data.data);
  });

  const router = useRouter();

  return (
    <Box sx={{ margin: 2 }}>
      <Masonry
        columns={{ xs: 2, sm: 3, md: 5 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {teams.map((item, index) => (
          <Item
            sx={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              router.push(`/dashboard/team/${item.teamid}`);
            }}
          >
            <Box sx={{ fontSize: 20, fontWeight: 700 }}>{item?.name}</Box>
            <Box>City : {item?.city}</Box>
            <Box>Stadiun: {item?.stadium?.name}</Box>
          </Item>
        ))}
      </Masonry>
    </Box>
  );
}
