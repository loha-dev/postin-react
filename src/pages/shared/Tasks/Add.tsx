import { useState } from "react";
import { Modal } from "@mantine/core";
import { RichTextEditor } from "@mantine/rte";
import { DateRangePicker, DateRangePickerValue } from "@mantine/dates";
import dayjs from "dayjs";
import { TimeRangeInput } from "@mantine/dates";
export default function Add({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (bool: boolean) => void;
}) {
  const [value, setValue] = useState<DateRangePickerValue>([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);
  const now = new Date();
  const then = dayjs(now).add(30, "minutes").toDate();
  const [timing, setTiming] = useState<[Date, Date]>([now, then]);
  return (
    <Modal opened={opened} onClose={() => setOpened(false)} centered size={750}>
      <div className="flex w-full justify-center">
        <div className="bg-white dark:bg-gray-800 w-full md:w-11/12 pt-10 px-10 max-w-2xl z-50">
          <div className="container flex flex-col w-full h-full justify-between">
            <div>
              <div className="flex w-full justify-between items-center">
                <h2 className="text-4xl font-bold dark:text-gray-100 text-gray-900">
                  Compose Task
                </h2>
                <div className="block lg:hidden ml-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="cursor-pointer icon icon-tabler icon-tabler-x"
                    width={32}
                    height={32}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#718096"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <line x1={18} y1={6} x2={6} y2={18} />
                    <line x1={6} y1={6} x2={18} y2={18} />
                  </svg>
                </div>
              </div>

              <div className="mt-10 border-b border-gray-400">
                <input
                  className="w-full text-2xl bg-transparent font-bold pb-2 focus:outline-none placeholder-gray-400"
                  placeholder="Titre"
                  type="text"
                />
              </div>
              <RichTextEditor
                id="rte"
                controls={[
                  ["bold", "italic", "underline", "link", "image"],
                  ["unorderedList", "h1", "h2", "h3"],
                  ["sup", "sub"],
                  ["alignLeft", "alignCenter", "alignRight"],
                ]}
              />

              <div className="flex items-center mt-16 mb-8 gap-3">
                <DateRangePicker
                  placeholder="Pick dates range"
                  value={value}
                  onChange={setValue}
                />
                <TimeRangeInput value={timing} onChange={setTiming} clearable />
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div>
                <p className="text-base text-indigo-700 dark:text-indigo-600 mb-6">
                  This task is scheduled for 9th September 2020 at 18:00
                </p>
              </div>
              <div className="md:flex justify-between w-full py-4 border-t border-gray-400">
                <div className="flex items-center">
                  <div className="flex items-center justify-end text-gray-700 dark:text-gray-400">
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-tag"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M11 3L20 12a1.5 1.5 0 0 1 0 2L14 20a1.5 1.5 0 0 1 -2 0L3 11v-4a4 4 0 0 1 4 -4h4" />
                        <circle cx={9} cy={9} r={2} />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-bell"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
                        <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-calendar-event"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={4} y={5} width={16} height={16} rx={2} />
                        <line x1={16} y1={3} x2={16} y2={7} />
                        <line x1={8} y1={3} x2={8} y2={7} />
                        <line x1={4} y1={11} x2={20} y2={11} />
                        <rect x={8} y={15} width={2} height={2} />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-user-plus"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={9} cy={7} r={4} />
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        <path d="M16 11h6m-3 -3v6" />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-archive"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x={3} y={4} width={18} height={4} rx={2} />
                        <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
                        <line x1={10} y1={12} x2={14} y2={12} />
                      </svg>
                    </div>
                    <div className="mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-dots"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <circle cx={5} cy={12} r={1} />
                        <circle cx={12} cy={12} r={1} />
                        <circle cx={19} cy={12} r={1} />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button className="text-sm text-white focus:outline-none py-3 px-6 hover:bg-indigo-600 bg-indigo-700 rounded-md">
                    Save Task
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
