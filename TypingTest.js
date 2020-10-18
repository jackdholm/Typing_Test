var GoalText;
var GoalWords;
var CurrentIndex;
var WordCount;
var MistakeCount;
var Time = 60000;
var CurrentTime;
var Filename = "words.txt";
var Clock;
var FirstType = Boolean(false);

$(document).ready(function()
{
	CurrentIndex = 0;
	WordCount = 0;
	MistakeCount = 0;
	var txt = '';
	$('#inputField').focus();
	$('#resetButton').prop('disabled', true);
	// Getting the list of words from the text file
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			txt = xmlhttp.responseText;
			GoalWords = txt.split(" ");
			GoalWords = shuffle(GoalWords);
			$('#inputField').prop('disabled', false);
			$('#wordField').text(GoalWords[0]);
			$('#nextWord0').text(GoalWords[1]);
			$('#nextWord1').text(GoalWords[2]);
		}
	};
	$('#inputField').prop('disabled', true);
	xmlhttp.open("GET",Filename,true);
	xmlhttp.send();
	
	$('#resetButton').on('click', function()
	{
		$('#inputField').prop('disabled', false);
		CurrentIndex = 0;
		WordCount = 0;
		MistakeCount = 0;
		FirstType = false;
		$('#inputField').focus();
		$('#resetButton').prop('disabled', true);
	});
	// Starts the timer when the user starts typing
	function startTest()
	{
		CurrentIndex = 0;
		WordCount = 0;
		MistakeCount = 0;
		$('#wordCount').text("Words: " + WordCount.toString());
		$('#mistakeCount').text("Mistakes: " + MistakeCount.toString());
		// Disable start, enable text input
		$('#resetButton').prop('disabled', true);
		CurrentTime = Time/1000;
		var timer = setTimeout(complete, Time);
		setTime();
		Clock = setInterval(setTime, 1000);
	};
	// when text field is changed
	$('#inputField').on('input', function(e)
	{
		if (!FirstType)
		{
			FirstType = true;
			startTest();
		}
		var temp = this.value;
		if (temp[temp.length-1] == " ")
		{
			$('#test').text(temp.substr(0,temp.length-1));
			WordCount++;
			$('#wordCount').text("Words: " + WordCount.toString());
			if (temp.substr(0,temp.length-1) != GoalWords[CurrentIndex])
			{
				MistakeCount++;
				$('#mistakeCount').text("Mistakes: " + MistakeCount.toString());
			}
			CurrentIndex++;
			$('#wordField').text(GoalWords[CurrentIndex]);
			$('#nextWord0').text(GoalWords[CurrentIndex+1]);
			$('#nextWord1').text(GoalWords[CurrentIndex+2]);
			this.value = "";
		}
	});
	// Displays final WPM value
	function complete()
	{
		$('#result').text("WPM: " + ((WordCount-MistakeCount)/(Time/1000/60)).toString());
		clearInterval(Clock);
		// Disable input
		$('#inputField').prop('disabled', true);
		$('#resetButton').prop('disabled', false);
		$('#inputField').prop('value', "");
		// Reset
		CurrentIndex = 0;
		WordCount = 0;
		MistakeCount = 0;
		
		GoalWords = shuffle(GoalWords); // Re-shuffle words
		$('#wordField').text(GoalWords[0]);
		$('#nextWord0').text(GoalWords[1]);
		$('#nextWord1').text(GoalWords[2]);
		// Enable start
		$('#resetButton').prop('disabled', false);
	}
	
	// Shuffles arrray using Fisher-Yates shuffle
	function shuffle(array) 
	{
	  var n = array.length, temp, i;
	  
	  while (n > 0) 
	  {
		i = Math.floor(Math.random() * n);
		temp = array[n];
		array[n] = array[i];
		array[i] = temp;
		n--;
	  }

	  return array;
	}
	
	// Updates time to minutes and seconds
	function setTime()
	{
		var str = "";
		str += ("0" + (Math.floor(CurrentTime/60)).toString()).slice(-2); 
		str += ":";
		str += ("0" + (CurrentTime%60).toString()).slice(-2);
		$('#timeField').text(str);
		CurrentTime--;
	}
});



