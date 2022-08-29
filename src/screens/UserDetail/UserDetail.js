import { Grid, Card, Text, Spacer, Input, Button, Loading, Switch, Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Select } from "antd";
import { FaUserAltSlash, FaUserAlt } from 'react-icons/fa'
import { MdKeyboardBackspace } from 'react-icons/md'
import { TiWarning, TiTick, TiDelete } from 'react-icons/ti';
import classes from './UserDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom'
import FetchApi from "../../api/FetchApi";
import { ContactApis, ImportUserApis } from "../../api/ListApi";
import TableContactUser from "../../components/TableContactUser/TableContactUser";

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
const UserDetail = ({ title }) => {
  document.title = title
  const navigator = useNavigate();
  const param = useParams()
  const [listEmail, setListEmail] = useState([]);
  const [listContact, setListContact] = useState([]);
  const [loadingContact, setLoadingContact] = useState(true);
  const [nameUser, setNameUser] = useState();
  const [emailUser, setEmailUser] = useState();
  const [selectRole, setSelectRole] = useState();
  const [managerEmail, setManagerEmail] = useState();
  const [isActive, setIsActive] = useState(true);
  const [user, setUser] = useState()
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [alertErrorMessage, setAlertErrorMessage] = useState('');
  const [alertWarning, setAlertWarning] = useState(false);
  const [alertWarningMessage, setAlertWarningMessage] = useState('');

  useEffect(() => {
    if (param.id) {
      FetchApi(ImportUserApis.detailUser, undefined, undefined, [param.id])
        .then((res) => {
          setUser(res.data)
          setSelectRole(res.data.role_id)
          setManagerEmail(res.data.email_manager)
          setIsActive(res.data.is_active)
          setNameUser(res.data.name)
          setEmailUser(res.data.email)          
        })
        .catch((err) => {

        })
      FetchApi(ContactApis.listContactUser, undefined, undefined, [param.id])
        .then((res) => {
          setListContact(res.data)
          setLoadingContact(false)         
        })
        .catch((err) => {})
    }
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
      .catch((err) => { })

  }, [])

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
    setNameUser(e.target.value)
  };
  const handleEmailChange = (e) => {
    setEmailUser(e.target.value)
  };

  const handleChangeRole = (value) => {
    setSelectRole(value);
  }

  const handleChangeManager = (value) => {
    setManagerEmail(value);
  }

  const handleAddUser = () => {
    const name = nameUser.trim();
    const email = emailUser.trim();

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

    if(selectRole === 3 && selectRole !== user.role_id && listContact && listContact.length !== 0){
      setAlertError(true);
      setAlertErrorMessage("You can't change role to sale director if you have contact");
      return
    }

    if (selectRole === 3 && selectRole !== user.role_id) {
      setShowWarning(true);
      return;
    }

    const data = {
      name: name,
      email: email,
      is_active: isActive,
      role_id: selectRole,
      email_manager: managerEmail
    }


    FetchApi(ImportUserApis.updateUserDetail, data, undefined, [param.id])
      .then((res) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigator('/user');
        }, 1000);
      })
      .catch((err) => {
        if (err.message === 'A0013') {
          setAlertError(true)
          setAlertErrorMessage("Can't update role to staff if you have child")
          return
        }
        if (err.message === 'A0011') {
          setAlertError(true);
          setAlertErrorMessage("Can't deactivate manager has child")
          return
        }
        if(err.message === 'A0004'){
          setAlertError(true);
          setAlertErrorMessage("Request Change invalid")
          return
        }
        if(err.message === 'A0005'){
          setAlertError(true);
          setAlertErrorMessage("Email invalid")
          return
        }       
      })
  }

  const handleAddUserWarning = () => {
    const name = nameUser.trim();
    const email = emailUser.trim();

    const data = {
      name: name,
      email: email,
      is_active: true,
      role_id: selectRole,
    }


    FetchApi(ImportUserApis.updateUserDetail, data, undefined, [param.id])
      .then((res) => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigator('/user');
        }, 1000);
      })
      .catch((err) => {     
        if (err.message === 'A0013') {
          setAlertError(true)
          setAlertErrorMessage("Can't update role to staff if you have child")
          return
        }  
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

  const handleChangeActive = (e) => {
    setIsActive(e.target.checked)
  }

  return (
    <div>
      <Grid.Container>
        <Grid sm={5.5}>
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
                  User Detail
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
              {user && <div>
                <Input
                  css={{ width: 400 }}
                  label="Name"
                  value={nameUser}
                  onChange={handleNameChange}
                />
                <Spacer y={0.5} />
                <Input
                  css={{ width: 400 }}
                  label="Email"
                  value={emailUser}
                  onChange={handleEmailChange}
                />
                <Spacer y={0.5} />
                <p className={classes.textManage}>Role</p>
                <Select
                  disabled={user.role_id === 3}
                  style={{ width: 400 }}
                  placeholder="Select role"
                  defaultValue={user.role_id}
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
                      defaultValue={user.email_manager}
                      showSearch
                      placeholder="Select email"
                      options={listEmail}
                      value={managerEmail}
                      onChange={handleChangeManager}
                    />
                    <Spacer y={0.5} />
                    <div className={classes.switchActive}>
                      <p className={classes.textActive}>User's active</p>
                      <Switch
                        defaultChecked={user.is_active}
                        checked={isActive}
                        color="success"
                        onChange={handleChangeActive}
                        iconOn={<FaUserAlt />}
                        iconOff={<FaUserAltSlash />}
                      />
                    </div>
                  </div>
                }
                <Spacer y={1.5} />
                <Button
                  css={{ width: 100 }}
                  auto
                  onPress={handleAddUser}
                >
                  Submit
                </Button>
              </div>}
              {!user && <div className={classes.loadingUser}><Loading color={"primary"} /></div>}
            </Card>
          </div>
        </Grid>
        <Grid sm={6.5}>
          <Card>
          <Text h3 css={{ margin: 20 }}>List contact</Text>
            {listContact.length !== 0 && <TableContactUser listContact={listContact}/>}
            {loadingContact && !listContact.length && <div className={classes.loadingContact}><Loading color='primary' /></div>}
            {!listContact.length && !loadingContact && <div className={classes.loadingContact}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>}
          </Card>
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
            <p>Error !</p>
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
            User update whose role is <strong>sales director</strong>. If you continue, the
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

export default UserDetail;
