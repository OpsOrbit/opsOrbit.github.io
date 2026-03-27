import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            minHeight: '100dvh',
            padding: '2rem',
            fontFamily: 'system-ui, sans-serif',
            background: '#f8fafc',
            color: '#0f172a',
          }}
        >
          <h1 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Something went wrong</h1>
          <p style={{ color: '#64748b', marginBottom: '1rem' }}>
            The app hit a runtime error. Check the browser console for details.
          </p>
          <pre
            style={{
              padding: '1rem',
              background: '#fff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              overflow: 'auto',
              fontSize: '13px',
            }}
          >
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
