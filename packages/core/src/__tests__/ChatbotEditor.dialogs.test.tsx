import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatbotEditor from '../components/chatbot-editor'

describe('ChatbotEditor - Dialog Operations', () => {
  test('can add a new node through dialog', async () => {
    const user = userEvent.setup()
    render(<ChatbotEditor />)
    
    // Click Add Node button
    const addButton = screen.getByText('Add Node')
    await user.click(addButton)
    
    // Wait for dialog to appear
    await waitFor(() => {
        expect(screen.getByText('Add New Node')).toBeInTheDocument()
    })
    
    // Use the exact placeholder text from the dialog
    const titleInput = screen.getByPlaceholderText('Enter text to display in chat')
    await user.type(titleInput, 'New Test Node')
    
    // Click Add button
    const submitButton = screen.getByRole('button', { name: 'Add' })
    await user.click(submitButton)
    
    // Confirm new node was added
    await waitFor(() => {
        expect(screen.getByText('New Test Node')).toBeInTheDocument()
    })
    })

  test('can cancel node creation', async () => {
    const user = userEvent.setup()
    render(<ChatbotEditor />)
    
    // Click Add Node button
    const addButton = screen.getByText('Add Node')
    await user.click(addButton)
    
    // Click Cancel button
    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)
    
    // Confirm dialog is closed
    await waitFor(() => {
      expect(screen.queryByText('Add New Node')).not.toBeInTheDocument()
    })
  })

  test('opens Export dialog when Export button is clicked', async () => {
    const user = userEvent.setup()
    render(<ChatbotEditor />)
    
    const exportButton = screen.getByText('Export')
    await user.click(exportButton)
    
    // Confirm Export dialog is open
    expect(screen.getByText('Export JSON')).toBeInTheDocument()
    expect(screen.getByText('Download')).toBeInTheDocument()
  })

  test('opens Import dialog when Import button is clicked', async () => {
    const user = userEvent.setup()
    render(<ChatbotEditor />)
    
    const importButton = screen.getByText('Import')
    await user.click(importButton)
    
    // Confirm Import dialog is open
    expect(screen.getByText('Import JSON')).toBeInTheDocument()
    expect(screen.getByText('Select a JSON file')).toBeInTheDocument()
  })
})
