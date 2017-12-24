// ======================================================================================
// SETUP VARIABLES ======================================================================
// ======================================================================================
// TRIVIA Query URLs
// GIPHY Query URLs
var category = 9;
var queryURLBase = "https://opentdb.com/api.php?amount=10&category=" + category;
// user wins //user losses //best score
// timer global var
// game state


// global question count url: https://opentdb.com/api_count_global.php
// cagetory question count url: https://opentdb.com/api_count.php?category=CATEGORY_ID_HERE
// category lookup URL: https://opentdb.com/api_category.php



// ======================================================================================
// GAME OBJECT RESET ====================================================================
// ======================================================================================
// Reset Scores
// Reset DOM

function reset(){
	$.ajax({
		url: "https://opentdb.com/api_category.php",
		method: "GET",
		success: function(response){
			var obj = response.trivia_categories.length;
			$("#categories").empty();
			var allCategories = $(`<option value="">Wildcard</option>`);
			$("#categories").append(allCategories);
			
			for (var i = 0; i < obj; i++) {
				var newOpt = $(`<option value="${response.trivia_categories[i].id}">${response.trivia_categories[i].name}</option>`);
				$("#categories").append(newOpt);
			}
		},
		error: function(){
			$("#categories").empty();
			var error = $(`<option value="">Oops! Something's awry...  I'm on it.</option>`);
			$("#categories").append(error);			
		}
	});
}




// ======================================================================================
// ON DOC LOAD ==========================================================================
// ======================================================================================
// reset game
$(document).on("ready",reset());

// ======================================================================================
// PLAY =================================================================================
// ======================================================================================
// when user selects a category and presses 'play', start feeding them questions
// populate giphy background
// timer stuff

$("#play").on("click", function(){
	category = $("#categories").val();
	$("#game-play").empty();

	timer = 100;
	$(".clock").show();
	$(".clock").html(timer);

	 $.ajax({
  	  	url: queryURLBase,
  	  	method: "GET",
  	  	success: function(response){
  	  		for (var i = 0; i < 10; i++) {
  	  			var tempDiv = $(`<div class="question">${response.results[i].question}</div><br>`);
  	  			//create a new question in the dom
  	  			// ${response.results[i].difficulty};
  	  			// ${response.results[i].question};
  	  			// ${response.results[i].correctAnswer};
  	  			// ${response.results[i].incorrectAnswers};
  	  			$("#game-play").append(tempDiv);
  	  		}
  	  	}
  		}).done(function() {
  	});

});




// ======================================================================================
// ON ANSWER ============================================================================
// ======================================================================================
// when user answers a question, move it into side div
// update score


// ======================================================================================
// ON PASS / SKIP QUESTION ==============================================================
// ======================================================================================
// when user presses 'SKIP QUESTION', rotate to another question


// ======================================================================================
// IF USER ANSWERS ALL CORRECTLY WITHIN TIME LIMIT ======================================
// ======================================================================================
// when session questions are finished, but timer is not out, user gets new questions
// keep adding to best count + dom count


// ======================================================================================
// IF USER FAILS TO ANSWER CORRECT NUMBER OF QUESTIONS WITHIN TIME LIMIT ================
// ======================================================================================
// if user answers all questions correctly, refresh session and keep adding to count


// ======================================================================================
// 'ENTER' KEYPRESS =====================================================================
// ======================================================================================












