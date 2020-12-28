
let clickcount = 0;
let tiling = 0;
let selected_squares_index = [];
let black_selected_squares = [];
let white_selected_squares = [];


document.querySelectorAll('.black').forEach(element => {
	element.addEventListener('click', event => {

	if (clickcount<2){
		clickcount = clickcount + 1; 
		     /* alert("black square selected" + element.getAttribute('row')); */
		    let str = element.getAttribute('row').concat(" ", element.getAttribute('column'));
		    selected_squares_index.push(str);
		    black_selected_squares.push(element);
		    /* element.style.backgroundColor = "#78241F"; */
		    element.style.backgroundColor = "white";
		    element.style.borderColor = "white";

		   }
		 })
	}) 


document.querySelectorAll('.white').forEach(element => {
	element.addEventListener('click', event => {

		  if (clickcount<2){
		  	clickcount = clickcount + 1;
		    /* alert("white square selected"); */
		    let str = element.getAttribute('row').concat(" ", element.getAttribute('column'));
		     selected_squares_index.push(str);
		     white_selected_squares.push(element);
		     /* element.style.backgroundColor = "#A7534E"; */
		     element.style.backgroundColor = "white";
		     element.style.borderColor = "white";
		   }
		 })
	})

console.log(selected_squares_index)


document.getElementById("reselect_button").addEventListener("click", Restore);

function Restore(){
		window.location.reload()
	}

let n = 8;




let x1 = 0;
let y1 = 0;

let x2 = 0;
let y2 = 0;

document.getElementById("check_button").addEventListener("click", Check);
document.getElementById("tile_button").addEventListener("click", Tile);

function Check(){

	x1 = parseInt(selected_squares_index[0].substr(0,1));
	y1 = parseInt(selected_squares_index[0].substr(2,1));

	x2 = parseInt(selected_squares_index[1].substr(0,1));
	y2 = parseInt(selected_squares_index[1].substr(2,1));

	if (((x1 + y1)% 2) == ((x2 + y2)% 2)){
	    document.getElementById("tiling_update").innerHTML = "It CAN'T be tiled. Click 'Reselect' to make a new selection.";

	}

	else{
	    document.getElementById("tile_button").style.visibility = "initial";
	    document.getElementById("tiling_update").innerHTML = "It CAN be tiled. Click 'Tile it with Dominos!' to see a way of tiling.";


	}


}

