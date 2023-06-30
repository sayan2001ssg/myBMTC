// Get the necessary elements
var scanButton = document.getElementById('scan-button');
var videoContainer = document.getElementById('video-container');
var video = document.getElementById('video');
var loadingModal = document.getElementById('loading-modal');
var modal = document.getElementById('modal');
var modalButton = document.getElementById('modal-button');
var overlay = document.getElementById('overlay');

var today = new Date();

var optionsDay = { day: '2-digit' };
var twoDigitDay = today.toLocaleDateString('en-US', optionsDay);

// Get short month
var optionsMonth = { month: 'short' };
var shortMonth = today.toLocaleDateString('en-US', optionsMonth);

// Get year
var optionsYear = { year: 'numeric' };
var year = today.toLocaleDateString('en-US', optionsYear);

var vtill = "11:59 PM";

// Add click event listener to the scan button
scanButton.addEventListener('click', function() {
  // Open the camera for 6 seconds
  openCamera(6000);
});

// Function to open the camera
function openCamera(duration) {
  // Open the camera
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      video.srcObject = stream;
      video.play();
      videoContainer.style.display = 'block';

      // Show the overlay
      overlay.classList.add('active');

      // Close the camera after the specified duration
      setTimeout(function() {
        closeCamera();
      }, duration);
    })
    .catch(function(error) {
      console.log('Error accessing the camera: ', error);
    });
}

// Function to close the camera
function closeCamera() {
  // Stop the camera stream
  var stream = video.srcObject;
  var tracks = stream.getTracks();
  tracks.forEach(function(track) {
    track.stop();
  });

  video.srcObject = null;
  videoContainer.style.display = 'none';

  // Show the loading modal
  loadingModal.style.display = 'block';

  // Wait for 3 seconds and then display the success modal
  setTimeout(function() {
    loadingModal.style.display = 'none';
    modal.style.display = 'block';
  }, 3000);
}
document.getElementById('date4').textContent = twoDigitDay+' '+shortMonth+' '+year+', '+vtill;
// Add click event listener to the modal button
modalButton.addEventListener('click', function() {
  // Hide the modal and overlay
  modal.style.display = 'none';
  overlay.classList.remove('active');
});
