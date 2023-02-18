var highScores = document.getElementById('highScores');
var tempScores = JSON.parse(localStorage.getItem('highscores'));
var scores = tempScores.sort((a , b) => b.savedScore - a.savedScore);

for (var i = 0; i < 10; i++) {
    var topTenArea = document.createElement('ul');
    topTenArea.id = "topTen";

    var topTen = document.createElement('li');
    topTen.textContent = `${scores[i].initials}............${scores[i].savedScore}`;

    highScores.appendChild(topTenArea);
    topTenArea.appendChild(topTen);
}