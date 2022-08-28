import classes from './RequestChangeOwnerContact.module.css';
import { Card, Text, Row, Button, Loading, Modal, Spacer } from '@nextui-org/react';
import { MdEmail } from 'react-icons/md';
import { BsTelephoneFill } from 'react-icons/bs';
import { TiLocation, TiTick, TiDelete } from 'react-icons/ti';
import { useEffect, useState } from 'react';
import FetchApi from '../../api/FetchApi';
import { ContactApis } from '../../api/ListApi';
import { useParams, useNavigate } from 'react-router-dom';
import { BiTransferAlt } from 'react-icons/bi';

const RequestChangeOwnerContact = ({ title }) => {
  const [data, setData] = useState(null);
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);
  const [openModalSuccess, setOpenModalSucess] = useState(false);
  const [openModalError, setOpenModalError] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [disabledButton, setDisabledButton] = useState(false);
  const [message, setMessage] = useState(undefined);
  const { id, code } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    FetchApi(ContactApis.requestChangeOwnerContact, undefined, undefined, [
      id,
      code,
    ])
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        switch (e.message) {
          case 'C0019':
            navigate('/404', { replace: true });
            break;
          default:
            setMessage(e.message);
            break;
        }
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setOpenModalSucess(false);
    }, 1500);
  }, [openModalSuccess]);

  useEffect(() => {
    setTimeout(() => {
      setOpenModalError(false);
    }, 1500);
  }, [openModalError]);

  const handlerAccept = () => {
    setLoadingReject(true);
    FetchApi(
      ContactApis.acceptRequestChangeOwnerContact,
      undefined,
      undefined,
      [id, code]
    )
      .then(() => {
        setOpenModalSucess(true);
        setModalContent('Accept success');
        setDisabledButton(true);
        setLoadingReject(false);
      })
      .catch(() => {
        setOpenModalError(true);
        setModalContent('Accept error');
        setLoadingReject(false);
      });
  };

  const handlerReject = () => {
    setLoadingReject(true);
    FetchApi(
      ContactApis.rejectRequestChangeOwnerContact,
      undefined,
      undefined,
      [id, code]
    )
      .then(() => {
        setOpenModalSucess(true);
        setModalContent('Reject success');
        setDisabledButton(true);
        setLoadingReject(false);
      })
      .catch(() => {
        setOpenModalError(true);
        setModalContent('Reject error');
        setLoadingReject(false);
      });
  };

  return (
    <div className={classes.main}>
      <Card css={{ mw: '500px', h: '270px', margin: '0 auto', padding: 30 }}>
        {!data && message === "R0001" && (
          <div className={classes.loadingCard}>
            <BiTransferAlt color='#cc3b0e' size={30}/>
            <Spacer y/>
            <Text color="#cc3b0e" size="16">
              Request has been rejected
            </Text>
          </div>
        )}
        {!data && message === "R0003" && (
          <div className={classes.loadingCard}>
            <BiTransferAlt color='#0ec914' size={30}/>
            <Spacer y/>
            <Text color="#0ec914" size="16">
              Request has been accepted
            </Text>
          </div>
        )}
        {!data && !message && (
          <div className={classes.loadingCard}>
            <Loading>Getting data ...</Loading>
          </div>
        )}
        {data && (
          <div className={classes.card}>
            <div>
              <p className={classes.name}>{data.contact.nameCt}</p>
              <p className={classes.jobTitle}>{data.contact.jobCt}</p>
              <p className={classes.company}>{data.contact.companyCt}</p>
            </div>
            <div>
              <div className={classes.line}>
                <MdEmail size={20} />
                <p>{data.contact.emailCt}</p>
              </div>
              <div className={classes.line}>
                <BsTelephoneFill size={20} />
                <p>{data.contact.phoneCt}</p>
              </div>
              <div className={classes.line}>
                <TiLocation size={20} />
                <p>{data.contact.addressCt}</p>
              </div>
            </div>
          </div>
        )}
      </Card>
      {data && (
        <Card css={{ mw: '500px', margin: '20px auto', padding: 30 }}>
          <h1 className={classes.title}>Confirm change owner contact</h1>
          <p className={classes.req}>
            Receiver: <span>{data.receiver}</span>
          </p>
          <p className={classes.req}>
            Requester: <span>{data.requester}</span>
          </p>
          <div className={classes.button}>
            <Button
              onClick={handlerAccept}
              disabled={loadingReject || loadingAccept || disabledButton}
              css={{ width: 100 }}
              color={'success'}
              auto
            >
              {!loadingAccept && 'Accept'}
              {loadingAccept && <Loading size="xs" />}
            </Button>
            <Button
              onClick={handlerReject}
              disabled={loadingReject || loadingAccept || disabledButton}
              css={{ width: 100 }}
              color={'error'}
              auto
            >
              {!loadingReject && 'Reject'}
              {loadingReject && <Loading size="xs" />}
            </Button>
          </div>
        </Card>
      )}
      <Modal
        aria-labelledby="modal-title"
        width={300}
        open={openModalSuccess}
        onClose={() => setOpenModalSucess(false)}
        css={{ padding: '20px' }}
      >
        <Modal.Header>
          <div className={classes.warningHeader}>
            <TiTick size={30} color={'#17c964'} />
            <p>{modalContent}</p>
          </div>
        </Modal.Header>
      </Modal>

      <Modal
        aria-labelledby="modal-title"
        width={300}
        open={openModalError}
        onClose={() => setOpenModalError(false)}
        css={{ padding: '20px' }}
      >
        <Modal.Header>
          <div className={classes.warningHeader}>
            <TiDelete size={30} color={'#f31260'} />
            <p>{modalContent}</p>
          </div>
        </Modal.Header>
      </Modal>
    </div>
  );
};

export default RequestChangeOwnerContact;
