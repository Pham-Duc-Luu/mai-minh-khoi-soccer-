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
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import SportsIcon from "@mui/icons-material/Sports";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

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

export default function team({ params }: { params: { id: string } }) {
  const [team, setteam] = React.useState([]);
  const pathname = usePathname();
  const [openCoach, setOpenCoach] = React.useState(false);
  const [openPlayer, setOpenPlayer] = React.useState(false);
  const [openVodich, setOpenVodich] = React.useState(false);

  React.useEffect(() => {
    axios({
      method: "post",
      url: `http://localhost:8080/v1/getTeamInfo?id=${params.id}`,
    }).then((res) => {
      setteam(res.data.data);
    });
  }, []);

  console.log(team);

  const router = useRouter();

  return (
    <>
      <Card sx={{ minWidth: 275, margin: 2 }}>
        <CardContent>
          <Box fontSize={30} fontWeight={700}>
            Name : {team?.name}
          </Box>
          <Box> City : {team?.city}</Box>
          <Box> Stadium : {team?.stadium?.name}</Box>
          <Button
            color="inherit"
            sx={{ padding: 0 }}
            onClick={() => {
              setOpenCoach(!openCoach);
            }}
          >
            The coaches {openCoach ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <List>
            <Collapse in={openCoach} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {team?.huanluyen?.map((item) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        router.push(`/dashboard/coach/${item?.coachid}`);
                      }}
                    >
                      <ListItemIcon>
                        <SportsIcon></SportsIcon>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${item?.coach?.name} on ${item?.year}`}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
          <Button
            color="inherit"
            sx={{ padding: 0 }}
            onClick={() => {
              setOpenPlayer(!openPlayer);
            }}
          >
            Members are playing {openPlayer ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <List>
            <Collapse in={openPlayer} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {team?.thidau?.map((item) => {
                  return (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => {
                        router.push(`/dashboard/player/${item?.playerid}`);
                      }}
                    >
                      <ListItemIcon>
                        <PersonIcon></PersonIcon>
                      </ListItemIcon>
                      <ListItemText primary={item?.player?.name} />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
          <Button
            color="inherit"
            sx={{ padding: 0 }}
            onClick={() => {
              setOpenVodich(!openVodich);
            }}
          >
            Championship has been achieved{" "}
            {openVodich ? <ExpandLess /> : <ExpandMore />}
          </Button>
          <List>
            <Collapse in={openVodich} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {team?.vodich?.map((item) => {
                  return (
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <EmojiEventsIcon></EmojiEventsIcon>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${item?.league?.name} on ${item?.year}`}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Collapse>
          </List>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions> */}
      </Card>
    </>
  );
}
