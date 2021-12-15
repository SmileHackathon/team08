import express, { response } from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import {readFileSync} from "fs"
import {
  changeDiscussion,
  createDiscussion,
  getDiscussion,
} from "./discussion";
import getSteamGameMetaData from "./steam";

dotenv.config();

if (process.env.MODE === "development") {
  const envConfig = dotenv.parse(readFileSync('.env.development'));
  for (const k in envConfig) {
    process.env[k] = envConfig[k]
  }
}

const app = express();
const httpServer = createServer(app);

app.use(cors()); // TODO: ちゃんとCORS

const io = new Server(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
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
    ack({});
  });

  socket.on("get_discussion", ({ discussion_id }, ack) => {
    getDiscussion(discussion_id)
      .then((discussion) => {
        if (!discussion) {
          ack({ error: "CONNECTION_ERROR" });
        }
        ack({ discussion: discussion });
      })
      .catch((error) => {
        ack({ error: error });
      });
  });

  socket.on("update_discussion", ({ discussion_id, action }, ack) => {
    changeDiscussion(discussion_id, action)
      .then((discussion) => {
        io.to(discussionIdToRoomId(discussion_id)).emit("updated", {
          discussion_id: discussion_id,
          discussion: discussion,
        });
        ack({});
      })
      .catch((error) => {
        ack({ error: error });
      });
  });
});

app.get("/get_metadata/:univ_app_id", (req, res) => {
  const [service, id] = req.params.univ_app_id.split("__");
  switch (service) {
    case "steam":
      getSteamGameMetaData(parseInt(id))
        .then((result) => {
          res.send(result);
        })
        .catch((result) => {
          res.status(404);
          res.send({ error: result });
        });
  }
});

console.log("running");

httpServer.listen(process.env.PORT || 80);
