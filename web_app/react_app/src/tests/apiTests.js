/**
Author: Aaron Yerke
Purpose: Testing biolockj-api
Notes:
  
*/

let testProp = {
  prop: "input.dirPaths",
  // mod: "biolockj.module.seq.PearMergeReads"
}

let testProp1 = {
  prop: "input.dirPaths",
  // mod: "biolockj.module.seq.PearMergeReads",
  extPath: ""
}

let testPropValue = {
  prop: "input.dirPaths",
  config: "",
  // extPath: ""
}

promiseFromNode('/bljApiListModules', JSON.stringify({jsonParam: "/dev/null"}))
  .then((modules) => {
    console.log(modules.output);
  });

promiseFromNode('/bljApiPropType', JSON.stringify(testProp))
  .then((modules) => {
    let mods = JSON.parse(modules);
    console.log(mods.output);
});

promiseFromNode('/bljApiDescribeProp', JSON.stringify(testProp))
  .then((modules) => {
    let mods = JSON.parse(modules);
    console.log(mods.output);
});

promiseFromNode('/bljApiPropValue', JSON.stringify(testPropValue))
  .then((modules) => {
    let mods = JSON.parse(modules);
    console.log(mods.output);
});


function promiseFromNode(address, jsonParam, method = 'POST') {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, address, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(jsonParam);
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        try {
          if(this.status === 200 && request.readyState === 4){
            resolve(this.responseText);
          }else{
            reject(this.status + " " + this.statusText)
          }
        } catch (e) {
          reject (e.message)
        }
      }
    }
  });
}