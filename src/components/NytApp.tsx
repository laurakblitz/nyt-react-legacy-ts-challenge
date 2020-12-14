import React, { Component } from 'react';
import NytResults from './NytResults';

type FetchResults = {
    searchTerm: string,
    startDate: string,
    endDate: string,
    pageNumber: number,
    results: any,
};

const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'yIdj1gXha2P6SmdHWQTsysyWkiELKrGT';

class DisplayResults extends Component<{}, FetchResults> {
    constructor(props: any) {
        super(props)
        this.state = {
            searchTerm: '',
            startDate: '',
            endDate: '',
            pageNumber: 0,
            results: [], 
        };
    }

    fetchResults = () => {
        let url = `${baseURL}?api-key=${key}&page=${this.state.pageNumber}&q=${this.state.searchTerm}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    results: data.response.docs
                })
            })
    }

    handleSubmit = (event: any) => {
        this.setState({
            pageNumber: 0,
        })
        this.fetchResults();
        event.preventDefault();
    };

    changePageNumber = (event: any, direction: string) => {
        event.preventDefault();
        if (direction === 'down') {
            if (Number(this.state.pageNumber > 0)) {
                this.setState({
                    pageNumber: this.state.pageNumber -1,
                })
                this.fetchResults();
            }
        }
        if (direction === 'up') {
            this.setState({
                pageNumber: this.state.pageNumber +1,
            })
            this.fetchResults();
        }
    }

    render() {
        return (
        <div className="main">
        <div className="mainDiv">
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <span>Enter a single search term(required) : </span>
                <input type ="text" name ="search" onChange ={(e) => this.setState({searchTerm: e.target.value})} required />
                <br/>
                <span>Enter a start date:</span>
                <input type ="date" name ="startDate" pattern ="[0-9]{8}" onChange={(e) => this.setState({startDate: e.target.value})} />
                <br/>
                <span>Enter an end date:</span>
                <input type ="date" name ="endDate" pattern ="[0-9]{8}" onChange={(e) => this.setState({endDate: e.target.value})} />
                <br/>
                <button className="submit" >Submit search</button>
                </form>
                {
                this.state.results.length > 0 ? <NytResults results={this.state.results} changePage={this.changePageNumber} /> : null
                }
        </div>
        </div>
        );
    }
}

export default DisplayResults;