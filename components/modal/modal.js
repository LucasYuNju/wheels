// 这里只是最简单的实现，完整的接口，应该包含显示时间，用于关闭的函数，以及被关闭时的回调函数，以及窗口宽高等
window.modal = function({
  message,
  parentSelector = 'body',
}) {
  const template = `
    <div class="modal">
      <div class="modal-content">
        <div class="message"></div>
        <span class="close-button">+</span>
      </div>
    </div>
  `;
  const $modal = $(template);
  $modal.find('.messgae').text(message);

  $(parentSelector).append($modal);

  $('.modal .modal-footer button').one('click', function(e) {
    console.log('button clicked', e.currentTarget.dataset.label);
    $('.modal').remove();
  });
}
