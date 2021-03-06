import {
  Card,
  Text,
  Input,
  Button,
  Table,
  Grid,
  Spacer,
  Tooltip,
} from '@nextui-org/react';
import { GrView } from 'react-icons/gr';
import { TbEdit } from 'react-icons/tb';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Fragment, useEffect, useState } from 'react';

import classes from './TableUser.module.css';
import FetchApi from '../../api/FetchApi';
import { UserApis } from '../../api/ListApi';

function toLowerCaseNonAccentVietnamese(str) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, '');
  return str;
}

const TableUser = ({ dataUser, onChangeSelectUser }) => {
  const [isSearch, setIsSearch] = useState(false);
  const [listAllUser, setListAllUser] = useState([]);
  const [listSearchUser, setListSearchUser] = useState([]);
  const [parent, setParent] = useState(undefined);

  useEffect(() => {
    FetchApi(UserApis.listAllUser, undefined, undefined, undefined)
      .then((res) => {
        const processList = res.data.map((user) => {
          return {
            ...user,
            processName: toLowerCaseNonAccentVietnamese(user.name),
            processEmail: toLowerCaseNonAccentVietnamese(user.email),
          };
        });
        setListAllUser(processList);
        setListSearchUser(processList);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (dataUser.id !== undefined) {
      FetchApi(UserApis.getParentOfUser, undefined, undefined, [
        `${dataUser.id}`,
      ]).then((res) => {
        setParent(res.data);
      })
      .catch(() => {
        setParent(undefined);
      })
    }
  }, [dataUser]);

  const handleChangeValueSearch = (e) => {
    const listSearch = listAllUser.filter((item) => {
      return (
        item.processName
          .toLowerCase()
          .includes(toLowerCaseNonAccentVietnamese(e.target.value.trim())) ||
        item.processEmail
          .toLowerCase()
          .includes(toLowerCaseNonAccentVietnamese(e.target.value.trim()))
      );
    });
    setListSearchUser(listSearch);
  };

  const handleBackUser = () => {};

  return (
    <div className={classes.main}>
      <Card
        css={{
          marginBottom: 20,
          padding: 20,
        }}
      >
        <div className={classes.headerLayout}>
          <Text h2 css={{ margin: 0 }}>
            Manager user
          </Text>
          <Input
            onChange={handleChangeValueSearch}
            onMouseDown={() => {
              setIsSearch(true);
            }}
            shadow={false}
            animated={false}
            width={400}
            contentRightStyling={false}
            placeholder="Search user by name, email, ..."
          />
        </div>
      </Card>
      {isSearch && (
        <Card
          css={{
            marginBottom: 20,
            padding: 20,
          }}
        >
          <div>
            <Grid.Container>
              <Grid xs={3}>
                <Button
                  onClick={() => {
                    setIsSearch(false);
                  }}
                  size="xs"
                  flat
                  auto
                  icon={<MdKeyboardBackspace size={18} />}
                >
                  Back to main screen
                </Button>
              </Grid>
              <Grid xs={6} justify="center">
                <Text h3 css={{ margin: 0, textAlign: 'center' }}>
                  Search result
                </Text>
              </Grid>
            </Grid.Container>
            <Spacer />
            {listSearchUser.length !== 0 && (
              <Table
                css={{
                  height: 'auto',
                  minWidth: '100%',
                }}
              >
                <Table.Header>
                  <Table.Column>ID</Table.Column>
                  <Table.Column>Name</Table.Column>
                  <Table.Column>Email</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column></Table.Column>
                  <Table.Column></Table.Column>
                </Table.Header>
                <Table.Body>
                  {listSearchUser.map((item) => (
                    <Table.Row>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`${
                            item.is_active
                              ? classes.activeTable
                              : classes.deactiveTable
                          }`}
                        >
                          {item.is_active ? 'Active' : 'Deactive'}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        {item.role_id === 1
                          ? 'Staff'
                          : item.role_id === 2
                          ? 'Manager'
                          : item.role_id === 3
                          ? 'Sale director'
                          : ''}
                      </Table.Cell>
                      <Table.Cell>
                        <Tooltip content={'View'} rounded color="invert">
                          <div
                            onClick={() => {
                              onChangeSelectUser(item);
                              setIsSearch(false);
                            }}
                            className={classes.iconBtn}
                          >
                            <GrView size={18} />
                          </div>
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell>
                        <Tooltip content={'Edit'} rounded color="primary">
                          <div className={classes.iconBtn}>
                            <TbEdit size={18} />
                          </div>
                        </Tooltip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Pagination
                  shadow
                  noMargin
                  align="center"
                  rowsPerPage={10}
                />
              </Table>
            )}
          </div>
        </Card>
      )}
      {!isSearch && (
        <Fragment>
          <Card
            css={{
              marginBottom: 20,
              padding: 20,
            }}
          >
            <div>
              <Grid.Container>
                <Grid xs={3}>
                  {parent && (
                    <Button
                      size={'xs'}
                      auto
                      icon={<MdKeyboardBackspace size={18} />}
                      onClick={() => {
                        onChangeSelectUser(parent);
                        setIsSearch(false);
                      }}
                    >
                      {parent.name}
                    </Button>
                  )}
                </Grid>
                <Grid xs={6} justify="center">
                  <Text h3 css={{ margin: 0, textAlign: 'center' }}>
                    Selected person information
                  </Text>
                </Grid>
              </Grid.Container>
              <ul className={classes.selectInfor}>
                <li>
                  Role:{' '}
                  <strong>
                    {dataUser.role_id === 1
                      ? 'Staff'
                      : dataUser.role_id === 2
                      ? 'Manager'
                      : dataUser.role_id === 3
                      ? 'Sale director'
                      : ''}
                  </strong>
                </li>
                <li>
                  Name: <strong>{dataUser.name}</strong>
                </li>
                <li>
                  Email: <strong>{dataUser.email}</strong>
                </li>
                <li>
                  Status:{' '}
                  <span
                    className={`${
                      dataUser.isActive === true
                        ? classes.active
                        : dataUser.isActive === false
                        ? classes.deactive
                        : ''
                    }`}
                  >
                    {dataUser.isActive === true
                      ? 'Active'
                      : dataUser.isActive === false
                      ? 'Deactive'
                      : ''}
                  </span>
                </li>
              </ul>
              <Button flat auto icon={<TbEdit size={18} />}>
                Edit
              </Button>
            </div>
          </Card>
          <Text h4 css={{ margin: '0 0 5px 0', textAlign: 'center' }}>
            List of employees of {dataUser.name}:
          </Text>

          <Card
            css={{
              minHeight: '400px',
            }}
          >
            {dataUser.children && (
              <Table
                css={{
                  height: 'auto',
                  minHeight: '400px',
                  minWidth: '100%',
                }}
              >
                <Table.Header>
                  <Table.Column>ID</Table.Column>
                  <Table.Column>Name</Table.Column>
                  <Table.Column>Email</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Role</Table.Column>
                  <Table.Column></Table.Column>
                  <Table.Column></Table.Column>
                </Table.Header>
                <Table.Body>
                  {dataUser.children.map((item) => (
                    <Table.Row key={item.id}>
                      <Table.Cell>{item.id}</Table.Cell>
                      <Table.Cell>{item.name}</Table.Cell>
                      <Table.Cell>{item.email}</Table.Cell>
                      <Table.Cell>
                        <span
                          className={`${
                            item.isActive
                              ? classes.activeTable
                              : classes.deactiveTable
                          }`}
                        >
                          {item.isActive ? 'Active' : 'Deactive'}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        {item.role_id === 1
                          ? 'Staff'
                          : item.role_id === 2
                          ? 'Manager'
                          : item.role_id === 3
                          ? 'Sale director'
                          : ''}
                      </Table.Cell>
                      <Table.Cell>
                        <Tooltip content={'View'} rounded color="invert">
                          <div
                            onClick={() => {
                              onChangeSelectUser(item);
                            }}
                            className={classes.iconBtn}
                          >
                            <GrView size={18} />
                          </div>
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell>
                        <Tooltip content={'Edit'} rounded color="primary">
                          <div className={classes.iconBtn}>
                            <TbEdit size={18} />
                          </div>
                        </Tooltip>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                {dataUser.children.length !== 0 && (
                  <Table.Pagination
                    shadow
                    noMargin
                    align="center"
                    rowsPerPage={7}
                  />
                )}
              </Table>
            )}
          </Card>
        </Fragment>
      )}
    </div>
  );
};

export default TableUser;
