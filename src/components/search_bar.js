import React, { Component } from "react";

// function-based component (no states)
// const SearchBar = () => {
//     return <input />;
// };

// class-based component (only they have states)
class SearchBar extends Component {
    constructor(props) {
        super(props);

        // a state is a plain javascript object
        this.state = { term: "" };
    }

    // every class must have a render function
    render() {
        return (
            <div className="search-bar">
              <input
                value={this.state.term}
                onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }

    onInputChange(term) {
      this.setState({term});
      this.props.onSearchTermChange(term);
    }
}

export default SearchBar;
