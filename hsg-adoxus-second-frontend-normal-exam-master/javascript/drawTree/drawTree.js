export default function drawTree(height) {
    if (!height ||height < 4) {
        throw new Error("Minimum height is 4!");
    }
    for (let i = 1; i < height; i++) {
        let line = '';
        for (let j = 1; j < (height - i); j++) {
            line += ' ';
        }
        for (let k = 1; k <= (2 * i - 1); k++) {
            line += '*';
        }
        console.log(line);
    }

    let line = '';
    for (let j = 1; j < (height - 1); j++) {
        line += ' ';
    }
    line += '*';
    console.log(line);
}