// Main code collected from https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial/blob/master/src/SortingVisualizer/SortingVisualizer.jsx

function getMergeSortAnimations(array) {
	const animations = [];
	if (array.length <= 1) return array;
	const auxiliaryArray = array.slice(); // create a deep copy
	mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
	return animations;
}

export function mergeSort(
	array,
	bins,
	PRIMARY_COLOR,
	SECONDARY_COLOR,
	ANIMATION_SPEED_MS
) {
	const animations = getMergeSortAnimations(array);
	for (let i = 0; i < animations.length; i++) {
		const arrayBars = bins;
		const isColorChange = i % 3 !== 2;
		if (isColorChange) {
			const [barOneIdx, barTwoIdx] = animations[i];
			const barOneStyle = arrayBars[barOneIdx].style;
			const barTwoStyle = arrayBars[barTwoIdx].style;
			const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
			setTimeout(() => {
				barOneStyle.backgroundColor = color;
				barTwoStyle.backgroundColor = color;
			}, i * ANIMATION_SPEED_MS);
		} else {
			setTimeout(() => {
				const [barOneIdx, newHeight] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				barOneStyle.height = `${newHeight}px`;
			}, i * ANIMATION_SPEED_MS);
		}
	}
}

function mergeSortHelper(
	mainArray,
	startIdx,
	endIdx,
	auxiliaryArray,
	animations
) {
	if (startIdx === endIdx) return;
	const middleIdx = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
	mergeSortHelper(
		auxiliaryArray,
		middleIdx + 1,
		endIdx,
		mainArray,
		animations
	);
	doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function concatRemaining(idxStart, idxEnd, k, animations, mainArray, auxArray) {
	while (idxStart <= idxEnd) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([idxStart, idxStart]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([idxStart, idxStart]);
		// We overwrite the value at index k in the original array with the
		// value at index i in the auxiliary array.
		animations.push([k, auxArray[idxStart]]);
		mainArray[k++] = auxArray[idxStart++];
	}
	return k;
}

function doMerge(
	mainArray,
	startIdx,
	middleIdx,
	endIdx,
	auxiliaryArray,
	animations
) {
	let k = startIdx;
	let i = startIdx;
	let j = middleIdx + 1;

	while (i <= middleIdx && j <= endIdx) {
		// These are the values that we're comparing; we push them once
		// to change their color.
		animations.push([i, j]);
		// These are the values that we're comparing; we push them a second
		// time to revert their color.
		animations.push([i, j]);
		if (auxiliaryArray[i] <= auxiliaryArray[j]) {
			// We overwrite the value at index k in the original array with the
			// value at index i in the auxiliary array.
			animations.push([k, auxiliaryArray[i]]);
			mainArray[k++] = auxiliaryArray[i++];
		} else {
			// We overwrite the value at index k in the original array with the
			// value at index j in the auxiliary array.
			animations.push([k, auxiliaryArray[j]]);
			mainArray[k++] = auxiliaryArray[j++];
		}
	}

	k = concatRemaining(i, middleIdx, k, animations, mainArray, auxiliaryArray);
	concatRemaining(j, endIdx, k, animations, mainArray, auxiliaryArray);
}
