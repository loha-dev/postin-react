import { ActionIcon, Input, Menu } from "@mantine/core";
import { useInputState, useToggle } from "@mantine/hooks";
import { BiPlus } from "react-icons/bi";

const AddKeywords = (props: {
  id: number;
  handleAdd: (...items: string[]) => void;
}) => {
  const [isOpen, toggle] = useToggle([false, true]);
  const [newKey, setNewKey] = useInputState("");
  const addKey = () => {
    toggle();
    props.handleAdd(newKey);
  };
  return (
    <Menu shadow="md" width={200} opened={isOpen}>
      <Menu.Target>
        <ActionIcon variant="outline" size="xs" onClick={() => toggle()}>
          <BiPlus size={12} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <div className="flex justify-between items-center ">
          <Menu.Label>Mot Cles</Menu.Label>
          <ActionIcon
            variant="outline"
            size="xs"
            onClick={addKey}
            className="mx-2"
          >
            <BiPlus size={14} />
          </ActionIcon>
        </div>
        <Menu.Item>
          <Input
            aria-label="tittre"
            value={newKey}
            onChange={setNewKey}
          ></Input>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AddKeywords;
