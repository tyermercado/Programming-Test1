let surveyAnswers = {};

function setAnswer(question, value) {
    surveyAnswers[question] = value;
}

function submitSurvey() {
    // Check if all questions have been answered
    if (Object.keys(surveyAnswers).length !== 3) {
        alert('Please answer all questions before submitting.');
        return;
    }

    // Send answers to the server
    fetch('/submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyAnswers),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Survey submitted successfully:', data);
    })
    .catch(error => {
        console.error('Error submitting survey:', error);
    });
}
