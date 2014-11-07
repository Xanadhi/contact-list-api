$(function() {

// Render the index ie all contacts
  var displayAllContacts = function() {
  $.getJSON('http://localhost:3000/contacts', function(contacts) {
    $.each(contacts, function(index, contact) {
      $('<div>').addClass('contact-card')
      .text(contact.first_name + " " + contact.last_name)
      .data('id', contact.id)
      .appendTo("#display-contacts");
     });

    // Show the contact in a new div
    // $('.contact-card').click(function() {
    //   showContact( $(this).data('id'); );
    // });
  });
  };

displayAllContacts();

// Show an individual contact when you click on their 'card'
  $('body').off().on('click', '.contact-card', function() {
    var id = $(this).data('id');
    showContact(id);
  });

var showContact = function(id) {
  $(".display-single-card").empty();
  var contactURL = "/contacts/" + id;
  $.getJSON(contactURL, function(contact) {
    $('.skin > div').fadeOut();
    $('#display-single').fadeIn().empty();
    $("#display-single").append(
      $('<div>').addClass('display-single-card')
    );
    $(".display-single-card").data('id', contact.id)
      .append(
      $('<h2>').text(contact.first_name + " " + contact.last_name),
      $('<img src=' + contact.profile_image + ' />'),
      $('<p>').text("Relationship: " + contact.relationship),
      $('<p>').text("Email: " + contact.email),
      $('<p>').text("Street: " + contact.street),
      $('<p>').text("City: " + contact.city),
      $('<p>').text("Province: " + contact.province),
      $('<p>').text("Postal Code: " + contact.postalcode),
      $('<button>').text("Edit").addClass('edit-me button tiny'),
      $('<button>').text("Delete").addClass('delete-me button tiny')
    );
  });
  $('#display-single').off().on('click', '.edit-me', function(event) {
    event.stopPropagation();
    editContact(contactURL);
  });
};

// Show the edit form, the click method is bound to the show individual contact function
  var editContact = function(url) {
    // var contactURL = "/contacts/" + id;
    console.log( "The url is " + url )

    $('.skin > div').fadeOut();
    $('#display-edit-form').fadeIn('slow');

    $.getJSON(url, function(contact) {
      $('#edits-form input[name=first_name]')
      .val(contact.first_name);
      $('#edits-form input[name=last_name]')
      .val(contact.last_name);
      $('#edits-form input[name=relationship]')
      .val(contact.relationship);
      $('#edits-form input[name=email]')
      .val(contact.email);
      $('#edits-form input[name=street]')
      .val(contact.street);
      $('#edits-form input[name=city]')
      .val(contact.city);
      $('#edits-form input[name=province]')
      .val(contact.province);
      $('#edits-form input[name=postalcode]')
      .val(contact.postalcode);
      $('#edits-form input[name=profile_image]')
      .val(contact.profile_image);
    });
  };


// Edit a contact
  $( '#edits-form' ).submit(function( event ) {
    event.preventDefault();
    var formdata = $(this).serialize();
    var editContactID = $('.display-single-card').data('id');
    var editContactURL = '/contacts/' + editContactID;
    $.ajax({
      url: editContactURL,
      data: formdata,
      type: 'PATCH',
      success: function(result) {
        alert("Contact has been updated.");
        $('#display-contacts').empty();
        displayAllContacts();
        $('.skin > div').fadeOut('slow');
        $('#display-contacts').fadeIn('slow');
      }
    });
  });

// Create a new contact and post this to the database
  $( '#contacts-form' ).submit(function( event ) {
    event.preventDefault();
    var formdata = $(this).serialize();

    $.post( '/contacts', formdata, function(data) {
    $('#display-contacts').empty();
      displayAllContacts();
      $('#display-form').fadeOut('slow');
      $('#display-contacts').fadeIn('slow');
    });
  });

// Delete a contact from within the contact card
  $( 'div' ).off().on('click', '.delete-me', function(event) {
    event.stopPropagation();
    var deleteContactID = $('.display-single-card').data('id');
    console.log(deleteContactID);
    var deleteContactURL = '/contacts/' + deleteContactID;
    $.ajax({
        url: deleteContactURL,
        type: 'DELETE',
        success: function(result) {
            alert("Contact has been deleted.");
            $('#display-contacts').empty();
            displayAllContacts();
            $('#display-single').fadeOut();
            $('#display-contacts').fadeIn();
        }
    });
  });


// Search for contact
  $('#search-form').submit(function(event) {
    event.preventDefault();
    var query = $('input').val();
    var queryURL = '/contacts/find/' + query;
    console.log("This is the search query: ", query);

  $.getJSON(queryURL, function(contacts) {
    if ( $('#display-search-results').is(':visible') == false ) {
      $('.skin > div').fadeOut();
    }

    $('#display-search-results').fadeIn().empty();
    $('<h3>').text('Search results').appendTo('#display-search-results');
    $.each(contacts, function(index, contact) {

      $('<div>').addClass('contact-card')
      .text(contact.first_name + " " + contact.last_name)
      .data('id', contact.id)
      .appendTo("#display-search-results");
      });
      // Show the contact in a new div
      $('.contact-card').click(function() {
        showContact( $(this).data('id') );
      });
    });
  });


// Nav bar actions

// Return to index
  $('#home-nav').click(function(event) {
    event.preventDefault();
    if ( $('#display-contacts').is(':visible') == false ) {
      $('.skin > div').fadeOut();
    }
    $('#display-contacts').fadeIn('slow');
  });


// Display the create contact form
  $('#form-nav').click(function(event) {
    event.preventDefault();
    if ( $('#display-form').is(':visible') == false ) {
      $('.skin > div').fadeOut();
    }
    $('#display-form').fadeIn('slow');
  });

// Display the search form
  var dir = "+=256";
  $('#find-nav').off().on("click", function(event) {
    event.preventDefault();
    dir = dir==="+=256" ? "-=256" : "+=256";
    if (dir==="-=256") {
      $('.display-search').show();
      $('.display-search').stop().animate({left: dir}, 1000);
  } else {
      $('.display-search').stop().animate({left: dir}, 1000);
      $('.display-search').fadeOut();
      }
    });

});

  // Get some values from elements on the page:
  // var $form = $(this),
  //   fname = $form.find( "input[name='first_name']" ).val(),
  //   lname = $form.find( "input[name='last_name']" ).val(),
  //   rs = $form.find( "input[name='relationship']" ).val(),
  //   em = $form.find( "input[name='email']" ).val(),
  //   str = $form.find( "input[name='street']" ).val(),
  //   ct = $form.find( "input[name='city']" ).val(),
  //   prov = $form.find( "input[name='province']" ).val(),
  //   pc = $form.find( "input[name='postalcode']" ).val(),
  //   image = $form.find( "input[name='profile_image']" ).val(),
  //   url = $form.attr( "action" );


  //   $.post( url, { 
  //     first_name: fname,
  //     last_name: lname, 
  //     relationship: rs, 
  //     email: em, 
  //     street: str, 
  //     city: ct, 
  //     province: prov,
  //     postalcode: pc,
  //     profile_image: image }, 'json' );
  // });

