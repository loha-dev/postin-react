import { Draggable } from "@hello-pangea/dnd"
import { Avatar, Tooltip } from "@mantine/core"
import { useState } from "react"
import { AiFillStar, AiOutlineStar, AiFillEdit } from "react-icons/ai"
import { IoWarning, IoWarningOutline } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
interface TaskInterface {
  id: number
  title: string
  content: string
  page: number
  status: string
  date: string
  time: string
}
import { gradients, socialUrls } from "../../../../types/short"

const Task = ({ task, index }: { task: TaskInterface; index: number }) => {
  const [isUrgent, setUrgent] = useState(false)
  const [isImportant, setImportant] = useState(false)
  const gradient = gradients[Math.floor(Math.random() * 10)]
  const randomSocials = Math.floor(Math.random() * 4)
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        const { isDragging } = snapshot
        return (
          <div
            key={task.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="relative block overflow-hidden rounded-lg border border-gray-100 p-3 bg-fotsy shadow-lg"
          >
            <span
              className={`absolute inset-x-0 bottom-0 h-2 ${gradient}`}
            ></span>
            <div className="flex items-center justify-between">
              <Tooltip.Group openDelay={300} closeDelay={100}>
                <Avatar.Group spacing="sm">
                  <Tooltip label="Salazar Troop" withArrow>
                    <Avatar
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                      radius="xl"
                    />
                  </Tooltip>
                  <Tooltip label="Bandit Crimes" withArrow>
                    <Avatar
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
                      radius="xl"
                    />
                  </Tooltip>
                  <Tooltip label="Jane Rata" withArrow>
                    <Avatar
                      src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlcnNvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
                      radius="xl"
                    />
                  </Tooltip>
                  <Tooltip
                    withArrow
                    label={
                      <>
                        <div>John Outcast</div>
                        <div>Levi Capitan</div>
                      </>
                    }
                  >
                    <Avatar radius="xl">+2</Avatar>
                  </Tooltip>
                </Avatar.Group>
              </Tooltip.Group>
              <Avatar.Group spacing="sm">
                {[...Array(randomSocials).keys()].map((index) => {
                  return (
                    <img
                      src={socialUrls[index]}
                      key={socialUrls[index]}
                      className="h-7 w-7"
                    />
                  )
                })}
              </Avatar.Group>
            </div>
            <div className="justify-between sm:flex">
              <div>
                <h5 className="text-xl font-bold text-gray-900">
                  {task.title}
                </h5>

                {/* <p className="mt-1 text-xs font-medium text-gray-600">
                  By John Doe
                </p> */}
              </div>
            </div>

            <div className="mt-4 sm:pr-8">
              <p className="text-sm text-gray-500">
                {task.content.slice(0, 40)}
              </p>
            </div>
            {/* task date and time */}
            <div className="flex items-center justify-between mt-4 hover:cursor-pointer">
              <p className="rounded-full bg-gray-300 px-2 py-1 text-xs">{`${task.date} - ${task.time}`}</p>
              <div className="inline-flex">
                {
                  !isUrgent ? <IoWarning className="text-red-600" onClick={() => {
                    setUrgent(!isUrgent)
                    console.log(`${task.id} Urgent: ${isUrgent}`)
                  }} /> : <IoWarningOutline className="text-red-600" onClick={() => {
                    setUrgent(!isUrgent)
                    console.log(`${task.id} Urgent: ${isUrgent}`)
                  }} />
                }
                {
                  !isImportant ? <AiFillStar className="text-yellow-500" onClick={() => {
                    setImportant(!isImportant)
                    console.log(` ${task.id} Important: ${isImportant}`)
                  }} /> : <AiOutlineStar className="text-yellow-500" onClick={() => {
                    setImportant(!isImportant)
                    console.log(` ${task.id} Important: ${isImportant}`)
                  }} />
                }

                <MdDelete className="text-red-600" onClick={() => { console.log(`${task.id} Delete button`) }} />
                <AiFillEdit className="text-green-600" onClick={() => { console.log(`${task.id} Edit button`) }} />
              </div>
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}
export default Task
