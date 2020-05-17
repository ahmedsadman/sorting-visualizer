import React from 'react';

class SortingVisualizer extends React.Component {
	state = {
		array: [],
	};

	componentDidMount() {
		this.constructArray();
	}

	getRandomInt = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	constructArray = () => {
		const arr = [];
		for (let i = 0; i < 100; i++) {
			arr.push(this.getRandomInt(10, 300));
		}
		this.setState({ array: arr });
	};

	render() {
		const { array } = this.state;
		return (
			<div className='container'>
				<div className='bins'>
					{array.map((num, index) => (
						<div
							className='bin'
							key={index}
							style={{ height: `${num}px` }}
						/>
					))}
				</div>
				<div className='panel'>
					<button onClick={this.constructArray}>
						Generate New Array
					</button>
				</div>
			</div>
		);
	}
}

export default SortingVisualizer;
