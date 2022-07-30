import React, { useEffect, useState, useRef } from 'react';
import { Grid, Card, Text, Input, Spacer, Button, Modal } from '@nextui-org/react';
import { TiWarning, TiTick, TiDelete } from 'react-icons/ti';
import { MdKeyboardBackspace } from 'react-icons/md'
import { Select } from 'antd';
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
  const [alertErrorMessage, setAlertErrorMessage] = useState('');
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
    }, 1500);
  }, [alertError]);

  useEffect(() => {
    setTimeout(() => {
      setAlertWarning(false);
    }, 1500);
  }, [alertWarning]);

  const handleNameChange = (e) => {
    inputName.current.value = e.target.value;
  };
  const handleEmailChange = (e) => {
    inputEmail.current.value = e.target.value;
  };


  const handleChangeRole = (value) => {
    setSelectRole(value);
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

    if (!selectRole) {
      setAlertWarning(true);
      setAlertWarningMessage('Please select role');
      return;
    }

    if (selectRole !== 3 && !managerEmail) {
      setAlertWarning(true);
      setAlertWarningMessage('Please select manager');
      return;
    }

    if (selectRole === 3) {
      setShowWarning(true);
      return;
    }

    const data = {
      name: name,
      email: email,
      role_id: selectRole,
      manager_email: managerEmail
    }

    FetchApi(ImportUserApis.addUser, data, undefined, undefined)
      .then((res) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigator('/user');
        }, 1000);
      })
      .catch((err) => {
        if (err.message === 'A0011') {
          setAlertError(true);
          setAlertErrorMessage("Can't deactive manager has child")
        }
        if(err.message === 'A0004'){
          setAlertError(true);
          setAlertErrorMessage("Request Change invalid")
        }
        if(err.message === 'A0005'){
          setAlertError(true);
          setAlertErrorMessage("Email invalid")
        }  
      })
    
    setShowWarning(false);
  }

  const handleAddUserWarning = () => {
    const name = inputName.current.value.trim();
    const email = inputEmail.current.value.trim();

    const data = {
      name: name,
      email: email,
      role_id: selectRole,
    }

    FetchApi(ImportUserApis.addUser, data, undefined, undefined)
      .then((res) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigator('/user');
        }, 1000);
      })
      .catch((err) => {
        if (err.message === 'A0011') {
          setAlertError(true);
          setAlertErrorMessage("Can't deactive manager has child")
        }
        if(err.message === 'A0004'){
          setAlertError(true);
          setAlertErrorMessage("Request Change invalid")
        }
        if(err.message === 'A0005'){
          setAlertError(true);
          setAlertErrorMessage("Email invalid")
        }  
      })
    setShowWarning(false);
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
              <Grid.Container alignItems="center">
                <Grid xs={3}>
                  <Button
                    onClick={() => {
                      navigator('/user');
                    }}
                    size="xs"
                    flat
                    auto
                    icon={<MdKeyboardBackspace size={18} />}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid xs={6} justify="center">
                  <Text h2 css={{ margin: 0, textAlign: 'center' }}>
                    Add user
                  </Text>
                </Grid>
              </Grid.Container>
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
      <Modal
        aria-labelledby="modal-title"
        width={300}
        open={alertWarning}
        onClose={() => {
          setAlertWarning(false);
        }}
        css={{ padding: '20px' }}
      >
        <Modal.Header>
          <div className={classes.warningHeader}>
            <TiWarning size={30} color={'#ffc107'} />
            <p className={classes.TextAlert}>Warning !</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className={classes.TextAlert}>{alertWarningMessage}</p>
        </Modal.Body>
      </Modal>
      <Modal
        aria-labelledby="modal-title"
        width={300}
        open={alertError}
        onClose={() => {
          setAlertError(false);
        }}
        css={{ padding: '20px' }}
      >
        <Modal.Header>
          <div className={classes.warningHeader}>
            <TiDelete size={30} color={'#f31260'} />
            <p className={classes.TextAlert}>Error !</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <p className={classes.TextAlert}>{alertErrorMessage}</p>
        </Modal.Body>
      </Modal>
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
          <Button onClick={() => { setShowWarning(false) }} auto>Cancel</Button>
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
