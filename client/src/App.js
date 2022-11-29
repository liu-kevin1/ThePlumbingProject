import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { Component, useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';


function App() {
  const { user, isLoading, isAuthenticated } = useAuth0();
  // console.log(isLoading)
  // console.log(isAuthenticated)
  const [alumniID, setAlumniID] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [graduationYear, setGraduationYear] = useState();
  const [emailAddress, setEmailAddress] = useState();
  const [academyID, setAcademyID] = useState();
  const [output, setOutput] = useState()
  // axios.get("http://localhost:5000/hello").then(res => console.log(res))

  const componentDidMount = () => {
  }

  const getPackedData = () => {
    return {
      alumniID: alumniID,
      firstName: firstName,
      lastName: lastName,
      graduationYear: graduationYear,
      emailAddress: emailAddress,
      academyID: academyID
    }
  }

  const submitReadRequest = () => {
    const data = getPackedData();
    axios.get("http://localhost:5000/getSQLData", data).then(res => {
      console.log(res.data[0])
      setOutput(JSON.stringify(res.data[0]))
    }).catch((err) => {
      if (err.response) {
        console.log(err.response)
      }
    }
    );
  };

  // submitUpdateRequest = useCallback(async () = > {
  //   const data = this.getPackedData();
  //   console.log(data);
  //   const res = await axios.post("http://localhost:5000/updateSQLData", data);
  //   console.log(res);
  // }, []);

  const submitUpdateRequest = () => {
    const data = getPackedData();
    axios.get("http://localhost:5000/updateSQLData", data).then(res => {
      console.log(res.data[0])
      setOutput(JSON.stringify(res.data[0]))
    }).catch((err) => {
      if (err.response) {
        console.log(err.response)
      }
    }
    );
  }

  const submitCreateRequest = () => {
    const data = getPackedData();
    axios.get("http://localhost:5000/createSQLData", data).then(res => {
      console.log(res.data[0])
      setOutput(JSON.stringify(res.data[0]))
    }).catch((err) => {
      if (err.response) {
        console.log(err.response)
      }
    }
    );
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
        (<div>
          <LoginButton />
        </div>
        ) :
        (
          <header className="App-header">
            {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          {this.state.message}
        </p>  */}
            <p> Hello {user.name}!</p>
            <LogoutButton />
            <Form.Group className="mb-3" controlId="formGridAlumniID">
              <Form.Label>Alumni ID: </Form.Label>
              <Form.Control onChange={handleAlumniIDChange} value={alumniID} placeholder="1" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridFirstName">
              <Form.Label>First Name: </Form.Label>
              <Form.Control value={firstName} onChange={handleFirstNameChange} placeholder="Kevin" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridLastName">
              <Form.Label>Last Name: </Form.Label>
              <Form.Control value={lastName} onChange={handleLastNameChange} placeholder="Liu" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridGraduationYear">
              <Form.Label>Graduation Year: </Form.Label>
              <Form.Control value={graduationYear} onChange={handleGraduationYearChange} placeholder="2023" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridEmailAddress">
              <Form.Label>Email Address: </Form.Label>
              <Form.Control value={emailAddress} onChange={handleEmailAddressChange} placeholder="example@gmail.com" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAcademyID">
              <Form.Label >Academy ID: </Form.Label>
              <Form.Control value={academyID} onChange={handleAcademyIDChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextArea1">
              <Form.Label>Output:</Form.Label>
              <Form.Control value={output} as="textarea" rows={3} disabled />
            </Form.Group>

            <Button variant="read" type="submit" onClick={submitReadRequest}>Read</Button>{' '}
            <Button variant="update" type="submit" onClick={submitUpdateRequest}>Update</Button>{' '}
            <Button variant="create" type="submit" onClick={submitCreateRequest}>Create</Button>{' '}
          </header>)}

    </div>
  );
}

export default App;
