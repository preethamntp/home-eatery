import React from "react";
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormInput,
  FormH1,
  FormLabel,
  // FormButton,
  Text
} from "./SigninElements";
import { BrowserRouter as Router } from "react-router-dom";

const SignIn = ({ history }) => {
  const submit = (e) => {
    history.push("/home");
  };

  const FormButton = {
    background: "#01bf71",
    padding: "16px 0",
    border: "none",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
    textAlign: "center"
  };

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Eatery</Icon>
          <FormContent>
            <Form action="#">
              <FormH1>Sign in to your account</FormH1>
              <FormLabel htmlFor="for">Email</FormLabel>
              <FormInput
                type="email"
                placeholder="Email"
                htmlFor="email"
                required
              />
              <FormLabel htmlFor="for">Password</FormLabel>
              <FormInput
                type="password"
                placeholder="Password"
                htmlFor="password"
                required
              />
              {/* <FormButton type="button" onClick={submit()}>
                Continue
              </FormButton> */}
              <botton  style={FormButton} onClick={submit} >Continue</botton>
              <Text>Forgot password</Text>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
