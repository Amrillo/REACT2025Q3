import { Component } from 'react';
import type { TermListType } from '../../types/types';

export class TermItem extends Component<TermListType> {
  render() {
    const { name, url } = this.props;
    return (
      <li className="term-item">
        <span className="term-item__name">{name}</span>
        <span className="term-item__desc">{url}</span>
      </li>
    );
  }
}
