import Dnd from "./tache";
import { Button } from "@mantine/core";
import { useState } from "react";
import Add from "./Add";
const Tasks = () => {
  const [open, setOpened] = useState(false);
  return (
    <>
      <div className="mx-auto max-w-5xl my-8">
        <div className="flex items-center justify-between my-8">
          <h2 className="text-xl font-semibold">Taches</h2>
          <Button variant="outline" color="red" onClick={() => setOpened(true)}>
            Ajouter
          </Button>
        </div>

        <Dnd />
      </div>
      <Add opened={open} setOpened={setOpened} />
    </>
  );
};

export default Tasks;
