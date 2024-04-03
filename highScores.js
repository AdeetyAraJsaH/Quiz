const highScoresList = document.getElementById('high-score');
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);
highScoresList.innerHTML = highScores.map(score => {
    return `<tr class="highScore-item">
                <td>${score.username}</td>
                <td>${score.score}</td>
            </tr>`;
}).join(""); 
