import { Component } from 'react';
import SearchPanel from './ui/Search';

type Props = {
  sendTerm: (data: string) => void;
};

export class Header extends Component<Props> {
  handleTerm = (data: string): void => {
    this.props.sendTerm(data);
  };
  render() {
    return (
      <header className="header">
        <div className="container">
          <h1 className="header-title">Find the pokemons you want</h1>
          <SearchPanel sendTerm={this.handleTerm} />
        </div>
      </header>
    );
  }
}
