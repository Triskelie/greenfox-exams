export default function generateFizzBuzzNumbers(number) {
    if (!number || number < 1) {
        throw new Error("Minimum number is 1!");
    }
    let results = [];
    for (let i = 1; i <= number; i++) {
        if (i % 3 === 0 || i % 5 === 0) {
            results.push(i);
        }
    }
    return results;
}