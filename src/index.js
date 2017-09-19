// lodash import
import _ from "lodash";
import React, { Component } from "react";
// used for rendering to the DOM
import ReactDOM from "react-dom";
// we are providing a file reference here
import SearchBar from "./components/search_bar";
import YTSearch from "youtube-api-search";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";

const API_KEY = "AIzaSyAseqqEhizsmN8jX8mNsAqeZ1fGLj3NKk8";

// Create a new component. This component should produce
// some HTML (=> is ES6 syntax, and no function keyword)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
          videos: [] ,
          selectedVideo: null
        };

        this.videoSearch("surfboards");
    }

    videoSearch(term) {
      YTSearch({key: API_KEY, term: term}, (videos) => {
          this.setState({
            videos: videos,
            selectedVideo: videos[0]
          });
      });
    }

    render() {
      //returns a new function which can be called every 300 milliseconds
      const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

      return (
        <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo}/>
            <VideoList
              onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
              videos={this.state.videos} />
        </div>
      );
    }
}

// Take this component's HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector(".container"));
