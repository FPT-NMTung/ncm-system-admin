import React, { useEffect, useState } from 'react';
import { Grid, Text, Card, Loading, Button } from '@nextui-org/react';
import classes from './Contact.module.css';
import TableUserDeActive from '../../components/TableUserDeActive/TableUserDeActive';
import FetchApi from '../../api/FetchApi';
import { ContactApis, UserApis } from '../../api/ListApi';
import TableContactDeActive from '../../components/TableContactDeActive/TableContactDeActive';
import SelectEmail from '../../CommonComponent/SelectEmail/SelectEmail';
import AlertCustom from '../../CommonComponent/AlertCustom/AlertCustom';

const Contact = ({ title }) => {
  document.title = title;
  const [listUserDeActive, setListUserDeActive] = useState([]);
  const [listContact, setListContact] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingContact, setLoadingContact] = useState(false);
  const [listSelectContact, setListSelectContact] = useState([]);
  const [listEmailUser, setListEmailUser] = useState([]);
  const [email, setEmail] = useState();
  const [alertEmail, setAlertEmail] = useState(false);
  const [alertContact, setAlertContact] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [selectUser, setSelectUser] = useState('');
  const [disabledTransfer, setDisabledTransfer] = useState(true);

  useEffect(() => {
    setLoadingUser(true);
    loadListUserDeActive()
    loadListEmailUser();
  }, [])

  useEffect(() => {
    if (alertEmail) {
      setTimeout(() => {
        setAlertEmail(false);
      }, 2000);
    }
  }, [alertEmail])

  useEffect(() => {
    if (alertContact) {
      setTimeout(() => {
        setAlertContact(false);
      }, 2000);
    }
  }, [alertContact])

  const loadListUserDeActive = () => {
    FetchApi(UserApis.listUserDeActive, undefined, undefined, undefined)
      .then((res) => {
        setListUserDeActive(res.data)
        setLoadingUser(false)
      })
      .catch(() => {

      });
  }

  const loadListEmailUser = () => {
    FetchApi(UserApis.listEmailUser, undefined, undefined, undefined)
      .then((res) => {
        let listTemp = []
        res.data.forEach((item) => {
          listTemp.push({
            value: item.email,
          })
        })
        setListEmailUser(listTemp)
      })
      .catch(() => {

      })
  }

  const onSelectColumnUser = (key) => {
    setLoadingContact(true);
    setSelectUser([...key][0])
    if ([...key][0]) {
      loadListContact([...key][0]);
    }
    if (![...key][0]) {
      setListContact([]);
      setLoadingContact(false);
    }

  }

  const loadListContact = (id) => {
    FetchApi(ContactApis.listContactDeActiveUser, undefined, undefined, [id])
      .then((res) => {
        setListContact(res.data);
        setLoadingContact(false);
      })
      .catch(() => {

      });
  }

  const onSelectColumnContact = (key) => {
    if(![...key].length){
      setDisabledTransfer(true);
    }
    if([...key].length){
      setDisabledTransfer(false);
    }
    setListSelectContact([...key])
  }

  const onSelect = (value) => {
    setEmail(value);
  }

  const onChange = (value) => {
    setEmail(value);
  }

  const handleTransfer = () => {

    if (!listSelectContact.length) {
      setAlertContact(true);
    }
    if (!email) {
      setAlertEmail(true);
    }
    if (listSelectContact.length !== 0 && email !== '') {
      setDisabledTransfer(true);
      let from = listUserDeActive.find((item) => item.id === selectUser).email
      let body = {
        from: from,
        contact_id: listSelectContact,
        to: email
      }
      transferContact(body);
    }
  }

  const transferContact = (body) => {
    FetchApi(ContactApis.transferContact, body, undefined, undefined)
      .then((res) => {
        if (res.message === 'Success') {
          setAlertSuccess(true);
          setListSelectContact([]);
          setEmail('');
          setDisabledTransfer(false);
          loadListContact(selectUser);
        }
      })
      .catch(() => {
      });
  }

  const onCloseContact = () => {
    setAlertContact(false);
  }

  const onCloseEmail = () => {
    setAlertEmail(false);
  }

  const onCloseSuccess = () => {
    setAlertSuccess(false);
  }

  return (
    <div>
      <Grid.Container css={{ paddingBottom: 30 }}>
        <Grid sm={6.5}>
          <div className={classes.main}>
            <Card
              css={{
                marginBottom: 20,
                padding: 20,
              }}
            >
              <Text h2 css={{ margin: 0 }}>
                Manager owner contact
              </Text>
            </Card>
            <Card>
              <Text h3 css={{ margin: 20 }}>List de-activation</Text>
              {listUserDeActive.length !== 0 && <TableUserDeActive listUser={listUserDeActive} onSelectColumn={onSelectColumnUser} />}
              {loadingUser && !listEmailUser.length && <div className={classes.loadingContact}><Loading color='primary' /></div>}
              {!listUserDeActive.length && !loadingUser && <div className={classes.loadingUser}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>}
            </Card>
          </div>
        </Grid>
        <Grid.Container sm={5.5} direction="column">
          <Card>
            <Text h3 css={{ margin: 20 }}>List contact</Text>
            {listContact.length !== 0 && <TableContactDeActive listContact={listContact} onSelectColumn={onSelectColumnContact}/>}
            {loadingContact && !listContact.length && <div className={classes.loadingContact}><Loading color='primary' /></div>}
            {!listContact.length && !loadingContact && <div className={classes.loadingContact}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>}
          </Card>
          {listContact.length !== 0 && <Card
            css={{
              marginTop: 20,
              marginBottom: 20,
              padding: 20,
            }}
          >
            <div className={classes.footerTabbleContact}>
              <div className={classes.formInput}>
                <Text h3 css={{ marginRight: 20 }}>Email transfer</Text>
                <SelectEmail
                  listItem={listEmailUser}
                  style={{ width: 300 }}
                  placeholder={'Input Email'}
                  onSelect={onSelect}
                  value={email}
                  status={alertEmail ? 'error' : undefined}
                  onChange={onChange}
                />
              </div>
              <Button size={'sm'} onPress={handleTransfer} disabled={disabledTransfer}>Transfer</Button>
            </div>
          </Card>}
        </Grid.Container>
      </Grid.Container>
      <div className={classes.alert}>
        {alertContact &&
          <AlertCustom message={'Please select at least one contact'} type={'warning'} onClose={onCloseContact} />
        }
        {alertEmail &&
          <AlertCustom message={'Please enter transfer email'} type={'warning'} onClose={onCloseEmail} />
        }
        {alertSuccess &&
          <AlertCustom message={'Transfer contact successfully'} type={'success'} onClose={onCloseSuccess} />
        }
      </div>
    </div>
  );
};

export default Contact;
