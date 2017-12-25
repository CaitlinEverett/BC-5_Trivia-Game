// ======================================================================================
// SETUP VARIABLES ======================================================================
// ======================================================================================
// TRIVIA Query URLs
// GIPHY Query URLs
var category = 9;
var queryURLBase = "https://opentdb.com/api.php?amount=10&category=" + category;
//correct answer count // user wins //user losses //best score
var correctCount = 0;
// timer global var
var timer = 100;
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

			correctCount = 0;
			category = 9;
		},
		error: function(){
			$("#categories").empty();
			var error = $(`<option value="">Oops! Something's awry...  I'm on it.</option>`);
			$("#categories").append(error);			
		}
	});
};



// ======================================================================================
// ON DOC LOAD ==========================================================================
// ======================================================================================
// reset game
$(document).on("ready",reset());


// ======================================================================================
// Timer Function ==========================================================================
// ======================================================================================
// for clock

    function runTimer() {
      intervalId = setInterval(decrement, 1000);
    }

    //  The decrement function.
    function decrement() {
      timer--;
      $(".clock").text(timer);
      if (timer === 0) {
        stop();
        $(".clock").text("Time is up!");
      }
    }

    //  The stop function
    function stop() {
      clearInterval(intervalId);
    }


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
	runTimer();

	$.ajax({
		url: queryURLBase,
		method: "GET",
		success: function(response){
			for (var i = 0; i < 10; i++) {

  	  			//store correct answer
  	  			var correctAnswer = response.results[i].correctAnswer;

  	  			//create html for each q/a segment
  	  			var question = $(`<div class="question" value="${i}"><span class="quest-text">${response.results[i].question}</span></div>`);
  	  			var radioButtons = $(`<form></form>`);

  	  			//make single list of answers 
  	  			var answers = response.results[i].incorrect_answers.concat(response.results[i].correct_answer);

  	  			//sort answers in random order
  	  			answers.sort(function(a, b){return (answers.length/10) - Math.random()});

				//add radio buttons
				for (var j = 0; j < answers.length; j++) {
					var rb = $(`<input class="radio" type="radio" name="radanswer" id="${j}" value="${answers[j]}">${answers[j]}</input>`);
					radioButtons.append(rb);
				};

				question.append(radioButtons);

				$("#game-play").append(question);
			};

			// ======================================================================================
			// ON ANSWER ============================================================================
			// ======================================================================================
			// when user answers a question, move it into side div
			// update score


			// ======================================================================================
			// I feel like there has got to be a much more elegant way to do this ($(this).parent().parent()... below)

			$(".radio").on("click", function(event){
				//set up validity check - find which question to look at
				var p = $(this).attr("value");
				var q = $(this).parent().parent().attr("value");
				var obj = $(this).parent().parent();

				if (response.results[q].correct_answer == p){
					//change correct answer count in var and dom
					correctCount += 1;

					//change color of div + show 'success' message

					//move question out of masthead column
					//$("#answered").append($(this).parent().parent());
					$("#answered").append(obj);
					obj.addClass("correct");
					$(this).siblings().attr("disabled", true);
					$(this).attr("disabled", true);
				}else{
					$("#answered").append(obj);
					obj.addClass("incorrect");
					$(this).siblings().attr("disabled", true);
					$(this).attr("disabled", true);					
				}
			});
		}
	});

});







// ======================================================================================
// ON PASS / SKIP QUESTION ==============================================================
// ======================================================================================
// when user presses 'SKIP QUESTION', rotate to another question
// will hope to write this in later


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












