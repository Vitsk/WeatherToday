export default function renderRequests(content) {
  const requestOutput = document.querySelector('.requests-output');
  let html = `
    <div class="requests-last">
      <a class="request-listener">${content[0] == undefined ? '' : content[0]}</a>
    </div>
    <div class="requests-last">
      <a class="request-listener">${content[1] == undefined ? '' : content[1]}</a>
    </div>
    <div class="requests-last">
      <a class="request-listener">${content[2] == undefined ? '' : content[2]}</a>
    </div>
    <div class="requests-last">
      <a class="request-listener">${content[3] == undefined ? '' : content[3]}</a>
    </div>
    <div class="requests-last">
      <a class="request-listener">${content[4] == undefined ? '' : content[4]}</a>
    </div>
  `;

  requestOutput.innerHTML = html;
}