"use client"

import React from "react";
import { Card, Text, Box, Stack, Input } from "@chakra-ui/react";
import ToDoItem from "./ToDoItem";
import NewTodoInput from "./NewToDoInput";

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