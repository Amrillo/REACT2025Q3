import { Component } from 'react';
import searchIcon from '../../assets/search-icon.svg';
import closeIcon from '../../assets/icon-close.svg';

interface SearchStateProps {
  term: string;
  baseUrl: string;
  error: boolean;
  close: boolean;
}
type Props = {
  sendTerm: (data: string) => void;
};
export default class SearchPanel extends Component<Props> {
  state: SearchStateProps = {
    term: '',
    baseUrl: 'https://pokeapi.co/api/v2/pokemon',
    error: false,
    close: false,
  };
  componentDidMount() {
    const savedTerm = this.getSearchTerm();
    if (savedTerm) {
      this.setState({ term: savedTerm, close: true }, () => {});
    }
  }
  getSearchTerm(): string | null {
    return localStorage.getItem('searchTerm') || '';
  }
  handleSearchTerm = (): void => {
    if (this.validate(this.state.term)) {
      this.props.sendTerm(this.state.term);
      localStorage.setItem('searchTerm', this.state.term);
    } else {
      this.setState({ error: true });
    }
  };
  validate = (word: string): boolean => {
    const regEx = /^[a-z]+$/;
    return regEx.test(word);
  };
  handleChangeTerm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = e.target.value.trim();
    this.setState({
      term: e.target.value,
      close: inputValue !== '',
      error: false,
    });
  };
  clearInput = (): void => {
    this.setState({ term: '', close: false, error: false });
    this.props.sendTerm('');
    localStorage.removeItem('searchTerm');
  };
  render() {
    return (
      <>
        <div className="header-search">
          <input
            value={this.state.term}
            onChange={this.handleChangeTerm}
            className="search-input"
            type="text"
            placeholder="Search Pokemon by name"
          />

          <button
            type="button"
            className="btn search-btn"
            onClick={this.handleSearchTerm}
          >
            <img src={searchIcon} alt="search button" />
          </button>
          {this.state.close && (
            <button
              type="button"
              className="btn close-btn"
              onClick={this.clearInput}
            >
              <img src={closeIcon} alt="close icon" />
            </button>
          )}
        </div>
        {this.state.error && (
          <div className="show-error">
            No capital letters , characters and empty spaces are allowed
          </div>
        )}
      </>
    );
  }
}
