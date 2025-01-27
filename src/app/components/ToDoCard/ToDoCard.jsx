"use client"

import React from "react";
import { Card, Text, Box, Stack, Input } from "@chakra-ui/react";
import ToDoItem from "../ToDoItem/ToDoItem";
import NewTodoInput from "../NewToDoInput/NewToDoInput";
import "./ToDoCard.css";

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
  return (
    <Box>
      <Card.Root variant="outline" className="todo-card">
        <Card.Body gap={2}>
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
              />
            ) : (
              <Text
                fontSize="xl"
                mt={2}
                className="title-text"
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
                  remove={remove}
                />
              ))}
              <NewTodoInput append={append} />
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default ToDoCard;