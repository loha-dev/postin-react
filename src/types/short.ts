export type authType = {
  email: string;
  password: string;
};

export type languageType = "francais" | "anglais" | "malagasy";
interface statusCol {
  id: string;
  title: string;
  tasks: Array<{
    id: number;
    title: string;
    content: string;
    page: number;
    status: string;
    date: string;
    time: string;
  }>;
}
export interface TasksType {
  id: number;
  title: string;
  content: string;
  page: number;
  status: string;
  date: string;
  time: string;
}

export const gradients = [
  "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
  "bg-gradient-to-bl from-pink-300 via-purple-300 to-indigo-400",
  "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
  "bg-gradient-to-r from-yellow-200 via-green-200 to-green-500",
  "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
  "bg-gradient-to-r from-purple-200 via-purple-400 to-purple-800",
  "bg-gradient-to-r from-red-400 via-gray-300 to-blue-500",
  "bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400",
  "bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400",
];

export const socialUrls = [
  "https://cdn.svgporn.com/logos/facebook.svg",
  "https://cdn.svgporn.com/logos/twitter.svg",
  "https://cdn.svgporn.com/logos/youtube-icon.svg",
  "https://cdn.svgporn.com/logos/pinterest.svg",
  "https://cdn.svgporn.com/logos/linkedin-icon.svg",
];
