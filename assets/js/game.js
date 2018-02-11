//intro screen; click or press a key to continue


//global variables
var countries = ["afghanistan","albania","algeria","andorra","angola","antigua and barbuda","argentina","armenia",
                 "australia","austria","azerbaijan","bahamas","bahrain","bangladesh","barbados","belarus","belgium",
                "belize","benin","bhutan","bolivia","bosnia and herzegovenia","botswana","brazil","brunei","bulgaria",
                "burkina faso","burundi","cambodia","cameroon","canada","cape verde","central african republic","chad",
                "chile","china","colombia","comoros","costa rica","cote d'ivoire","croatia","cuba","cyprus","czechia",
                "democratic republic of the congo","denmark","djibouti","dominica","dominican republic","east timor",
                "ecuador","egypt","el salvador","equatorial guinea","eritrea","estonia","ethiopia","federated states of micronesia",
                "fiji","finland","france","gabon","gambia","georgia","germany","ghana","greece","grenada","guatemala","guinea",
                "guinea-bissau","guyana","haiti","honduras","hungary","iceland","india","indonesia","iran","iraq","ireland",
                "israel","italy","jamaica","japan","jordan","kazakhstan","kenya","kiribati","kosovo","kuwait","kyrgistan",
                "laos","latvia","lebanon","lesotho","liberia","libya","liechtenstein","lithuania","luxembourg","macedonia",
                "madagascar","malawi","malaysia","maldives","mali","malta","marshall islands","mauritania","mauritius","mexico",
                "moldova","monaco","mongolia","montenegro","morocco","mozambique","myanmar","namibia","nauru","nepal","netherlands",
                "new zealand","nicaragua","niger","nigeria","north korea","norway","oman","pakistan","palau","panama","papua new guinea",
                "paraguay","peru","philippines","poland","portugal","qatar","republic of the congo","romania","russia","rwanda",
                "sao tome and principe","samoa","san marino","saudi arabia","senegal","serbia","seychelles","sierra leone","singapore",
                "slovakia","slovenia","solomon islands","somalia","south africa","south korea","south sudan","spain","sri lanka",
                "st kitts and nevis","st lucia","st vincent and the grenadines","sudan","suriname","swaziland","sweden","switzerland",
                "syria","taiwan","tajikistan","tanzania","thailand","togo","tonga","trinidad and tobago","tunisia","turkey","turkmenistan",
                "tuvalu","uganda","ukraine","uruguay","united arab emirates","united kingdom","united states of america","uzbekistan",
                "vanuatu","vatican city","venezuela","vietnam","yemen","zambia","zimbabwe"]

var answer;
var blanks;
var secretAnswer;
var lives;
var score= 0;
//function to let us update our blanks with chosen letters at the correct place
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
//function to bring up our game over screen
function gameOver(){
    document.write("Game Over! The answer was " + answer + ". Reload the page to play again");
}
//and a function to bring up our victory screen
function youWin(){
    score++;
    document.querySelector("#score").innerHTML = "Score: " + score;
    alert("Good Job! The answer was " + answer + ". Keep it up!");
    loadCountry();
}
//start
function loadCountry() {
    //choose a word from the array of possible words
    answer = countries[Math.floor(Math.random() * countries.length)];
    console.log(answer);
    //Create a string of blanks to represent our word
    blanks = "";
    secretAnswer = "";
    for (var i = 0; i<answer.length; i++) {
        if (answer.charAt(i) === " "){blanks = blanks + "&nbsp;";secretAnswer = secretAnswer + "&nbsp;";}
        else                         {blanks = blanks + "_ ";secretAnswer = secretAnswer + answer.charAt(i) + " ";}
    }
    //put the blanks for the chosen word on-screen
    document.querySelector("#target").innerHTML = blanks;
    console.log(secretAnswer);
    //reset our lives
    lives = 10;
    document.querySelector("#lives").innerHTML = "Lives Remaining: " + lives;
}




//wait for a keypress or button click
document.onkeyup = function(event) {
    console.log(event.key);
//If the chosen letter is not in our word, lose a life
if (answer.indexOf(event.key) === -1) {
    lives--;
    document.querySelector("#lives").innerHTML = "Lives Remaining: " + lives;
    //if we run out of lives, we lose.
    if (lives === 0){gameOver()};
    //otherwise, game continues
}
//If the chosen letter is in our word:
else {for (var j = 0; j<secretAnswer.length; j++){
    //replace all instances of that letter in our blanks with the letter
    if (secretAnswer.charAt(j) === event.key){
        blanks = setCharAt(blanks, j, secretAnswer.charAt(j));
        console.log(blanks);        
    }
    }
    //and update the screen
    document.querySelector("#target").innerHTML = blanks;
    //then, if our word is complete, go to victory,
    if (blanks === secretAnswer){youWin()};
    //otherwise, game continues
}   
//disable the chosen letter from future selections 
//wait for another selection
}



//Victory:
    //Display the flag of the chosen country and play the national anthem
    //Increment wins counter
    //Prompt "Play again?"

//Game over:
    //Display game over message
    //Increment losses counter
    //Prompt "play again?"