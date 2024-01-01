// Сортировка пузырьком
function bubbleSort(arr) {
    let start = performance.now();
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    let end = performance.now();
    console.log(`Bubble sort time: ${end - start} ms`);
    return arr;
}

// Сортировка выбором
function selectionSort(arr) {
    let start = performance.now();
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let minIdx = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[minIdx] > arr[j]) {
                minIdx = j;
            }
        }
        let tmp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = tmp;
    }
    let end = performance.now();
    console.log(`Selection sort time: ${end - start} ms`);
    return arr;
}

// Сортировка вставками
function insertionSort(arr) {
    let start = performance.now();
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    let end = performance.now();
    console.log(`Incertion sort time: ${end - start} ms`);
    return arr;
}

// Быстрая сортировка 

function quickSort(arr) {
    let start = performance.now();

    let sortedArr = actualQuickSort(arr);

    let end = performance.now();

    console.log(`Quick sort time: ${end - start} ms`);

    return sortedArr;
}

function actualQuickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    let pivotIndex = Math.floor(arr.length / 2);
    let pivot = arr.splice(pivotIndex, 1)[0];
    let left = [];
    let right = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);

        }
    }

    left = actualQuickSort(left);
    right = actualQuickSort(right);

    let sortedArr = left.concat([pivot], right);

    return sortedArr;
}


// Генерация массива
function generateArray(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

module.exports = { bubbleSort, selectionSort, insertionSort, quickSort, generateArray }
