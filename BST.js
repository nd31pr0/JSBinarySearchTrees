class Node {
    constructor(d) {
        this.data = d;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(arr) {
        // sort and remove duplicates from array
        const uniqueSortedArray = this.removeDuplicates(this.sortedArr(arr));
        console.log(uniqueSortedArray);
        this.root = this.buildTree(uniqueSortedArray, 0, uniqueSortedArray.length-1);
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
        // Build the tree from the array using Node class 
        if(start > end){ //base case
            return null;
        }
        let mid = Math.floor((start + end)/2);
        let node = new Node(arr[mid])

        node.left = this.buildTree(arr, start, mid - 1)
        node.right = this.buildTree(arr, mid + 1, end)
        return node;
    }

    insert(value) {
        this.root = this._insertRec(this.root, value); // Update root after insertion
    }

    _insertRec(node, value) {
        // Base case: if the current node is null, create a new node
        if (node === null) {
            return new Node(value);
        }

        // Recursively find the correct position to insert the new value
        if (value < node.data) {
            node.left = this._insertRec(node.left, value);
        } else if (value > node.data) {
            node.right = this._insertRec(node.right, value);
        }
        // If the value already exists, do nothing (no duplicates)
        return node;
    }

    
}

// Pretty print function for the binary tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

// Example Usage
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
tree.insert(10)
// Print the tree structure
prettyPrint(tree.root);