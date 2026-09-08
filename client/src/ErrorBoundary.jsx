import { Component } from 'react'
import { RefreshCw } from 'lucide-react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info?.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-white">
          <p className="font-bold text-2xl text-slate-900">Something went wrong</p>
          <p className="text-sm text-slate-500 mt-2 max-w-sm">
            This page hit an unexpected error. Reloading usually fixes it.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold px-6 py-3 transition-colors"
          >
            <RefreshCw size={16} /> Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
