import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, message } from 'antd';
import { useRouter } from 'next/router';

import { loginApi } from '../../../libs/apis/auth';

import SignUp from '../SignUp';
import Forgot from '../Forgot';

import { actionAuthentication, actionLogin } from '../../../store/authSlice';

import { protectPages } from 'src/utils/protectPages';

export default function Login({ visible, onCancel }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuth, isHandle, redirect } = useSelector(
    (state) => state.authReducer
  );

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleLogin = (values) => {
    loginApi(values)
      .then((respon) => {
        dispatch(actionAuthentication({ isHandle: null }));

        dispatch(
          actionLogin({
            isAuth: true,
            userInfo: respon?.data?.data?.user,
            token: respon?.data?.data?.accessToken,
          })
        );

        setShowLogin(false);
        if (redirect) {
          router.push(redirect);
        }
      })
      .catch((err) => {
        message.error('The usename or password you entered is incorrect');
      });
  };

  const handleCancel = () => {
    if (protectPages?.includes(router.pathname)) {
      setShowLogin(false);
      router.push('/');
    } else {
      setShowLogin(false);
    }
    dispatch(actionAuthentication({ isHandle: null }));
  };

  const handleShowSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  useEffect(() => {
    if (!isAuth && isHandle === 'login') {
      setShowLogin(true);
    }
  }, [isAuth, isHandle]);

  return (
    <>
      <Modal
        visible={showLogin}
        onOk={() => setShowLogin(false)}
        onCancel={handleCancel}
        width={582}
        footer={null}
        centered
        wrapClassName="login-form-responsive"
      >
        <div className="login">
          <p>login</p>
          <h3>Hello there, welcome back !</h3>
          <div className="login__form">
            <Form
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true,
              }}
              onFinish={handleLogin}
              autoComplete="off"
            >
              <Form.Item
                label="username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input username',
                  },
                ]}
              >
                <Input placeholder="Your Name..." />
              </Form.Item>
              <Form.Item
                label="PASSWORD"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Please input password',
                  },
                ]}
              >
                <Input type="password" placeholder="Password..." />
              </Form.Item>
              <div
                className="login__form--forgot"
                onClick={() => {
                  setShowForgot(true);
                  setShowLogin(false);
                }}
              >
                Forgot password
              </div>
              <Form.Item>
                <button id="login-btn">LOGIN</button>
              </Form.Item>
            </Form>
          </div>
          <div className="login__other">
            <div className="login__other__redirect">
              DON’T HAVE AN ACCOUNT,{' '}
              <a onClick={handleShowSignup}>
                <b>SIGN UP HERE</b>
              </a>
            </div>
          </div>
        </div>
      </Modal>

      <SignUp
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        onCancel={() => setShowSignup(false)}
      />
      <Forgot
        visible={showForgot}
        onCancel={() => setShowForgot(!showForgot)}
        setShowLogin={setShowLogin}
      />
    </>
  );
}
