import React, { useEffect, useState, useRef } from 'react';
import { Grid, Card, Text, Input, Spacer, Button, Modal } from '@nextui-org/react';
import { TiWarning, TiTick } from 'react-icons/ti';
import { Select, Alert } from 'antd';
import classes from './AddUser.module.css';
import FetchApi from '../../api/FetchApi';
import { ImportUserApis } from '../../api/ListApi';
import { useNavigate } from 'react-router-dom';
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
const AddUser = ({ title }) => {
  document.title = title;
  const navigator = useNavigate()
  const [listEmail, setListEmail] = useState([]);
  const [selectRole, setSelectRole] = useState();
  const [managerEmail, setManagerEmail] = useState();
  const inputName = useRef();
  const inputEmail = useRef();
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [alertError, setAlertError] = useState(false);
  const [alertWarning, setAlertWarning] = useState(false);
  const [alertWarningMessage, setAlertWarningMessage] = useState('');
  useEffect(() => {
    FetchApi(ImportUserApis.listEmailUserActive, undefined, undefined, undefined)
      .then((res) => {
        let listTemp = []
        res.data.forEach((item) => {
          listTemp.push({
            value: item.email,
          })
        })
        setListEmail(listTemp);
      })
      .catch((err) => {

      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setAlertError(false);
    }, 2000);
  }, [alertError]);

  useEffect(() => {
    setTimeout(() => {
      setAlertWarning(false);
    }, 2000);
  }, [alertWarning]);

  const handleNameChange = (e) => {
    inputName.current.value = e.target.value;
  };
  const handleEmailChange = (e) => {
    inputEmail.current.value = e.target.value;
  };


  const handleChangeRole = (value) => {
    setSelectRole(value);
    value === 3 && setManagerEmail();
  }

  const handleChangeManager = (value) => {
    setManagerEmail(value);
  }

  const handleAddUser = () => {
    const name = inputName.current.value.trim();
    const email = inputEmail.current.value.trim();

    if (!name || !email || !name.trim() || !email.trim()) {
      setAlertWarning(true);
      setAlertWarningMessage('Please fill all field');
      return;
    }

    if(!selectRole){
      setAlertWarning(true);
      setAlertWarningMessage('Please select role');
      return;
    }

    if(selectRole !== 3 && !managerEmail) {
      setAlertWarning(true);
      setAlertWarningMessage('Please select manager');
      return;
    }

    if(selectRole === 3) {
      setShowWarning(true);
      return;
    }

    const data = {
      name: name,
      email: email,
      role_id: selectRole,
      manager_email: managerEmail
    }

    FetchApi(ImportUserApis.addUser,data, undefined, undefined)
    .then((res) => {
      setShowSuccess(true);
    })
    .catch((err) => {
      setAlertError(true);
    })

    setTimeout(() => {
      setShowSuccess(false);
      navigator('/user');
    }, 1000);
  }

  const handleAddUserWarning = () => {
    const name = inputName.current.value.trim();
    const email = inputEmail.current.value.trim();

    const data = {
      name: name,
      email: email,
      role_id: selectRole,
    }

    FetchApi(ImportUserApis.addUser,data, undefined, undefined)
    .then((res) => {
      setShowSuccess(true);
    })
    .catch((err) => {
      console.log(err)
      setAlertError(true);
    })
    setShowWarning(false);
    navigator('/user');
  }

  return (
    <div>
      <Grid.Container>
      <Grid sm={6.5}>
        <div className={classes.main}>
          <Card
            css={{
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Text h2 css={{ margin: 0 }}>
              Add user
            </Text>
          </Card>
          <Card
            css={{
              marginBottom: 20,
              padding: 20,
            }}
          >
            <Input
              css={{ width: 400 }}
              label="Name"
              ref={inputName}
              onChange={handleNameChange}
            />
            <Spacer y={0.5} />
            <Input
              css={{ width: 400 }}
              label="Email"
              ref={inputEmail}
              onChange={handleEmailChange}
            />
            <Spacer y={0.5} />
            <p className={classes.textManage}>Role</p>
            <Select
              style={{ width: 400 }}
              placeholder="Select role"
              value={selectRole}
              onChange={handleChangeRole}
            >
              {listRole.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.value}
                </Select.Option>
              ))}
            </Select>
            {selectRole !== 3 &&
              <div>
                <Spacer y={0.5} />
                <p className={classes.textManage}>Manager's email</p>
                <Select
                  style={{ width: 400 }}
                  showSearch
                  placeholder="Select email"
                  options={listEmail}
                  value={managerEmail}
                  onChange={handleChangeManager}
                />
              </div>
            }
            <Spacer y={1.5} />
            <Button
              css={{ width: 100 }}
              auto
              onPress={handleAddUser}
            >
              Add
            </Button>
          </Card>
        </div>
      </Grid>
    </Grid.Container>
    <div className={classes.alert}>
      {alertError &&
        <Alert closable type="error" message={'Request Change invalid'} />
      }
      {alertWarning &&
        <Alert closable type="warning" message={alertWarningMessage} />
      }
    </div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width={500}
        open={showWarning}
        onClose={() => {
          setShowWarning(false);
        }}
        css={{ padding: '20px' }}
      >
        <Modal.Header>
          <div className={classes.warningHeader}>
            <TiWarning size={30} color={'#ffc107'} />
            <p>Warning !</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p>
            New user whose role is <strong>sales director</strong>. If you continue, the
            system will:
          </p>
          <ul>
            <li>Deactive sales director current.</li>
            <li>Transfer employees to new sales director.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleAddUserWarning} auto flat color="warning">
            Accept
          </Button>
          <Button onClick={() => {setShowWarning(false)}} auto>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        aria-labelledby="modal-title"
        width={300}
        open={showSuccess}
        css={{ padding: '20px' }}
      >
        <Modal.Header>
          <div className={classes.warningHeader}>
            <TiTick size={30} color={'#17c964'} />
            <p>Success !</p>
          </div>
        </Modal.Header>
      </Modal>
    </div>
    
  );
};

export default AddUser;
