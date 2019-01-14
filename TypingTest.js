var GoalText;
var GoalWords;
var CurrentIndex;
var WordCount;
var MistakeCount;
var Time = 60000;
var CurrentTime;
var Filename = "words.txt";
var Clock;

$(document).ready(function()
{
	CurrentIndex = 0;
	WordCount = 0;
	MistakeCount = 0;
	var txt = '';
	$('#inputField').prop('disabled', true);
	// Getting the list of words from the text file
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.status == 200 && xmlhttp.readyState == 4)
		{
			txt = xmlhttp.responseText;
			GoalWords = txt.split(" ");
			GoalWords = shuffle(GoalWords);
			$('#startbutton').prop('disabled', false);
			$('#wordField').text(GoalWords[0]);
		}
	};
	$('#startbutton').prop('disabled', true);
	xmlhttp.open("GET",Filename,true);
	xmlhttp.send();
	
	
	$('#startbutton').on("click",function()
	{
		CurrentIndex = 0;
		WordCount = 0;
		MistakeCount = 0;
		$('#wordcount').text("Words: " + WordCount.toString());
		$('#mistakecount').text("Mistakes: " + MistakeCount.toString());
		// Disable start, enable text input
		$('#startbutton').prop('disabled', true);
		$('#inputField').prop('disabled', false);
		$('#inputField').focus();
		CurrentTime = Time/1000;
		var timer = setTimeout(complete, Time);
		setTime();
		Clock = setInterval(setTime, 1000);
	});
	$('#inputField').on('input', function(e)
	{
		var temp = this.value;
		if (temp[temp.length-1] == " ")
		{
			$('#test').text(temp.substr(0,temp.length-1));
			WordCount++;
			$('#wordcount').text("Words: " + WordCount.toString());
			if (temp.substr(0,temp.length-1) != GoalWords[CurrentIndex])
			{
				MistakeCount++;
				$('#mistakecount').text("Mistakes: " + MistakeCount.toString());
			}
			CurrentIndex++;
			$('#wordField').text(GoalWords[CurrentIndex]);
			this.value = "";
		}
	});
	
	function complete()
	{
		$('#result').text("WPM: " + ((WordCount-MistakeCount)/(Time/1000/60)).toString());
		clearInterval(Clock);
		// Disable input
		$('#inputField').prop('disabled', true);
		$('#inputField').prop('value', "");
		// Reset
		CurrentIndex = 0;
		WordCount = 0;
		MistakeCount = 0;
		
		GoalWords = shuffle(GoalWords); // Re-shuffle words
		$('#wordField').text(GoalWords[0]);
		// Enable start
		$('#startbutton').prop('disabled', false);
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



