import fs from "fs";

export const readFile = (jsonPath) => {
    try{
        const jsonData = fs.readFileSync(jsonPath);
        const data = JSON.parse(jsonData);
        return data;
    } catch(error) {
        console.log(error);
    }
}

export const updateFile = (jsonPath, newData) => {
    try{
        const data = JSON.stringify(newData);
        const newJson = fs.writeFileSync(jsonPath, data);
        return newJson;
    } catch(error) {
        console.log(error);
    }
}

//updateFile([], "books-test.json");
