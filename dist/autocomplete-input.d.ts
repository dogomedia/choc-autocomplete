import { CSSObject, InputProps } from "@chakra-ui/react";
import { MaybeRenderProp } from "@chakra-ui/react-utils";
import { UseAutoCompleteReturn } from "./types";
export interface AutoCompleteInputProps extends InputProps {
    children?: MaybeRenderProp<{
        tags: UseAutoCompleteReturn["tags"];
    }>;
    wrapStyles?: CSSObject;
}
export declare const AutoCompleteInput: import("@chakra-ui/react").ComponentWithAs<"input", AutoCompleteInputProps>;
