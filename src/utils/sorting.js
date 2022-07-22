const mergeResults = (left,right,state) => {
    let merged = [];
    let i = 0;
    let j = 0;
    while (i<left.length && j<right.length){
        if (state.order==='asc'){
            if (left[i][state.sortBy] <= right[j][state.sortBy]){
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }
            
        } else {
            if (left[i][state.sortBy] >= right[j][state.sortBy]){
                merged.push(left[i]);
                i++;
            } else {
                merged.push(right[j]);
                j++;
            }

        }
    }

    while (i<left.length){
        merged.push(left[i]);
        i++;
    }
    while (j<right.length){
        merged.push(right[j]);
        j++;
    }

    return merged;

}
const sortResults = (arr,state) => {
    if (arr.length<=1){
        return arr;
    }
    const middle = Math.floor(arr.length/2);
    const left = sortResults(arr.slice(0,middle),state);
    const right = sortResults(arr.slice(middle),state);

    return mergeResults(left,right,state)
}

export default sortResults;