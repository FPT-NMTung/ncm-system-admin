import {
  Card,
  Text,
  Input,
  Button,
  Table,
  Grid,
  Spacer,
  Tooltip,
  Loading
} from '@nextui-org/react';
import { FaUserPlus } from 'react-icons/fa';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Fragment, useEffect, useState } from 'react';
import { HiDocumentSearch, HiEye, HiPencil } from 'react-icons/hi';
import classes from './TableUser.module.css';
import FetchApi from '../../api/FetchApi';
import { UserApis } from '../../api/ListApi';
import { useNavigate } from 'react-router-dom';

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
  const navigation = useNavigate();
  const [isSearch, setIsSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [listSearchUser, setListSearchUser] = useState([]);
  const [parent, setParent] = useState(undefined);

  useEffect(() => {
    FetchApi(UserApis.searchUser, undefined, { param: '' }, undefined)
      .then((res) => {
        const processList = res.data.map((user) => {
          return {
            ...user,
            processName: toLowerCaseNonAccentVietnamese(user.name),
            processEmail: toLowerCaseNonAccentVietnamese(user.email),
          };
        });
        setListSearchUser(processList);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (dataUser.id !== undefined) {
      FetchApi(UserApis.getParentOfUser, undefined, undefined, [
        `${dataUser.id}`,
      ])
        .then((res) => {
          setParent(res.data);
        })
        .catch(() => {
          setParent(undefined);
        });
    }
  }, [dataUser]);

  useEffect(() => {
    setListSearchUser([]);
    setLoading(true);
    const idTimeout = setTimeout(() => {
      FetchApi(UserApis.searchUser, undefined, { value: search }, undefined)
        .then((res) => {
          const processList = res.data.map((user) => {
            return {
              ...user,
              processName: toLowerCaseNonAccentVietnamese(user.name),
              processEmail: toLowerCaseNonAccentVietnamese(user.email),
            };
          });
          setListSearchUser(processList);
          setLoading(false);
        })
        .catch(() => {});
    }, 300);

    return () => {
      clearTimeout(idTimeout);
    };
  }, [search]);

  const handleChangeSearch = (e) => {
    setSearch(e.target.value.trim());
  };

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
            onChange={handleChangeSearch}
            onMouseDown={() => {
              setIsSearch(true);
            }}
            shadow={false}
            animated={false}
            width={400}
            contentRightStyling={false}
            placeholder="Search user by name, email, ..."
          />
          <Button
            flat
            icon={<FaUserPlus size={18} />}
            onPress={() => navigation('/user/add')}
          >
            Add User
          </Button>
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
            {listSearchUser.length === 0 && loading && (
              <div className={classes.contentSearch}>
                <Loading />
              </div>
            )}
            {listSearchUser.length === 0 && !loading && (
              <div className={classes.contentSearch}>
                <HiDocumentSearch color='#999999' size={30}/>
                <p>No result</p>
              </div>
            )}
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
                    <Table.Row key={item.id}>
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
                            <HiEye size={18} />
                          </div>
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell>
                        <Tooltip content={'Edit'} rounded color="primary">
                          <div
                            className={classes.iconBtn}
                            onClick={() => {
                              navigation(`/user/${item.id}`);
                            }}
                          >
                            <HiPencil size={18} />
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
              <Button
                flat
                auto
                icon={<HiPencil size={18} />}
                onClick={() => {
                  navigation(`/user/${dataUser.id}`);
                }}
              >
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
                            <HiEye size={18} />
                          </div>
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell>
                        <Tooltip content={'Edit'} rounded color="primary">
                          <div
                            className={classes.iconBtn}
                            onClick={() => {
                              navigation(`/user/${item.id}`);
                            }}
                          >
                            <HiPencil size={18} />
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
