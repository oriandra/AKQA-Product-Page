import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class App extends Component {

	state = {
		data: [],
		filterDataBySize: []
	}

	componentDidMount() {
		// fetch data from local JSON
		axios.get(`${process.env.PUBLIC_URL}/data/products.json`).then(res => this.setState({ data: res.data, filterDataBySize: res.data }))
	}

	handleFilterBySize = (e) => {
		// filter JSON data be size
		const filterBy = e.target.value;
			if (filterBy === 'ALL') {
				this.setState({ filterDataBySize: this.state.data })
			} else {
				const findSize = this.state.data.filter(x => (x.size.includes(filterBy)))
				this.setState({ filterDataBySize: findSize })
			}
	}

	render() {

		return (
			<div className="App">
				<header className="App-header">
					<h2>Womans Top</h2>
					<select required onChange={this.handleFilterBySize}>
						<option value="" selected disabled>filter by size</option>
						<option value="XS" >XS</option>
						<option value="S">S</option>
						<option value="L">L</option>
						<option value="XL">XL</option>
						<option value="ALL">All</option>
					</select>
				</header>
				<ul className="App-intro">
					{this.state.filterDataBySize && this.state.filterDataBySize.map((x,i)=> (
						<li key={i}>
							<img src={`/static/${x.productImage}`} />
							<div>
							{x.isSale && <span className="badge -sale">Sale</span>}
							{x.isExclusive && <span className="badge -exclusive">Exclusive</span>}
							<p>{x.productName} <span>{x.price}</span></p>
							</div>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default App;
