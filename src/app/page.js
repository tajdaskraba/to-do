"use client";

import React, { useEffect, useState } from "react";
import { AbsoluteCenter } from "@chakra-ui/react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ToDoCard from "./components/ToDoCard";

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
  const [title, setTitle] = useState(() => 
    localStorage.getItem("todoTitle") || "New to-do list"
  );

  const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { todos: storedTodos },
  });

  const { fields, append, update, remove } = useFieldArray({
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

  useEffect(() => {
    localStorage.setItem("todoTitle", title);
  }, [title]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEditingTitle(false);
    }
  };

  return (
    <AbsoluteCenter>
      <ToDoCard
        isEditingTitle={isEditingTitle}
        title={title}
        handleTitleChange={handleTitleChange}
        handleBlur={handleTitleBlur}
        handleKeyDown={handleTitleKeyDown}
        fields={fields}
        form={form}
        update={update}
        append={append}
        remove={remove}
        setIsEditingTitle={setIsEditingTitle}
      />
    </AbsoluteCenter>
  );
}
