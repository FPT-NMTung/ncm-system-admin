import { Card, Button, Input, Spacer, Loading } from '@nextui-org/react';
import { useEffect, useState, useRef, Fragment } from 'react';
import { FaUserEdit } from 'react-icons/fa';
import { Select } from 'antd';
import classes from './DetailUserImported.module.css';
import FetchApi from '../../api/FetchApi';
import { ImportUserApis } from '../../api/ListApi';
import { IoMdTrash } from 'react-icons/io';

const listRole = [
  {
    id: 1,
    value: 'Staff',
  },
  {
    id: 2,
    value: 'Manager',
  },
  {
    id: 3,
    value: 'Sale director',
  },
];

const DetailUserImported = ({ list, userData, onChangeSuccess, onDeleteOne }) => {
  const [listEmail, setListEmail] = useState([]);
  const [selectRole, setSelectRole] = useState(undefined);
  const [selectManager, setSelectManager] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('none');
  const [statusDelete, setStatusDelete] = useState(1);
  const [executeDelete, setExecuteDelete] = useState(false);
  const refName = useRef();
  const refEmail = useRef();

  const handleNameChange = (e) => {
    refName.current.value = e.target.value;
  };
  const handleEmailChange = (e) => {
    refEmail.current.value = e.target.value;
  };

  useEffect(() => {
    if (userData) {
      refName.current.value = userData.name.trim();
      refEmail.current.value = userData.email.trim();

      const listEmailUserImportBefore = list
        .filter((item) => {
          return item.id < userData.id && item.role_id !== 1;
        })
        .map((item) => {
          return item.email;
        });

      FetchApi(
        ImportUserApis.listEmailUserActive,
        undefined,
        undefined,
        undefined
      )
        .then((res) => {
          const data = res.data.map((item) => {
            return item.email;
          });
          const tempList = [...data, ...listEmailUserImportBefore];
          // remove duplicate
          const listEmailUserImport = [...new Set(tempList)];
          setListEmail(listEmailUserImport);
          setSelectRole(userData.role_id);
          setSelectManager(userData.manager);
        })
        .catch(() => {
          console.log('error');
        });
    }

    setStatusDelete(1);
  }, [userData, list]);

  const handleChangeRole = (e) => {
    setSelectRole(e);
  };

  const handleChangeManager = (e) => {
    setSelectManager(e);
  };

  const handleBtnDelete = () => {
    if (statusDelete === 1) {
      setStatusDelete(2);
      return;
    }

    onDeleteOne(userData.id);
    FetchApi(ImportUserApis.deleteUserImport, undefined, undefined, [`${userData.id}`])
      .then((res) => {})
  };

  const handleSubmitForm = () => {
    const name = refName.current.value;
    const email = refEmail.current.value;
    const role = selectRole;
    const manager = selectManager;

    if (
      name === undefined ||
      email === undefined ||
      name.trim() === '' ||
      email.trim() === ''
    ) {
      return;
    }

    const data = {
      name: name,
      email: email,
      role_id: role,
    };

    if (role !== 3 && manager === null) {
      return;
    }

    if (role !== 3 && manager !== null && manager.trim() === '') {
      return;
    }

    if (role !== 3) {
      data.manager_email = manager;
    }

    setLoading(true);
    setStatus('none');

    FetchApi(ImportUserApis.updateUser, data, undefined, [`${userData.id}`])
      .then(() => {
        onChangeSuccess(userData.id, data);
        resetStatus('success');
      })
      .catch(() => {
        resetStatus('fail');
      });
  };

  const resetStatus = (status) => {
    setLoading(false);
    setStatus(status);

    setTimeout(() => {
      setStatus('none');
    }, 1500);
  };

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
              readOnly={userData.status === 2}
              css={{ width: 400 }}
              ref={refName}
              onChange={handleNameChange}
              label="Name"
            />
            <Spacer y={0.5} />
            <Input
              readOnly={userData.status === 2}
              css={{ width: 400 }}
              ref={refEmail}
              onChange={handleEmailChange}
              label="Email"
            />
            <Spacer y={0.5} />
            <p className={classes.textManage}>Role</p>
            <Select
              defaultValue={listRole.find(
                (item) => userData.role_id === item.id
              )}
              value={listRole.find((item) => selectRole === item.id)}
              onChange={handleChangeRole}
              showSearch
              style={{
                width: 400,
              }}
              placeholder="Search role"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {listRole.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
            {selectRole !== 3 && (
              <Fragment>
                <Spacer y={0.5} />
                <p className={classes.textManage}>Manager's email</p>
                <Select
                  defaultValue={selectManager}
                  value={selectManager}
                  onChange={handleChangeManager}
                  showSearch
                  style={{
                    width: 400,
                  }}
                  placeholder="Search email"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
                >
                  {listEmail.map((email) => (
                    <Select.Option key={email} value={email}>
                      {email}
                    </Select.Option>
                  ))}
                </Select>
              </Fragment>
            )}
            <Spacer y={1.5} />
            <div className={classes.groupButton}>
              <Button
                onClick={handleSubmitForm}
                disabled={userData.status === 2 || loading}
                css={{ width: 100 }}
                color={
                  status === 'none'
                    ? 'primary'
                    : status === 'success'
                    ? 'success'
                    : 'error'
                }
                auto
              >
                {!loading && status === 'none' && 'Save'}
                {!loading && status === 'success' && 'Success'}
                {!loading && status === 'fail' && 'Failed'}
                {loading && <Loading size="xs" />}
              </Button>
              <Button
                color={'error'}
                icon={<IoMdTrash size={20} />}
                onClick={handleBtnDelete}
                auto
                flat={statusDelete === 1}
              >
                {!executeDelete && statusDelete === 1 && 'Delete'}
                {!executeDelete && statusDelete === 2 && 'Click again to delete'}
                {executeDelete && <Loading size="xs" />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DetailUserImported;
