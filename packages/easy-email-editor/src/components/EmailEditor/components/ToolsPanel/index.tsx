import { IconFont } from '@/components/IconFont';
import { useBlock } from '@/hooks/useBlock';
import React from 'react';

export function ToolsPanel() {
  const { redo, undo, redoable, undoable } = useBlock();

  return (
    <div className='easy-email-editor-tools-panel'>
      <IconFont
        iconName='icon-undo'
        style={{
          opacity: undoable ? 1 : 0.75,
          pointerEvents: undoable ? 'auto' : 'none',
        }}
        onClick={undo}
      />
      <IconFont
        iconName='icon-redo'
        style={{
          opacity: redoable ? 1 : 0.75,
          pointerEvents: redoable ? 'auto' : 'none',
        }}
        onClick={redo}
      />
    </div>
  );
}
