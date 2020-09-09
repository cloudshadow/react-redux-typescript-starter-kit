/*
 * Author: cloudshadow
 * This is generate container and component function
 * How to use
 * 1.npm run generate component <component name>
 *   Generate 2 files (component js and component scss) in <component name> folder
 * 2.npm run generate sub-component <component name> <sub component path>
 *   Generate 2 files (component js and component scss) in under the <sub component path> folder
 * 3.npm run generate container <container name>
 *   Generate container, component, action, reducer
 * PS:
 *   After generate container, u need import container in router.ts and import reducer in reducers/index.ts
 */

import fs from 'fs';
import insertLine from './insertLine';

const path = {
  appPath: 'src/App.tsx',
  containerPath: './src/containers/',
  componentPath: './src/components/',
  actionPath: './src/actions/',
  actionIndexPath: './src/actions/index.ts',
  apiPath: './src/apis/',
  apiIndexPath: './src/apis/index.ts',
  epicPath: './src/epics/',
  epicIndexPath: './src/epics/index.ts',
  typePath: './src/types/',
  reducerPath: './src/reducers/',
  reducerIndexPath: './src/reducers/index.ts',
};

function generate(type, componentName, subPath) {
  const upperCaseName = upperCase(componentName);
  const lowerCaseName = componentName;
  if (type === 'container') {
    generateContainer(upperCaseName, lowerCaseName);
    generateComponent(upperCaseName, lowerCaseName);
    generateAction(upperCaseName, lowerCaseName);
    generateApi(upperCaseName, lowerCaseName);
    generateType(upperCaseName, lowerCaseName);
    generateEpic(upperCaseName, lowerCaseName);
    generateReducer(upperCaseName, lowerCaseName);
  } else if (type === 'component') {
    generateComponent(upperCaseName, lowerCaseName);
  } else if (type === 'sub-component' && subPath) {
    generateComponent(upperCaseName, lowerCaseName, subPath);
  } else {
    console.log('type:' + type);
    console.log('component:' + componentName);
    console.log('subPath:' + subPath);
    console.log('Enter the error type');
  }
}

function generateContainer(upperCaseName, lowerCaseName) {
  const filePath = path.containerPath + upperCaseName + 'Page.tsx',
    tempFilePath = './tools/generateTemplate/container/TemplateContainer.tsx';
  createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
  const targetList = [
    {
      targetText: `Route path="*"`,
      insertText: [
        `              <Route path="/${lowerCaseName}">`,
        `                <${upperCaseName}Page />`,
        `              </Route>`,
      ],
      adjustLine: -1,
    },
    {
      targetText: `import NotfoundPage`,
      insertText: [`import ${upperCaseName}Page from './containers/${upperCaseName}Page';`],
      adjustLine: -1,
    },
  ];
  insertLine(path.appPath, targetList);
}

function generateComponent(upperCaseName, lowerCaseName, subPath) {
  let finialPath = subPath ? path.componentPath + subPath + '/' : path.componentPath;

  fs.mkdir(finialPath + upperCaseName, function (err, data) {
    if (err) return console.log(err);
    // generate component js
    const filePath = finialPath + upperCaseName + '/' + upperCaseName + 'Component.tsx',
      tempFilePath = './tools/generateTemplate/components/Template/TemplateComponent.tsx';
    createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
    // generate component scss
    const scssFilePath = finialPath + upperCaseName + '/' + lowerCaseName + '.scss',
      scssTempFilePath = './tools/generateTemplate/components/Template/template.scss';
    createFile(upperCaseName, lowerCaseName, scssFilePath, scssTempFilePath);
  });
}

function generateAction(upperCaseName, lowerCaseName) {
  const filePath = path.actionPath + lowerCaseName + 'Actions.ts',
    tempFilePath = './tools/generateTemplate/actions/TemplateActions.ts';
  createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
  const targetList = [
    {
      targetText: `const rootAction = {`,
      insertText: [`import { ${lowerCaseName}Actions } from './${lowerCaseName}Actions';`],
      adjustLine: -2,
    },
    { targetText: `const rootAction = {`, insertText: [`  ${lowerCaseName}Actions,`], adjustLine: +1 },
  ];
  insertLine(path.actionIndexPath, targetList);
}

function generateApi(upperCaseName, lowerCaseName) {
  const filePath = path.apiPath + lowerCaseName + 'Apis.ts',
    tempFilePath = './tools/generateTemplate/apis/TemplateApis.ts';
  createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
  const targetList = [
    {
      targetText: `export default {`,
      insertText: [`import * as ${lowerCaseName}Apis from './${lowerCaseName}Apis';`],
      adjustLine: -2,
    },
    {
      targetText: `};`,
      insertText: [`  ${lowerCaseName}Apis,`],
      adjustLine: -1,
    },
  ];
  insertLine(path.apiIndexPath, targetList);
}

function generateEpic(upperCaseName, lowerCaseName) {
  const filePath = path.epicPath + lowerCaseName + 'Epics.ts',
    tempFilePath = './tools/generateTemplate/epics/TemplateEpics.ts';
  createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
  const targetList = [
    {
      targetText: `const rootEpic = combineEpics(`,
      insertText: [`import * as ${lowerCaseName}Epics from './${lowerCaseName}Epics';`],
      adjustLine: -3,
    },
    {
      targetText: `const rootEpic = combineEpics(`,
      insertText: [`  ...Object.values(${lowerCaseName}Epics),`],
      adjustLine: +1,
    },
  ];
  insertLine(path.epicIndexPath, targetList);
}

function generateType(upperCaseName, lowerCaseName) {
  const filePath = path.typePath + upperCaseName + 'Types.ts',
    tempFilePath = './tools/generateTemplate/types/TemplateTypes.ts';
  createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
}

function generateReducer(upperCaseName, lowerCaseName) {
  const filePath = path.reducerPath + lowerCaseName + 'Reducer.ts',
    tempFilePath = './tools/generateTemplate/reducers/tempReducer.ts';
  createFile(upperCaseName, lowerCaseName, filePath, tempFilePath);
  const targetList = [
    {
      targetText: `export const history: History = createBrowserHistory();`,
      insertText: [`import ${lowerCaseName} from './${lowerCaseName}Reducer';`],
      adjustLine: -2,
    },
    {
      targetText: `});`,
      insertText: [`  ${lowerCaseName},`],
      adjustLine: -2,
    },
  ];
  insertLine(path.reducerIndexPath, targetList);
}

function createFile(upperCaseName, lowerCaseName, filePath, tempFilePath) {
  const type = tempFilePath.split('.')[2];
  fs.readFile(tempFilePath, 'utf8', function (err, data) {
    if (err) return console.log(err);
    let result = {};
    if (type === 'js') {
      // remove eslint-disable
      result = data
        .replace(/Template/g, upperCaseName)
        .replace(/template/g, lowerCaseName)
        .replace(/@tempPath/g, '@')
        .split('\n')
        .slice(1)
        .join('\n');
    } else {
      result = data
        .replace(/Template/g, upperCaseName)
        .replace(/template/g, lowerCaseName)
        .replace(/@tempPath/g, '@')
        .replace(/TEMPLATE/g, upperCaseName.toUpperCase());
    }
    // const result = data.replace(/Template/g, upperCaseName).replace(/template/g, lowerCaseName).split('\n').slice(1).join('\n');
    fs.writeFile(filePath, result, 'utf8', function (writeErr) {
      if (writeErr) return console.log(writeErr);
    });
  });
}

function upperCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

process.argv[2] && process.argv[3]
  ? generate(process.argv[2], process.argv[3], process.argv[4])
  : console.log('Attribute Error');
