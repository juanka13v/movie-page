import React from "react";
import Card from "../components/card/Card";

const API = "http://www.omdbapi.com/?i=tt3896198&apikey=760d76ae";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      search: "",
      error: "",
      loading: true
    };
  }

  async componentDidMount() {
    //const res = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
    const res = await fetch(`${API}&s=batman`);
    const resJSON = await res.json();

    this.setState({ data: resJSON.Search, loading: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.search) {
      return this.setState({ error: "Plese write a  valid text" });
    }

    const res = await fetch(`${API}&s=${this.state.search}`);
    const data = await res.json();

    if (!data.Search) {
      return this.setState({ error: "There are no results" });
    }

    this.setState({ data: data.Search, error: '', search: '' });
  }

  render() {

    const {data,loading} = this.state;

    if(loading){
      return <h3 className="text-light">Loading</h3>
    }

    return (
      <>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => this.setState({ search: e.target.value })}
                value={this.state.search}
                autoFocus
              />
            </form>
            <p className="text-white">
              {this.state.error ? this.state.error : ""}
            </p>
          </div>
        </div>
        <div className="row">
          {data.map((movie, i) => {
            return <Card movie={movie} key={i} />;
          })}
        </div>
      </>
    );
  }
}

export default List;
