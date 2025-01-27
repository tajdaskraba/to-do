"use client"

import React, { useEffect, useState } from "react";
import { Card, Text, Box, Stack, Input } from "@chakra-ui/react";
import ToDoItem from "../ToDoItem/ToDoItem";
import NewTodoInput from "../NewToDoInput/NewToDoInput";
import "./ToDoCard.css";

const calculateLines = (text) => {
  const charsPerLine = 40;
  const lines = Math.ceil(text.length / charsPerLine);
  return Math.max(1, lines);
};

const MAX_TOTAL_LINES = 11;

const ToDoCard = ({
  isEditingTitle,
  title,
  handleTitleChange,
  handleBlur,
  handleKeyDown,
  fields,
  form,
  update,
  append,
  setIsEditingTitle,
  remove
}) => {
  const [totalLines, setTotalLines] = useState(0);

  useEffect(() => {
    const newTotalLines = fields.reduce((acc, field) => {
      return acc + calculateLines(field.text);
    }, 0);
    setTotalLines(newTotalLines);
  }, [fields]);

  const handleAppend = (newTodo) => {
    const newTodoLines = calculateLines(newTodo.text);
    if (totalLines + newTodoLines <= MAX_TOTAL_LINES) {
      append(newTodo);
    }
  };

  return (
    <Box>
      <Card.Root variant="outline" className="todo-card">
        <Card.Body className="card-body">
          <span className="title-container">
            {isEditingTitle ? (
              <Input
                value={title}
                onChange={handleTitleChange}
                autoFocus
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                fontSize="xl"
                mt={2}
                className="title-input"
                placeholder="new to-do list"
              />
            ) : (
              <Text
                fontSize="xl"
                mt={2}
                className={`title-text ${!title && "title-placeholder"}`}
                onClick={() => setIsEditingTitle(true)}
              >
                {title || "new to-do list"}
              </Text>
            )}
          </span>
          <form onSubmit={form.handleSubmit(console.log)}>
            <Stack className="todo-items-container" spacing={2}>
              {fields.map((field, index) => (
                <ToDoItem
                  key={field.id}
                  field={field}
                  index={index}
                  form={form}
                  update={update}
                  remove={remove}
                />
              ))}
              <NewTodoInput 
                append={handleAppend}
                isDisabled={totalLines >= MAX_TOTAL_LINES}
                remainingLines={MAX_TOTAL_LINES - totalLines}
              />
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default ToDoCard;