import { useEffect } from 'react';
import classes from './ImportUser.module.css';

const ImportUser = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div>
      <h1>Import User</h1>
    </div>
  );
};

export default ImportUser;
