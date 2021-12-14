import React from "react";
import SearchPanel from "../ui/SearchPanel";
import SearchPanelSuggest from "../ui/SearchPanelSuggest";
import Board from "../ui/Board";
import GamePanel from "../model/discussion/GamePanel";

export default function ComponentsTest() {
  return (
    <div>
      <h1>Components test</h1>
      <h2>SearchPanel</h2>
      <SearchPanel>
        <SearchPanelSuggest>Candidate A</SearchPanelSuggest>
        <SearchPanelSuggest>Candidate B</SearchPanelSuggest>
        <SearchPanelSuggest>Candidate C</SearchPanelSuggest>
      </SearchPanel>
      <h2>Board</h2>
      <Board>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Board>
      <h2>GamePanel</h2>
      <GamePanel
        game={{
          name: "Game for DEMO",
          thumbnail: "https://placehold.jp/1280x720.png",
          images: [
            "https://placehold.jp/50538f/ffffff/1280x720.png",
            "https://placehold.jp/ac43ba/ffffff/1280x720.png",
            "https://placehold.jp/43ba57/ffffff/1280x720.png",
          ],
          url: "https://google.com/",
          id: "steam_19283",
        }}
      />
    </div>
  );
}
