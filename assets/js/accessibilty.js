// Read Aloud Button
const readAloudButton = document.getElementById('read-aloud');

// Add click event listener to the button
readAloudButton.addEventListener('click', function() {
    // Select all elements whose text content you want to read aloud
    const elementsToRead = document.querySelectorAll('h1, h2, h3, p, li, a, span, button, label');

    // Initialize speech synthesis utterance
    const speech = new SpeechSynthesisUtterance();

    // Concatenate text content from selected elements
    let textToRead = '';
    elementsToRead.forEach(element => {
        textToRead += element.textContent + ' ';
    });

    // Set the text to read aloud
    speech.text = textToRead;

    // Use default voice
    speechSynthesis.speak(speech);
});
