import { IoAdd } from "react-icons/io5";
import { ActionIcon, Avatar, Button, Chip, Divider } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { socialMediaDataTypesList } from "../../../types/social-type";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { IoMdSearch } from "react-icons/io";
import { useRef, useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
type FieldsType = {
  title: string;
  filtered: boolean;
  value: string;
};
const initialFields = [
  { title: "Etiquettes", value: "labels", filtered: false },
  { title: "Validation", value: "validation", filtered: false },
  { title: "Date", value: "date", filtered: false },
  { title: "Mot Cles", value: "keywords", filtered: false },
];
const TaskMenu = () => {
  const [fields, setFields] = useState<FieldsType[]>(initialFields);
  const [range, setRange] = useState<DateRangePickerValue>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);
  const { data: socialMediaList } = useQuery(
    ["social-media"],
    async () => {
      const { data } = await supabase.from("social-media");
      return data as socialMediaDataTypesList[];
    },
    {
      staleTime: Infinity,
    }
  );
  const searchRef = useRef<HTMLInputElement>(null);
  const focus = () => {
    searchRef.current?.focus();
  };
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between my-2">
        <div className="flex gap-3">
          <h2 className="text-2xl font-bold">TACHE A FAIRE</h2>
          <ActionIcon variant="outline" color={"green"}>
            <IoAdd size={20} />
          </ActionIcon>
        </div>
        <div className="flex gap-4 bg-fotsy rounded-3xl py-2 px-5 items-center">
          <ActionIcon>
            <AiOutlineLeft size="24" />
          </ActionIcon>
          {socialMediaList !== undefined ? (
            socialMediaList.map((socialMedia) => {
              return (
                <div
                  className="p-0.5 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-green-500 "
                  key={socialMedia.id}
                >
                  <div className="bg-fotsy rounded-full p-0.5">
                    <Avatar
                      component="a"
                      radius={"xl"}
                      src={socialMedia.img}
                      alt="it's me"
                      sx={{
                        width: 40,
                        height: 40,
                      }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}
          <ActionIcon>
            <AiOutlineRight size="24" />
          </ActionIcon>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="relative p-1 rounded-xl mr-5">
          <input
            type="search"
            name="serch"
            ref={searchRef}
            placeholder="Search"
            className="h-10 px-5 pr-10 rounded-xl text-sm focus:outline-none bg-fotsy "
          />
          <button
            type="submit"
            className="absolute right-4 top-3"
            onClick={focus}
          >
            <IoMdSearch className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button
            rightIcon={<BsFilterSquare size={20} />}
            variant="subtle"
            color="dark"
            size="md"
          >
            Filter
          </Button>
          <Divider size="xs" orientation="vertical" />
          {fields.map((field) => {
            return (
              <Chip key={field.value} size="md">
                {field.title}
              </Chip>
            );
          })}
        </div>
        <div className="flex-1 ml-5">
          <DateRangePicker
            placeholder="Pick dates range"
            value={range}
            onChange={setRange}
            size="md"
            className="flex-1"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskMenu;
