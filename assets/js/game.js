//To do list:
//onscreen buttons for mobile use CHECK
//intro screen/victory screen/game over screen
//make game an object
//disable non-letter keys from responses CHECK
//fix "-" and "'" issue
//fix capitalization



//variables
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
                "saint kitts and nevis","saint lucia","saint vincent and the grenadines","sudan","suriname","swaziland","sweden","switzerland",
                "syria","taiwan","tajikistan","tanzania","thailand","togo","tonga","trinidad and tobago","tunisia","turkey","turkmenistan",
                "tuvalu","uganda","ukraine","uruguay","united arab emirates","united kingdom","united states of america","uzbekistan",
                "vanuatu","vatican city","venezuela","vietnam","yemen","zambia","zimbabwe"]
    
// defalut letter array
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
                "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
//changing array
var unGuessedLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", 
                        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
//the randomly chosen country
var answer;
//the name of the country properly capitalized to appear on-screen
var caseAnswer;
//the name of the country hidden, represented by blanks
var blanks;
//the name of the country formatted to replace the blanks
var secretAnswer;
var lives;
var score= 0;
var victorySong = document.getElementById("anthem");


//functions
//function to let us check whether a letter is in our word
function checkLetter(char) {
    //If the chosen letter is not in our word, lose a life
if (answer.indexOf(char) === -1) {
    lives--;
    document.querySelector("#lives").innerHTML = "Lives Remaining: " + lives;
    //if we run out of lives, we lose.
    if (lives === 0){gameOver()};
    //otherwise, game continues
}
//If the chosen letter is in our word:
else {for (var j = 0; j<secretAnswer.length; j++){
    //replace all instances of that letter in our blanks with the letter
    if (secretAnswer.charAt(j) === char){
        blanks = setCharAt(blanks, j, secretAnswer.charAt(j));
        console.log(blanks);        
    }
    //and update the screen
    document.querySelector("#target").innerHTML = blanks;
}
    //then, if our word is complete, go to victory,
    if (blanks === secretAnswer){youWin()};
    //otherwise, game continues

}  
//Disable the key from future guesses
    document.getElementById(char).disabled=true;
    unGuessedLetters[letters.indexOf(char)] = "_";
}
//function to let us update our blanks with chosen letters at the correct place
function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}
//function to bring up our game over screen
function gameOver(){
    //Display game over message
    //Prompt "play again?"
    document.write("Game Over! The answer was " + answer + ". Reload the page to play again");
}
//and a function to bring up our victory screen
function youWin(){
    //Increment wins counter
    score++;
    document.querySelector("#score").innerHTML = "Score: " + score;
    //Display the flag of the chosen country and play the national anthem
    document.querySelector("#correct").innerHTML = answer;
    document.querySelector("#anthem").src = "assets/sounds/" + answer + ".mp3";
    document.querySelector("#flag").src = "assets/images/" + answer + ".svg";
    victorySong.play();
    document.getElementById("victoryScreen").style.visibility = "visible";
    //disable all keystrokes and buttons
    for (var m = 0; m<letters.length; m++) {
        document.getElementById(letters[m]).disabled=true;
        unGuessedLetters[m] = "_";
    }
    document.getElementById("start").style.visibility = "visible";
    document.querySelector("#start").innerHTML = "Next";
}
//start
function loadCountry() {
    //hide the start button
    document.getElementById("start").style.visibility = 'hidden';
    //reset the un-guessed letters for keystrokes and enable all the letter buttons
    for (var k = 0; k<letters.length; k++) {
        document.getElementById(letters[k]).disabled=false;
        unGuessedLetters[k] = letters[k];
    }
    //choose a random word from the array of possible words
    answer = countries[Math.floor(Math.random() * countries.length)];
        //or the debug version
        //answer = prompt("pick a country to test");
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
    lives = 6;
    document.querySelector("#lives").innerHTML = "Lives Remaining: " + lives;
}

//wait for a keypress or button click
document.onkeyup = function(event) {
    console.log(event.key);
    //chosen = unGuessedLetters.indexOf(event.key);
    //only do a thing for letter keys
    if (unGuessedLetters.indexOf(event.key) === -1){
        //do nothing
    }
    else {checkLetter(event.key);}
    }