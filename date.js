var today = new Date();

var optionsDay = { day: '2-digit' };
var twoDigitDay = today.toLocaleDateString('en-US', optionsDay);

// Get short month
var optionsMonth = { month: 'short' };
var shortMonth = today.toLocaleDateString('en-US', optionsMonth);

// Get year
var optionsYear = { year: 'numeric' };
var year = today.toLocaleDateString('en-US', optionsYear);

var time = "06:05 AM";
var vfrom = "12:00 AM";
var vtill = "11:59 PM";
console.log(twoDigitDay+' '+shortMonth+' '+year+', '+time);

// Display the formatted date in three separate <p> tags
document.getElementById('date1').textContent = twoDigitDay+' '+shortMonth+' '+year+', '+time;
document.getElementById('date2').textContent = twoDigitDay+' '+shortMonth+' '+year+', '+vfrom;
document.getElementById('date3').textContent = twoDigitDay+' '+shortMonth+' '+year+', '+vtill;

var images = ["qrcode.png", "qrcode2.png", "qrcode3.png", "qrcode4.png", "qrcode5.png"];
var currentIndex = 0;
        
function changeImage() {
    var img = document.getElementById("image");
    img.src = images[currentIndex];
    
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; // Reset to the first image
    }
    
    setTimeout(changeImage, 1000); // Change image every 1 second
}
