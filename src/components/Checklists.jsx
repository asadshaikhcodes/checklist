import React, { useCallback, useEffect, useState } from "react";
import ChecklistsTableView from "./ChecklistsTableView";

function Checklists() {
  const [checklists, setChecklists] = useState([]);

  const getChecklists = async () => {
    fetch("http://localhost:3000/checklists")
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log("checklist response data", responseData);
        setChecklists(responseData);
      });
  };

  const checklistEditHandler = useCallback((id) => {
    console.log("checklist edit handler");
    console.log(id);
  }, []);

  const checklistDetailsHandler = useCallback((id) => {
    console.log("checklist details handler");
    console.log(id);
  }, []);

  const checklistDeleteHandler = useCallback((id) => {
    console.log("checklist delete handler");
    console.log(id);
  }, []);

  useEffect(() => {
    getChecklists();
  }, []);

  return (
    <>
      <ChecklistsTableView
        checklists={checklists}
        checklistDeleteHandler={checklistDeleteHandler}
        checklistDetailsHandler={checklistDetailsHandler}
        checklistEditHandler={checklistEditHandler}
      />
    </>
  );
}

export default Checklists;
