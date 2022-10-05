import { data } from "../assets/todos-list";

function CardView() {
  const bgs = [
    "bg-white",
    "bg-pink-300",
    "bg-teal-300",
    "bg-yellow-500",
    "bg-blue-300",
  ];
  return (
    <div className="mx-auto container py-8 px-6">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl overflow-y-auto">
        {data
          .map((taks) => {
            return {
              ...taks,
              bgs: bgs[Math.floor(Math.random() * 5)],
            };
          })
          .map((task) => (
            <div className="rounded" key={task.id}>
              <div
                className={`${task.bgs} w-full h-64 flex flex-col justify-between dark:bg-gray-800 dark:border-gray-700 rounded-lg border border-gray-400 mb-6 py-5 px-4 
                `}
              >
                <div>
                  <h4 className="text-gray-800 dark:text-gray-100 font-bold mb-3">
                    {task.title}
                  </h4>
                  <p className="text-gray-800 dark:text-gray-100 text-sm">
                    {task.content.slice(0, 100)}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between text-gray-800 dark:text-gray-100">
                    <p className="text-sm capitalize">
                      {new Date(task.date).toLocaleString("fr", {
                        month: "long",
                        year: "numeric",
                        day: "2-digit",
                      })}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-100 dark:text-gray-800 text-white flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-pencil"
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                        <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CardView;
