import { Grid, Card, Text, Spacer, Input, Button, Loading, Switch, Modal } from "@nextui-org/react";
import { useEffect, useState, useRef } from "react";
import { Select, Alert } from "antd";
import { FaUserAltSlash, FaUserAlt } from 'react-icons/fa'
import { TiWarning, TiTick } from 'react-icons/ti';
import classes from './UserDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom'
import FetchApi from "../../api/FetchApi";
import { ImportUserApis } from "../../api/ListApi";
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
  const [selectRole, setSelectRole] = useState();
  const [managerEmail, setManagerEmail] = useState();
  const [isActive, setIsActive] = useState(true);
  const inputName = useRef();
  const inputEmail = useRef();
  const [user, setUser] = useState()
  const [showWarning, setShowWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 
  const [alertError, setAlertError] = useState(false);
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
        })
        .catch((err) => {

        })
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
    }, 2000);
  }, [alertError]);

  useEffect(() => {
    setTimeout(() => {
      setAlertWarning(false);
    }, 2000);
  }, [alertWarning]);

  const handleChangeRole = (value) => {
    setSelectRole(value);
    value === 3 && setManagerEmail();
  }

  const handleChangeManager = (value) => {
    setManagerEmail(value);
  }

  const handleAddUser = () => {
    const name = inputName.current.value;
    const email = inputEmail.current.value;

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
      is_active: isActive,
      role_id: selectRole,
      email_manager: managerEmail
    }

    console.log(data)

    FetchApi(ImportUserApis.updateUserDetail,data, undefined, [param.id])
    .then((res) => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigator('/user');
      }, 1000);
    })
    .catch((err) => {
      setAlertError(true);
    })
  }

  const handleAddUserWarning = () => {
    const name = inputName.current.value;
    const email = inputEmail.current.value;

    const data = {
      name: name,
      email: email,
      is_active: isActive,
      role_id: selectRole,
    }

    console.log(data)

    FetchApi(ImportUserApis.updateUserDetail,data, undefined, [param.id])
    .then((res) => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setTimeout(() => {
          setShowWarning(false);
          setShowSuccess(false);
          navigator('/user');
        }, 1000);
      }, 1000);
    })
    .catch((err) => {
      console.log(err)
      setAlertError(true);
    })

  }

  const handleChangeActive = (e) => {
    setIsActive(e.target.checked)
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
                User Detail
              </Text>
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
                  ref={inputName}
                  value={user.name}
                />
                <Spacer y={0.5} />
                <Input
                  css={{ width: 400 }}
                  label="Email"
                  ref={inputEmail}
                  value={user.email}
                />
                <Spacer y={0.5} />
                <p className={classes.textManage}>Role</p>
                <Select
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
                  </div>
                }
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

                <Spacer y={1.5} />
                <Button
                  css={{ width: 100 }}
                  auto
                  onPress={handleAddUser}
                >
                  Edit
                </Button>
              </div>}
              {!user && <div><Loading color={"primary"} /></div>}
            </Card>
          </div>
        </Grid>
        {/* <Grid sm={5.5}>
          <Card>
            <div className={classes.loadingContact}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>
          </Card>
        </Grid> */}
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

export default UserDetail;
