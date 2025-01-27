let v =  15;
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
async function unsort(arr) {
    // Fisher-Yates (Knuth) shuffle algorithm
    for (let i = 0; i < v; i++) {
        const j = Math.floor(Math.random() *v ); 
        [arr[i], arr[j]] = [arr[j], arr[i]];
        if(arr[j]==0 || arr[i]==0){
            arr[j]=v;   
        }
    }
    showbars(); // Show bars after unsorting
}





// Function to perform quicksort
async function quickSort(arr, low, high) {
    if (low < high) {
        // Partition the array and get the pivot index
        let pivotIndex = await partition(arr, low, high);

        // Recursively sort the sub-arrays before and after the pivot
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

// Function to partition the array
async function partition(arr, low, high) {
    let pivot = arr[high]; // Choose the pivot element (here, we choose the last element)
    let i = low - 1; // Initialize the index of the smaller element

    for (let j = low; j < high; j++) {
        // If the current element is smaller than the pivot
        if (arr[j] < pivot) {
            i++; // Increment index of smaller element
            await swap(arr, i, j); // Swap arr[i] and arr[j]
        }
    }
    
    await swap(arr, i + 1, high); // Swap arr[i + 1] and arr[high], to place pivot at its correct position
    return i + 1; // Return the pivot index
}

// Function to swap two elements in an array
// Function to swap two elements in an array and update visual representation
async function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    // Swap bars visually
    const bars = document.querySelectorAll(".bars");
    const bar1 = bars[i];
    const bar2 = bars[j];

    // Add transition class for animation
    bar1.classList.add("transition");
    bar2.classList.add("transition");
    bar1.style.backgroundColor = "green";
    bar2.style.backgroundColor = "red";

    // Swap heights
    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;

    // Change colors to indicate swapping
    bar1.style.backgroundColor = "red";
    bar2.style.backgroundColor = "green";

    // Play sound effect
    playSound();

    // Wait for animation to complete
    await sleep(0.2);

    // Restore colors
    bar1.style.backgroundColor = "whitesmoke";
    bar2.style.backgroundColor = "whitesmoke";

    // Remove transition class
    bar1.classList.remove("transition");
    bar2.classList.remove("transition");
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




function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 900));
}

async function unsortbar() {
    unsort(arr);
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
    await quickSort(arr, 0, v - 1); // Call quickSort directly
    showbars()
    check()
    console.log("Sorted Array:", arr); // Output sorted array
}


// assigning to button
const unsorting = document.querySelector(".Unsort");
unsorting.addEventListener("click", unsortbar);

const Sort = document.querySelector(".sort");
Sort.addEventListener("click", sortbar);

var Code=document.querySelector(".code")

// for c
const c=document.getElementById("c")
c.addEventListener("click",inner_c);
inner_c()
async function inner_c(){
    var paragraph = document.createElement("p");

    // Set the text content of the paragraph
    paragraph.innerHTML = "Here's the QuickSort algorithm implemented in C:<br><br>" +
    "<code>" +
    "<span class='keyword'>void</span> <span class='h1title'>swap</span>(<span class='keyword'>int</span> *a, <span class='keyword'>int</span> *b) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;int t = *a;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;*a = *b;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;*b = t;<br>" +
    "}<br><br>" +
    "<span class='keyword'>int</span> <span class='h1title'>swap</span>(<span class='keyword'>int</span> array[], <span class='keyword'>int</span> low, <span class='keyword'>int</span> high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> pivot = array[high];<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> i = (low - 1);<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (<span class='keyword'>int</span> j = low; j < high; j++) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (array[j] <= pivot) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='h1title'>swap</span>(&array[i], &array[j]);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='h1title'>swap</span>(&array[i + 1], &array[high]);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;return (i + 1);<br>" +
    "}<br><br>" +
    "<span class='keyword'>void</span> <span class='h1title'>quicksort</span>(<span class='keyword'>int</span> array[], <span class='keyword'>int</span> low, <span class='keyword'>int</span> high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (low < high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> pi = partition(array, low, high);<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quickSort(array, low, pi - 1);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quickSort(array, pi + 1, high);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
    "}<br>" +
    "</code>";

    Code.innerHTML="";
    Code.appendChild(paragraph);

}
console.log(arr)

