const today = new Date();
    
    // Add one day to today's date to get tomorrow
    today.setDate(today.getDate() + 1);

    // Format the date as yyyy-mm-dd
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    // Set the 'min' attribute to tomorrow's date
    document.getElementById('tanggal').setAttribute('min', `${yyyy}-${mm}-${dd}`);

setTimeout (function(){
    $(document).ready(function() {
        $("#bookingForm").on("submit", function(e) {
            e.preventDefault(); // Prevent the form from reloading the page
    
            // Serialize form data
            var formData = $(this).serialize();
    
            // Send an AJAX request to the backend
            $.ajax({
                type: "POST",
                url: "booking.php", // Your PHP script to handle the form
                data: formData,

                // type: "POST",
                // url: "https://api.web3forms.com/submit",
                // data: formData,
                success: function(response) {
                    console.log("Success: " + response);
                    // Show success message
                    document.getElementById("message").innerHTML = "<p>Submitted, wait for our respond to your e-mail</p>"
                    
                    document.getElementById("responseMessage").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("responseMessage").style.display = "none";
                    },2500);
                },
                error: function(xhr, status, error) {
                    console.log("Error: " + xhr.responseText);
                    // Show error message
                    document.getElementById("message").innerHTML = "<p>Failed!</p>"

                    // document.getElementById("responseMessage").classList.add = "show";
                    // document.getElementById("responseMessage").style.display = "block";
                    
                    // setTimeout(function() {
                    //     document.getElementById("responseMessage").classList.remove = "show";
                    //     setTimeout (function() {
                    //         document.getElementById("responseMessage").style.display = "none";
                    //     },1000)
                    // },2000);
                   
                    document.getElementById("responseMessage").style.display = "block";
                    setTimeout(function() {
                        document.getElementById("responseMessage").style.display = "none";
                    },2500);
                }
            });
        });
    });

},500)

