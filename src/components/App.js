import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes'
import Fish from './Fish'


class App extends React.Component {
	constructor() {
		super();

		this.addFish = this.addFish.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);

		this.state = {
			fishes: {},
			order: {}
		};
	}

	addFish(fish) {
		//update state
		const fishes = {...this.state.fishes};
		const timestamp = Date.now();
		//add fish
		fishes[`fish-${timestamp}`] = fish;
		//set fishes state to new fishes in fishes variable
		this.setState({fishes: fishes});

	}

	updateFish(key, updatedFish) {
		const fishes = {...this.state.fishes};
		fishes[key] = updatedFish;
		this.setState({fishes});

	}

	removeFish(key) {
		const fishes = {...this.state.fishes};
		delete fishes[key];
		this.setState({fishes});
	}

	loadSamples() {
		this.setState({
			fishes: sampleFishes
		});
	}

	addToOrder(key) {
		const order= {...this.state.order};
		order[key] = order[key] + 1 || 1;
		this.setState({order});

	}

	removeFromOrder(key) {
		const order = {...this.state.order};
		delete order[key];
		this.setState({order});
	}

	render() {
		return (
			<div className='catch-of-the-day'>
				<div className='menu'>
					<Header tagline='Fresh Seafood Market'/>
					<ul className='list-of-fishes'>
						{Object
							.keys(this.state.fishes)
							.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
						}
					</ul>
				</div>
				<Order fishes={this.state.fishes} removeFromOrder={this.removeFromOrder} order={this.state.order}/>
				<Inventory 
				fishes={this.state.fishes} 
				updateFish={this.updateFish} 
				addFish={this.addFish} 
				removeFish={this.removeFish}
				loadSamples={this.loadSamples}/>
			</div>
		)
	}
}

export default App;