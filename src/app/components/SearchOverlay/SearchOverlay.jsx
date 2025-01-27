"use client"

import React, { useState, useEffect } from 'react';
import { 
  Input,
  Box,
  Flex,
  Portal,
  IconButton,
  Text,
  Badge
} from '@chakra-ui/react';
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import './SearchOverlay.css';

const SearchOverlay = ({ isOpen, onClose, todoLists, setCurrentTodoList }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      return;
    }

    const searchResults = [];
    todoLists.forEach((list, listIndex) => {
      list.todos.forEach((todo, todoIndex) => {
        if (todo.text.toLowerCase().includes(searchTerm.toLowerCase())) {
          searchResults.push({
            listIndex,
            todoIndex,
            text: todo.text,
            listTitle: list.title
          });
        }
      });
    });
    setResults(searchResults);
    setSelectedIndex(0);
  }, [searchTerm, todoLists]);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      const result = results[selectedIndex];
      setCurrentTodoList(result.listIndex);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Portal className="dark">
      <Box className="search-overlay" onClick={onClose}>
        <Box className="search-container" onClick={e => e.stopPropagation()}>
          <Flex gap={2} mb={4}>
            <Box className="search-input-wrapper">
              <Input
                className="search-input"
                placeholder="Search todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus
              />
              <IoIosSearch size={"22px"} className="search-icon" />
            </Box>
            <IconButton
              onClick={onClose}
              variant="outline"
              aria-label="Close search"
              className="close-button"
            >
              <IoMdClose/>
            </IconButton>
          </Flex>
          
          {results.length > 0 && (
            <Box className="results-container">
              {results.map((result, index) => (
                <Box
                  key={`${result.listIndex}-${result.todoIndex}`}
                  className={`result-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => {
                    setCurrentTodoList(result.listIndex);
                    onClose();
                  }}
                >
                  <Text className="result-text">{result.text}</Text>
                  <Badge className="result-badge" variant="outline">
                    {result.listTitle || "New To-Do List"}
                  </Badge>
                </Box>
              ))}
            </Box>
          )}

          {searchTerm && results.length === 0 && (
            <Text className="no-results">No results found</Text>
          )}

          {results.length > 0 && (
            <Box className="keyboard-help">
              <Text className="keyboard-help-text">
                Use <Badge className="keyboard-badge" variant="outline">↑</Badge>{' '}
                <Badge className="keyboard-badge" variant="outline">↓</Badge>{' '}
                to navigate and{' '}
                <Badge className="keyboard-badge" variant="outline">Enter</Badge>{' '}
                to select
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Portal>
  );
};

export default SearchOverlay;