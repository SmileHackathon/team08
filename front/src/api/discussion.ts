import { createRTC } from "./rtc";

const createDiscussion = ({ name }: { name: string }): Promise<string> => {
  return new Promise((resolve, reject) => {
    const rtc = createRTC();
    rtc.socket.on("connect", () => {
      rtc
        .createDiscussion({ name })
        .then((discussionId) => {
          resolve(discussionId);
        })
        .catch(reject);
    });
    rtc.socket.on("connect_error", () => {
      reject("CONNECT_ERROR");
    });
  });
};

export { createDiscussion };
