import { Component } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { fetchAllData, fetchData } from './api/fetchApi';
import { ErrorBoundary } from './components/Error-boundary';
import type { StateProps } from './types/types';

export class App extends Component {
  state: StateProps = {
    term: '',
    items: [],
    error: false,
    loading: false,
  };

  receiveIdTerm = (term: string) => {
    this.setState({ term });
  };
  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const data = await fetchAllData();
      this.setState({ items: data || [], loading: false });
    } catch (e) {
      this.setState({ error: true, loading: false });
      console.error('componentDidMount: Error', e);
    }
  }
  async componentDidUpdate(_: unknown, prevState: StateProps) {
    //
    console.log(this.state.term);
    if (prevState.term !== this.state.term) {
      try {
        this.setState({ loading: true, error: false });
        if (this.state.term === '') {
          // Fetch all data when term is empty
          const data = await fetchAllData();
          this.setState({ items: data || [], loading: false });
        } else {
          // Fetch specific data for non-empty term
          const data = await fetchData(this.state.term);
          if (data?.name) {
            this.setState({ items: [data], loading: false });
          } else {
            throw new Error('Invalid data received');
          }
        }
      } catch (error) {
        this.setState({ error: true, loading: false });
        console.error('componentDidUpdate: Error', error);
      }
    }
  }

  render() {
    return (
      <>
        <Header sendTerm={this.receiveIdTerm} />
        <ErrorBoundary
          key={`${this.state.term}-${this.state.items.length}`}
          fallback={
            <div className="error-message">❌ Failed to fetch data</div>
          }
        >
          {this.state.loading ? (
            <div className="spinner"></div>
          ) : (
            <Main {...this.state} />
          )}
        </ErrorBoundary>
      </>
    );
  }
}