// for cpp
const cpp=document.getElementById("cpp")
cpp.addEventListener("click",inner_cpp);

async function inner_cpp(){
    var paragraph = document.createElement("p");
    paragraph.innerHTML="Here's the QuickSort algorithm implemented in C++:<br><br>" +
    "<code>" +
    "<span class='keyword'>void</span> <span class='h1title'>swap</span>(<span class='keyword'>int</span>& a, <span class='keyword'>int</span>& b) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> t = a;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;a = b;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;b = t;<br>" +
    "}<br><br>" +
    "<span class='keyword'>int</span> <span class='h1title'>swap</span>(<span class='keyword'>int</span> array[], <span class='keyword'>int</span> low, <span class='keyword'>int</span> high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> pivot = array[high];<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> i = (low - 1);<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (<span class='keyword'>int</span> j = low; j < high; j++) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (array[j] <= pivot) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='h1title'>swap</span>(array[i], array[j]);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='h1title'>swap</span>(array[i + 1], array[high]);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>return</span> (i + 1);<br>" +
    "}<br><br>" +
    "<span class='keyword'>void</span> <span class='h1title'>quicksort</span>(<span class='keyword'>int</span> array[], <span class='keyword'>int</span> low, <span class='keyword'>int</span> high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (low < high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>int</span> pi = partition(array, low, high);<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='h1title'>quicksort</span>(array, low, pi - 1);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='h1title'>quicksort</span>(array, pi + 1, high);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
    "}<br>" +
    "</code>";
    Code.innerHTML="";
    Code.appendChild(paragraph);
}
// clear the code
function clearCodeElement() {
    var codeElement = document.getElementById("Code");
    codeElement.innerHTML = ""; // Clear the content
}

// Clear the content of the code element

// for pyton
const py=document.getElementById("py")
py.addEventListener("click",inner_py);
async function inner_py() {
    
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Here's the QuickSort algorithm implemented in Python:<br><br>" +
        "<code>" +
        " <span class='keyword'>def</span> <span class='h1title'>partition</span>(array, low, high):<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;pivot = array[high]<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;i = low - 1<br><br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;for j in range(low, high):<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> array[j] <= pivot:<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i += 1<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;array[i], array[j] = array[j], array[i]<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;array[i + 1], array[high] = array[high], array[i + 1]<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>return</span> i + 1<br><br>" +
        " <span class='keyword'>def</span> <span class='h1title'>quicksort</span>(array, low, high):<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> low < high:<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pi = partition(array, low, high)<br><br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quicksort(array, low, pi - 1)<br>" +
        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quicksort(array, pi + 1, high)<br>" +
        "</code>";

    Code.innerHTML="";
    Code.appendChild(paragraph);
}
//  for JS
const js=document.getElementById("js")
js.addEventListener("click",inner_js);

async function inner_js() {
    var paragraph = document.createElement("p");
    paragraph.innerHTML = "Here's the QuickSort algorithm implemented in JavaScript:<br><br>" +
    "<code>" +
    "<span class='keyword'>function</span> <span class='h1title'>partition</span>(array, low, high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>let</span> pivot = array[high];<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>let</span> i = low - 1;<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>for</span> (<span class='keyword'>let</span> j = low; j < high; j++) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (array[j] <= pivot) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;i++;<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[array[i], array[j]] = [array[j], array[i]];<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;}<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;[array[i + 1], array[high]] = [array[high], array[i + 1]];<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>return</span> i + 1;<br>" +
    "}<br><br>" +
    "<span class='keyword'>function</span> <span class='h1title'>quicksort</span>(array, low, high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>if</span> (low < high) {<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='keyword'>let</span> pi = partition(array, low, high);<br><br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quicksort(array, low, pi - 1);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;quicksort(array, pi + 1, high);<br>" +
    "&nbsp;&nbsp;&nbsp;&nbsp;}<br>" +
    "}<br>" +
    "</code>";

    // Clear previous code
    
    Code.innerHTML="";
    Code.appendChild(paragraph);
}
