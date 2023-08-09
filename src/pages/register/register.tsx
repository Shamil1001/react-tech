import { useState } from "react";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import "./styles.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
// import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  //   const navigate = useNavigate();

  const handleRegister = () => {
    console.log("sh");
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then(() => {
        console.log("success");
        //   message.success("You have been successfully registered.", 1, () => {
        // navigate("/week_table");
        //   });
      })
      .catch(() => {
        console.log("User is already have");
        // setUserError("User is already registered");
      });
  };

  return (
    <>
      <div className="register_container">
        <Card w={500}>
          <CardHeader>
            <Heading size="lg">Register</Heading>
          </CardHeader>
          <CardBody className="cardbody-register">
            <Input
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  email: e.target.value,
                })
              }
            />
            <Input
              placeholder="Password"
              type="password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  password: e.target.value,
                })
              }
            />
            <Button onClick={handleRegister} colorScheme="blue">
              Submit
            </Button>
            <p>Already have account</p>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
