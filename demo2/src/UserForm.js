import React, { useState } from "react";
import compose from "recompose/compose";
import withState from "recompose/withState";


const styles = {
  field: {
    width: "300px"
  },
  label: {
    display: "inline-block",
    width: "100px",
    fontSize: 11
  }
};

const Field = ({ children }) => (
  <>
    {children}
    <br />
  </>
);

const Input = ({ value, onChange, ...props }) => (
  <input
    {...props}
    value={value}
    onChange={event => onChange(event.target.value)}
  />
);

const SubmitButton = props => <button {...props}>submit</button>;

const UserForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = value => {
    setEmail(value);
  };

  const handlePasswordChange = value => {
    setPassword(value);
  };

  const handleSubmit = () => {
    onSubmit(email, password);
  };

  return (
    <>
      <Field>
        <span style={styles.label}>Email:</span>
        <Input
          value={email}
          onChange={handleEmailChange}
          style={styles.field}
          type="email"
        />
      </Field>
      <Field>
        <span style={styles.label}>Password:</span>
        <Input
          value={password}
          onChange={handlePasswordChange}
          type="password"
          style={styles.field}
        />
      </Field>
      <SubmitButton onClick={handleSubmit} />
    </>
  );
};

const withUserFormState = compose(
  withState("email", "setEmail"),
  withState("password", "setPassword")
);

export default withUserFormState(UserForm);
