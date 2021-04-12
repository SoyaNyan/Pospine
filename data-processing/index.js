const fs = require("fs");
const originalData = require("./data.json");
const data = originalData.data;

const getMaxFrom2dArray = (arr) => {
    let maxRow = arr.map((r) => {
        return Math.max.apply(Math, r);
    });
    return Math.max.apply(null, maxRow);
};

const getMinFrom2dArray = (arr) => {
    let minRow = arr.map((r) => {
        return Math.min.apply(Math, r);
    });
    return Math.min.apply(null, minRow);
};