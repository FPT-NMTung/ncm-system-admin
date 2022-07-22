import { Card, Button, Input, Spacer } from '@nextui-org/react';
import { useEffect, useRef } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import classes from './DetailUserImported.module.css';

const DetailUserImported = ({ userData }) => {

  const refName = useRef();
  const refEmail = useRef();
  const refRole = useRef();
  const refManager = useRef();

  const handleNameChange = (e) => {
    refName.current.value = e.target.value.trim();
  };
  const handleEmailChange = (e) => {
    refEmail.current.value = e.target.value.trim();
  };
  const handleRoleChange = (e) => {
    refRole.current.value = e.target.value.trim();
  };
  const handleManagerChange = (e) => {
    refManager.current.value = e.target.value.trim();
  };

  useEffect(() => {
    if (userData) {
      refName.current.value = userData.name;
      refEmail.current.value = userData.email;
      refRole.current.value =
        userData.role_id === 1
          ? 'Staff'
          : userData.role_id === 2
          ? 'Manager'
          : userData.role_id === 3
          ? 'Sale Director'
          : 'Admin';
      refManager.current.value = userData.manager;
    }
  }, [userData]);

  return (
    <Card>
      {!userData && (
        <div className={classes.mainTutorial}>
          <FaUserEdit size={50} color={'bababa'} />
          <p className={classes.tutorial}>
            Select user in table for show detail
          </p>
        </div>
      )}
      {userData && (
        <div className={classes.main}>
          <h3 className={classes.title}>
            Edit user with id: <span>{userData.id}</span>
          </h3>
          <div className={classes.form}>
            <Input
              css={{ width: 400 }}
              ref={refName}
              onChange={handleNameChange}
              label="Name"
            />
            <Spacer y={0.5} />
            <Input
              css={{ width: 400 }}
              ref={refEmail}
              onChange={handleEmailChange}
              label="Email"
            />
            <Spacer y={0.5} />
            <Input
              css={{ width: 400 }}
              ref={refRole}
              onChange={handleRoleChange}
              label="Role"
            />
            <Spacer y={0.5} />
            <Input
              css={{ width: 400 }}
              ref={refManager}
              onChange={handleManagerChange}
              label="Manager"
            />
            <Spacer y={1.5} />
            <Button disabled={userData.status === 2} auto>Save</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DetailUserImported;
