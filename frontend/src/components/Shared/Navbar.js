import React from 'react'
import ThemeToggle from '../../utils/ThemeToggle'

function Navbar() {
  return (
    <nav style={{
      backgroundColor: 'var(--bg-color)',
      padding: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ color: 'var(--text-color)' }}>Your Logo</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar