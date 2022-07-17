import { useEffect } from "react";

const Dashboard = ({title}) => {
  useEffect(() => {
    document.title = title
  }, [])

  return <div>Dashboard</div>;
};

export default Dashboard;
