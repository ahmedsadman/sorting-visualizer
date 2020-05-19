import React from 'react';
import { mergeSort, bubbleSort } from '../algorithms';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 3;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'teal';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'white';

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
		// console.log(bubbleSort(arr));
		this.setState({ array: arr });
	};

	initMergeSort = async () => {
		const [timers, sortedArr] = mergeSort(
			this.state.array,
			document.getElementsByClassName('bin'),
			PRIMARY_COLOR,
			SECONDARY_COLOR,
			ANIMATION_SPEED_MS
		);

		await Promise.all(timers);
		this.setState({ array: sortedArr });
	};

	initBubbleSort = async () => {
		const [timers, sortedArr] = bubbleSort(
			this.state.array,
			document.getElementsByClassName('bin'),
			PRIMARY_COLOR,
			SECONDARY_COLOR,
			ANIMATION_SPEED_MS
		);

		await Promise.all(timers);
		this.setState({ array: sortedArr });
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
					<button onClick={this.initMergeSort}>Merge Sort</button>
					<button onClick={this.initBubbleSort}>Bubble Sort</button>
				</div>
			</div>
		);
	}
}

export default SortingVisualizer;
