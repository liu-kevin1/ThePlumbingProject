import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { Component, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends Component {
  constructor() {
    super();
    this.state = { message: "Default message" }
  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/hello").then(response => {
      console.log("Test: " + response.data);
      this.setState({ message: response.data });
    })
  }

  getPackedData = () => {
    return {
      alumniID: this.state.alumniID,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      graduationYear: this.state.graduationYear,
      emailAddress: this.state.emailAddress,
      academyID: this.state.academyID
    }
  }

  submitReadRequest = useCallback(async () => {
    const data = this.getPackedData();
    console.log(data);
    const res = await axios.post("http://localhost:5000/getSQLData", data);
    console.log(res);
  }, []);

  submitUpdateRequest = useCallback(async () => {
    const data = this.getPackedData();
    console.log(data);
    const res = await axios.post("http://localhost:5000/updateSQLData", data);
    console.log(res);
  }, []);

  submitCreateRequest = useCallback(async () => {
    const data = this.getPackedData();
    console.log(data);
    const res = await axios.post("http://localhost:5000/createSQLData", data);
    console.log(res);
  }, []);

  // formGridAlumniID
  // formGridFirstName
  // formGridLastName
  // formGridGraduationYear
  // formGridEmailAddress
  // formGridAcademyID

  // output:
  // exampleForm.ControlTextArea1

  handleAlumniIDChange(e) {
    this.setState({ alumniID: e.target.value });
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleGraduationYearChange(e) {
    this.setState({ graduationYear: e.target.value });
  }

  handleEmailAddressChange(e) {
    this.setState({ emailAddress: e.target.value });
  }

  handleAcademyIDChange(e) {
    this.setState({ academyID: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" />
          <p>
            {this.state.message}
          </p>  */}

          <Form.Group className="mb-3" controlId="formGridAlumniID">
            <Form.Label value={this.state.alumniID} onChange={this.handleAlumniIDChange}>Alumni ID: </Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridFirstName">
            <Form.Label value={this.state.firstName} onChange={this.handleFirstNameChange}>First Name: </Form.Label>
            <Form.Control placeholder="Kevin" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridLastName">
            <Form.Label value={this.state.lastName} onChange={this.handleLastNameChange}>Last Name: </Form.Label>
            <Form.Control placeholder="Liu" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridGraduationYear">
            <Form.Label value={this.state.graduationYear} onChange={this.handleGraduationYearChange}>Graduation Year: </Form.Label>
            <Form.Control placeholder="2023" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridEmailAddress">
            <Form.Label value={this.state.emailAddress} onChange={this.handleEmailAddressChange}>Email Address: </Form.Label>
            <Form.Control placeholder="example@gmail.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAcademyID">
            <Form.Label value={this.state.academyID} onChange={this.handleAcademyIDChange}>Academy ID: </Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextArea1">
            <Form.Label>Output:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button variant="read" type="submit" onClick={this.submitReadRequest}>Read</Button>{' '}
          <Button variant="update" type="submit" onClick={this.submitUpdateRequest}>Update</Button>{' '}
          <Button variant="create" type="submit" onClick={this.submitCreateRequest}>Create</Button>{' '}
        </header>

      </div>
    );
  }
}

export default App;
