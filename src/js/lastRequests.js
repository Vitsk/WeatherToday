export default function renderRequests(content) {
  const requestOutput = document.querySelector('.requests-output');
  let html = `
    <div class="requests-last">
      ${content[0] == undefined ? '' : content[0]}
    </div>
    <div class="requests-last">
      ${content[1] == undefined ? '' : content[1]}
    </div>
    <div class="requests-last">
      ${content[2] == undefined ? '' : content[2]}
    </div>
    <div class="requests-last">
      ${content[3] == undefined ? '' : content[3]}
    </div>
    <div class="requests-last">
      ${content[4] == undefined ? '' : content[4]}
    </div>
  `;

  requestOutput.innerHTML = html;
}

