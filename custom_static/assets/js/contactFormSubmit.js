// Define the URL of the Google Cloud Function
const cloudFunctionUrl = 'http://127.0.0.1:5001/sit378-75044/us-central1/storeDataInFirestore';

// Function to handle form submission
function submitToCloudFunction(event) {
    // Prevent the default form submit behavior
    event.preventDefault();

    // Create a new timestamp
    // const timestamp = new Date().toISOString(); // ISO string format

    const now = new Date();
    // Format the date as MM-DD-YYYY
    const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${now.getFullYear()}`;

    // Gather data into an object
    const formData = {
        fullName: document.getElementById('fullName').value,
        emailAddress: document.getElementById('emailAddress').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('questionsAndQueries').value,
        timestamp: timestamp
    };

    // Use fetch to send the request
    fetch(cloudFunctionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // If needed, add your Google Cloud Function's expected authentication headers here
        },
        body: JSON.stringify(formData), // Convert the data object to a JSON string
    })
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        console.log('Success:', data);
        console.log('Document ID:', data.id);
        alert('Your form has been submitted successfully.');
        // Clear the form if the submission was successful
        document.getElementById('contactForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again later.');
    });
}

// Add event listener to the form
document.getElementById('contactForm').addEventListener('submit', submitToCloudFunction);
