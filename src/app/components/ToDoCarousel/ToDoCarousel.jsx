import React, { useState, useEffect } from 'react';
import { Box, AbsoluteCenter } from '@chakra-ui/react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import ToDoCard from '../ToDoCard/ToDoCard';
import './ToDoCarousel.css';
import SearchOverlay from '../SearchOverlay/SearchOverlay';

const formSchema = z.object({
  todos: z.array(
    z.object({
      id: z.string(),
      text: z.string(),
      completed: z.boolean(),
      isEditing: z.boolean(),
    })
  ),
});

const defaultTodoLists = [
  { id: '1', title: 'to-do app', todos: [] },
  { id: '2', title: 'trgovina', todos: [] },
  { id: '3', title: 'trening', todos: [] },
  { id: '4', title: 'ostalo', todos: [] },
  { id: '5', title: 'učenje', todos: [] }
];

const TodoCarousel = () => {
  const [isClient, setIsClient] = useState(false);
  const [todoLists, setTodoLists] = useState(defaultTodoLists);
  const [currentTodoList, setCurrentTodoList] = useState(0);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // separate form controls for each todo list
  const forms = todoLists.map((_, index) => 
    useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        todos: []
      }
    })
  );

  // separate field arrays for each todo list
  const fieldArrays = forms.map(form => 
    useFieldArray({
      control: form.control,
      name: 'todos'
    })
  );

  useEffect(() => {
    setIsClient(true);
    const savedData = localStorage.getItem('todoLists');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTodoLists(parsed);
      // init each form with its corresponding todos
      parsed.forEach((list, index) => {
        forms[index].reset({ todos: list.todos });
      });
    }
  }, []);

  const saveToLocalStorage = (newTodoLists) => {
    if (isClient) {
      localStorage.setItem('todoLists', JSON.stringify(newTodoLists));
    }
  };

  const handleTitleChange = (e) => {
    const newTodoLists = [...todoLists];
    newTodoLists[currentTodoList].title = e.target.value;
    setTodoLists(newTodoLists);
    saveToLocalStorage(newTodoLists);
  };

  const handleAppend = (index) => (newTodo) => {
    fieldArrays[index].append(newTodo);
    const newTodoLists = [...todoLists];
    newTodoLists[index].todos = [...newTodoLists[index].todos, newTodo];
    setTodoLists(newTodoLists);
    saveToLocalStorage(newTodoLists);
  };
  
  const handleUpdate = (index) => (todoIndex, updatedTodo) => {
    fieldArrays[index].update(todoIndex, updatedTodo);
    const newTodoLists = [...todoLists];
    newTodoLists[index].todos = newTodoLists[index].todos.map(
      (todo, i) => i === todoIndex ? updatedTodo : todo
    );
    setTodoLists(newTodoLists);
    saveToLocalStorage(newTodoLists);
  };
  
  const handleRemove = (index) => (todoIndex) => {
    fieldArrays[index].remove(todoIndex);
    const newTodoLists = [...todoLists];
    newTodoLists[index].todos = newTodoLists[index].todos.filter(
      (_, i) => i !== todoIndex
    );
    setTodoLists(newTodoLists);
    saveToLocalStorage(newTodoLists);
  };

  if (!isClient) {
    return null;
  }

  return (
    <AbsoluteCenter>
      <div className="container">
        {todoLists.map((_, index) => (
          <input
            key={index}
            type="radio"
            name="slider"
            id={`s${index + 1}`}
            checked={currentTodoList === index}
            onChange={() => setCurrentTodoList(index)}
          />
        ))}

        <div className="cards">
          {todoLists.map((todoList, index) => (
            <label key={todoList.id} htmlFor={`s${index + 1}`} id={`slide${index + 1}`}>
              <Box>
                <ToDoCard
                  isEditingTitle={isEditingTitle && currentTodoList === index}
                  title={todoList.title}
                  handleTitleChange={handleTitleChange}
                  handleBlur={() => setIsEditingTitle(false)}
                  handleKeyDown={(e) => {
                    if (e.key === 'Enter') setIsEditingTitle(false);
                  }}
                  fields={fieldArrays[index].fields}
                  form={forms[index]}
                  update={handleUpdate(index)}
                  append={handleAppend(index)}
                  remove={handleRemove(index)}
                  setIsEditingTitle={setIsEditingTitle}
                />
              </Box>
            </label>
          ))}
        </div>
      </div>

      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        todoLists={todoLists}
        setCurrentTodoList={setCurrentTodoList}
      />
    </AbsoluteCenter>
  );
};

export default TodoCarousel;