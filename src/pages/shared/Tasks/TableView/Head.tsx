import { Checkbox } from "@mantine/core";
import { TableResponse } from "./types";

export const Head = ({
  toggleAll,
  selection,
  data,
}: {
  toggleAll: () => void;
  selection: number[];
  data: TableResponse[] | undefined;
}) => {
  return (
    <thead>
      <tr className="h-16 w-full text-sm leading-none text-gray-800">
        <th style={{ width: 40 }}>
          <Checkbox
            onChange={toggleAll}
            checked={selection.length === data?.length}
            indeterminate={
              selection.length > 0 && selection.length !== data?.length
            }
            transitionDuration={0}
          />
        </th>
        <th className="font-normal text-left ">Title</th>
        <th className="font-normal text-left">Mots Cles</th>
        <th className="font-normal text-left">Date Prevue</th>
        <th className="font-normal text-left">Heure</th>
        <th className="font-normal text-left">Etat</th>
        <th className="font-normal text-left">Validation</th>
        <th className="font-normal text-left">Etiquette</th>
        <th className="font-normal text-left">Boost</th>
        <th className="font-normal text-left">Responsable</th>
        <th className="font-normal text-left">Actions</th>
      </tr>
    </thead>
  );
};
