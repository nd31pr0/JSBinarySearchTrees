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
    deleteItem(value){
        this.root = this.deleteNode(this.root, value)
    }
    deleteNode(root, value){
        if(root===null){
            return root
        }
        // check if value is in left of right side of root node
        if (value < root.value){
            root.left =  this.deleteNode(root.left, value)
        } else if (value > root.value){
            root.right = this.deleteNode(root.right, value)
        } else{
            if(!root.left && !root.right){// we are to delete a leaf node
                return null
            }
            if(!root.right){ // 
                return root.left
            } else if(!root.left){ // 
                return root.right
            }
            root.value = this.min(root.right)
            root.right = this.deleteNode(root.right, value)
        }
    }
    find(value) {
        return this.findNode(this.root, value);
    }
    
    findNode(root, value) {
        if (root === null) {
            return null; // Base case: value not found
        }
        if (value < root.value) {
            return this.findNode(root.left, value); // Search in the left subtree
        } else if (value > root.value) {
            return this.findNode(root.right, value); // Search in the right subtree
        } else {
            return root; // Value found, return the node
        }
    }
    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
    
        const queue = [];
        queue.push(this.root);
    
        while (queue.length > 0) {
            const node = queue.shift(); // Dequeue the front node
            if (node) {
                callback(node); // Call the callback with the current node
                // Enqueue left and right children
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
    } 
    inOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        this.inOrderTraversal(this.root, callback);
    }
    
    inOrderTraversal(node, callback) {
        if (node !== null) {
            // Traverse the left subtree
            this.inOrderTraversal(node.left, callback);
            // Visit the current node
            callback(node);
            // Traverse the right subtree
            this.inOrderTraversal(node.right, callback);
        }
    }
    //PreOrder traversal traverses the root, left subtree and then the right subtree
    preOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        this.preOrderTraversal(this.root, callback);
    }
    
    preOrderTraversal(node, callback) {
        if (node !== null) {
            // Visit the current node
            callback(node);
            // Traverse the left subtree
            this.preOrderTraversal(node.left, callback);
            // Traverse the right subtree
            this.preOrderTraversal(node.right, callback);
        }
    }
    
    // in post order, we traverse deepest nodes of left subtree, travers right subtree and then the root

    postOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }
        this.postOrderTraversal(this.root, callback);
    }
    postOrderTraversal(node, callback) {
        if (node !== null) {
            // Traverse the left subtree
            this.postOrderTraversal(node.left, callback);
            // Traverse the right subtree
            this.postOrderTraversal(node.right, callback);
            // Visit the current node
            callback(node);
        }
    }
    height(node){
        if (node === null){
            return -1;
        }
        //recursively calculate height of left and right subtrees
        const leftHeight = this.height(node.left)
        const rightHeight = this.height(node.right)
        return Math.max((leftHeight, rightHeight) + 1);
        // the +1 accounts for the edge connecting the root to left and/or right subtree
    }
    depth(node) {
        if (node === null) {
            return -1; // Return -1 for null nodes (no edges)
        }
        
        let current = node;
        let depthCount = 0;
    
        // Traverse up to the root, counting the edges
        while (current.parent !== null) {
            depthCount++;
            current = current.parent; // Move to the parent node
        }
    
        return depthCount;
    }
    isBalanced(node) {
        if (node === null) {
            return true; // An empty tree is balanced
        }
    
        // Helper function to calculate height and check balance
        const checkBalance = (node) => {
            if (node === null) {
                return 0; // Height of null node is 0
            }
    
            const leftHeight = checkBalance(node.left);
            const rightHeight = checkBalance(node.right);
    
            // If the subtree is unbalanced, return -1
            if (leftHeight === -1 || rightHeight === -1) {
                return -1;
            }
    
            // If the current node is unbalanced, return -1
            if (Math.abs(leftHeight - rightHeight) > 1) {
                return -1;
            }
    
            // Return the height of the current node
            return Math.max(leftHeight, rightHeight) + 1;
        };
    
        // Start the balance check from the root
        return checkBalance(node) !== -1;
    }
    rebalance() {
        // We start by Getting a sorted array of values from the BST
        const sortedValues = this.inOrderTraversal(this.root);
        
        // We then build a balanced BST from the sorted array
        this.root = this.buildBalancedTree(sortedValues);
    }
    
    // Helper function for in-order traversal
    inOrderTraversal(node) {
        if (node === null) {
            return [];
        }
        return [
            ...this.inOrderTraversal(node.left),
            node.value,
            ...this.inOrderTraversal(node.right)
        ];
    }
    
    // Helper function to build a balanced BST from a sorted array
    buildBalancedTree(sortedArray) {
        if (sortedArray.length === 0) {
            return null;
        }
        
        const midIndex = Math.floor(sortedArray.length / 2);
        const node = new TreeNode(sortedArray[midIndex]);
    
        // Recursively build the left and right subtrees
        node.left = this.buildBalancedTree(sortedArray.slice(0, midIndex));
        node.right = this.buildBalancedTree(sortedArray.slice(midIndex + 1));
    
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

// Function to generate an array of random numbers
function generateRandomNumbers(count, max) {
    const numbers = new Set();
    while (numbers.size < count) {
        numbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(numbers);
}

// Driver script
function main() {
    const randomNumbers = generateRandomNumbers(10, 100); // Generate 10 random numbers < 100
    console.log("Random Numbers:", randomNumbers);

    const bst = new BST();
    randomNumbers.forEach(num => bst.insert(num));

    console.log("In-order Traversal of the BST:", bst.inOrderTraversal(bst.root));
    console.log("Pre-order Traversal of the BST:", bst.preOrderTraversal(bst.root));
    console.log("Post-order Traversal of the BST:", bst.postOrderTraversal(bst.root));
    console.log("Level-order Traversal of the BST:", bst.levelOrderTraversal());

    // Check if the tree is balanced
    const balanced = bst.isBalanced();
    console.log("Is the tree balanced?", balanced);

    // Unbalance the tree by adding several numbers > 100
    const unbalancedNumbers = [101, 102, 103, 104, 105, 106];
    console.log("Adding numbers to unbalance the tree (> 100):", unbalancedNumbers);
    unbalancedNumbers.forEach(num => bst.insert(num));

    // Check if the tree is balanced after insertion of numbers
    const balancedAfter = bst.isBalanced();
    console.log("Is the tree balanced after unbalancing?", balancedAfter);
}
main()

// Example Usage
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
tree.insert(10)
// Print the tree structure
prettyPrint(tree.root);