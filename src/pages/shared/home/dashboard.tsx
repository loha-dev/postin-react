import { useSearch } from "@tanstack/react-location";
const Dashboard = () => {
  const search = useSearch();
  return <div>{JSON.stringify(search)}</div>;
};
export default Dashboard;
