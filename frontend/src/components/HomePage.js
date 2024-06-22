import React from 'react';

export default class HomePage extends React.Component{

    render(){
        return (
            <>
            <Title />
            <SearchTag />
            <SearchBar />
            <SearchButton />
            <br></br>
            <SearchResult />
            </>
        )
    }
}

const Title = () => {
    return (
        <div>
            <h1>Search for groups near by, </h1>
        </div>
    )
}

const SearchTag = (props) => {
    return (
        <h3>Search by name :</h3>
    )
}

const SearchBar = () => {
    return (
        <>
            <input id='query-search-bar' type='text' />
        </>
    )
}

const SearchButton = () => {
    const getCommunitysNearby = async () => {
        const e = document.getElementById("query-search-bar");
        const query = e.nodeValue;
        const q = {query: query};
        try{
        const res = await fetch ("localhost:8000/getCommunities", {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(q)
        });

          if (!res.ok){
                throw new Error("Failed to fetch data from server");
          }

          const data = await res.json();
          const d = document.getElementById("query-results");
          while (d.firstChild){
            d.removeChild(d.firstChild);
          }
          data.forEach(element => {
            const x = document.createElement("li");
            x.innerHTML = element.name;
            d.appendChild(x);
          });
        }catch(err){
            console.log(err)
        }

    }
    return (
        <>
            <button id='search-button' onClick={getCommunitysNearby}>Search</button>
        </>
    )
}

const SearchResult = () => {
    return (
        <div>
            <ul id='query-results'>

            </ul>
        </div>
    )
}