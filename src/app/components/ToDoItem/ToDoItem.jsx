"use client"

import React from 'react';
import { Flex, Text, Input, Icon } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { FiTrash2 } from "react-icons/fi";
import "./ToDoItem.css";

const ToDoItem = ({ field, index, form, update, remove }) => {
  const handleBlur = (e) => {
    const trimmedValue = e.target.value.trim();
    if (trimmedValue === '') {
      remove(index);
    } else {
      update(index, { ...field, text: trimmedValue, isEditing: false });
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    remove(index);
  };

  const handleCheckChange = (checked) => {
    update(index, { ...field, completed: checked });
  };

  return (
    <Controller
      control={form.control}
      name={`todos.${index}.completed`}
      defaultValue={field.completed}
      render={({ field: { value } }) => (
        <Field>
          <Flex className="todo-item-wrapper">
            <Checkbox
              checked={value}
              onCheckedChange={({ checked }) => handleCheckChange(checked)}
            >
              {field.isEditing ? (
                <Input
                  defaultValue={field.text}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleBlur(e)}
                  onBlur={handleBlur}
                  className="todo-input"
                />
              ) : (
                <Flex className="todo-text-container">
                  <Text
                    textDecoration={value ? "line-through" : "none"}
                    onClick={() => update(index, { ...field, isEditing: true })}
                    className="todo-text"
                  >
                    {field.text}
                  </Text>
                  <Icon
                    as={FiTrash2}
                    className="delete-icon"
                    onClick={handleDelete}
                  />
                </Flex>
              )}
            </Checkbox>
          </Flex>
        </Field>
      )}
    />
  );
};

export default ToDoItem;