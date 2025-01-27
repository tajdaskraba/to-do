"use client";

import { Flex, Text, Input, Icon } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { FiTrash2 } from "react-icons/fi";

const ToDoItem = ({ field, index, form, update, remove }) => {
  const handleBlur = (e) => {
    update(index, { ...field, text: e.target.value.trim(), isEditing: false });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    remove(index);
  };

  return (
    <Controller
      control={form.control}
      name={`todos.${index}.completed`}
      render={({ field: { value, onChange } }) => (
        <Field>
          <Flex align="center" wrap="wrap" width="100%">
            <Checkbox
              checked={value}
              onCheckedChange={({ checked }) => onChange(checked)}
            >
              {field.isEditing ? (
                <Input
                  defaultValue={field.text}
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleBlur(e)}
                  onBlur={handleBlur}
                  style={{
                    height: "inherit",
                    border: "none",
                    padding: "0",
                    outline: "none",
                    width: "100%",
                    minWidth: 0,
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                />
              ) : (
                <Flex 
                  position="relative" 
                  width="100%" 
                  align="center"
                  _hover={{
                    "& > .delete-icon": {
                      opacity: 1,
                      visibility: "visible"
                    }
                  }}
                >
                  <Text
                    textDecoration={value ? "line-through" : "none"}
                    userSelect="none"
                    onClick={() => update(index, { ...field, isEditing: true })}
                    transition="all 0.2s"
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      width: "100%",
                    }}
                  >
                    {field.text}
                  </Text>
                  <Icon
                    as={FiTrash2}
                    className="delete-icon"
                    ml={2}
                    cursor="pointer"
                    opacity={0}
                    visibility="hidden"
                    transition="all 0.2s"
                    color="red.600"
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