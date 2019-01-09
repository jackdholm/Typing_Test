var GoalText;
var GoalWords;
var CurrentIndex;
var WordCount;
var MistakeCount;
var time = 60000;

$(document).ready(function()
{
	CurrentIndex = 0;
	WordCount = 0;
	MistakeCount = 0;
	var txt = '';
	
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
			$('#paragraph').text(GoalWords[0]);
		}
	};
	$('#startbutton').prop('disabled', true);
	xmlhttp.open("GET","words.txt",true);
	xmlhttp.send();
	
	
	$('#startbutton').on("click",function()
	{
		CurrentIndex = 0;
		WordCount = 0;
		MistakeCount = 0;
		$('#startbutton').prop('disabled', true);
		$('#inputField').prop('disabled', false);
		$('#inputField').focus();
		var timer = setTimeout(complete, time);
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
			$('#paragraph').text(GoalWords[CurrentIndex]);
			this.value = "";
		}
	});
	
	function complete()
	{
		$('#startbutton').prop('disabled', false);
		$('#inputField').prop('disabled', true);
		$('#inputField').prop('value', "");
		$('#result').text("WPM: " + (WordCount/(time/1000/60)).toString());
	}
	
	// Shuffles arrray using Fisher-Yates shuffle
	function shuffle(array) 
	{
	  var m = array.length, t, i;
	  
	  while (m) 
	  {
		i = Math.floor(Math.random() * m--);
		t = array[m];
		array[m] = array[i];
		array[i] = t;
	  }

	  return array;
	}
});



