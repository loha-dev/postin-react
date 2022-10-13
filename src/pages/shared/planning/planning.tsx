import { useForm } from "@mantine/form"
import { useState } from "react"
import { BiEuro, BiTag } from "react-icons/bi"
import { MdPerson } from "react-icons/md"
import { GrFormClose } from "react-icons/gr"

export default function Planning() {
    const [tags, setTags] = useState(["Test", "test1"])

    const PlanningForm = useForm({
        initialValues: {
            titre: "",
            keywords: "",
            date: "",
            status: "",
            validation: "",
            badge: "",
            boost: "",
            responsible: "",
            body: "",
        },
    })
    return (
        <>
            <h1 className="pt-5 font-">Ajout Plannings</h1>




            <form className="mx-auto max-w-2xl" >
                {/* required
                <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                        Email
                    </span>
                    <input type="Responsible" name="Responsible" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
                </label> */}

                {/* titre */}
                <div className="flex flex-col items-start mb-6">
                    <label
                        htmlFor="title"
                        className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                    >
                        Titre
                    </label>
                    <input
                        type="text"
                        id="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ajouter titre"
                        required
                    />
                </div>
                {/* mot clés */}
                <div className="flex flex-col items-start">
                    <label
                        htmlFor="keywords"
                        className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                    >
                        Mots clés
                    </label>
                    <div className="relative w-full">
                        <input
                            id="keywords"
                            type="text"
                            className=" pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Entrer mot clé puis taper entrer"
                        />
                        <span className="absolute inset-y-0 inline-flex items-center left-2">
                            <BiTag className="rotate-180 w-6 h-6 text-gray-600" />
                        </span>
                    </div>
                </div>
                {/* tag lists */}
                <div className="mt-1 mb-5 flex flex-wrap -m-1">
                    {tags.map((tag) => {
                        return (
                            <span key={tag} className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300">
                                {tag}
                                <GrFormClose className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" />
                            </span>
                        )
                    })}
                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="first_name"
                            className=" mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                        >
                            De
                        </label>
                        <input
                            type="date"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="last_name"
                            className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                        >
                            à
                        </label>
                        <input
                            type="date"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Doe"
                            required
                        />
                    </div>
                    {/* status */}
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="status"
                            className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                        >
                            Status
                        </label>

                        <select
                            name="status"
                            id="status"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="non termine" defaultChecked>Non terminé</option>
                            <option value="en cours">En Cours</option>
                            <option value="termine">Terminé</option>
                        </select>
                    </div>
                    {/* validation */}
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="Validation"
                            className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                        >
                            Validation
                        </label>
                        <select
                            name="validation"
                            id="validation"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="unread" defaultChecked>Non lus</option>
                            <option value="rejected">Non Validé</option>
                            <option value="approved">Validé</option>
                        </select>
                    </div>
                    {/* badge */}
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="badge"
                            className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                        >
                            Etiquette
                        </label>
                        <select
                            name="badge"
                            id="badge"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="normal" defaultChecked>Normal</option>
                            <option value="low">Low Priority</option>
                            <option value="high">High Priority</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    {/* Boost */}
                    <div className="flex flex-col items-start">
                        <label
                            htmlFor="boost"
                            className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                        >
                            Boost
                        </label>
                        <div className="relative w-full">
                            <input
                                id="boost"
                                type="Number"
                                className=" pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="21.05"
                            />
                            <span className="absolute inset-y-0 inline-flex items-center left-2">
                                <BiEuro className=" w-6 h-6 text-gray-600" />
                            </span>
                        </div>
                    </div>
                </div>
                {/* Responsable */}
                <div className="flex flex-col items-start mb-6">
                    <label
                        htmlFor="responsible"
                        className="mb-2 text-md font-extrabold text-gray-900 dark:text-gray-300"
                    >
                        Responsable
                    </label>
                    <div className="relative w-full">
                        <input
                            type="text"
                            id="responsible"
                            className=" pl-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="John Doe"
                        />
                        <span className="absolute inset-y-0 inline-flex items-center left-2">
                            <MdPerson className=" w-6 h-6 text-gray-600" />
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end pb-6">
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Ajouter
                    </button>
                </div>
            </form>
        </>
    )
}
