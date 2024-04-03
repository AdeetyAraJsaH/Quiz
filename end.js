const username=document.getElementById('username');
const saveScoreBtn=document.getElementById('saveScoreBtn');
const finalScore=document.getElementById('finalScore');

const mostRecentScore=localStorage.getItem("mostRecentScore");

const highScores=JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES=5;

finalScore.innerText=mostRecentScore;

saveScoreBtn.disabled=true;
username.addEventListener("keyup", () => {
    saveScoreBtn.disabled=!username.value;
});

saveHighScore = e => {
    console.log('clicked to save score');
    e.preventDefault();
    
    const scoreProfile={
        score:Math.floor(Math.random()*100),
        username:username.value
    };
    highScores.push(scoreProfile);
    highScores.sort(commpareScores=(a,b)=>{return a.score<b.score?1:-1});
    console.log(highScores);
    highScores.splice(5);
    // console.log(highScores);
    localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.assign('/');
};


