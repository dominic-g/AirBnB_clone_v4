// Event listener for checkbox changes
$(document).ready(function () {
  const states = {};
  const cities = {};
  const amenities = {};

  // Event listener for checkbox changes
  $(document).on('change', "input[type='checkbox']", function () {
    const element = $(this);
    const id = element.data('id');
    const name = element.data('name');

    if (element.parent().hasClass('locations')) {
      // Checkbox belongs to a State
      if (this.checked) {
        states[id] = name;
      } else {
        delete states[id];
      }
    } else if (element.parent().hasClass('popover')) {
      // Checkbox belongs to a City
      if (this.checked) {
        cities[id] = name;
      } else {
        delete cities[id];
      }
    }

    // Update the h4 tag inside the div Locations with the list of States or Cities checked
    const selectedLocations = Object.values(states)
      .concat(Object.values(cities))
      .join(', ');
    $('div.locations > h4').text('Selected Locations: ' + selectedLocations);
  });

  // AJAX request to fetch and display places data
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $('.places').append(
          '<article><h2>' +
            place.name +
            '</h2><div class="price_by_night"><p>$' +
            place.price_by_night +
            '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
            place.max_guest +
            '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
            place.number_rooms +
            '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
            place.number_bathrooms +
            '</p></div></div><div class="description"><p>' +
            place.description +
            '</p></div></article>'
        );
      }
    }
  });

  // Button Filters
  $('.filters > button').click(function () {
    $('.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({
        amenities: Object.keys(amenities),
        states: Object.keys(states),
        cities: Object.keys(cities)
      }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          $('.places ').append(
            '<article><h2>' +
              place.name +
              '</h2><div class="price_by_night"><p>$' +
              place.price_by_night +
              '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
              place.max_guest +
              '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
              place.number_rooms +
              '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
              place.number_bathrooms +
              '</p></div></div><div class="description"><p>' +
              place.description +
              '</p></div></article>'
          );
        }
      }
    });
  });
});
