"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  AbsoluteCenter,
  Text,
  Box,
  Stack,
  Input
} from "@chakra-ui/react";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ToDoItem from "./components/ToDoItem";
import NewTodoInput from "./components/NewToDoInput";

const formSchema = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      completed: z.boolean(),
      isEditing: z.boolean(),
    })
  ),
});

export default function Home() {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState("New to-do list");

  const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { todos: storedTodos },
  });

  const { fields, append, update } = useFieldArray({
    control: form.control,
    name: "todos",
  });

  const watchedTodos = useWatch({
    control: form.control,
    name: "todos",
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(watchedTodos));
  }, [watchedTodos]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleBlur = () => setIsEditingTitle(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    }
  };

  return (
    <AbsoluteCenter>
      <Box>
        <Card.Root width="420px" variant="outline" style={{ padding: "8px" }}>
          <Card.Body gap={2}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                verticalAlign: "middle",
                height: "48px"
              }}
            >
              {isEditingTitle ? (
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  autoFocus
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  fontSize="xl"
                  mt={2}
                  style={{ height: "inherit", border: "none", outline: "none", padding: "0", paddingBottom: "19px", margin: "0", fontWeight: "500" }}
                />
              ) : (
                <Text
                  fontSize="xl"
                  mt={2}
                  style={{ height: "inherit", border: "none", outline: "none", padding: "0", margin: "0", cursor: "pointer", fontWeight: "500" }}
                  onClick={() => setIsEditingTitle(true)}
                >
                  {title}
                </Text>
              )}
            </span>
            <form onSubmit={form.handleSubmit(console.log)}>
              <Stack align="flex-start" spacing={3}>
                {fields.map((field, index) => (
                  <ToDoItem
                    key={field.id}
                    field={field}
                    index={index}
                    form={form}
                    update={update}
                  />
                ))}
                <NewTodoInput append={append} />
              </Stack>
            </form>
          </Card.Body>
        </Card.Root>
      </Box>
    </AbsoluteCenter>
  );
}
