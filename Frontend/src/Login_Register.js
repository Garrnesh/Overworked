import { useState } from "react";

import { useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import logo from './logo.png';
import Button from 'react-bootstrap/Button';
import HomePage from "./Homepage";
import Navibar from "./Navbar";
const Login = () => {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false)
    );
    const users = [{ username: "Jane", password: "testpassword" }];
    const handleSubmit = (e) => {
        e.preventDefault();
        const account = users.find((user) => user.username === username);
        if (account && account.password === password) {
            localStorage.setItem("authenticated", true);
        }
    };
    return (
        <div>
            <div class="text-center my-5">
                <Image src={logo} className="img-responsive" height="72" />
            </div>

            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Username: </Form.Label>
                            <Form.Control
                                placeholder="Enter your username"
                                type="text"
                                name="Username"
                                value={username}
                                onChange={(e) => setusername(e.target.value)}
                                style = {{width : "35%"}}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password: </Form.Label>
                            <Form.Control
                                placeholder="Enter your password"
                                type="password"
                                name="Password"
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                style = {{width : "35%"}}
                                
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" >Submit</Button>    
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;