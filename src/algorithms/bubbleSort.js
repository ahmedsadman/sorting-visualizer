const getBubbleSortAnimations = (arr) => {
	const animations = [];
	const auxArray = arr.slice(); // create deep copy
	bubbleSortHelper(auxArray, animations);
	return animations;
};

const bubbleSortHelper = (auxArray, animations) => {
	let swapped;
	let counter = auxArray.length - 1;

	do {
		swapped = false;
		for (let i = 0; i < auxArray.length - 1; i++) {
			if (i < counter) animations.push([i, i + 1, 1]); // push to color change

			if (auxArray[i] > auxArray[i + 1]) {
				swapped = true;
				const temp = auxArray[i];
				auxArray[i] = auxArray[i + 1];
				auxArray[i + 1] = temp;
				animations.push([i, auxArray[i], i + 1, auxArray[i + 1]]); // push index and height
			} else {
				animations.push([]); // [] means no swap
			}

			if (i < counter) animations.push([i, i + 1, 0]); // push to restore color
		}

		counter--;
	} while (swapped);
};

export const bubbleSort = (
	array,
	bins,
	PRIMARY_COLOR,
	SECONDARY_COLOR,
	ANIMATION_SPEED_MS
) => {
	const animations = getBubbleSortAnimations(array);
	for (let i = 0; i < animations.length; i++) {
		const isColorChange = animations[i].length === 3;
		if (isColorChange) {
			const color =
				animations[i][2] === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
			const [barOneIdx, barTwoIdx] = animations[i];
			const barOneStyle = bins[barOneIdx].style;
			const barTwoStyle = bins[barTwoIdx].style;
			setTimeout(() => {
				barOneStyle.backgroundColor = color;
				barTwoStyle.backgroundColor = color;
			}, i * ANIMATION_SPEED_MS);
		} else {
			if (animations[i].length === 0) continue;

			setTimeout(() => {
				const [
					barOneIdx,
					barOneHeight,
					barTwoIdx,
					barTwoHeight,
				] = animations[i];
				const barOneStyle = bins[barOneIdx].style;
				const barTwoStyle = bins[barTwoIdx].style;
				barOneStyle.height = `${barOneHeight}px`;
				barTwoStyle.height = `${barTwoHeight}px`;
			}, i * ANIMATION_SPEED_MS);
		}
	}
};
