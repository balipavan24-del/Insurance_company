import { Component } from 'react';
import './ErrorBoundary.css';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.assign(import.meta.env.BASE_URL || '/');
  };

  render() {
    if (this.state.hasError) {
      const message = this.state.error?.message || 'Something went wrong.';
      return (
        <div className="error-boundary-root" role="alert">
          <div className="error-boundary-card">
            <h1>We hit a snag</h1>
            <p>
              InsureEase had a problem loading this screen. Your data may be safe — try
              reloading or return home.
            </p>
            <div className="error-boundary-actions">
              <button type="button" onClick={this.handleReload}>
                Reload page
              </button>
              <button type="button" onClick={this.handleGoHome}>
                Go to home
              </button>
            </div>
            {import.meta.env.DEV && (
              <pre className="error-boundary-detail">{message}</pre>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
