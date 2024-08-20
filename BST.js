class Node {
    constructor(d) {
        this.data = d;
        this.right = null;
        this.left = null;
    }
}

class Tree{
    constructor(Arr) {
        this.root = this.BuildTree(Arr)
    }
    
    sortedArr(Arr) {
        let sortedArr = [];

        while(Arr.length > 0) {
            let smallest = Arr[0]
            let smallestIndex = 0;

            for(let index = 1; index < Arr.length; index++) {
                if(Arr[index] < smallest) {
                    smallest = Arr[index];
                    smallestIndex = index;
                }
            }
            // remove smallest element from original array 
            Arr.splice(smallestIndex, 1);
            //push the smallest element to sorted arr 
            sortedArr.push(smallest)
        }
        return sortedArr;
    }

    
    BuildTree(Arr) {
        // let's start by sorting the array
        

    
        // sort array
        // remove duplicate entries
        // Build the tree from the array using Node class 


    }
}