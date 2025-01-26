"use client";

import { Flex, Text, Input } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

const ToDoItem = ({ field, index, form, update }) => {
  const handleBlur = (e) => {
    update(index, { ...field, text: e.target.value.trim(), isEditing: false });
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
                <Text
                  textDecoration={value ? "line-through" : "none"}
                  userSelect="none"
                  onClick={() => update(index, { ...field, isEditing: true })}
                  style={{
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                    width: "100%",
                  }}
                >
                  {field.text}
                </Text>
              )}
            </Checkbox>
          </Flex>
        </Field>
      )}
    />
  );
};

export default ToDoItem;
