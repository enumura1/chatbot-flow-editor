import { render, screen } from '@testing-library/react'
import ChatbotEditor from '../components/chatbot-editor'

describe('ChatbotEditor - Basic Functionality', () => {
  test('renders without crashing', () => {
    render(<ChatbotEditor />)
    expect(screen.getByText('Workflow Editor')).toBeInTheDocument()
  })

  test('shows Add Node button', () => {
    render(<ChatbotEditor />)
    expect(screen.getByText('Add Node')).toBeInTheDocument()
  })

  test('shows Export and Import buttons', () => {
    render(<ChatbotEditor />)
    expect(screen.getByText('Export')).toBeInTheDocument()
    expect(screen.getByText('Import')).toBeInTheDocument()
  })

  test('displays initial flow', () => {
    render(<ChatbotEditor />)
    expect(screen.getByText('Welcome to the chatflow')).toBeInTheDocument()
  })

  test('shows node editor with initial node', () => {
    render(<ChatbotEditor />)
    
    expect(screen.getByText('Node 1 Edit')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Welcome to the chatflow')).toBeInTheDocument()
  })

  test('shows Add an option button and existing options', () => {
    render(<ChatbotEditor />)
    
    expect(screen.getByText('Add an option')).toBeInTheDocument()
    
    // Check existence of Edit/Delete buttons (multiple elements)
    const editButtons = screen.getAllByText('Edit')
    const deleteButtons = screen.getAllByText('Delete')
    expect(editButtons.length).toBeGreaterThan(0)
    expect(deleteButtons.length).toBeGreaterThan(0)
  })
})
