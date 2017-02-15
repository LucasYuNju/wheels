window.modal = function({
  title,
  message,
  buttons = {
    Cancel: {
      label: '取消'
    }
  },
  parentSelector = 'body',
}) {
  const template = `
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header"><b>Header</b></div>
        <div class="modal-body">Content</div>
        <div class="modal-footer"></div>
      </div>
    </div>
  `;
  const $modal = $(template);
  $modal.find('.modal-header').text(title);
  $modal.find('.modal-body').text(message);
  for(let key in buttons) {
    const $button = $(`<button data-label="${key}">${buttons[key].label}</button>`);
    $modal.find('.modal-footer').append($button);
  }

  $(parentSelector).append($modal);

  $('.modal .modal-footer button').one('click', function(e) {
    console.log('button clicked', e.currentTarget.dataset.label);
    $('.modal').remove();
  });
}
