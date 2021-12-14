import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {
  changeDiscussion,
  createDiscussion,
  getDiscussion,
} from "./discussion";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "https://amritb.github.io", methods: ["GET", "POST"] },
});

// 変えるな
const discussionIdToRoomId = (rawId: string) => {
  return `discussion_room_${rawId}`;
};

io.on("connection", (socket) => {
  socket.on("create_discussion", ({ name }, ack) => {
    createDiscussion(name)
      .then((discussionId) => {
        ack({ discussion_id: discussionId });
      })
      .catch((error) => {
        ack({ error: error });
      });
  });
  socket.on("join_discussion", ({ discussion_id }, ack) => {
    socket.join(discussionIdToRoomId(discussion_id));
    ack();
  });

  socket.on("get_discussion", ({ discussion_id }, ack) => {
    getDiscussion(discussion_id)
      .then((discussion) => {
        ack({ discussion: discussion });
      })
      .catch((error) => {
        ack({ error: error });
      });
  });

  socket.on("update_discussion", ({ discussion_id, action }, ack) => {
    changeDiscussion(discussionIdToRoomId(discussion_id), action)
      .then(() => {
        io.to("discussion").emit("updated");
        ack();
      })
      .catch((error) => {
        ack({ error: error });
      });
  });
});

console.log("running");

httpServer.listen(process.env.PORT || 80);
