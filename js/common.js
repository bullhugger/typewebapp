$(function() {
  SetFilter();
  $('#frmFilter').not('button').click(function(e) {
    e.stopPropagation();
  });
  $('#chkSelectAll').click(function() {
    $('input[type="checkbox"][name="entry_select[]"]').prop('checked', this.checked);
    CountCheckbox();
  })

  $('input[type="checkbox"][name="entry_select[]"]').change(function() {
    CountCheckbox();
  });
});

function InitFileInput() {
  $('.file-input').change(function() {
    var filename = $(this).val().split("\\");
    $($(this).data("label")).html(filename[filename.length - 1]); 
  })
}

function SetFilter() {
  $('#frmFilter').html($('#frmMyFilter').html());
}

function CountCheckbox() {
  var count = $('input[type="checkbox"][name="entry_select[]"]:checked').length;
  if(count) {
    $('#lblCheck').html(count + ' entries selected.');
  }
  else {
    $('#lblCheck').empty();
  }
}
