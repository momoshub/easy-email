import { classnames } from '@extensions/AttributePanel/utils/classnames';
import { getNodeIdxClassName, getNodeTypeClassName } from '@momos/easy-email-core';

export function getPreviewClassName(idx: string | null, type: string) {
  return classnames(
    'email-block',
    idx && getNodeIdxClassName(idx),
    getNodeTypeClassName(type),
  );
}
