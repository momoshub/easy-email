import { AdvancedType, BasicType } from '@momos/easy-email-core';

export function isTextBlock(blockType: any) {
  return blockType === BasicType.TEXT || blockType === AdvancedType.TEXT;
}
