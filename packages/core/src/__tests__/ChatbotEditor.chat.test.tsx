import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ChatbotEditor from '../components/chatbot-editor'

describe('ChatbotEditor - Chat Functionality', () => {
  test('shows Start Chat button in preview initially', () => {
    render(<ChatbotEditor />)
    
    expect(screen.getByText('Chat Preview')).toBeInTheDocument()
    expect(screen.getByText('Start Chat')).toBeInTheDocument()
    expect(screen.getByText('Click the `Start Chat` button to begin testing your chatbot.')).toBeInTheDocument()
  })

  test('starts chat when Start Chat button is clicked', async () => {
    const user = userEvent.setup()
    render(<ChatbotEditor />)
    
    const startChatButton = screen.getByText('Start Chat')
    await user.click(startChatButton)
    
    // Start Chat button changes to Reset button
    expect(screen.getByText('Reset')).toBeInTheDocument()
    
    // Start Chat button disappears
    expect(screen.queryByText('Start Chat')).not.toBeInTheDocument()
    
    // Multiple elements exist, get all and confirm
    const welcomeElements = screen.getAllByText('Welcome to the chatflow')
    expect(welcomeElements.length).toEqual(2) // Exactly 2 elements should exist
  })
})
