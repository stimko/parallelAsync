let testStructure = {
	"initial":{children:[{id:"A", time:2000}, {id:"B", time:5000}, {id:"C", time:2000}]},
	"A":{children:[]},
	"B":{
		children:[
			{id: "B1", time:5000}, 
			{id: "B2", time: 5000}, 
			{id: "B3", time: 5000}
		]
	},
	"B11":{children:[]},
	"B12":{children:[]},
	"B13":{children:[]},
	"B21":{children:[]},
	"B22":{children:[]},
	"B23":{children:[]},
	"B1":{children:[{id:"B11", time:5000}, {id:"B12", time:5000}, {id:"B13", time:5000}]},
	"B2":{children:[{id:"B21", time:5000}, {id:"B22", time:5000}, {id:"B23", time:5000}]},
	"B3":{children:[]},
	"C":{children:[{id:"C1", time:2000}, {id:"C2", time:2000}, {id:"C3", time:2000}]},
	"C1":{children:[]},
	"C2":{children:[]},
	"C3":{children:[]}
}

export async function init() {
  await loadItemDescendants({id:"initial"})
}

async function apiCall(item){
	await new Promise(function(resolve, reject){
		setTimeout(function(){
			resolve()
		}, item.time)
	})
	console.log("loaded " + item.id)
	return testStructure[item.id]
}

async function loadItemDescendants(item){
	let loadedItem = await apiCall(item)
	await new Promise(function(resolve, reject){
		if(loadedItem.children.length){
			console.log("loading children for ", item)
			loadChildren(loadedItem, resolve, reject)
		} else {
			resolve()
		}
	})	
}

async function loadChildren(item, resolve, reject){
	await Promise.all(item.children.map((kid) => {return loadItemDescendants(kid)}))
	console.log("Loaded children for " , item)
	resolve()
}