import { useEffect } from "react";

const UserDetail = ({ title }) => {
  useEffect(() => {
    document.title = title
  })

  return (
    <div>
      <h1>User Detail</h1>
    </div>
  );
};

export default UserDetail;
