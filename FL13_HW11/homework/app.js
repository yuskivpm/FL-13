const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
const contextMenu = rootNode.appendChild(document.createElement('div'));

let elementUnderContextMenu;

const FOLDER_CLASS_NAME = 'folder';
const FOCUSSED_CLASS_NAME = 'focussed';

const CONTEXT_MENU_ITEMS = [
  { name: 'Rename', handler: handleRenameClick },
  { name: 'Delete item', handler: handleDeleteClick }
];

const getTarget = event => event.currentTarget || event.target || event.srcElement;

const addEmptyFolderElement = parentNode => parentNode
  .appendChild(document.createElement('i'))
  .appendChild(document.createTextNode('Folder is empty'));

const generateTree = (itemsArray, parentNode) => itemsArray
  .forEach(({ title, folder, children }) => {
    const paragraphElement = parentNode.appendChild(document.createElement('p'));
    paragraphElement.className = folder ? 'folder folded' : 'file';
    paragraphElement.appendChild(document.createElement('i')).className = 'material-icons';
    const spanElement = paragraphElement.appendChild(document.createElement('span'));
    spanElement.addEventListener('blur', handleBlur);
    spanElement.addEventListener('keypress', handleEnterKeyPress);
    spanElement.appendChild(document.createTextNode(title));
    if (folder) {
      paragraphElement.addEventListener('click', event => getTarget(event).classList.toggle('folded'));
      const div = parentNode.appendChild(document.createElement('div'));
      children ? generateTree(children, div) : addEmptyFolderElement(div);
    }
  });

function createContextMenu(contextMenuNode, contextMenuItems) {
  contextMenu.className = 'context-menu';
  contextMenu.hidden = true;
  contextMenuItems.forEach(({ name, handler }) => {
    const item = contextMenuNode.appendChild(document.createElement('div'));
    item.appendChild(document.createTextNode(name));
    item.addEventListener('click', () => {
      if (elementUnderContextMenu) {
        handler();
      }
    })
  });
}

function getParentParagraphElement({ target, srcElement }) {
  let targetElement = target || srcElement;
  while (targetElement && targetElement.nodeName !== 'P') {
    targetElement = targetElement.parentElement;
  }
  return targetElement || {};
}

function showContextMenu(event) {
  event.preventDefault();
  contextMenu.style.top = `${event.y}px`;
  contextMenu.style.left = `${event.x}px`;
  const target = getParentParagraphElement(event);
  if (elementUnderContextMenu) {
    elementUnderContextMenu.classList.remove(FOCUSSED_CLASS_NAME);
  }
  if (target.nodeName === 'P') {
    elementUnderContextMenu = target;
    target.classList.add(FOCUSSED_CLASS_NAME);
    contextMenu.style.color = '#000';
    contextMenu.style.pointerEvents = 'auto';
  } else {
    elementUnderContextMenu = undefined;
    contextMenu.style.color = '#ccc';
    contextMenu.style.pointerEvents = 'none';
  }
  contextMenu.hidden = false;
}

function hideContextMenu() {
  if (elementUnderContextMenu) {
    elementUnderContextMenu.classList.remove(FOCUSSED_CLASS_NAME);
  }
  elementUnderContextMenu = undefined;
  contextMenu.hidden = true;
}

function handleBlur(event) {
  getTarget(event).contentEditable = 'false';
  getParentParagraphElement(event).classList.remove(FOCUSSED_CLASS_NAME);
}

function handleEnterKeyPress(event) {
  if (event.code === 'Enter') {
    handleBlur(event);
  }
}

function handleRenameClick() {
  const editedElement = elementUnderContextMenu.lastChild;
  editedElement.contentEditable = 'true';
  editedElement.focus();
  const range = document.createRange();
  const textNode = editedElement.firstChild;
  const selection = window.getSelection();
  range.selectNode(editedElement);
  range.setStart(textNode, 0);
  const extensionStart = textNode.textContent.lastIndexOf('.');
  range.setEnd(
    textNode,
    elementUnderContextMenu.className.startsWith(FOLDER_CLASS_NAME) || extensionStart < 0
      ? textNode.textContent.length
      : extensionStart
  );
  selection.removeAllRanges();
  selection.addRange(range);
  elementUnderContextMenu = undefined;
}

function handleDeleteClick() {
  const folderContentElement = elementUnderContextMenu.nextSibling;
  if (folderContentElement && folderContentElement.nodeName === 'DIV') {
    folderContentElement.remove();
  }
  const parent = elementUnderContextMenu.parentElement;
  elementUnderContextMenu.remove();
  if (!parent.children.length) {
    addEmptyFolderElement(parent);
  }
}

(function () {
  createContextMenu(contextMenu, CONTEXT_MENU_ITEMS);
  document.addEventListener('contextmenu', showContextMenu);
  document.addEventListener('click', hideContextMenu);
  generateTree(data, rootNode);
})();
