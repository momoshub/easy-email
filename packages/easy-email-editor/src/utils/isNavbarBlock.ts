import { AdvancedType, BasicType } from '@momos/easy-email-core';

export function isNavbarBlock(blockType: any) {
  return blockType === BasicType.NAVBAR || blockType === AdvancedType.NAVBAR;
}
