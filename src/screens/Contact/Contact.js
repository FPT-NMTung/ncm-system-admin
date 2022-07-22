import React, { useEffect, useState } from 'react';
import { Grid, Text, Card, Loading, Button } from '@nextui-org/react';
import classes from './Contact.module.css';
import TableUserDeActive from '../../components/TableUserDeActive/TableUserDeActive';
import FetchApi from '../../api/FetchApi';
import { ContactApis, UserApis } from '../../api/ListApi';
import TableContactDeActive from '../../components/TableContactDeActive/TableContactDeActive';
import AutoCompleteCustomer from '../../CommonComponent/AutoComplete/AutoCompleteCustomer';

const Contact = ({ title }) => {
  const [listUserDeActive, setListUserDeActive] = useState([]);
  const [listContact, setListContact] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingContact, setLoadingContact] = useState(false);
  const [listSelectContact, setListSelectContact] = useState([]);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    document.title = title;
    setLoadingUser(true);
    loadListUserDeActive()
    loadListUser();
  }, []);

  const loadListUserDeActive = () => {
    FetchApi(UserApis.listUserDeActive, undefined, undefined, undefined)
      .then((res) => {
        setListUserDeActive(res.data)
        setLoadingUser(false)
      })
      .catch(() => {

      });
  }

  const loadListUser = () => {
    FetchApi(UserApis.listUser, undefined, undefined, undefined)
      .then((res) => {
        let listTemp = []
        res.data.map((item) => {
          listTemp.push({
            label: item.email,
          })
        })
        setListUser(listTemp)
      })
      .catch(() => {

      })
  }

  const onSelectColumnUser = (key) => {
    setLoadingContact(true);
    loadListContact(key);
  }

  const loadListContact = (key) => {
    FetchApi(ContactApis.listContact, undefined, undefined, [key.currentKey])
      .then((res) => {
        setListContact(res.data);
        setLoadingContact(false);
      })
      .catch(() => {

      });
  }

  const onSelectColumnContact = (key) => {
    setListSelectContact([...key])
  }

  console.log(listUser)

  return (
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
            {loadingUser && !listUser.length && <div className={classes.loadingContact}><Loading color='warning' /></div>}
            {!listUserDeActive.length && !loadingUser && <div className={classes.loadingUser}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>}
          </Card>
        </div>
      </Grid>
      <Grid.Container sm={5.5} direction="column">
        <Card>
          <Text h3 css={{ margin: 20 }}>List contact</Text>
          {listContact.length !== 0 && <TableContactDeActive listContact={listContact} onSelectColumn={onSelectColumnContact} />}
          {loadingContact && !listContact.length && <div className={classes.loadingContact}><Loading color='warning' /></div>}
          {!listContact.length && !loadingContact && <div className={classes.loadingContact}><Text h4 size={16} color="#BDBDBD">Empty</Text></div>}
        </Card>
        <Card
          css={{
            marginTop: 20,
            marginBottom: 20,
            padding: 20,
          }}
        >
          <div className={classes.footerTabbleContact}>
            <AutoCompleteCustomer listUser={listUser} />
            <Button>Transfer</Button>
          </div>
        </Card>

      </Grid.Container>
    </Grid.Container>
  );
};

export default Contact;
