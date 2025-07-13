import { Component } from 'react';
import { TermList } from './TermList';
import type { StateProps } from '../types/types';
export class Main extends Component<StateProps, { testError: boolean }> {
  constructor(props: StateProps) {
    super(props);
    this.state = { testError: false };
  }
  handleThrowError = () => {
    this.setState({ testError: true });
  };

  render() {
    const { error, items } = this.props;
    const { testError } = this.state;

    if (error || testError) {
      throw new Error('Failed to fetch data');
    }
    return (
      <main className="main">
        <div className="container">
          <h2 className="list-title">
            <span className="title">Item name</span>
            <span className="title">Item description</span>
          </h2>
          <TermList items={items} />
          <button className="btn error-btn" onClick={this.handleThrowError}>
            Throw an error
          </button>
        </div>
      </main>
    );
  }
}
