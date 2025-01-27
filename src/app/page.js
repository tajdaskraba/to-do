"use client";

import { Theme } from '@chakra-ui/react';
import ToDoCarousel from './components/ToDoCarousel/ToDoCarousel.jsx';

export default function Home() {
  return <Theme appearance="dark">
    <ToDoCarousel />
  </Theme>;
}