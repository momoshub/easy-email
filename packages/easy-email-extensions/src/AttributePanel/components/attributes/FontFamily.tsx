import { Tooltip } from '@arco-design/web-react';
import InfoIcon from '@extensions/assets/svg/info.svg';
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
  const { addFonts, safeFonts, googleFonts } = useFontFamily();
  const { pageData } = useEditorContext();
  const { focusBlock } = useBlock();

  const { mainFont, fallbackFont = 'Helvetica' } = useMemo(
    () => getFontFamily(focusBlock),
    [focusBlock],
  );

  const isShowFallback = useMemo(
    () => mainFont && !safeFonts?.find(f => f.value == mainFont),
    [mainFont],
  );

  const onChangeAdapter = (value: string = mainFont) => {
    const newFont = value === '1' || value === '2' ? mainFont : value;
    const isExisted = pageData?.data?.value?.fonts?.find(font => font.name === newFont);

    if (!isExisted) {
      const url = googleFonts?.find(font => font.value === newFont)?.url;
      if (url) pageData?.data?.value?.fonts?.push({ name: newFont, href: url, url });
    }

    return `${newFont}, ${fallbackFont}`;
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
          dropdownRender={menu => <div style={{ paddingLeft: 20 }}>{menu}</div>}
          options={[
            {
              label: (
                <div className='flex gap-2 algin-center ml-minus-10'>
                  <div className='text-red pointer-events-none font-bold'>
                    Websafe Fonts
                  </div>
                  <Tooltip
                    content='These fonts are accepted by all major email clients.
              It is recommended that you use a websafe font in your emails.'
                  >
                    <img src={InfoIcon} />
                  </Tooltip>
                </div>
              ),
              value: '1',
            },
            ...safeFonts,
            {
              label: (
                <div className='flex gap-2 algin-center ml-minus-10'>
                  <span className='text-red pointer-events-none font-bold'>
                    Custom Fonts
                  </span>
                  <Tooltip
                    content='Custom Fonts may not be accepted by some email clients.
                  You will be required to specify a fallback websafe font to be shown instead when this happens.'
                  >
                    <img src={InfoIcon} />
                  </Tooltip>
                </div>
              ),
              value: '2',
            },
            ...addFonts,
            ...googleFonts,
          ]}
          name={name || `${focusIdx}.attributes.font-family`}
          onChangeAdapter={onChangeAdapter}
          onSetCurrentValue={onSetCurrentValue}
          triggerProps={{
            autoAlignPopupWidth: false,
            autoAlignPopupMinWidth: true,
            position: 'bl',
          }}
          getPopupContainer={node => node}
        ></SelectField>

        {isShowFallback && (
          <SelectField
            style={{ minWidth: 100, flex: 1 }}
            label={t('Fallback font')}
            name={name || `${focusIdx}.attributes.font-family`}
            options={safeFonts}
            onSetCurrentValue={onSetCurrentFallbackValue}
            onChangeAdapter={onChangeFallbackAdapter}
            getPopupContainer={node => node}
          />
        )}
      </>
    );
  }, [
    focusIdx,
    googleFonts,
    safeFonts,
    name,
    onSetCurrentFallbackValue,
    onSetCurrentValue,
    isShowFallback,
  ]);
}
