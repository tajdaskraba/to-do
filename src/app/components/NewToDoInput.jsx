"use client"

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input, Flex, IconButton, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";


const NewTodoInput = ({ append }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newTodoText, setNewTodoText] = useState("");

  const handleAddTodo = (e) => {
    if (e.key === "Enter" && newTodoText.trim()) {
      append({
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        isEditing: false,
      });
      setNewTodoText("");
      setIsAdding(false);
    }
  };

  return isAdding ? (
    <Field>
      <Flex align="center" style={{ width: "100%" }}>
        <Checkbox checked={false} style={{ marginRight: "8px" }} disabled>
          <Input
            placeholder="Enter new todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyUp={handleAddTodo}
            onBlur={() => !newTodoText.trim() && setIsAdding(false)}
            autoFocus
            style={{ height: "inherit", border: "none", padding: "0", outline: "none", width: "100%" }}
          />
        </Checkbox>
      </Flex>
    </Field>
  ) : (
    <IconButton
      aria-label="Add"
      size={20}
      color={"#fff"}
      background={"transparent"}
      onClick={() => setIsAdding(true)}
      style={{ padding: "4px", border: "1px solid white", borderRadius: "2px", width: "20px", height: "20px", float: "start" }}
    >
      <FaPlus size={14} />
    </IconButton>
  );
};

export default NewTodoInput;
