import {
  Select as ArcoSelect,
  SelectProps as ArcoSelectProps,
  Tooltip,
} from '@arco-design/web-react';
import { merge } from 'lodash';
import React from 'react';

export interface SelectProps extends ArcoSelectProps {
  options: Array<{
    toolTipText?: string;
    value: string;
    label: React.ReactNode;
    className?: string;
  }>;
  onChange?: (val: string) => void;
  value: string;
}

export function Select(props: SelectProps) {
  return (
    <ArcoSelect
      {...props}
      dropdownMenuClassName='easy-email-overlay'
      style={merge({ width: '100%' }, props.style)}
      value={props.value}
      onChange={props.onChange}
    >
      {props.options.map((item, index) => {
        const label = item?.toolTipText ? (
          <Tooltip content={item?.toolTipText}>{item.label}</Tooltip>
        ) : (
          item.label
        );
        return (
          <ArcoSelect.Option
            key={index}
            value={item.value}
            className={item.className}
          >
            {label}
          </ArcoSelect.Option>
        );
      })}
    </ArcoSelect>
  );
}
