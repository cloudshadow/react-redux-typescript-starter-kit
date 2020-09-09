/*
 * Author: cloudshadow
 * This is generate container and component function
 * How to use
 * 1.npm run ungenerate component <component name>
 *   Delete 2 files (component js and component scss) in <component name> folder
 * 2.npm run ungenerate sub-component <component name> <sub component path>
 *   Delete 2 files (component js and component scss) in under the <sub component path> folder
 * 3.npm run ungenerate container <container name>
 *   Delete container, component, action, reducer
 * PS:
 *   After generate container, u need import container in router.ts and import reducer in reducers/index.ts
 */

// import rimraf from 'rimraf';
import readline from 'readline';
import child_process from 'child_process';
import deleteLine from './deleteLine';

const rl = readline.createInterface(process.stdin, process.stdout);
const path = {
  rootPath: './src/',
  appPath: 'src/App.tsx',
  containerPath: './src/containers/',
  componentPath: './src/components/',
  actionPath: './src/actions/',
  apiPath: './src/apis/',
  epicPath: './src/epics/',
  typePath: './src/types/',
  reducerPath: './src/reducers/',
};

function ungenerate(type, componentName, subPath) {
  const upperCaseName = upperCase(componentName);
  const lowerCaseName = componentName;
  if (type === 'container') {
    ungenerateContainer(upperCaseName, lowerCaseName);
  } else if (type === 'component') {
    ungenerateComponent(upperCaseName, lowerCaseName);
  } else if (type === 'sub-component' && subPath) {
    ungenerateComponent(upperCaseName, lowerCaseName, subPath);
  } else {
    console.log('type:' + type);
    console.log('component:' + componentName);
    console.log('subPath:' + subPath);
    console.log('Enter the error type');
  }
}

function ungenerateContainer(upperCaseName, lowerCaseName) {
  const allPath = [
    path.containerPath + upperCaseName + 'Page.tsx',
    path.componentPath + upperCaseName,
    path.actionPath + lowerCaseName + 'Actions.ts',
    path.apiPath + lowerCaseName + 'Apis.ts',
    path.epicPath + lowerCaseName + 'Epics.ts',
    path.typePath + lowerCaseName + 'Types.ts',
    path.reducerPath + lowerCaseName + 'Reducer.ts',
  ];
  const codeInFile = [
    // action file
    {
      filePath: path.actionPath + 'index.ts',
      deleteLineString: [
        `import { ${lowerCaseName}Actions } from './${lowerCaseName}Actions';`,
        `${lowerCaseName}Actions,`,
      ],
    },
    // api file
    {
      filePath: path.apiPath + 'index.ts',
      deleteLineString: [`import * as ${lowerCaseName}Apis from './${lowerCaseName}Apis';`, `${lowerCaseName}Apis,`],
    },
    // epic file
    {
      filePath: path.epicPath + 'index.ts',
      deleteLineString: [
        `import * as ${lowerCaseName}Epics from './${lowerCaseName}Epics';`,
        `...Object.values(${lowerCaseName}Epics),`,
      ],
    },
    // reducer file
    {
      filePath: path.reducerPath + 'index.ts',
      deleteLineString: [`import ${lowerCaseName} from './${lowerCaseName}Reducer';`, `${lowerCaseName},`],
    },
    // App file
    {
      filePath: path.appPath,
      deleteLineString: [`import ${upperCaseName}Page from './containers/${upperCaseName}Page';`],
    },
    {
      filePath: path.appPath,
      deleteLineString: [`<Route path="/${lowerCaseName}">`],
      deleteLines: 3,
    },
  ];
  rl.question(`Do you want to delete list files \r\n${allPath.join('\r\n')}? [yes]/no: `, function (answer) {
    if (answer === 'yes') {
      allPath.forEach((item) => {
        child_process.exec(`rimraf ${item}`);
      });
      cleanCode(codeInFile);
      console.log('Delete files');
      process.exit(0);
    } else {
      console.log('Cancel delete action');
      process.exit(0);
    }
  });
}

function cleanCode(codeInFile) {
  codeInFile.forEach((info) => {
    deleteLine(info.filePath, info.deleteLineString, info.deleteLines ?? 1);
  });
}

function ungenerateComponent(upperCaseName, lowerCaseName, subPath) {
  let finialPath = subPath
    ? path.componentPath + subPath + '/' + upperCaseName
    : path.componentPath + '/' + upperCaseName;
  const allPath = [finialPath];
  rl.question(`Do you want to delete list files ${allPath.join('\r\n')}? [yes]/no: `, function (answer) {
    if (answer === 'yes') {
      allPath.forEach((item) => {
        child_process.exec(`rimraf ${item}`);
      });
      console.log('Delete files');
    } else {
      console.log('Cancel delete action');
    }
  });
}

function removeImportFromFile() {}

function upperCase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

process.argv[2] && process.argv[3]
  ? ungenerate(process.argv[2], process.argv[3], process.argv[4])
  : console.log('Attribute Error');
