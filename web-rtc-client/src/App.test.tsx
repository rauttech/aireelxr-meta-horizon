import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
    it('renders AaireelXR branding', () => {
        render(<App />)
        expect(screen.getByText('AaireelXR Video Presence')).toBeInTheDocument()
    })

    it('renders room creation option', () => {
        render(<App />)
        expect(screen.getByText('Create Room')).toBeInTheDocument()
    })

    it('renders room join option', () => {
        render(<App />)
        expect(screen.getByText('Join Room')).toBeInTheDocument()
    })
})
