export default function loadAcclaimBadge() {
  let lhsValue;
  let elem;
  let nodeUri;
  let i;
  let previouVal;
  /**
   * @param {string} name
   * @return {?}
   */
  const initialize = (name) => {
    let div;
    let ii;
    if (document.querySelectorAll != null) {
      return document.querySelectorAll(`[data-${name}]`);
    }
    /** @type {!Array} */
    const chart = [];
    /** @type {!NodeList<Element>} */
    const temp = document.getElementsByTagName('*');
    /** @type {number} */
    ii = 0;
    /** @type {number} */
    const li = temp.length;
    for (; li > ii; ii += 1) {
      /** @type {!Element} */
      div = temp[i];
      if (div.getAttribute(`data-${name}`)) {
        chart.push(div);
      }
    }
    return chart;
  };
  const checkSet = initialize('share-badge-id');
  /** @type {number} */
  i = 0;
  const l = checkSet.length;
  for (; l > i; i += 1) {
    elem = checkSet[i];
    lhsValue = elem.attributes.getNamedItem('data-share-badge-id').value;
    previouVal = elem.attributes.getNamedItem('data-iframe-width').value;
    nodeUri = elem.attributes.getNamedItem('data-iframe-height').value;
    /** @type {string} */
    elem.outerHTML = `<iframe name="acclaim-badge" allowTransparency="true" frameborder="0" id="embedded-badge-${lhsValue}" scrolling="no" src="//www.youracclaim.com/embedded_badge/${lhsValue}" style="width: ${previouVal}px; height: ${nodeUri}px;" title="View my verified achievement on Acclaim." ></iframe>`;
  }
}
