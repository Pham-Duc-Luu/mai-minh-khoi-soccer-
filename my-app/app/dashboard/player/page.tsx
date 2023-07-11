"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import TextField from "@mui/material/TextField";
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

export default function Player() {
  const [players, setPlayers] = React.useState([]);

  const router = useRouter();

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/v1/allPlayer",
      baseURL: process.env.BACKEND,
    }).then((res) => {
      setPlayers(res.data.data);
    });
  }, []);

  function handleGetAllPlayer() {
    axios({
      method: "get",
      url: "http://localhost:8080/v1/allPlayer",
      baseURL: process.env.BACKEND,
    }).then((res) => {
      setPlayers(res.data.data);
    });
  }

  function handleSearchByName(name: string) {
    axios({
      method: "post",
      url: "http://localhost:8080/v1/getPlayerByName",
      baseURL: process.env.BACKEND,
      data: { name: name },
    }).then((res) => {
      setPlayers(res.data.data);
    });
  }

  return (
    <Box sx={{ margin: 2 }}>
      <TextField
        id="outlined-basic"
        label="Search player by name"
        variant="outlined"
        sx={{ margin: 2 }}
        onChange={(e) => {
          if (e.target.value) {
            handleSearchByName(e.target.value);
          } else {
            handleGetAllPlayer();
          }
        }}
      />

      <Masonry
        columns={{ xs: 2, sm: 3, md: 5 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {players?.map((item, index) => (
          <Item
            sx={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              if (item?.playerid) {
                router.push(`/dashboard/player/${item?.playerid}`);
              }
            }}
          >
            <Box sx={{ fontSize: 20, fontWeight: 800, margin: 4 }}>
              {item?.name}
            </Box>
            <Box>Position: {item?.position}</Box>
            <Box>Weight: {item?.weight}</Box>
            <Box>Height: {item?.height}</Box>
            <Box>Nation: {item?.nation}</Box>
          </Item>
        ))}
      </Masonry>
    </Box>
  );
}
