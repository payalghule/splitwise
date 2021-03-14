import React, { Component } from 'react';
class AutoSuggestTextBox extends Component {
  constructor(props) {
    super(props);
    this.items = [
      'Payal',
      'Madhuri',
      'shantanu',
      'manav',
      'manu',
      'Pranav',
      'prachi',
    ];
    this.state = {
      suggestions: [],
      text: '',
    };
  }
  onTextChange = (e) => {
    const { items } = this.props;
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  renderSuggestion() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((item) => (
          <li onClick={() => this.suggestionSelected(item)}>{item}</li>
        ))}
      </ul>
    );
  }

  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }
  render() {
    const { text } = this.state;
    return (
      <div className="form-group">
        <div className="autoCompleteText">
          <input
            value={text}
            type="text"
            onChange={this.onTextChange}
            className="input-sm"
            size="1"
          />
          {this.renderSuggestion()}
        </div>
      </div>
    );
  }
}

export default AutoSuggestTextBox;
