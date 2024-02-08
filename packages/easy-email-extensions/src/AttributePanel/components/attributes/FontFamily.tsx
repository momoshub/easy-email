import { useFontFamily } from '@extensions/hooks/useFontFamily';
import { useBlock, useEditorContext, useFocusIdx } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import { SelectField } from '../../../components/Form';

const getFontFamily = (block: any) => {
  const fontString =
    block?.attributes?.['font-family'] || block?.data?.value?.['font-family'];

  const [mainFont, fallbackFont] = fontString?.split(',') || [];
  return { mainFont, fallbackFont };
};

export function FontFamily({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();
  const { fontList, defaultFontList } = useFontFamily();
  const { pageData } = useEditorContext();
  const { focusBlock } = useBlock();

  const { mainFont, fallbackFont = 'Helvetica' } = useMemo(
    () => getFontFamily(focusBlock),
    [focusBlock],
  );

  const fontFamily = useMemo(() => {
    return fontList?.find(f => f.value == mainFont);
  }, [, fontList, mainFont]);

  const onChangeAdapter = (mainFont: string) => {
    const isExisted = pageData?.data?.value?.fonts?.find(font => font.name === mainFont);
    const url = fontList?.find(font => font.value === mainFont)?.url;

    if (!isExisted && url) {
      pageData?.data?.value?.fonts?.push({ name: mainFont, href: url });
    }

    return `${mainFont}, ${fallbackFont}`;
  };

  const onChangeFallbackAdapter = (fallbackFont: string) => {
    return `${mainFont}, ${fallbackFont}`;
  };

  const onSetCurrentValue = (value: any) => {
    return value?.split(',')?.[0];
  };

  const onSetCurrentFallbackValue = (value: any) => {
    return value?.split(',')?.[1];
  };

  return useMemo(() => {
    return (
      <>
        <SelectField
          style={{ minWidth: 100, flex: 1 }}
          showSearch
          label={t('Font family')}
          name={name || `${focusIdx}.attributes.font-family`}
          options={fontList}
          onChangeAdapter={onChangeAdapter}
          onSetCurrentValue={onSetCurrentValue}
        />

        {fontFamily?.url && (
          <SelectField
            style={{ minWidth: 100, flex: 1 }}
            label={t('Fallback font')}
            name={name || `${focusIdx}.attributes.font-family`}
            options={defaultFontList}
            onSetCurrentValue={onSetCurrentFallbackValue}
            onChangeAdapter={onChangeFallbackAdapter}
          />
        )}
      </>
    );
  }, [
    focusIdx,
    fontList,
    name,
    onSetCurrentFallbackValue,
    onSetCurrentValue,
    fontFamily?.url,
  ]);
}
