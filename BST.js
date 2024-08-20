class Node {
    constructor(d) {
        this.data = d;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(Arr) {
        this.root = this.buildTree(arr, 0, arr.length-1);
    }
    
    sortedArr(arr) {
        let sortedArr = [];

        while(arr.length > 0) {
            let smallest = arr[0]
            let smallestIndex = 0;

            for(let index = 1; index < arr.length; index++) {
                if(arr[index] < smallest) {
                    smallest = arr[index];
                    smallestIndex = index;
                }
            }
            // remove smallest element from original array 
            arr.splice(smallestIndex, 1);
            //push the smallest element to sorted arr 
            sortedArr.push(smallest)
        }
        return sortedArr;
    }

    // Remove Duplicates from array
    removeDuplicates(arr) {
        return Array.from(new Set(arr));
    }

    buildTree(arr, start, end) {
        // sort the array and remove duplicates
        let arrSorted = this.sortedArr(arr)
        let uniqueArr = this.removeDuplicates(arrSorted) //

        // Build the tree from the array using Node class 
        if(start > end){ //base case
            return null;
        }
        let mid = Math.floor((start + end)/2);
        let node = new Node(uniqueArr[mid])

        node.left = this.buildTree(uniqueArr, start, mid - 1)
        node.right = this.buildTree(uniqueArr,mid + 1, end)
        return node;
    }
}