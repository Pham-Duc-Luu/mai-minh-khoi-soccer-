"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { usePathname, useRouter } from "next/navigation";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Tooltip } from "recharts";

import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Coach({ params }: { params: { id: string } }) {
  const [coach, setcoach] = React.useState([]);
  const pathname = usePathname();

  React.useEffect(() => {
    axios({
      method: "post",
      url: `http://localhost:8080/v1/getCoachInfo?id=${params.id}`,
    }).then((res) => {
      setcoach(res.data.data);
    });
  }, []);

  const router = useRouter();

  return (
    <>
      {" "}
      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Box fontSize={30} fontWeight={700}>
            Name : {coach?.name}
          </Box>
          <Box> Nation : {coach?.nation}</Box>
          <Box> Years of experience : {coach?.ex}</Box>

          <Box display={"flex"}>
            Teams had trained:
            <List>
              {coach?.huanluyen?.map((item) => {
                return (
                  <ListItemButton
                    sx={{ position: "relative" }}
                    onClick={() => {
                      router.push(`/dashboard/team/${item?.teamid}`);
                    }}
                  >
                    {item?.team?.name} {item?.year}
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </>
  );
}
