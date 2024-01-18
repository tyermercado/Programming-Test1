function submitSurvey() {
    const answers = {
        Q1: document.getElementById('q1').value,
        Q2: document.getElementById('q2').value,
        Q3: document.getElementById('q3').value
    };

    // Send answers to the server
    fetch('/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Survey submitted successfully:', data);
    })
    .catch(error => {
        console.error('Error submitting survey:', error);
    });
}
