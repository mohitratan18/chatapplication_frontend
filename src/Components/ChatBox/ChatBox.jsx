/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { CiUser } from "react-icons/ci";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ReplyIcon from "@mui/icons-material/Reply";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ChatBox = ({ roomData, setmsg, sendmessage, msg, AllMsg, user }) => {
  const usermessage = [
    {
      message:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim accusamus, consequuntur minima odio illo atque earum dolor porro incidunt necessitatibus iure?",
    },
  ];
  useEffect(() => {
    window.location.href = import.meta.env.VITE_FRONTEND_URL + "#scroll-bottom";
  }, [AllMsg]);

  return (
    <>
      {roomData.room ? (
        <>
          {
            <div className="bg-white chatscreen rounded-2xl p-4 flex flex-col">
              <div className="flex justify-between p-12 pt-0">
                <div className="flex justify-center items-center gap-2">
                  <img
                    src="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
                    className="h-[59px] w-[59px] rounded-full bg-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-bold font-sans text-lg">
                      {roomData.receiver.name}
                    </h1>
                    <p className="font-thin">{roomData.receiver.email}</p>
                  </div>
                </div>
                <div className="flex gap-[10px]">
                  <button className="btn btn-secondary">Clear Chat</button>
                  <button className="btn btn-secondary">Send Location</button>
                </div>
              </div>

              <Box
                sx={{ overflowY: "auto", flex: "1 0 0", background: "white" }}
              >
                <Stack
                  direction="row"
                  justifyContent="center"
                  sx={{
                    py: 2,
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                    background: "white",
                  }}
                ></Stack>
                <List sx={{ p: 0, overflowY: "auto", flex: "1 0 0" }}>
                  {AllMsg?.map((item, index) => (
                    <ListItem
                      sx={
                        item.sender._id === user._id
                          ? { flexDirection: "row-reverse", mb: 2 }
                          : { mb: 2 }
                      }
                      key={index}
                    >
                      <Box
                        sx={
                          item.sender._id === user._id
                            ? {
                                display: "flex",
                                width: "80%",
                                flexDirection: "row-reverse",
                              }
                            : { display: "flex", width: "80%" }
                        }
                      >
                        <ListItemAvatar
                          sx={
                            item.sender._id === user._id && {
                              display: "flex",
                              flexDirection: "row-reverse",
                            }
                          }
                        >
                          <Avatar
                            alt="Remy Sharp"
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <Paper
                          sx={
                            item.sender._id === user._id
                              ? {
                                  width: "100%",
                                  p: 1.5,
                                  bgcolor: "primary.light",
                                }
                              : { width: "100%", p: 1.5 }
                          }
                        >
                          <ListItemText
                            sx={
                              item.sender._id === user._id
                                ? { m: 0, color: "primary.contrastText" }
                                : { m: 0 }
                            }
                            primary={item.sender.name}
                            secondary={
                              <Typography variant="caption">
                                {item.msg}
                              </Typography>
                            }
                          />
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              mt: 1,
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={
                                item.sender._id === user._id && {
                                  color: "primary.contrastText",
                                }
                              }
                            >
                              {/* 12.20 PM */}
                              {item.createdAt}
                              {/* {item.getHours().toString().padStart(2, '0')} */}
                            </Typography>
                            <Box>
                              <IconButton size="small">
                                <ReplyIcon fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="error"
                                // onClick={() => handleDelete(item._id)}
                              >
                                <DeleteOutlineIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Paper>
                      </Box>
                    </ListItem>
                  ))}
                </List>
                <div id="scroll-bottom"></div>
              </Box>

              <form onSubmit={sendmessage} className="w-full flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  value={msg}
                  onChange={(e) => setmsg(e.target.value)}
                />
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={sendmessage}
                >
                  Send
                </button>
              </form>
            </div>
          }
        </>
      ) : (
        <>Please select the chat</>
      )}
    </>
  );
  // "parser": "@babel/eslint-parser"
};

export default ChatBox;
