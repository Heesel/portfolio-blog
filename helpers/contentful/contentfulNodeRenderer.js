import escapeHtml from './htmlEscaper';
import nodeTypes from './nodeTypes';
import nodeMarks from './nodeMarks';

const attributeValue = (value) => `${value.replace(/"/g, '&quot;')}`;

const renderFunctions = {
  [nodeTypes.PARAGRAPH]: (createElement, children) => createElement('p', null, children),

  [nodeTypes.HEADING_1]: (createElement, children) => createElement('h1', null, children),
  [nodeTypes.HEADING_2]: (createElement, children) => createElement('h2', null, children),
  [nodeTypes.HEADING_3]: (createElement, children) => createElement('h3', null, children),
  [nodeTypes.HEADING_4]: (createElement, children) => createElement('h4', null, children),
  [nodeTypes.HEADING_5]: (createElement, children) => createElement('h5', null, children),
  [nodeTypes.HEADING_6]: (createElement, children) => createElement('h6', null, children),
  
  [nodeTypes.OL_LIST]: (createElement, children) => createElement('ol', null, children),
  [nodeTypes.UL_LIST]: (createElement, children) => createElement('ul', null, children),
  [nodeTypes.LIST_ITEM]: (createElement, children) => createElement('li', null, children),

  [nodeTypes.HR]: (createElement) => createElement('hr'),
  [nodeTypes.BLOCK_QUOTE]: (createElement, children) =>  createElement('blockquote', null, children),

  [nodeTypes.EMBEDDED_ENTRY_BLOCK]: (createElement, children) =>  createElement('div', null, children),
  [nodeTypes.EMBEDDED_ASSET_BLOCK]: (createElement, children) =>  createElement('div', null, children),

  [nodeTypes.TABLE]: (createElement, children) => createElement('table', null, children),
  [nodeTypes.TABLE_ROW]: (createElement, children) => createElement('tr', null, children),
  [nodeTypes.TABLE_CELL]: (createElement, children) => createElement('td', null, children),
  [nodeTypes.TABLE_HEADER_CELL]: (createElement, children) => createElement('th', null, children),
  
  [nodeTypes.ASSET_HYPERLINK]: (createElement, children) => createElement('span', null, children),
  [nodeTypes.ENTRY_HYPERLINK]: (createElement, children) => createElement('span', null, children),
  [nodeTypes.EMBEDDED_ENTRY]: (createElement, children) => createElement('span', null, children),
  [nodeTypes.HYPERLINK]: (createElement, children, node) => {
    const href = typeof node.data.uri === 'string' ? node.data.uri : 'javascript:void(0)';
    return createElement('a', { attrs: { href: attributeValue(href) } }, children);
  },
}

const markRenderers = {
  [nodeMarks.BOLD]: (content, createElement) => createElement('b', null, content),
  [nodeMarks.ITALIC]: (content, createElement) => createElement('i', null, content),
  [nodeMarks.UNDERLINE]: (content, createElement) => createElement('u', null, content),
  [nodeMarks.STRIKETHROUGH]: (content, createElement) => createElement('s', null, content),
  [nodeMarks.CODE]: (content, createElement) => createElement('code', null, content),
}

const renderTextContent = (text, marks, createElement, characterCounter) => {
  let escapedText = escapeHtml(text);

  if(characterCounter !== undefined) {
    if(characterCounter.count > characterCounter.limit) return '';
    
    const remainingCharacters = characterCounter.limit - characterCounter.count;
    if(escapedText.length > remainingCharacters) {
      for(var i = remainingCharacters - 3; i < escapedText.length; i++) {
        if(escapedText[i] === ' ') {
          escapedText = escapedText.substring(0, i) + '...';
          break;
        }
      }
    }

    characterCounter.count += escapedText.length;
  }

  if(marks.length === 0) return escapedText;

  return marks.reduce((content, mark) => {
    if(!Object.hasOwnProperty.call(mark, 'type') || !Object.hasOwnProperty.call(markRenderers, mark.type))
      return content;

    return markRenderers[mark.type](content, createElement);
  }, escapedText)
}

const renderNode = (node, createElement, characterCounter) => {
  if(characterCounter !== undefined && characterCounter.count >= characterCounter.limit) {
    return null;
  }

  if(node.nodeType === 'text') {
    return renderTextContent(node.value, node.marks, createElement, characterCounter);
  }

  let children = [];
  if(characterCounter === undefined
    && node.nodeType === 'embedded-asset-block' 
    && Object.hasOwnProperty.call(node, 'data')
    && Object.hasOwnProperty.call(node.data, 'target')
    && Object.hasOwnProperty.call(node.data.target, 'fields')
    && Object.hasOwnProperty.call(node.data.target.fields, 'file'))
  {
    const fieldData = node.data.target.fields;
    const { title, file } = fieldData;
    if(file.contentType.startsWith('image/')) {
      const fileUrl = file.url;
      children.push(createElement('img', { attrs: { src: attributeValue(fileUrl), title: attributeValue(title), class: 'blog-embedded-image' }}, []));
    }
  }

  
  if(Object.hasOwnProperty.call(node, 'content') && Array.isArray(node.content) && node.content.length > 0) {
    children = renderNodeList(node.content, createElement, characterCounter);
  }

  if(!Object.hasOwnProperty.call(renderFunctions, node.nodeType))
    return createElement('div', null, children);

  return renderFunctions[node.nodeType](createElement, children, node);
}

const renderNodeList = (nodes, createElement, characterCounter) => {
  if(characterCounter !== undefined && characterCounter.count >= characterCounter.limit) {
    return [];
  }

  return nodes.map(node => renderNode(node, createElement, characterCounter))
              .filter(node => node !== null && node !== undefined);
}

const renderContentfulPost = (postBody, createElement, addSpacing, characterLimit) => {
  if(!Object.hasOwnProperty.call(postBody, 'nodeType') || postBody.nodeType !== 'document') {
    return '';
  }

  let characterCounter = undefined;
  if(characterLimit !== undefined && Number.isInteger(characterLimit) && characterLimit > 0) {
    characterCounter = {count: 0, limit: characterLimit}
  }

  const parsedElements = renderNodeList(postBody.content, createElement, characterCounter);
  let childElementsToRender = [];

  if(addSpacing === false) {
    childElementsToRender = parsedElements;
  } else {
    for(var i = 0; i < parsedElements.length; i++) {
      childElementsToRender.push(parsedElements[i]);
      if(i !== parsedElements.length - 1) {
        childElementsToRender.push(createElement('br'));
      }
    }
  }

  return createElement('div', null, childElementsToRender);
}

export {
  renderContentfulPost
}