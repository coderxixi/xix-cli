
import axios from 'axios';
import urlJoin from 'url-join';

function getNpmRegistry() {
  return 'https://registry.npmjs.org';
}

async function getNpmInfo(packageName: string) {
  console.log('getNpmInfo', packageName);
  
  const register ='https://registry.npmjs.org';

  
  const url =  urlJoin(register, packageName);

   console.log('url',url);
   
  try {
    const response = await axios.get(url);
    console.log('response', response.data);
    

    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    return Promise.reject(e);
  }
}

async function getLatestVersion(packageName: string) {
  console.log('packageName', packageName);
  
  const data = await getNpmInfo(packageName);
  return data['dist-tags'].latest;
}

async function getVersions(packageName: string) {
  const data = await getNpmInfo(packageName);
  return Object.keys(data.versions);
}

export {
  getNpmRegistry,
  getNpmInfo,
  getLatestVersion,
  getVersions
}
