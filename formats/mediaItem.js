import Embed from '../blots/embed';

const supportType = ['IMAGE', 'AUDIO', 'VIDEO', 'DOCUMENT'];

const BYTES_SIZES = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

function bytesToSize(bytes) {
  if (!bytes) return '0 Bytes';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  const ret = `${Math.round(bytes / Math.pow(1024, i), 2)} ${BYTES_SIZES[i]}`;
  return ret;
}

class MediaItemBlot extends Embed {
  static create(mediaItem) {
    const node = super.create();
    if (supportType.includes(mediaItem.type)) {
      let childNode; /*
      if (mediaItem.type === 'IMAGE') {
        node.setAttribute('type', 'IMAGE');
        childNode = document.createElement('img');
        //if (mediaItem.data) {
        //  node.setAttribute('url', mediaItem.data.source.url);
        //  childNode.setAttribute('src', mediaItem.data.source.url);
        //} else {
          node.setAttribute('url', mediaItem.url); // mediaItem.data.source.url);
          childNode.setAttribute('src', mediaItem.url);
        //}
      } */
      if (mediaItem.type === 'AUDIO') {
        node.setAttribute('type', 'AUDIO');
        childNode = document.createElement('audio');
        // if (mediaItem.data) {
        //  node.setAttribute('url', mediaItem.data.source.url);
        //  childNode.setAttribute('src', mediaItem.data.source.url);
        // } else {
        node.setAttribute('url', mediaItem.url); // mediaItem.data.source.url);
        childNode.setAttribute('src', mediaItem.url);
        // }
        childNode.setAttribute('controls', '');
      } /*
      if (mediaItem.type === 'VIDEO') {
        node.setAttribute('type', 'VIDEO');
        childNode = document.createElement('iframe');
        //if (mediaItem.data) {
        //  if (mediaItem.data.metadata.sproutVideo && mediaItem.data.metadata.sproutVideo.security_token) {
        //    const url = `https://videos.sproutvideo.com/embed/${mediaItem.data.metadata.sproutVideo.id}/${mediaItem.data.metadata.sproutVideo.security_token}`;
        //    node.setAttribute('url', url);
        //    childNode.setAttribute('src', url);
        //  } else {
        //    node.setAttribute('url', mediaItem.data.source.url);
        //    childNode.setAttribute('src', mediaItem.data.source.url);
        //  }
        //} else {
          node.setAttribute('url', mediaItem.url); // mediaItem.data.source.url);
          childNode.setAttribute('src', mediaItem.url);
        //}
        childNode.setAttribute('frameborder', '0');
        childNode.setAttribute('allowfullscreen', true);
        childNode.setAttribute('class', 'ql-video');
      } */
      if (mediaItem.type === 'DOCUMENT') {
        // let url, originalFileName, fileSize;
        // if (mediaItem.data) {
        //  url = mediaItem.data.source.url;
        //  originalFileName = mediaItem.data.source.originalFileName;
        //  fileSize = mediaItem.data.source.fileSize;
        // } else {
        const { url } = mediaItem;
        const { originalFileName } = mediaItem;
        const { fileSize } = mediaItem;
        // }
        node.setAttribute('type', 'DOCUMENT');
        node.setAttribute('url', url);
        node.setAttribute('originalFileName', originalFileName);
        node.setAttribute('fileSize', fileSize);
        node.innerHTML = `<div style="display: flex;align-items: center;padding: 10px;"><div><span class="icon acr-attach" style="font-size: 30px;"/></div><div style="flex-grow: 1;min-width: 0;overflow-wrap: break-word;margin-left: 15px;"><div><a href="/download?url=${url}&amp;filename=${originalFileName} "target="_blank" rel="noopener noreferrer">${originalFileName} </a></div><small>${bytesToSize(fileSize)}</small></div></div>`;
        return node;
      }
      node.appendChild(childNode);
      return node;
    }
    return node;
  }

  static value(node) {
    return {
      type: node.getAttribute('type'),
      url: node.getAttribute('url'),
      originalFileName: node.getAttribute('originalFileName'),
      fileSize: node.getAttribute('fileSize'),
      frameborder: node.getAttribute('frameborder'),
      allowfullscreen: node.getAttribute('allowfullscreen'),
      class: node.getAttribute('class'),
    };
  }

  static formats(node) {
    return {
      type: node.getAttribute('type'),
      url: node.getAttribute('url'),
      originalFileName: node.getAttribute('originalFileName'),
      fileSize: node.getAttribute('fileSize'),
      frameborder: node.getAttribute('frameborder'),
      allowfullscreen: node.getAttribute('allowfullscreen'),
      class: node.getAttribute('class'),
    };
  }
}
MediaItemBlot.blotName = 'mediaItem';
MediaItemBlot.tagName = 'div';

export default MediaItemBlot;
