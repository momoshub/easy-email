import { useEditorContext, useEditorProps } from '@momos/easy-email-editor';
import React, { useMemo } from 'react';
import GOOGLE_FONTS from './fonts.json';

const safeFonts = [
  { value: 'Arial', label: 'Arial' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Trebuchet', label: 'Trebuchet' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Helvetica', label: 'Helvetica' },
];

export function useFontFamily() {
  const { fontList: defaultFontList = safeFonts } = useEditorProps();
  const { pageData } = useEditorContext();

  const addFonts = pageData.data.value.fonts;

  const fontList = useMemo(() => {
    const fonts: Array<{
      url?: string;
      value: string;
      label: React.ReactNode;
    }> = [];
    if (defaultFontList) {
      fonts.push(...defaultFontList);
    }
    if (addFonts) {
      const options = addFonts.map(item => ({
        value: item.name,
        label: item.name,
        url: item.href,
      }));
      fonts.unshift(...options);
    }

    fonts.push(...GOOGLE_FONTS);

    return fonts.map(item => {
      return {
        value: item.value,
        label: <span style={{ fontFamily: item.value }}>{item.label}</span>,
        url: item.url,
      };
    });
  }, [addFonts, defaultFontList]);

  return {
    fontList,
    defaultFontList,
  };
}
