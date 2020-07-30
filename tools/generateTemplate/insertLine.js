/*
Author: cloudshadow
*/
import fs from 'fs';

const insertLine = (filePath, targetList) => {
  const getFileContent = (filePath) => {
    return fs.readFileSync(filePath, 'utf8');
  };
  // [{targetText insertText adjustLine targetLine}]
  const getInsertLines = (fileContentByLines, targetList) => {
    let finalTargetList = [];
    for (let i = 0; i < fileContentByLines.length; i++) {
      for (let j = 0; j < targetList.length; j++) {
        if (fileContentByLines[i].includes(targetList[j].targetText)) {
          const newTarget = {
            ...targetList[j],
            targetLine: i,
          };
          finalTargetList.push(newTarget);
          targetList.splice(i, 1);
        }
      }
    }
    finalTargetList = finalTargetList.sort((a, b) => a.targetLine - b.targetLine);
    return finalTargetList;
  };
  const insertBeforeTargetLine = (filePath, targetList) => {
    const fileContentByLines = getFileContent(filePath).split('\n');
    const finalTargetInsertList = getInsertLines(fileContentByLines, targetList);
    for (let i = 0; i < finalTargetInsertList.length; i++) {
      fileContentByLines.splice(
        finalTargetInsertList[i].targetLine + 1 + finalTargetInsertList[i].adjustLine + i,
        0,
        finalTargetInsertList[i].insertText
      );
    }
    fs.writeFile(filePath, fileContentByLines.join('\n'), 'utf8', (err) => {
      if (err) return console.log(err);
    });
  };
  insertBeforeTargetLine(filePath, targetList);
};

export default insertLine;
