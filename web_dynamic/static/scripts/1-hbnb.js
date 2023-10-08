$(document).ready(function () {
  // Initialize an empty list to store selected amenity IDs
  const selectedAmenities = [];

  // Listen for changes on each input checkbox tag
  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data('id'); // Get the Amenity ID from data-id attribute
    // const amenityName = $(this).data('name'); // Get the Amenity name from data-name attribute

    if ($(this).prop('checked')) {
      // Checkbox is checked, add the Amenity ID to the list
      selectedAmenities.push(amenityId);
    } else {
      // Checkbox is unchecked, remove the Amenity ID from the list
      const index = selectedAmenities.indexOf(amenityId);
      if (index !== -1) {
        selectedAmenities.splice(index, 1);
      }
    }

    // Update the h4 tag inside the div Amenities with the list of Amenities checked
    const amenitiesText = selectedAmenities
      .map(function (amenityId) {
        return $('input[data-id="' + amenityId + '"]').data('name');
      })
      .join(', ');

    $('.amenities h4').text('Selected Amenities: ' + amenitiesText);
  });
});
