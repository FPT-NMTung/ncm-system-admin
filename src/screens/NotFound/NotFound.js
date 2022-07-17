import { useEffect } from 'react';
import classes from './NotFound.module.css';

const NotFound = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.content}>
        <div className={classes.title}>
          <h1>404</h1>
          <p>Not Found</p>
        </div>
        <p>The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
