import { CSSObject, FlexProps } from "@chakra-ui/react";
export interface AutoCompleteItemProps extends FlexProps {
    value: any;
    label?: string;
    fixed?: boolean;
    _focus?: CSSObject | any;
    disabled?: boolean;
    _fixed?: CSSObject;
    getValue?: (item: AutoCompleteItemProps["value"]) => any;
}
export declare const AutoCompleteItem: import("@chakra-ui/react").ComponentWithAs<"div", AutoCompleteItemProps>;
export declare const baseItemStyles: FlexProps;
