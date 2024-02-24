let v = 15;
number=document.querySelector(".number");

const arr = [];
for (let i = 0; i < v; i++) {
    arr[i] = i;
}


// creation

function showbars() {
    let section = document.querySelector("section")
    section.innerHTML = ''; //clear existing
    for (let i = 0; i < v; i++) {
        
        const bar = document.createElement("div")
        bar.style.width = "15%";
        bar.style.height = arr[i] *(100/v) + "%";
        
        bar.classList.add("bars")
        section.append(bar)
    }
}

// unsorting
unsortbar(arr);
unsortbar(arr);
async function unsort(arr) {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = 0; i < v; i++) {
        const j = Math.floor(Math.random() *v ); 
        [arr[i], arr[j]] = [arr[j], arr[i]];
        //await swapBars(arr[i],arr[j]);
        if(arr[j]==0 || arr[i]==0){
            arr[j]=10;
            
        }
    }

}




// bubble sort
async function bubbleSort() {
    let tem=document.querySelectorAll(".bars")
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v - i; j++) {
            tem[j].style.backgroundColor="green";
            
            await sleep(0.03);
            if (arr[j] > arr[j + 1]) {
                await swapBars(j, j + 1);
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
            tem[j].style.backgroundColor="white"
        }
    }
} 

const melodyNotes = [
    440, // A4
    493.88, // B4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    698.46, // F5
    
];

let currentNoteIndex = 0;

function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.type = "sine"; // Sine wave
    oscillator.frequency.value = melodyNotes[currentNoteIndex % melodyNotes.length]; // Play the next note in the melody
    gainNode.gain.value = 0.5; // Volume
    oscillator.start();
    setTimeout(function () {
        oscillator.stop();
    }, 200); // Adjust duration of each note (200ms for example)

    currentNoteIndex++;
}


async function swapBars(index1, index2) {
    let bar1 = document.querySelectorAll(".bars")[index1];
    let bar2 = document.querySelectorAll(".bars")[index2];
    bar1.classList.add("transition")
    bar2.classList.add("transition")

    await sleep(0.01)
    bar1.style.backgroundColor="red";
    bar2.style.backgroundColor="green"
    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    playSound();
    await sleep(0.02); // Adjust animation speed
    bar1.style.backgroundColor="yellow";
    bar2.style.backgroundColor="green";
    await sleep(0.02);
    bar1.style.backgroundColor="whitesmoke";
    bar2.style.backgroundColor="whitesmoke";
    bar1.classList.remove("transition")
    bar2.classList.remove("transition")

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 200));
}

function unsortbar() {
    unsort(arr);
    showbars();
}
async function check(){
    let bars=document.querySelectorAll(".bars")
    for(let i=0;i<bars.length;i++){
        bars[i].style.backgroundColor="green"
        playSound();
        await sleep();
        bars[i].style.backgroundColor="whitesmoke"
    }
}
async function sortbar() {
    await bubbleSort();
    showbars();
    check();
}

// assigning to button
const unsorting = document.querySelector(".Unsort");
unsorting.addEventListener("click", unsortbar);

const Sort = document.querySelector(".sort");
Sort.addEventListener("click", sortbar);

console.log(arr)
