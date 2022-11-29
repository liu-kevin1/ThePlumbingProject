import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends Component {
  constructor() {
    super();
    this.state = { message: "Default message" }
  }

  componentDidMount = () => {
    axios.get("http://localhost:5000/hello").then(response => {
      console.log(response.data);
      this.setState({ message: response.data })
    })
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
            <Form.Label>Alumni ID: </Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridFirstName">
            <Form.Label>First Name: </Form.Label>
            <Form.Control placeholder="Kevin" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridLastName">
            <Form.Label>Last Name: </Form.Label>
            <Form.Control placeholder="Liu" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridGraduationYear">
            <Form.Label>Graduation Year: </Form.Label>
            <Form.Control placeholder="2023" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridEmailAddress">
            <Form.Label>Email Address: </Form.Label>
            <Form.Control placeholder="example@gmail.com" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAcademyID">
            <Form.Label>Academy ID: </Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Output:</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>

          <Button variant="read" type="input">Read</Button>{' '}
          <Button variant="update" type="submit">Update</Button>{' '}
          <Button variant="create" type="submit">Create</Button>{' '}
        </header>

      </div>
    );
  }
}

export default App;
