import { useEditorContext, useEditorProps } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import GOOGLE_FONTS from './fonts.json';

const SAFE_FONTS = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Trebuchet', label: 'Trebuchet' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Helvetica', label: 'Helvetica' },
];

export function useFontFamily() {
  const { fontList: defaultFontList = SAFE_FONTS } = useEditorProps();
  const { pageData } = useEditorContext();

  const safeFonts = useMemo(
    () =>
      defaultFontList?.map(font => ({
        value: font.value,
        label: <span style={{ fontFamily: font.value }}>{font.label}</span>,
      })),
    [],
  );

  const googleFonts = useMemo(
    () =>
      GOOGLE_FONTS?.map(font => ({
        value: font.value,
        label: <div style={{ fontFamily: font.value }}>{font.label}</div>,
        url: font.url,
      })),
    [],
  );

  const addFonts = useMemo(() => {
    const fonts: Array<{
      url?: string;
      value: string;
      label: React.ReactNode;
    }> = [];
    if (pageData?.data?.value?.fonts) {
      const options = pageData.data.value.fonts
        .filter(font => !font?.url)
        .map(font => {
          return {
            value: font.name,
            label: <span style={{ fontFamily: font?.name }}>{font?.name}</span>,
            url: font.href,
          };
        });

      fonts.unshift(...options);
    }

    return fonts;
  }, [pageData.data.value.fonts]);

  return {
    safeFonts,
    googleFonts,
    addFonts,
  };
}
