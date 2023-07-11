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

export default function Home() {
  const [coaches, setCoaches] = React.useState([]);

  React.useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:8080/v1/getAllCoach",
      baseURL: process.env.BACKEND,
    }).then((res) => {
      setCoaches(res.data.data);
    });
  }, []);

  function handleGetAllCoach() {
    axios({
      method: "get",
      url: "http://localhost:8080/v1/getAllCoach",
      baseURL: process.env.BACKEND,
    }).then((res) => {
      setCoaches(res.data.data);
    });
  }

  function handleSearchByName(name: string) {
    axios({
      method: "post",
      url: "http://localhost:8080/v1/getCoachByName",
      baseURL: process.env.BACKEND,
      data: { name: name },
    }).then((res) => {
      setCoaches(res.data.data);
    });
  }

  const router = useRouter();

  return (
    <Box sx={{ margin: 2 }}>
      <TextField
        id="outlined-basic"
        label="Search coach by name"
        variant="outlined"
        sx={{ margin: 2 }}
        onChange={(e) => {
          if (e.target.value) {
            handleSearchByName(e.target.value);
          } else {
            handleGetAllCoach();
          }
        }}
      />
      <Masonry
        columns={{ xs: 2, sm: 3, md: 5 }}
        spacing={{ xs: 1, sm: 2, md: 3 }}
      >
        {coaches.map((item, index) => (
          <Item
            sx={{ cursor: "pointer" }}
            key={index}
            onClick={() => {
              router.push(`/dashboard/coach/${item.coachid}`);
            }}
          >
            <Box sx={{ fontSize: 20, fontWeight: 600 }}>{item?.name}</Box>
            <Box>Ex : {item?.ex}</Box>
            <Box>Nation : {item?.nation}</Box>
          </Item>
        ))}
      </Masonry>
    </Box>
  );
}
