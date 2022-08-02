import { Outlet } from 'react-router-dom';
import { Card, Tooltip } from '@nextui-org/react';
import { FaUserAlt, FaAddressCard } from 'react-icons/fa';
import { IoIosExit } from 'react-icons/io';
import { MdCloudUpload } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import classes from './MainLayout.module.css';

const MainLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    navigate('/login');
  };

  return (
    <div className={classes.main}>
      <Card className={classes.navigation}>
        <div className={classes.mainNav}>
          <img className={classes.logo} src="https://ncmsystem.azurewebsites.net/Images/admin.png" alt='logo' />
          <div className={classes.nav}>
            <div className={classes.itemNav}>
              <Tooltip
                className={classes.tooltip}
                placement="right"
                content="Manager user"
                color="invert"
              >
                <NavLink
                  to="/user"
                  className={({ isActive }) =>
                    isActive ? classes.activeNav : undefined
                  }
                >
                  <FaUserAlt size={20} color="ffffff" />
                </NavLink>
              </Tooltip>
            </div>
            <div className={classes.itemNav}>
              <Tooltip
                placement="right"
                content="Manager owner contact"
                color="invert"
                className={classes.tooltip}
              >
                <NavLink
                  to="/manage-contact"
                  className={({ isActive }) =>
                    isActive ? classes.activeNav : undefined
                  }
                >
                  <FaAddressCard size={20} color="ffffff" />
                </NavLink>
              </Tooltip>
            </div>
            <div className={classes.itemNav}>
              <Tooltip
                placement="right"
                content="Import user"
                color="invert"
                className={classes.tooltip}
              >
                <NavLink
                  to="/import-user"
                  className={({ isActive }) =>
                    isActive ? classes.activeNav : undefined
                  }
                >
                  <MdCloudUpload size={20} color="ffffff" />
                </NavLink>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className={classes.logout} onClick={handleLogout}>
          <Tooltip placement="right" content="Logout" color="invert">
            <IoIosExit size={30} color="ffffff" />
          </Tooltip>
        </div>
      </Card>
      <div className={classes.body}>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
