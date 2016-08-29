var player1Name="" , player2Name="", turn = ""; //variables for player names
var grid =  [[0,0,0],[0,0,0],[0,0,0]];  // array for mapping the moves of players
var hasWinner = 0, moveCount=0; // flag varables for finding winners and counting total no. of moves

function boardMsg(x){
	return $("#board").text(x);
}

function setTurn(){   // setting random turn for players
	var r = Math.floor((Math.random() * 2) + 1);
	hasWinner=0;
	if(r==1){
		turn = player1Name;
		boardMsg(player1Name+"'s turn now!");
	}
	else{
		turn = player2Name;
		boardMsg(player2Name+"'s turn now!");
	}
}

function reset(){ // resetting
		turn = "";
		grid =  [[0,0,0],[0,0,0],[0,0,0]];
		boardMsg("");
		$(".col").map(function() {
    		$(this).text("");
		}).get();
		hasWinner = 0;
		moveCount=0;
}

$("#playButton").click(function (){

	if(hasWinner==1){
		reset();
	}

	player1Name = $("#player-1-inp").val();
	player2Name = $("#player-2-inp").val();

	if(player1Name=="" || player2Name==""){
		alert("Please set all the names of the players.");
		return;
	}

	setTurn();




});

$(".col").click(function () {

	if(player1Name=="" || player2Name==""){
		alert("Please set all the names of the players.");
		return;
	}

	var row = $(this).parent().index();
	var col = $(this).index();

	if(grid[row][col]!==0){
		alert("This position is taken. Please try another position.");
		return;
	}
	if(hasWinner==1){
		alert("Please click play again");
		return;
	}

	if(turn==player1Name){
		moveCount++;
		$(this).text("O");
		grid[row][col] = 1;
		var ifWon = winnerCheck(1,player1Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				hasWinner=1;
				return;
			}else{
				turn = player2Name;
				boardMsg(player2Name+"'s turn now!");
			}
			return;
		}
		else{
			return;
		}

	}
	else if(turn==player2Name){
		moveCount++;
		$(this).text("X");
		grid[row][col] = 2;
		var ifWon = winnerCheck(2,player2Name);
		if(!ifWon){
			if(moveCount>=9){
				boardMsg("Match Drawn!");
				moveCount=0;
				$("#playButton").text("Play again");
				hasWinner=1;
				return;
			}else{
				turn = player1Name;
				boardMsg(player1Name+"'s turn now!");
			}
			return;
		}
		else{
			return;
		}

	}

});

function winnerCheck(n,playerName){               // Winning conditions
	if(

		(grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
		(grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
		(grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
		(grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
		(grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

		(grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
		(grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)


		){
		boardMsg(playerName+" won the game!");
		hasWinner = 1;
		moveCount=0;
		$("#playButton").text("Play again");
		return true;
	}
	return false;
}
