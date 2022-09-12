import { RiCloseLine, RiSendPlaneFill } from "react-icons/ri";
import { useForm } from "@mantine/form";
import { Group, Text, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
  MIME_TYPES,
} from "@mantine/dropzone";
import "dayjs/locale/fr";
import { DatePicker } from "@mantine/dates";
import { IoMdClock, IoMdImage } from "react-icons/io";
import { TimeInput } from "@mantine/dates";
import { BsCheck2Circle } from "react-icons/bs";
import { BsDot } from "react-icons/bs";
import { Select } from "@mantine/core";
import { facebookUrl } from "../../../types/facebook";
const hardCoded = {
  page_id: "110659441785551",
  access_token:
    "EAAIpLiWs5qIBAPV16vmRmk32uGGMWPnjacdI15aw2bMmiTBiEUa4a2DKSIvJ68XX1sE31DWx6NB4QZBqtuATdEKv6vxQ0oHgamZAoLsVH0UftDqVgjuKeRmgn2TkMwJ4G8HMWCkyEgqgGNWpOFZBrbG0ODWDq0FOzShaBZAzeQE6U65Y4gWVa2QmAmIksdMZD",
};
const CreatePost = (props: Partial<DropzoneProps>) => {
  const theme = useMantineTheme();
  const [typeOfPost, setTypeOfPost] = useState<"feed" | "photos" | "videos">(
    "photos"
  );
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const form = useForm({
    initialValues: {
      title: "",
      key: "",
      description: "",
    },
  });
  const handlePublish = async () => {
    if (typeOfPost === "feed") {
      const postUrl = `https://graph.facebook.com/${hardCoded.page_id}/${typeOfPost}?message=${form.values.title}&access_token=${hardCoded.access_token}`;
      const response = await fetch(postUrl, {
        method: "POST",
      });
      console.log(response);
    } else {
      const image = URL.createObjectURL(files[0]);
      const postUrl = `https://graph.facebook.com/${hardCoded.page_id}/${typeOfPost}?message=${form.values.title}&url=https://images.unsplash.com/photo-1662675120072-bcfb3ceb4460?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60&access_token=${hardCoded.access_token}`;
      const response = await fetch(postUrl, {
        method: "POST",
      });
      console.log(response);
    }
  };
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="grid grid-cols-[7fr_4fr] gap-12">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-slate-500 ">
              Creation d' une poste
            </h2>
            <button
              className="mx-2 my-2 bg-sky-500 transition duration-150 ease-in-out hover:bg-sky-400 rounded text-white px-6 py-2 text-xl font-semibold flex items-center justify-between gap-4"
              onClick={handlePublish}
            >
              <span>Publier</span>
              <RiSendPlaneFill className="w-6 h-6" />
            </button>

            {/* Code block for primary button ends */}
          </div>
          <div className="mt-8 flex flex-col w-full">
            <label
              htmlFor="about"
              className="pb-2 font-bold text-gray-800 dark:text-gray-100 text-left text-lg"
            >
              Type de poste
            </label>
            <Select
              sx={{
                maxWidth: 300,
                fontSize: 600,
              }}
              onChange={(value: "feed" | "videos" | "photos") =>
                setTypeOfPost(value)
              }
              data={[
                { value: "feed", label: "Message" },
                { value: "videos", label: "Message and Video" },
                { value: "photos", label: "Message and Photo" },
              ]}
            />
          </div>

          <div className="mt-8 flex flex-col w-full">
            <label
              htmlFor="about"
              className="pb-2 font-bold text-gray-800 dark:text-gray-100 text-left text-lg"
            >
              De quoi voulez vous parler?
            </label>
            <input
              id="title"
              name="title"
              required
              className="border border-fotsy dark:border-mainty pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400 bg-fotsy"
              {...form.getInputProps("title")}
            />
          </div>
          <div className="mt-8 flex flex-col w-full">
            <label
              htmlFor="about"
              className="pb-2 font-bold text-gray-800 dark:text-gray-100 text-left text-lg"
            >
              #mot cles
            </label>
            <input
              id="key"
              name="key"
              required
              className="border border-fotsy dark:border-mainty pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400 bg-fotsy"
              {...form.getInputProps("key")}
            />
          </div>
          <div className="mt-8 flex flex-col w-full">
            <label
              htmlFor="description"
              className="pb-2 font-bold text-gray-800 dark:text-gray-100 text-left text-lg"
            >
              Decrivez votre poste
            </label>
            <textarea
              id="description"
              name="description"
              className="border border-fotsy dark:border-mainty pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 resize-none placeholder-gray-500 text-gray-500 dark:text-gray-400 bg-fotsy"
              rows={5}
              {...form.getInputProps("description")}
            />
          </div>
          <div
            className={`flex flex-col my-5 ${
              typeOfPost === "feed" ? "hidden" : ""
            }`}
          >
            <label
              htmlFor="files"
              className="pb-2 font-bold text-gray-800 dark:text-gray-100 text-left text-lg "
            >
              Choisissez des photos ou video
            </label>
            <Dropzone
              onDrop={setFiles}
              onReject={(files) => console.log("rejected files", files)}
              maxSize={3 * 1024 ** 2}
              accept={[...IMAGE_MIME_TYPE, MIME_TYPES.webp, MIME_TYPES.mp4]}
              {...props}
            >
              <Group
                position="center"
                spacing="xl"
                style={{ minHeight: 220, pointerEvents: "none" }}
              >
                <Dropzone.Accept>
                  <IoMdImage
                    size={50}
                    color={
                      theme.colors[theme.primaryColor][
                        theme.colorScheme === "dark" ? 4 : 6
                      ]
                    }
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IoMdImage
                    size={50}
                    color={
                      theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
                    }
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IoMdImage size={50} />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" color="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not
                    exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
          </div>
        </div>
        <div className="flex  flex-col mt-8">
          <h2 className="text-2xl font-semibold text-slate-500 mb-3">
            Planing
          </h2>
          <div className="bg-fotsy p-3 flex flex-col gap-5 rounded-xl">
            <div className="p-4">
              <div className="flex items-center gap-4">
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="date"
                    className="pb-2 font-semibold text-gray-800 dark:text-gray-100 text-left text-lg"
                  >
                    Date optimale
                  </label>
                  <DatePicker locale="fr" defaultValue={new Date()} />
                </div>
                <div className="flex flex-col flex-1">
                  <label
                    htmlFor="heure"
                    className="pb-2 font-semibold text-gray-800 dark:text-gray-100 text-left text-lg"
                  >
                    Heure optimale
                  </label>
                  <TimeInput
                    icon={<IoMdClock size={16} />}
                    defaultValue={new Date()}
                  />
                </div>
              </div>
            </div>
            <div className="p-4 ">
              <div className="flex items-center gap-4">
                <div className="flex-1 text-orange-500">
                  <label
                    htmlFor="status"
                    className="pb-2 font-semibold text-gray-800 dark:text-gray-100 text-left text-lg"
                  >
                    Etat de validation
                  </label>
                  <div className="bg-white flex items-center p-3 mt-3">
                    <BsDot size={30} />
                    <span></span>
                    <span className="text-lg">En attente</span>
                  </div>
                </div>
                <div className="flex-1 text-green-500">
                  <label
                    htmlFor="publication"
                    className="pb-2 font-semibold text-gray-800 dark:text-gray-100 text-left text-lg"
                  >
                    Etat de publication
                  </label>
                  <div className="bg-white flex items-center p-3 mt-3">
                    <span>
                      <BsDot size={30} />
                    </span>
                    <span className="text-lg">Valide</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-white items-center flex justify-center p-3 gap-4 mb-5">
              <BsCheck2Circle className="w-8 h-8" />
              <span className="text-xl font-bold">Envoyer publication</span>
            </button>
          </div>
          <div className="flex justify-end">
            <button className="mx-2 my-2 bg-fotsy transition duration-150 ease-in-out hover:bg-fotsy rounded text-slate-400 px-6 py-2 text-xl font-semibold flex items-center justify-between gap-4">
              <span>Cancel</span>
              <RiCloseLine className="w-6 h-6" />
            </button>
            <button className="mx-2 my-2 bg-fotsy transition duration-150 ease-in-out hover:bg-fotsy rounded text-blue-500 px-6 py-2 text-xl font-semibold flex items-center justify-between gap-4">
              <span>Plannifier</span>
              <RiSendPlaneFill className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
