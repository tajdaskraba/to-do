"use client"

import React from "react";
import { Card, Text, Box } from "@chakra-ui/react"
import { Checkbox } from "@/components/ui/checkbox";
import { Stack } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field } from "@/components/ui/field"
import { Controller, useController, useForm } from "react-hook-form"
import { z } from "zod"
import './globals.css'

const formSchema = z.object({
  enabled: z.boolean(),
})

export default function Home() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { enabled: false },
  })

  const enabled = useController({
    control: form.control,
    name: "enabled",
  })

  const invalid = !!form.formState.errors.enabled

  return (
    <div className="center-content">
    <Box className="center-content">
      <Card.Root width="320px" variant="outline">
        <Card.Body gap={2}>
          <Text fontSize="xl" mt={2}>New to-do list</Text>
          <form onSubmit={form.handleSubmit((data) => console.log(data))}>
            <Stack align="flex-start">
              <Controller
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <Field
                    disabled={field.disabled}
                    invalid={invalid}
                    errorText={form.formState.errors.enabled?.message}
                  >
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                    >
                      <Text 
                        textDecoration={field.value ? 'line-through' : 'none'}
                        color={field.value ? 'gray.500' : 'inherit'}
                        userSelect="none"
                      >
                        This is my first task
                      </Text>
                    </Checkbox>
                  </Field>
                )}
              />
            </Stack>
          </form>
        </Card.Body>
      </Card.Root>
    </Box>
    </div>
  );
}
