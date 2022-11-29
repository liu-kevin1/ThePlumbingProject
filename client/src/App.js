import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { Component, useCallback, useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';


function App() {
  const {user, isAuthenticated} = useAuth0();
  console.log(isAuthenticated)
  const [alumniID, setAlumniID] = useState(-1);
  const [firstName, setFirstName] = useState("Kevin");
  const [lastName, setLastName] = useState("Liu");
  const [graduationYear, setGraduationYear] = useState("2023");
  const [emailAddress, setEmailAddress] = useState("kevliu@bergen.org");
  const [academyID, setAcademyID] = useState(1);
  

  const getPackedData = () =>{
    return {
      alumniID: alumniID,
      firstName: firstName,
      lastName: lastName,
      graduationYear: graduationYear,
      emailAddress: emailAddress,
      academyID: academyID
    }
  }

//  submitReadRequest = useCallback(async () => {
//     const data = this.getPackedData();
//     console.log(data);
//     const res = await axios.post("http://localhost:5000/getSQLData", data);
//     console.log(res);
//   }, []);
  const submitReadRequest = () => {
    const data = this.getPackedData();
    console.log(data);
    axios.post("http://localhost:5000/getSQLData", data).then(res => console.log(res));
  };

  // submitUpdateRequest = useCallback(async () => {
  //   const data = this.getPackedData();
  //   console.log(data);
  //   const res = await axios.post("http://localhost:5000/updateSQLData", data);
  //   console.log(res);
  // }, []);

  const submitUpdateRequest = () => {
    const data = this.getPackedData();
    console.log(data);
    axios.post("http://localhost:5000/updateSQLData", data).then(res => console.log(res));
  }

  // submitCreateRequest = useCallback(async () => {
  //   const data = this.getPackedData();
  //   console.log(data);
  //   const res = await axios.post("http://localhost:5000/createSQLData", data);
  //   console.log(res);
  // }, []);

  const submitCreateRequest = () =>{
    const data = this.getPackedData();
    console.log(data);
    axios.post("http://localhost:5000/createSQLData", data).then(res => console.log(res));
  };

  // // formGridAlumniID
  // // formGridFirstName
  // // formGridLastName
  // // formGridGraduationYear
  // // formGridEmailAddress
  // // formGridAcademyID

  // // output:
  // // exampleForm.ControlTextArea1

  const handleAlumniIDChange = e => {
    setAlumniID(e.target.value);
  }

  const handleFirstNameChange = e => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  }

  const handleGraduationYearChange = e => {
    setGraduationYear(e.target.value);
  }

  const handleEmailAddressChange = e => {
    setEmailAddress(e.target.value);
  }

  const handleAcademyIDChange = e => {
    setAcademyID(e.target.value);
  }

    return (
    <div className="App">
      {!isAuthenticated ? 
      (<LoginButton />):
      (
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          {this.state.message}
        </p>  */}

        <Form.Group className="mb-3" controlId="formGridAlumniID">
          <Form.Label value={alumniID} onChange={handleAlumniIDChange}>Alumni ID: </Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridFirstName">
          <Form.Label value={firstName} onChange={handleFirstNameChange}>First Name: </Form.Label>
          <Form.Control placeholder="Kevin" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridLastName">
          <Form.Label value={lastName} onChange={handleLastNameChange}>Last Name: </Form.Label>
          <Form.Control placeholder="Liu" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridGraduationYear">
          <Form.Label value={graduationYear} onChange={handleGraduationYearChange}>Graduation Year: </Form.Label>
          <Form.Control placeholder="2023" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridEmailAddress">
          <Form.Label value={emailAddress} onChange={handleEmailAddressChange}>Email Address: </Form.Label>
          <Form.Control placeholder="example@gmail.com" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAcademyID">
          <Form.Label value={academyID} onChange={handleAcademyIDChange}>Academy ID: </Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextArea1">
          <Form.Label>Output:</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>

        <Button variant="read" type="submit" onClick={submitReadRequest}>Read</Button>{' '}
        <Button variant="update" type="submit" onClick={submitUpdateRequest}>Update</Button>{' '}
        <Button variant="create" type="submit" onClick={submitCreateRequest}>Create</Button>{' '}
      </header>)}

    </div>
  );
}

export default App;