function Tile(){


	if(selected_squares_index.length!=2){
		alert("Select exactly 2 squares to remove in this version!!")
	}

	else{

		x1 = parseInt(selected_squares_index[0].substr(0,1));
		y1 = parseInt(selected_squares_index[0].substr(2,1));

		x2 = parseInt(selected_squares_index[1].substr(0,1));
		y2 = parseInt(selected_squares_index[1].substr(2,1));

		hamiltonian_cycle = [];

    for (let i = 1; i < n+1; i++){
        hamiltonian_cycle.push([i,1]);
    }

    let c = 1;

    for (let i = n; i > 0; i--){

        if (c % 2 == 1){
            for (let j = 2; j < n+1; j++){ 
                hamiltonian_cycle.push([i,j]);
            }
        }    
        else{
            for (let k = n; k > 1; k--){ 
                hamiltonian_cycle.push([i,k]);
            }
    	}

    	c = c + 1

    }    

    /* console.log(hamiltonian_cycle); */

    let solution = [];
    let omitted = [];

    for (let i = 0; i < (n*n); i++){ 
        if (hamiltonian_cycle[i][0] == x1 && hamiltonian_cycle[i][1] == y1 || hamiltonian_cycle[i][0] == x2 && hamiltonian_cycle[i][1] == y2){
            omitted.push(i);
        }

    }



    if (((hamiltonian_cycle[omitted[0]][0] + hamiltonian_cycle[omitted[0]][1]) % 2) == ((hamiltonian_cycle[0][0] + hamiltonian_cycle[0][1]) % 2)){

        hamiltonian_cycle.splice(omitted[0],1);
        hamiltonian_cycle.splice((omitted[1]-1),1);
        console.log(hamiltonian_cycle);

        for (let i = 0; i < (n*n - 2); i = i + 2){
            solution.push([hamiltonian_cycle[i],hamiltonian_cycle[i+1]]);
        }
    }

  
    else{

        hamiltonian_cycle.splice(omitted[0],1);
        hamiltonian_cycle.splice((omitted[1]-1),1);
        console.log(hamiltonian_cycle);

        for (let i = 1; i < (n*n - 3); i = i + 2){
            solution.push([hamiltonian_cycle[i],hamiltonian_cycle[i+1]]);
   		}
        solution.push([hamiltonian_cycle[0],hamiltonian_cycle[n*n - 3]])
    }

		function getstarticon(j){

			if(solution[j][0][0]==solution[j][1][0]){
				/* horizontal domino required */
				if (solution[j][0][1]<solution[j][1][1]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/start-right_s3dzu1.png')"
				}
				if (solution[j][0][1]>solution[j][1][1]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/start-left_vcdqkh.png')"
				}
			}

			if(solution[j][0][1]==solution[j][1][1]){
				/* vertical domino required */
				if (solution[j][0][0]<solution[j][1][0]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/start-down_okzvng.png')"
				}
				if (solution[j][0][0]>solution[j][1][0]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/start-up_wutpew.png')"
				}
			}

		}

		function getstopicon(j){

			if(solution[j][0][0]==solution[j][1][0]){
				/* horizontal domino required */
				if (solution[j][0][1]<solution[j][1][1]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/stop-left_sqotwv.png')"
				}
				if (solution[j][0][1]>solution[j][1][1]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/stop-right_jncqbs.png')"
				}
			}

			if(solution[j][0][1]==solution[j][1][1]){
				/* vertical domino required */
				if (solution[j][0][0]<solution[j][1][0]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/stop-up_hdzcmn.png')"
				}
				if (solution[j][0][0]>solution[j][1][0]){
					return "url('https://res.cloudinary.com/dl6m7txan/image/upload/v1609178550/GMC/stop-down_cd94pr.png')"
				}
			}

		}

		for (var i = 0; i < document.querySelectorAll(".black").length; i++ ){
			for (var j = 0; j < solution.length; j++){
				if (solution[j][0][0].toString() == document.querySelectorAll(".black")[i].getAttribute('row') && solution[j][0][1].toString() == document.querySelectorAll(".black")[i].getAttribute('column')){
				document.querySelectorAll(".black")[i].style.backgroundImage = getstarticon(j);
				document.querySelectorAll(".black")[i].style.backgroundSize = "contain";
			}
				if (solution[j][1][0].toString() == document.querySelectorAll(".black")[i].getAttribute('row') && solution[j][1][1].toString() == document.querySelectorAll(".black")[i].getAttribute('column')){
				document.querySelectorAll(".black")[i].style.backgroundImage = getstopicon(j);
				document.querySelectorAll(".black")[i].style.backgroundSize = "contain";}
			
			}

		}

		for (var i = 0; i < document.querySelectorAll(".white").length; i++ ){
			for (var j = 0; j < solution.length; j++){
				if (solution[j][0][0].toString() == document.querySelectorAll(".white")[i].getAttribute('row') && solution[j][0][1].toString() == document.querySelectorAll(".white")[i].getAttribute('column')){
				document.querySelectorAll(".white")[i].style.backgroundImage = getstarticon(j);
				document.querySelectorAll(".white")[i].style.backgroundSize = "contain";
			}
				if (solution[j][1][0].toString() == document.querySelectorAll(".white")[i].getAttribute('row') && solution[j][1][1].toString() == document.querySelectorAll(".white")[i].getAttribute('column')){
				document.querySelectorAll(".white")[i].style.backgroundImage = getstopicon(j);
				document.querySelectorAll(".white")[i].style.backgroundSize = "contain";

			}
			
			}

		}

		document.getElementById("domino_icon_handler").style.visibility = "initial";

		tiling = 1;

	}

}
	

//This is a js file