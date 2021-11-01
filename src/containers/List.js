import React from "react";
import Card from "../components/card/Card";

const API = "http://www.omdbapi.com/?i=tt3896198&apikey=760d76ae";

class List extends React.Component {

    constructor() {
        super();
        this.state = {
            data:[]
        }
    }


    async componentDidMount() {
        //const res = await fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20");
        const res = await fetch(`${API}&s=batman`)
        const resJSON = await res.json();

        this.setState({data:resJSON.Search});
    }

    render() {
        return (
            <div className="row">
            {
                this.state.data.map(pe => {
                    return <Card movie={pe}/>
                })
            }
            </div>
        )
    }

}

export default List;
