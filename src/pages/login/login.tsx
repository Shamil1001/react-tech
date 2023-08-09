import { useState } from "react";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import "./styles.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
// import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  //   const navigate = useNavigate();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then(() => {
        console.log("logged");
        //   message.success("You have been successfully logged in.", 1, () => {
        // navigate("/week_table");
        //   });
      })
      .catch((error) => {
        console.log(error);
        //   setError("Email or password error");
      });
  };
  return (
    <>
      <div className="login_container">
        <Card w={500}>
          <CardHeader>
            <Heading size="lg">Login</Heading>
          </CardHeader>
          <CardBody className="cardbody">
            <Input
              placeholder="Email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
            <Button onClick={handleLogin} colorScheme="blue">
              Login
            </Button>

            <p>Don't have account</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
