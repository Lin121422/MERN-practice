import React from 'react'
import { render, screen } from '@testing-library/react'
import AddTodo from '../components/AddTodo'

// TODO: Add some simple test cases, e.g. checking components are rendered successfully
test('should show the field name and button', () => {
    render(<AddTodo saveTodo={() => { }} />)
    const nameText = screen.getByText("Name")  // field 輸入框
    expect(nameText).toBeInTheDocument()
    const nameInput = screen.getByLabelText("Name")
    expect(nameInput).toHaveAttribute("required")
  
    const descText = screen.getByText("Description")  // field 輸入框
    expect(descText).toBeInTheDocument()
    const descInput = screen.getByLabelText("Description")
    expect(descInput).toHaveAttribute("required")
  
    const addButton = screen.getByText("Add Todo")  // button 按鈕
    expect(addButton).toHaveAttribute("disabled")
  })
