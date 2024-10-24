function showDiceFace(number) {
    var dots = document.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.add('inactive-dot'));
    switch (number) {
        case 1:
            document.getElementById('dot5').classList.remove('inactive-dot');
            break;
        case 2:
            document.getElementById('dot1').classList.remove('inactive-dot');
            document.getElementById('dot9').classList.remove('inactive-dot');
            break;
        case 3:
            document.getElementById('dot1').classList.remove('inactive-dot');
            document.getElementById('dot5').classList.remove('inactive-dot');
            document.getElementById('dot9').classList.remove('inactive-dot');
            break;
        case 4:
            document.getElementById('dot1').classList.remove('inactive-dot');
            document.getElementById('dot3').classList.remove('inactive-dot');
            document.getElementById('dot7').classList.remove('inactive-dot');
            document.getElementById('dot9').classList.remove('inactive-dot');
            break;
        case 5:
            document.getElementById('dot1').classList.remove('inactive-dot');
            document.getElementById('dot3').classList.remove('inactive-dot');
            document.getElementById('dot5').classList.remove('inactive-dot');
            document.getElementById('dot7').classList.remove('inactive-dot');
            document.getElementById('dot9').classList.remove('inactive-dot');
            break;
        case 6:
            document.getElementById('dot1').classList.remove('inactive-dot');
            document.getElementById('dot3').classList.remove('inactive-dot');
            document.getElementById('dot4').classList.remove('inactive-dot');
            document.getElementById('dot6').classList.remove('inactive-dot');
            document.getElementById('dot7').classList.remove('inactive-dot');
            document.getElementById('dot9').classList.remove('inactive-dot');
            break;
    }
}

function addRestartIcon() {
    const restartIcon = document.createElement('img');
    restartIcon.src = 'restart.png';
    restartIcon.alt = 'Restart';
    restartIcon.classList.add('restart-icon');
    restartIcon.onclick = () => window.location.href = 'index.html';
    document.body.appendChild(restartIcon);
}

function triggerWinningAnimation(winningTeam) {
    const fireworksContainer = document.createElement('div');
    fireworksContainer.classList.add('fireworks-container');
    document.body.appendChild(fireworksContainer);

    for (let i = 0; i < 5; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');
        fireworksContainer.appendChild(firework);
    }

    const fireworkSound = new Audio('firework.mp3');
    fireworkSound.play();

    setTimeout(() => {
        fireworksContainer.remove();
    }, 5000);
}
// Function to change background color and sync inactive dot color
function changeBackgroundColor(color) {
	let dice = document.getElementById('dice');
	dice.style.backgroundColor = color;
	let inactiveDots = document.querySelectorAll('.inactive-dot');
	inactiveDots.forEach(dot => {
		dot.style.backgroundColor = color; // Update inactive dots to match new background
	});
}