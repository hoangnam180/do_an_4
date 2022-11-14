import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { signUpApi, loginApi } from "../../../libs/apis/auth";

import SignUpSuccess from "../SignUpSuccess";

import { actionLogin } from "../../../store/authSlice";

export default function SignUp({
  visible,
  onOk,
  onCancel,
  showSignup,
  setShowSignup,
  setVisible,
  showLogin,
  setShowLogin
}) {
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [checkPass, setCheckPass] = useState(false);

  const [form] = Form.useForm();

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSubmit = data => {
    if (data) {
      const info = {
        username: data?.username,
        password: data?.password,
        email: data?.email
      };
      signUpApi(info)
        .then(res => {
          setShowSignup(false);
          message.success("Congratulations! Your sign up was successful!");
          loginApi({ username: info?.username, password: info?.password }).then(
            res => {
              dispatch(
                actionLogin({
                  isAuth: true,
                  userInfo: res?.data?.data?.user,
                  token: res?.data?.data?.accessToken
                })
              );
            }
          );
          // setShowSuccess(true);
        })
        .catch(err => {
          message.error(
            `Error! An error occurred. ${err?.data?.errors[0]?.detail}`
          );
        });
    }
  };

  return (
    <>
      <Modal
        visible={showSignup}
        onCancel={onCancel}
        onOk={handleSubmit}
        width={582}
        footer={null}
        centered
      >
        <div className="login">
          <p>SIGN UP</p>
          <h3>Hello there, welcome to TopAz</h3>
          <div className="login__form">
            <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{
                remember: true
              }}
              onFinish={handleSubmit}
              autoComplete="off"
            >
              <Form.Item
                name="username"
                label="username"
                rules={[{ required: true, message: "Please input username" }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input email" },
                  { type: "email", message: "Please input valid email!" }
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                label="ConFirm Password"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!"
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          "Confirm Password do not match with password!"
                        )
                      );
                    }
                  })
                ]}
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item>
                <button id="login-btn">SIGN UP</button>
              </Form.Item>
            </Form>
            <div className="login__other">
              <div className="login__other__redirect">
                HAD AN ACCOUNT,{" "}
                <a onClick={handleShowLogin}>
                  <b>LOGIN HERE</b>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <SignUpSuccess
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
      />
    </>
  );
}
