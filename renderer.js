// Import and initialize the Elastic APM RUM agent
const apm = require('@elastic/apm-rum');
const apmAgent = apm.init({
  serviceName: 'electronjs-sample-app',
  serverUrl: '<insert-apm-server-url>', // Replace with your Elasticsearch APM server URL
  serviceVersion: '1.0.0',
  environment: 'test-env'
  // Add other configuration options as needed
});

// Function to simulate an API call
function simulateApiCall() {
  // Start a custom transaction
  const transaction = apmAgent.startTransaction('api-call', 'custom');
  
  // Simulate an API call with a delay
  setTimeout(() => {
    // End the transaction
    transaction.end();
  }, 2000); // Simulate 2 seconds of processing
}

// Function to simulate a background process
function simulateBackgroundProcess() {
  // Start a custom transaction
  const transaction = apmAgent.startTransaction('background-process', 'custom');
  
  // Simulate a background task with a delay
  setTimeout(() => {
    // End the transaction
    transaction.end();
  }, 3000); // Simulate 3 seconds of processing
}

// Add event listeners to buttons
document.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');

    // Existing button
    document.getElementById('myButton').addEventListener('click', () => {
      ipcRenderer.send('button-click');
    });

    // New button for API call simulation
    document.getElementById('apiButton').addEventListener('click', () => {
      simulateApiCall();
    });

    // New button for background process simulation
    document.getElementById('backgroundButton').addEventListener('click', () => {
      simulateBackgroundProcess();
    });

    // New button to create an error
    document.getElementById('errorButton').addEventListener('click', () => {
      try {
        throw new Error('Simulated error');
      } catch (err) {
        apmAgent.captureError(err);
      }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');
  
    document.getElementById('myButton').addEventListener('click', () => {
      ipcRenderer.send('button-click');
    });
  });
  