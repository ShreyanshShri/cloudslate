// https://www.geeksforgeeks.org/javascript-throttling/

const throttleFunction = (func: Function, delay: number) => {

    let prev = 0;
    return (...args: any[]) => {
        
        let now = new Date().getTime();

        if (now - prev > delay) {
            prev = now;
            return func(...args);
        }
    }
}

export default throttleFunction