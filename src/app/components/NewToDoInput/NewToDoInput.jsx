"use client"

import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/ui/field";
import { Input, Flex, IconButton, Icon } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa6";
import "./NewToDoInput.css";

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
      <Flex align="center" className="todo-input-wrapper">
        <Checkbox checked={false} className="todo-checkbox" disabled>
          <Input
            placeholder="Enter new todo"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            onKeyUp={handleAddTodo}
            onBlur={() => !newTodoText.trim() && setIsAdding(false)}
            autoFocus
            className="todo-input"
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
      className="add-button"
    >
      <FaPlus size={14} />
    </IconButton>
  );
};

export default NewTodoInput;