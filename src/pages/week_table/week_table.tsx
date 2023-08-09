/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth, db } from "@/firebase";
import { Button } from "@chakra-ui/react";
import { onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  },
  mon: {
    name: "Monday",
    items: [],
  },
  tue: {
    name: "Tue",
    items: [],
  },
  wed: {
    name: "Wed",
    items: [],
  },
  thu: {
    name: "Thu",
    items: [],
  },
  fri: {
    name: "Fri",
    items: [],
  },
  sat: {
    name: "Sat",
    items: [],
  },
};

const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

interface IUser {
  email: string;
  password: string;
  uid: string;
}

function WeekTable() {
  const [columns, setColumns] = useState(taskStatus);
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      setUser(user);
      console.log(user.email);
    });
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "timeTable"),
      (snapshot: any) => {
        const fetchedtable = snapshot.docs
          .map((doc: any) => doc.data())
          .filter((doc: any) => {
            return doc.user === auth.currentUser?.email;
          });
        // setColumns(fetchedtable[0].taskStatus);
        console.log(fetchedtable[0].taskStatus);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [db]);

  const handleSave = () => {
    // await updateDoc(doc(db, "users", `${docId}`), {
    //     posts: updatedPosts,
    //   });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>{user && user.email}</h1>
        {/* <Button onClick={() =>}>Log out</Button> */}
      </div>
      <div style={{ display: "flex", justifyContent: "left", height: "100%" }}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 6 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 150,
                            minHeight: 500,
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}

export default WeekTable;
