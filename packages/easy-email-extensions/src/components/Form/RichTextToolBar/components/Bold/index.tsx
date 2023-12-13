import { PopoverProps, Tooltip } from '@arco-design/web-react';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';
import { EMAIL_BLOCK_CLASS_NAME } from '@momos/easy-email-core';
import { IconFont } from '@momos/easy-email-editor';
import React, { useCallback, useMemo } from 'react';
import { ToolItem } from '../ToolItem';

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getBoldNode(node: Node | null | undefined): Element | null {
  if (!node) return null;
  if (node instanceof Element && node.classList.contains(EMAIL_BLOCK_CLASS_NAME))
    return null;
  if (node instanceof Element && node.tagName.toLocaleLowerCase() === 'b') return node;
  return getBoldNode(node.parentNode);
}

export function Bold(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getBoldNode(props.currentRange?.commonAncestorContainer);
  }, [props.currentRange]);

  const onClick = useCallback(() => {
    if (node) {
      setRangeByElement(node);
    }
    onChange();
  }, [node, onChange, setRangeByElement]);

  return (
    <Tooltip
      color='#fff'
      position='tl'
      content={t('Bold')}
    >
      <ToolItem
        title={t('Bold')}
        isActive={Boolean(node)}
        icon={<IconFont iconName='icon-bold' />}
        onClick={onClick}
      />
    </Tooltip>
  );
}
