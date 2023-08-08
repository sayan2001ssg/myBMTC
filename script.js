// Get the necessary elements
var scanButton = document.getElementById('scan-button');
var videoContainer = document.getElementById('video-container');
var video = document.getElementById('video');
var loadingModal = document.getElementById('loading-modal');
var modal = document.getElementById('modal');
var modalButton = document.getElementById('modal-button');
var overlay = document.getElementById('overlay');
var resultDiv = document.getElementById('result'); // Added result div
let currentStream = null;

// Function to open the camera and scan QR code
async function openCamera() {
  try {
    if (currentStream) {
      // If there's an existing stream, stop and release it
      currentStream.getTracks().forEach(track => track.stop());
    }
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    currentStream = stream; // Store the new stream

    video.srcObject = stream;
    video.play();
    videoContainer.style.display = 'block';
    overlay.classList.add('active');
    
    
    video.addEventListener('loadedmetadata', () => {
      const canvas = document.createElement('canvas');
      const canvasContext = canvas.getContext('2d', { willReadFrequently: true });

      const scanQRCode = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          const qrText = code.data;
          const partToDisplay = qrText.match(/KA\d{2}[A-Z]\d{4}/);

          if (partToDisplay) {
            const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            resultDiv.textContent = "Last Validate time : " + currentTime + "\b\b\bBMTC BUS  " + partToDisplay[0]; // Update resultDiv with scanned bus number and current time
            // Close camera and reveal previous HTML content
            video.style.display = 'none';
            videoContainer.style.display = 'none';
            overlay.classList.remove('active');
            stream.getTracks().forEach(track => track.stop());

            // Show the loading modal for 3 seconds
            loadingModal.style.display = 'block';
            overlay.classList.add('active');
            setTimeout(() => {
              loadingModal.style.display = 'none';
              modal.style.display = 'block'; // Display the success modal
              overlay.classList.add('active'); // Apply the overlay for background blur
            }, 3000); // Adjust the duration as needed
          } else {
            resultDiv.textContent = "No Internet";
            requestAnimationFrame(scanQRCode);
          }
        } else {
          requestAnimationFrame(scanQRCode);
        }
      };

      scanQRCode();
    });
  } catch (error) {
    console.error('Error accessing the camera: ', error);
    resultDiv.textContent = 'Error accessing the camera.';
  }
}

scanButton.addEventListener('click', openCamera);

modalButton.addEventListener('click', function() {
  modal.style.display = 'none'; // Hide the success modal
  overlay.classList.remove('active'); // Remove the overlay for background blur
});
