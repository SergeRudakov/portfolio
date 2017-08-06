$(document).ready(function () {
	$('.custom-select').multiselect({
	    columns: 1,
	    search: true,
	    selectAll: true,
	    showCheckbox: true,
	    placeholder: 'Select technologies'
	});

	$( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
});