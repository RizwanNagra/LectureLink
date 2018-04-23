const socket = io()


socket.on("replyBinary", data=> {
	console.log("Just received Binary Q: ", data);
	activeBinary=1;
})

socket.on("replyMCQ", data=> {
	console.log("Just received MCQ : ", data);
	activeMCQ=1;
})

socket.on("PostCP", data=> {
	console.log("Instructor allowed you to post CP "+ data + " times");
	activeCp=data;
})

class MainPage extends React.Component {  //This is a component corrosponding to the module main page
	render() {
		return (
			React.createElement('div',null,

				React.createElement('button',{onClick: ()=> {binaryUpdate()} },"Binary_Submit"),
				React.createElement('button',{onClick: ()=> MCQUpdate()},"MCQ_Submit"),
				React.createElement('button',{onClick: ()=> cpUpdate()},"CP_Post")
				)
			);
	}
}



const binaryUpdate =()=>{
	if(activeBinary==1){            //This means instructor posted the question
	console.log("came in update")

	let bAns=1 		//Binary value to be selected from the options 
	let className="AP300"		//Will be equal to the relevant class pressed
	
	socket.emit('S_binary', bAns);
	activeBinary=0;
	}
	else{
		console.log("This is not the right time to post")
	}
}

const MCQUpdate =()=>{
	if(activeMCQ==1){            //This means instructor posted the question

	let MCQAns=2 		//MCQ value to be selected from the options 
	let className="AP300"		//Will be equal to the relevant class pressed
	
	socket.emit('S_MCQ', MCQAns);
	console.log("Submitted ans")
	activeMCQ=0;
	}
	else{
		console.log("This is not the right time to post")
	}
}
const cpUpdate =()=>{
	if(activeCp){            //This means instructor posted the question

	let cp="Hello juni!!" 		//Binary value to be selected from the options 
	let className="AP300"		//Will be equal to the relevant class pressed
	
	socket.emit('S_cp', cp);
	console.log("Submitted cp")
	activeCp= activeCp-1;
	}
	else{
		console.log("This is not the right time to post")
	}
}

const setState = ()=>{
	ReactDOM.render(React.createElement(MainPage,null),document.getElementById('root'));
}

activeBinary=0;
activeMCQ=0;
activeCp=0;							//Can post cp twice
socket.emit('Student',"AP-300");     //To notify the server that student got connected So that server can discriminate b/w users
setState();

