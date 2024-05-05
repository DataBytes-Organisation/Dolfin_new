import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Paper,
  Box,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { CardHeader } from "@mui/material";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SendIcon from "@mui/icons-material/Send";
import { useContext } from "react";
import { UserContext } from "../context/user.context";
import RobotAvatarImage from "../assets/images/favicon.png";

const AIAssistant = () => {
  const [input, setInput] = useState("");
  const { currentUser } = useContext(UserContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Welcome ${currentUser.lastName}, How can I help you?`,
      align: "left",
    },
  ]);
  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }
  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  const handleSend = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: input,
        align: "right",
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };
  const handleClear = () => {
    setMessages([
      {
        id: 1,
        text: `Welcome ${currentUser.firstName}, How can I help you?`,
        align: "left",
      },
    ]);
  };
  const renderMessageItem = (message) => {
    return (
      <ListItem
        key={message.id}
        sx={{
          justifyContent: message.align === "right" ? "flex-end" : "flex-start",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {message.align === "left" && (
            <ListItemAvatar>
              <Avatar src={RobotAvatarImage} />
            </ListItemAvatar>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: message.align === "right" ? "flex-end" : "flex-start",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                mr: 1,
                ml: 1,
                display: "block",
                color: "text.secondary",
                textAlign: message.align === "right" ? "right" : "left",
              }}
            >
              {message.align === "right"
                ? currentUser.firstName
                : "AI Assistant"}
            </Typography>

            <Paper
              elevation={3}
              sx={{
                py: 1,
                px: 2,
                bgcolor: message.align === "right" ? "#e3f2fd" : "#fffde7",
                borderRadius:
                  message.align === "right"
                    ? "15px 3px 15px 15px"
                    : "3px 15px 15px 15px",
                border: 1,
                borderColor: message.align === "right" ? "#90caf9" : "#fff59d",
                mr: 1,
                ml: 1,
                maxWidth: 400,
                wordWrap: "break-word",
                mt: "5px",
              }}
            >
              <ListItemText primary={message.text} />
            </Paper>
          </Box>

          {message.align === "right" && (
            <ListItemAvatar>
              <Avatar
                {...stringAvatar(
                  `${currentUser.firstName} ${currentUser.lastName}`
                )}
              />
            </ListItemAvatar>
          )}
        </Box>
      </ListItem>
    );
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        action={
          <IconButton aria-label="help">
            <HelpOutlineIcon />
          </IconButton>
        }
        title={
          <Typography
            color="#2196f3"
            sx={{ fontWeight: "bold", fontSize: 24, fontStyle: "italic" }}
          >
            Observed Financial Well-being Score
          </Typography>
        }
      />
      <CardContent>
        <Paper style={{ height: 400, overflow: "auto", marginBottom: 25 }}>
          <List>{messages.map(renderMessageItem)}</List>
        </Paper>
        <Box sx={{ display: "flex" }}>
          <TextField
            fullWidth
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            sx={{ mr: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            startIcon={<SendIcon />}
          >
            Send
          </Button>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClear}>
          Clear
        </Button>
      </CardActions>
    </Card>
  );
};

export default AIAssistant;
