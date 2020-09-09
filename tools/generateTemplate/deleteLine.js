/*
Author: cloudshadow
*/
import fs from 'fs';

const deleteLine = (filePath, targetLineList, deleteLines) => {
  const getFileContent = () => {
    return fs.readFileSync(filePath, 'utf8');
  };

  const getTargetLineIndex = (fileContentByLines) => {
    const indexArray = [];
    for (let i = 0; i < fileContentByLines.length; i++) {
      for (let j = 0; j < targetLineList.length; j++) {
        if (fileContentByLines[i].indexOf(targetLineList[j]) >= 0) {
          indexArray.push(i);
        }
      }
    }
    return indexArray;
  };

  const deleteTargetLine = () => {
    const fileContentByLines = getFileContent().split('\n');
    const indexArray = getTargetLineIndex(fileContentByLines);
    for (let i = indexArray.length - 1; i >= 0; i--) {
      fileContentByLines.splice(indexArray[i], deleteLines);
    }
    fs.writeFileSync(filePath, fileContentByLines.join('\n'), 'utf8', (err) => {
      if (err) return console.log(err);
    });
  };

  deleteTargetLine();
};

export default deleteLine;
