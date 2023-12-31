import { useState } from "react";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import "./styles.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

const tasks = [
  { id: "1", content: "Math" },
  { id: "2", content: "Chemistry" },
  { id: "3", content: "Biology" },
  { id: "4", content: "Physics" },
  { id: "5", content: "History" },
];

const taskStatus = {
  subjects: {
    name: "Subjects",
    items: tasks,
    index: 0,
  },
  mon: {
    name: "Monday",
    items: [],
    index: 1,
  },
  tue: {
    name: "Tue",
    items: [],
    index: 2,
  },
  wed: {
    name: "Wed",
    items: [],
    index: 3,
  },
  thu: {
    name: "Thu",
    items: [],
    index: 4,
  },
  fri: {
    name: "Fri",
    items: [],
    index: 5,
  },
  sat: {
    name: "Sat",
    items: [],
    index: 6,
  },
};

export default function Register() {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleRegister = () => {
    console.log("sh");
    createUserWithEmailAndPassword(
      auth,
      registerData.email,
      registerData.password
    )
      .then(() => {
        console.log("success");
        const newDb = {
          user: registerData.email,
          taskStatus: taskStatus,
        };
        //   message.success("You have been successfully registered.", 1, () => {
        const users = async () => {
          await addDoc(collection(db, "timeTable"), newDb);
          // window.location.replace("/home_page/Home");
        };
        users();
        navigate("/week_table", { replace: true });
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
            <Link to="/">
              <p>Already have account</p>
            </Link>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
