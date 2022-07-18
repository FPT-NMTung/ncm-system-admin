import { useEffect } from "react";
import SelectCustom from '../../CommonComponent/SelectCustom/SelectCustom';

const UserDetail = ({ title }) => {
  useEffect(() => {
    document.title = title
  })

  return (
    <div>
      <h1>User Detail</h1>
      <SelectCustom/>
    </div>
  );
};

export default UserDetail;
