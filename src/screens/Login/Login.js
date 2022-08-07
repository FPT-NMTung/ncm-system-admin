import { Card } from '@nextui-org/react';
import { Input, Spacer, Button, Loading, Text } from '@nextui-org/react';
import { Fragment, useEffect } from 'react';
import FetchApi from '../../api/FetchApi';
import { useState, createRef } from 'react';
import { UserApis } from '../../api/ListApi';
import { useNavigate } from 'react-router-dom';
import { UserCodeError } from '../../api/CodeError';

import classes from './Login.module.css';

const Login = ({ title }) => {
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);

  const [status, setStatus] = useState(undefined);

  const refEmail = createRef();
  const refPassword = createRef();

  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    document.title = title;
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const valueRefEmail = refEmail.current.value.trim();
    const valueRefPassword = refPassword.current.value.trim();

    if (valueRefEmail === '' || valueRefPassword === '') {
      setValidEmail(valueRefEmail !== '');
      setValidPassword(valueRefPassword !== '');
      return;
    }

    setLoading(true);
    setStatus(undefined);

    const body = {
      email: valueRefEmail,
      password: valueRefPassword,
    };

    FetchApi(UserApis.login, body)
      .then((res) => {
        const payload = JSON.parse(atob(res.data.access_token.split('.')[1]));
        if (payload.uid !== 4) {
          setLoading(false);
          setStatus('You not have permission to access this page');
          return;
        }

        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        navigate('/');
      })
      .catch((err) => {
        setLoading(false);
        setStatus(UserCodeError[err.message]);
      });
  };

  return (
    <div className={classes.main}>
      <div className={classes.backgroundA} />
      <div className={classes.backgroundB} />
      <img
        src="https://ncmsystem.azurewebsites.net/Images/NCM-logo.png"
        alt='NCM'
        className={classes.logo}
      />
      <div className={classes.card}>
        <Card css={{ padding: '5px 10px' }}>
          <Card.Body>
            <div className={classes.cardBody}>
              <h3 className={classes.title}>Welcome Administrator</h3>
              <form onSubmit={handleSubmit}>
                <Input
                  ref={refEmail}
                  className={classes.input}
                  onChange={() => {
                    setValidEmail(true);
                  }}
                  label="Email"
                  status={validEmail ? 'default' : 'error'}
                  placeholder="example@domain.com"
                />
                <Spacer y={0.8} />
                <Input.Password
                  ref={refPassword}
                  className={classes.input}
                  onChange={() => {
                    setValidPassword(true);
                  }}
                  status={validPassword ? 'default' : 'error'}
                  label="Password"
                />
                {status && (
                  <Fragment>
                    <Spacer y={0.5} />
                    <Text
                      className={classes.errorMessage}
                      color="error"
                      size={11}
                    >
                      {status}
                    </Text>
                  </Fragment>
                )}
                <Spacer y={1} />
                <div className={classes.buttonContain}>
                  <Button
                    disabled={loading}
                    className={classes.button}
                    shadow
                    color="primary"
                    auto
                    type='submit'
                    onClick={handleSubmit}
                  >
                    {loading && <Loading color="currentColor" size="xs" />}
                    {!loading && 'Login'}
                  </Button>
                </div>
              </form>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
