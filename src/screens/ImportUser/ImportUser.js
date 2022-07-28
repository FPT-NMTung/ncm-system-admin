import { Button, Card, Grid, Text, Modal, Loading } from '@nextui-org/react';
import { Fragment, useEffect, useState } from 'react';
import TableContact from '../../components/TableContact/TableContact';
import { IoMdCloudDownload, IoMdCloudUpload } from 'react-icons/io';
import { Upload } from 'antd';
import FetchApi from '../../api/FetchApi';
import { ImportUserApis } from '../../api/ListApi';
import { IoMdCloudDone } from 'react-icons/io';
import { MdError } from 'react-icons/md';
import { TiWarning } from 'react-icons/ti';
import DetailUserImported from '../../components/DetailUserImported/DetailUserImported';

import classes from './ImportUser.module.css';
import AlertCustom from '../../CommonComponent/AlertCustom/AlertCustom';

const { Dragger } = Upload;

const ImportUser = ({ title }) => {
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [statusUpload, setStatusUpload] = useState('none');

  const [listUser, setListUser] = useState([]);
  const [selectEditUser, setSelectEditUser] = useState(undefined);

  const handleChangeVisibleUpload = () => {
    setShowModalUpload(!showModalUpload);
    setStatusUpload('none');
  };

  const handleSelectUser = (idSelect) => {
    const userId = [...idSelect][0];
    const selectUser = listUser.find((user) => {
      return user.id === Number.parseInt(userId);
    });
    setSelectEditUser(selectUser);
  };

  const loadDataUser = () => {
    FetchApi(ImportUserApis.listUserImport, undefined, undefined, undefined)
      .then((res) => {
        setListUser(res.data);
      })
      .catch(() => {});
  };

  const handleUploadFile = (e) => {
    setStatusUpload('none');
    setUploading(true);

    const a = new FormData();
    a.append('file', e.file);
    FetchApi(ImportUserApis.importUser, a, undefined, undefined)
      .then(() => {
        setStatusUpload('done');
        setUploading(false);
        setListUser([]);
        loadDataUser();
      })
      .catch(() => {
        setStatusUpload('error');
        setUploading(false);
      });
  };

  const handleChangeUserSuccess = (userId, data) => {
    const user = listUser.find((user) => {
      return user.id === userId;
    });

    if (user) {
      user.name = data.name;
      user.email = data.email;
      user.role_id = data.role_id;
      user.manager = data.role_id === 3 ? null : data.manager_email;

      console.log(listUser);
      setListUser([...listUser]);
    }
  };

  const executeImport = async () => {
    setShowWarning(false);
    for (let index = 0; index < listUser.length; index++) {
      const user = listUser[index];

      if (user.status !== 2) {
        await FetchApi(ImportUserApis.executeImport, undefined, undefined, [
          `${user.id}`,
        ])
          .then(() => {
            user.status = 2;
          })
          .catch(() => {
            user.status = 3;
          });
        setListUser([...listUser]);
        if (user.status === 3) {
          const t = listUser.map((e) => {
            if (e.status === 4) {
              e.status = 1;
            }
            return e;
          });
          setListUser([...t]);
          break;
        }
      }
    }
  };

  const handleExecuteButtonClick = () => {
    const saleDirector = listUser.find((user) => {
      return user.role_id === 3;
    });

    if (saleDirector) {
      setShowWarning(true);
      return
    }

    executeImport();
  };

  useEffect(() => {
    console.log(listUser);
  }, [listUser]);

  const handleExecuteImport = () => {
    let newList = listUser.map((user) => {
      if (user.status !== 2) {
        user.status = 4;
      }
      return user;
    });
    setListUser(newList);
    executeImport();
  };

  useEffect(() => {
    document.title = title;

    loadDataUser();
  }, []);

  return (
    <div className={classes.main}>
      <Grid.Container css={{ marginBottom: 20 }}>
        <Grid sm={6.5}>
          <Card
            css={{
              marginRight: 20,
              padding: 20,
            }}
          >
            <Text h2 css={{ margin: 0 }}>
              Import user
            </Text>
          </Card>
        </Grid>
        <Grid sm={5.5}>
          <Card>
            <div className={classes.control}>
              <Button
                flat
                auto
                css={{ width: 200 }}
                icon={<IoMdCloudDownload size={20} />}
                onClick={() => {
                  window.open(
                    'https://ncmsystem.azurewebsites.net/Template/ImportUsers.xlsx'
                  );
                }}
              >
                Download template
              </Button>
              <Button
                flat
                auto
                css={{ width: 200 }}
                icon={<IoMdCloudUpload size={20} />}
                onClick={handleChangeVisibleUpload}
              >
                Upload file data
              </Button>
              <Button
                flat
                auto
                color={'success'}
                css={{ width: 130 }}
                icon={<IoMdCloudUpload size={20} />}
                onPress={handleExecuteButtonClick}
              >
                Execute import
              </Button>
            </div>
          </Card>
        </Grid>
      </Grid.Container>
      <Grid.Container>
        <Grid sm={6.5}>
          <Card
            css={{
              marginRight: 20,
              minHeight: 500,
            }}
          >
            {!(listUser.length === 0) && (
              <TableContact data={listUser} onSelectColumn={handleSelectUser} />
            )}
            {listUser.length === 0 && <Loading />}
          </Card>
        </Grid>
        <Grid sm={5.5}>
          <DetailUserImported
            list={listUser}
            userData={selectEditUser}
            onChangeSuccess={handleChangeUserSuccess}
          />
        </Grid>
      </Grid.Container>
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
            In your import user list there is{' '}
            <strong>one or more sales director</strong>. If you continue, the
            system will:
          </p>
          <ul>
            <li>Deactive sales director current.</li>
            <li>Transfer employees to new sales director.</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={executeImport} auto flat color="warning">
            Accept
          </Button>
          <Button onClick={() => {setShowWarning(false)}} auto>Cancel</Button>
        </Modal.Footer>
      </Modal>
      <Modal
        blur
        aria-labelledby="modal-title"
        open={showModalUpload}
        preventClose={uploading}
        onClose={handleChangeVisibleUpload}
        width={600}
        css={{ padding: '20px' }}
      >
        <Dragger
          disabled={uploading}
          showUploadList={false}
          customRequest={handleUploadFile}
          multiple={false}
        >
          <div className={classes.modalUploadFile}>
            {uploading && <Loading>Uploading ...</Loading>}
            {!uploading && statusUpload === 'none' && (
              <p>Click or drag file to this area to upload</p>
            )}
            {!uploading && statusUpload === 'done' && (
              <Fragment>
                <IoMdCloudDone color="green" size={60} />
                <p>Upload success, click outside to close pop-up!</p>
              </Fragment>
            )}
            {!uploading && statusUpload === 'error' && (
              <Fragment>
                <MdError color="red" size={60} />
                <p>Upload failed, check the file and try again!</p>
              </Fragment>
            )}
          </div>
        </Dragger>
      </Modal>
    </div>
  );
};

export default ImportUser;
