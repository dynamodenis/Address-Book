function contacts(first,last){
    this.Firstname=first;
    this.Lastname=last;
    this.addresses=[];
}
function Adress(street,city,county){
    this.streetName=street;
    this.cityName=city;
    this.countyName=county;
}
contacts.prototype.fullName = function() {
    return this.Firstname + " " + this.Lastname;
  }
  
$(document).ready(function(){
    //  Note that it should not reside in the form submit listener callback function. 
    // This is because the button must be functional before we submit the form; 
    // after all, if the user wants to add two different addresses to a Contact, 
    // they'll need to be able to hit the "Another Address" button to receive more 
    // address form fields before submitting the form to create the new Contact.
    // using the + operator to concatenate them, as you see above
    // For further readability, we keep the spacing and indentation the same as our other HTML.
    $("#add-address").click(function() {
        $("#new-addresses").append('<div class="new-address">' +
                                     '<div class="form-group">' +
                                       '<label for="new-street">Street</label>' +
                                       '<input type="text" class="form-control new-street">' +
                                     '</div>' +
                                     '<div class="form-group">' +
                                       '<label for="new-city">City</label>' +
                                       '<input type="text" class="form-control new-city">' +
                                     '</div>' +
                                     '<div class="form-group">' +
                                       '<label for="new-county">County</label>' +
                                       '<input type="text" class="form-control new-county">' +
                                     '</div>' +
                                   '</div>');
      });
    //   The submit button when clicked;
    $('form#new-contact').submit(function(event){
        event.preventDefault();
        var firstname=$('#new-first-name').val();
        var lastname=$('#new-last-name').val();

        var contact=new contacts(firstname,lastname);
        $(".new-address").each(function() {
            var inputtedStreet = $(this).find("input.new-street").val();
            var inputtedCity = $(this).find("input.new-city").val();
            var inputtedCounty = $(this).find("input.new-county").val();
            var newAddress = new Adress(inputtedStreet, inputtedCity, inputtedCounty);
            contact.addresses.push(newAddress);
          });

        $("ul#contacts").append("<li><span class='contact'>" + contact.fullName() + "</span></li>")

        $(".contact").last().click(function() {
            $("#show-contact").show();
            $("#show-contact h2").text(contact.fullName());
            $(".first-name").text(contact.Firstname);
            $(".last-name").text(contact.Lastname);
            $("ul#addresses").text("");
            contact.addresses.forEach(function(address) {
            $("ul#addresses").append("<li>" + address.streetName + ", " + address.cityName + ", " + address.countyName + "</li>");
            });
          });  
            $("input#new-first-name").val("");
            $("input#new-last-name").val("");
            $("input.new-street").val("");
            $("input.new-city").val("");
            $("input.new-county").val("");
          
    });
});