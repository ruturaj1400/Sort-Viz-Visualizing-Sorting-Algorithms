let v = 10;
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
            
            await sleep(0.1);
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
    gainNode.gain.value = 0.8; // Volume
    oscillator.start();
    setTimeout(function () {
        oscillator.stop();
    }, 150); // Adjust duration of each note (200ms for example)

    currentNoteIndex++;
}


async function swapBars(index1, index2) {
    let bar1 = document.querySelectorAll(".bars")[index1];
    let bar2 = document.querySelectorAll(".bars")[index2];
    bar1.classList.add("transition")
    bar2.classList.add("transition")

    await sleep(0.1)
    bar1.style.backgroundColor="red";
    bar2.style.backgroundColor="green"
    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    playSound();
    await sleep(0.2); // Adjust animation speed
    bar1.style.backgroundColor="yellow";
    bar2.style.backgroundColor="green";
    await sleep(0.2);
    bar1.style.backgroundColor="whitesmoke";
    bar2.style.backgroundColor="whitesmoke";
    bar1.classList.remove("transition")
    bar2.classList.remove("transition")

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 100));
}

function unsortbar() {
    unsort(arr);
    showbars();
}
async function check(){
    let bars=document.querySelectorAll(".bars")
    for(let i=0;i<bars.length;i++){
        bars[i].style.backgroundColor="green"
        await sleep(0.1);
        playSound();
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

const Code = document.querySelector(".code");

// Event listener for the button
const js = document.getElementById("js");
js.addEventListener("click", inner_bubble_sort);

// Function to display Bubble Sort algorithm implemented in JavaScript
async function inner_bubble_sort() {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Here's the Bubble Sort algorithm implemented in JavaScript:<br><br>" +
        "<code>" +
        "<span class='keyword'>function</span> <span class='h1title'>bubbleSort</span>(array) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>var</span> len = array.length;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>var</span> swapped;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>do</span> {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped = <span class='keyword'>false</span>;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (<span class='keyword'>var</span> i = 0; i < len - 1; i++) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (array[i] > array[i + 1]) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[array[i], array[i + 1]] = [array[i + 1], array[i]];<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;swapped = <span class='keyword'>true</span>;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;} <span class='keyword'>while</span> (swapped);<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>return</span> array;<br>" +
        "}<br><br>" +
        "<span class='keyword'>var</span> arr = [64, 34, 25, 12, 22, 11, 90];<br>" +
        "bubbleSort(arr);<br>" +
        "console.log('Sorted array: ' + arr);<br>" +
        "</code>";

    // Clear previous code
    Code.innerHTML = "";

    // Append the paragraph to the content div
    Code.appendChild(paragraph);
}

// for c


// Event listener for the button
const c = document.getElementById("c");
c.addEventListener("click", inner_c);

// Function to display Bubble Sort algorithm implemented in C
async function inner_c() {
    var paragraph = document.createElement("p");

    // Set the text content of the paragraph
    paragraph.innerHTML = "Here's the Bubble Sort algorithm implemented in C:<br><br>" +
        "<code>" +
        "<span class='keyword'>void</span> <span class='h1title'>bubbleSort</span>(<span class='keyword'>int</span> arr[], <span class='keyword'>int</span> n) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> i, j;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> temp;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (i = 0; i < n-1; i++)<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;{<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (j = 0; j < n-i-1; j++)<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (arr[j] > arr[j+1])<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;temp = arr[j];<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j] = arr[j+1];<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j+1] = temp;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "}<br>" +
        "<br>" +
        "</code>";

    // Clear previous code
    Code.innerHTML = "";

    // Append the paragraph to the code element
    Code.appendChild(paragraph);
}

// for cpp
// Event listener for the button
const cppButton = document.getElementById("cpp");
cppButton.addEventListener("click", inner_cpp);

// Function to display Bubble Sort algorithm implemented in C++
async function inner_cpp() {
    var paragraph = document.createElement("p");

    // Set the text content of the paragraph
    paragraph.innerHTML = "Here's the Bubble Sort algorithm implemented in C++:<br><br>" +
        "<code>" +
        "<span class='keyword'>void</span> <span class='h1title'>bubbleSort</span>(<span class='keyword'>int</span> arr[], <span class='keyword'>int</span> n) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (int i = 0; i < n-1; i++) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (int j = 0; j < n-i-1; j++) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (arr[j] > arr[j+1]) {<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;int temp = arr[j];<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j] = arr[j+1];<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j+1] = temp;<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
        "}<br><br>" +
         
        "</code>";

    // Clear previous code
    var codeElement = document.querySelector(".code");
    codeElement.innerHTML = "";

    // Append the paragraph to the code element
    codeElement.appendChild(paragraph);
}
 
// for py
// Event listener for the button
const pyButton = document.getElementById("py");
pyButton.addEventListener("click", inner_py);

// Function to display Bubble Sort algorithm implemented in Python
async function inner_py() {
    var paragraph = document.createElement("p");

    // Set the text content of the paragraph
    paragraph.innerHTML = "Here's the Bubble Sort algorithm implemented in Python:<br><br>" +
        "<code>" +
        "<span class='keyword'>def</span> <span class='h1title'>bubbleSort</span>(arr):<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;n = len(arr)<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;for i in range(n):<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for j in range(0, n-i-1):<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> arr[j] > arr[j+1]:<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[j], arr[j+1] = arr[j+1], arr[j]<br>" +
        "<br>" +
        
        "</code>";

    // Clear previous code
    var codeElement = document.querySelector(".code");
    codeElement.innerHTML = "";

    // Append the paragraph to the code element
    codeElement.appendChild(paragraph);
}
inner_c()