import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
    it('renders without crashing', () => {
        const { container } = render(<App />)
        expect(container).toBeTruthy()
    })

    it('renders main heading', () => {
        render(<App />)
        expect(screen.getByText(/AaireelXR/i)).toBeInTheDocument()
    })

    it('renders room options', () => {
        render(<App />)
        // Check for either "Create Room" heading or button text
        const createElements = screen.getAllByText(/create/i)
        expect(createElements.length).toBeGreaterThan(0)
    })
})
