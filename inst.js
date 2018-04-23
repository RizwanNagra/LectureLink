const socket = io()


let mStat=[0,0,0,0]
let bStat=[0,0]
socket.on("BinaryResponse", data=> {
	console.log("Just received Binary response: ", data);
	bStat[data]=bStat[data]+1;
	console.log("Updated binary stats: ", bStat);
})

socket.on("MCQResponse", data=> {
	console.log("Just received MCQ response: ", data);
	mStat[data]=mStat[data]+1;
	console.log("Updated MCQ stats: ", mStat);
})
socket.on("cpResponse", data=> {
	console.log("Just received cp: ", data);
})


class MainPage extends React.Component {  //This is a component corrosponding to the module main page

	render() {
		return (
			React.createElement('div',null,

				React.createElement('button',{onClick: ()=> binaryUpdate()},"PostBinary"),
				React.createElement('button',{onClick: ()=> MCQUpdate()},"PostMCQ"),
				React.createElement('button',{onClick: ()=> cpTime()},"PostCP")
				)
			);
	}

}

const binaryUpdate= ()=>{

	console.log("Asked Q: Are you guyz sleeping")
	socket.emit('PostBinary',"Are you guyz sleeping");   
}

const MCQUpdate= ()=>{
	console.log("Asked Q: Countries in the world? ")
	socket.emit('PostMCQ',"Countries in the world?");   
}

const cpTime = ()=>{
	let numCp=2
	console.log("Alloawing students to post CP!--CP time.")
	socket.emit('PostCP',numCp);   

}

const setState = ()=>{
	ReactDOM.render(React.createElement(MainPage,null),document.getElementById('root'));
}

socket.emit('Instructor',"AP-300");   //To notify the server that inst got connected So that server can discriminate b/w users
setState();

