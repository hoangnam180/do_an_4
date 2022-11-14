import { useState } from "react";
import { Modal, Form, Input, message } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch } from "react-redux";

import { actionAuthentication } from "../../../store/authSlice";
import { updateInfoApi } from "../../../libs/apis/auth";

export default function SignUpSuccess({ setShowSuccess, showSuccess }) {
  const dispatch = useDispatch();

  const handleSubmit = values => {
    updateInfoApi(values)
      .then(() => {
        setShowSuccess(false);
      })
      .catch(() => {
        message.error("Error! An error occurred. Please try again!");
      });
  };

  return (
    <>
      <Modal visible={showSuccess} width={582} footer={null} centered>
        <div className="login">
          <p>SIGN UP SUCCESSFULLY!</p>
          <h6>Please update your personal information!</h6>
          <br />
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true
            }}
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="fullName"
              label="Fullname"
              rules={[{ required: true, message: "Please input fullName" }]}
            >
              <Input placeholder="Fullname..." />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please input phone" }]}
            >
              <Input placeholder="Phone number..." />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: "Please input address" }]}
            >
              <Input type="text" placeholder="Address..." />
            </Form.Item>
            <Form.Item>
              <div className="center-form">
                <button onClick={handleSubmit}>Update</button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
}
