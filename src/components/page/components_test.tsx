import React from "react";
import SearchPanel from "../ui/SearchPanel";
import SearchPanelSuggest from "../ui/SearchPanelSuggest";
import Board from "../ui/Board";

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
    </div>
  );
}
