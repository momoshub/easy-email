import { BasicType, getParentIdx, getSiblingIdx } from '@ant066/easy-email-core';
import {
  isTextBlock,
  useBlock,
  useEditorProps,
  useFocusIdx,
} from '@ant066/easy-email-editor';
import { Tooltip } from '@arco-design/web-react';
import { useAddToCollection } from '@extensions/hooks/useAddToCollection';
import { classnames } from '@extensions/utils/classnames';
import { getBlockTitle } from '@extensions/utils/getBlockTitle';
import React from 'react';

export function Toolbar() {
  const { moveBlock, copyBlock, removeBlock, focusBlock } = useBlock();
  const { focusIdx, setFocusIdx } = useFocusIdx();
  const { modal, setModalVisible } = useAddToCollection();
  const props = useEditorProps();

  const isPage = focusBlock?.type === BasicType.PAGE;
  const isText = isTextBlock(focusBlock?.type);

  const handleMoveUp = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, -1));
  };

  const handleMoveDown = () => {
    moveBlock(focusIdx, getSiblingIdx(focusIdx, 1));
  };

  const handleAddToCollection = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setModalVisible(true);
  };

  const handleCopy: React.MouseEventHandler<HTMLDivElement> = ev => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    copyBlock(focusIdx);
  };

  const handleDelete = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    removeBlock(focusIdx);
  };

  const handleSelectParent = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
    setFocusIdx(getParentIdx(focusIdx)!);
  };

  if (isText) return null;
  return (
    <>
      <div
        id='easy-email-extensions-InteractivePrompt-Toolbar'
        style={{
          height: 0,

          zIndex: 100,
        }}
      >
        <div
          style={{
            fontSize: 14,
            lineHeight: '22px',
            pointerEvents: 'auto',
            color: '#ffffff',
            transform: 'translateY(-100%)',
            display: 'inline-flex',
            // justifyContent: 'space-between',
          }}
        >
          <Tooltip content='Select parent'>
            <div
              style={{
                color: '#ffffff',
                backgroundColor: 'var(--selected-color)',
                height: '22px',

                display: 'inline-flex',
                padding: '1px 5px',
                boxSizing: 'border-box',
                whiteSpace: 'nowrap',
                maxWidth: 300,
                overflow: 'hidden',
              }}
            >
              {focusBlock && getBlockTitle(focusBlock, false)}
            </div>
          </Tooltip>
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            onMouseDown={ev => {
              ev.preventDefault();
            }}
            style={{
              display: isPage ? 'none' : 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'auto',
            }}
          >
            <Tooltip content='Select parent'>
              <div>
                <ToolItem
                  width={12}
                  iconName='icon-back-parent'
                  onClick={handleSelectParent}
                />
              </div>
            </Tooltip>
            <Tooltip content='Copy'>
              <div>
                <ToolItem
                  iconName='icon-copy'
                  onClick={handleCopy}
                />
              </div>
            </Tooltip>
            {props.onAddCollection && (
              <Tooltip content='Add To Collection'>
                <div>
                  <ToolItem
                    iconName='icon-collection'
                    onClick={handleAddToCollection}
                  />
                </div>
              </Tooltip>
            )}
            <Tooltip content='Delete'>
              <div>
                <ToolItem
                  iconName='icon-delete'
                  onClick={handleDelete}
                />
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
      {modal}
    </>
  );
}

function ToolItem(props: {
  iconName: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  width?: number;
}) {
  return (
    <div
      onClick={props.onClick}
      style={{
        color: '#ffffff',
        backgroundColor: 'var(--selected-color)',
        height: 22,
        fontSize: props.width || 14,
        lineHeight: '22px',
        width: 22,
        display: 'flex',
        pointerEvents: 'auto',
        cursor: 'pointer',
        justifyContent: 'center',
      }}
      className={classnames('iconfont', props.iconName)}
    />
  );
}
