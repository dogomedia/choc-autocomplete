'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactUtils = require('@chakra-ui/react-utils');
var react = require('@chakra-ui/react');
var utils = require('@chakra-ui/utils');
var reactNanny = require('react-nanny');
var layout = require('@chakra-ui/layout');
var tag = require('@chakra-ui/tag');

var _createContext = /*#__PURE__*/reactUtils.createContext({
  name: "AutoCompleteContext",
  errorMessage: "useAutoCompleteContext: `context` is undefined. Seems you forgot to wrap all autoomplete components within `<AutoComplete />`"
}),
    AutoCompleteProvider = _createContext[0],
    useAutoCompleteContext = _createContext[1];

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/*
 * @param str1 The first string to compare.
 * @param str2 The second string to compare.
 * @param gramSize The size of the grams. Defaults to length 2.
 */
function fuzzyScore(str1, str2, gramSize) {
  if (gramSize === void 0) {
    gramSize = 2;
  }

  function getNGrams(s, len) {
    s = " ".repeat(len - 1) + s.toLowerCase() + " ".repeat(len - 1);
    var v = new Array(s.length - len + 1);

    for (var i = 0; i < v.length; i++) {
      v[i] = s.slice(i, i + len);
    }

    return v;
  }

  if (!(str1 != null && str1.length) || !(str2 != null && str2.length)) {
    return 0.0;
  } //Order the strings by length so the order they're passed in doesn't matter
  //and so the smaller string's ngrams are always the ones in the set


  var s1 = str1.length < str2.length ? str1 : str2;
  var s2 = str1.length < str2.length ? str2 : str1;
  var pairs1 = getNGrams(s1, gramSize);
  var pairs2 = getNGrams(s2, gramSize);
  var set = new Set(pairs1);
  var total = pairs2.length;
  var hits = 0;

  for (var _iterator = _createForOfIteratorHelperLoose(pairs2), _step; !(_step = _iterator()).done;) {
    var item = _step.value;

    if (set["delete"](item)) {
      hits++;
    }
  }

  return hits / total;
}

var getDefItemValue = function getDefItemValue(item) {
  return (typeof item === "string" ? item : item[Object.keys(item)[0]]).toString();
};
var setEmphasis = function setEmphasis(children, query) {
  if (typeof children !== "string" || utils.isEmpty(query)) {
    return children;
  }

  var newChildren = children.toString().replace(new RegExp(escapeRegex(query), "gi"), function (match) {
    return "<mark>" + match + "</mark>";
  });
  return newChildren;
};
var getItemList = function getItemList(children) {
  var itemChildren = reactNanny.getChildrenDeep(children, function (child) {
    var _child$type;

    return (child == null ? void 0 : (_child$type = child.type) == null ? void 0 : _child$type.displayName) === "AutoCompleteItem";
  });
  return itemChildren.map(function (item) {
    var itemObj = utils.pick(item.props, ["value", "label", "fixed", "disabled"]);
    var _item$props$getValue = item.props.getValue,
        getValue = _item$props$getValue === void 0 ? getDefItemValue : _item$props$getValue;
    var value = getValue(itemObj.value);
    var finObj = utils.isDefined(itemObj.label) ? itemObj : _extends({}, itemObj, {
      label: value
    });
    return _extends({}, finObj, {
      value: value,
      originalValue: itemObj.value
    });
  });
};
var getFocusedStyles = function getFocusedStyles() {
  return {
    bg: "whiteAlpha.100",
    _light: {
      bg: "gray.200"
    }
  };
};
var defaultFilterMethod = function defaultFilterMethod(query, itemValue, itemLabel) {
  return (itemValue == null ? void 0 : itemValue.toLowerCase().indexOf(query == null ? void 0 : query.toLowerCase())) >= 0 || (itemLabel == null ? void 0 : itemLabel.toLowerCase().indexOf(query == null ? void 0 : query.toLowerCase())) >= 0 || fuzzyScore(query, itemValue) >= 0.5 || fuzzyScore(query, itemLabel) >= 0.5;
};

function escapeRegex(string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

var getMultipleWrapStyles = function getMultipleWrapStyles(themeInput, multiple) {
  return _extends({}, multiple && _extends({}, themeInput.field, {
    _focusWithin: themeInput.field._focus,
    pos: "relative",
    minH: 9,
    // px: 3,
    py: 1.5,
    spacing: 3
  }), {
    cursor: "text",
    h: "fit-content"
  });
};

var hasFirstItem = function hasFirstItem(children, firstItem) {
  var result = reactNanny.getChildDeep(children, function (child) {
    var _child$type;

    return (child == null ? void 0 : (_child$type = child.type) == null ? void 0 : _child$type.displayName) === "AutoCompleteItem" && child.props.value === (firstItem == null ? void 0 : firstItem.value);
  });
  return result;
};
var hasLastItem = function hasLastItem(children, lastItem) {
  var result = reactNanny.getChildDeep(children, function (child) {
    var _child$type2;

    return (child == null ? void 0 : (_child$type2 = child.type) == null ? void 0 : _child$type2.displayName) === "AutoCompleteItem" && child.props.value === (lastItem == null ? void 0 : lastItem.value);
  });
  return result;
};
var hasChildren = function hasChildren(children, filteredList) {
  return utils.isDefined(reactNanny.getChildDeep(children, function (child) {
    return filteredList.findIndex(function (i) {
      var _child$props;

      return i.value === ((_child$props = child.props) == null ? void 0 : _child$props.value);
    }) >= 0;
  }));
};

var _excluded = ["onBlur", "onChange", "onFocus", "onKeyDown", "variant"],
    _excluded2 = ["_fixed", "_focus", "children", "disabled", "label", "value", "fixed", "getValue", "onClick", "onMouseOver", "sx"];
/**
 * useAutoComplete that provides all the state and focus management logic
 * for the autocomplete component. It is consumed by the `Autocomplete` component
 *
 */

function useAutoComplete(autoCompleteProps) {
  var _defaultQuery, _itemList$;

  var _autoCompleteProps$cl = autoCompleteProps.closeOnBlur,
      closeOnBlur = _autoCompleteProps$cl === void 0 ? true : _autoCompleteProps$cl,
      closeOnSelect = autoCompleteProps.closeOnSelect,
      creatable = autoCompleteProps.creatable,
      emphasize = autoCompleteProps.emphasize,
      _autoCompleteProps$em = autoCompleteProps.emptyState,
      emptyState = _autoCompleteProps$em === void 0 ? true : _autoCompleteProps$em,
      freeSolo = autoCompleteProps.freeSolo,
      isReadOnly = autoCompleteProps.isReadOnly,
      listAllValuesOnFocus = autoCompleteProps.listAllValuesOnFocus,
      maxSuggestions = autoCompleteProps.maxSuggestions,
      multiple = autoCompleteProps.multiple,
      defaultValue = autoCompleteProps.defaultValue,
      _autoCompleteProps$de = autoCompleteProps.defaultValues,
      defaultValues = _autoCompleteProps$de === void 0 ? defaultValue ? [defaultValue] : [] : _autoCompleteProps$de,
      onReady = autoCompleteProps.onReady,
      defaultIsOpen = autoCompleteProps.defaultIsOpen,
      _autoCompleteProps$re = autoCompleteProps.restoreOnBlurIfEmpty,
      restoreOnBlurIfEmpty = _autoCompleteProps$re === void 0 ? !freeSolo : _autoCompleteProps$re,
      _autoCompleteProps$sh = autoCompleteProps.shouldRenderSuggestions,
      shouldRenderSuggestions = _autoCompleteProps$sh === void 0 ? function () {
    return true;
  } : _autoCompleteProps$sh,
      _autoCompleteProps$su = autoCompleteProps.submitKeys,
      submitKeys = _autoCompleteProps$su === void 0 ? [] : _autoCompleteProps$su,
      suggestWhenEmpty = autoCompleteProps.suggestWhenEmpty,
      value = autoCompleteProps.value,
      _autoCompleteProps$va = autoCompleteProps.values,
      valuesProp = _autoCompleteProps$va === void 0 ? value ? typeof value === "string" ? [value] : [].concat(value) : undefined : _autoCompleteProps$va;
  closeOnSelect = closeOnSelect ? closeOnSelect : multiple ? false : true;
  freeSolo = freeSolo ? freeSolo : multiple ? true : autoCompleteProps.freeSolo;

  var _useDisclosure = react.useDisclosure({
    defaultIsOpen: defaultIsOpen
  }),
      isOpen = _useDisclosure.isOpen,
      onClose = _useDisclosure.onClose,
      onOpen = _useDisclosure.onOpen;

  var children = utils.runIfFn(autoCompleteProps.children, {
    isOpen: isOpen,
    onClose: onClose,
    onOpen: onOpen
  });
  var itemList = getItemList(children);
  var inputRef = React.useRef(null);
  var inputWrapperRef = React.useRef(null);
  var listRef = React.useRef(null);
  var interactionRef = React.useRef(null);

  var _useState = React.useState(false),
      listAll = _useState[0],
      setListAll = _useState[1];

  var defaultQuery = "";
  if (multiple) defaultQuery = "";else if (!utils.isUndefined(defaultValues)) defaultQuery = defaultValues[0];else if (!utils.isUndefined(valuesProp)) defaultQuery = valuesProp[0];

  var _useState2 = React.useState((_defaultQuery = defaultQuery) != null ? _defaultQuery : ""),
      query = _useState2[0],
      setQuery = _useState2[1];

  var filteredResults = itemList.filter(function (i) {
    return i.fixed || utils.runIfFn(autoCompleteProps.filter || defaultFilterMethod, query, i.value, i.label) || listAll;
  }).filter(function (_, index) {
    return maxSuggestions ? index < maxSuggestions : true;
  }); // Add Creatable to Filtered List

  var creatableArr = creatable ? [{
    value: query,
    noFilter: true,
    creatable: true
  }] : [];
  var filteredList = [].concat(filteredResults, creatableArr);

  var _useControllableState = react.useControllableState({
    defaultValue: defaultValues,
    value: valuesProp,
    onChange: function onChange(newValues) {
      var item = filteredList.find(function (opt) {
        return opt.value === newValues[0];
      });
      var items = newValues.map(function (val) {
        return filteredList.find(function (opt) {
          return opt.value === val;
        });
      });
      utils.runIfFn(autoCompleteProps.onChange, multiple ? newValues : newValues[0], multiple ? items : item);
    }
  }),
      values = _useControllableState[0],
      setValues = _useControllableState[1];

  var _useState3 = React.useState((_itemList$ = itemList[0]) == null ? void 0 : _itemList$.value),
      focusedValue = _useState3[0],
      setFocusedValue = _useState3[1];

  var maxSelections = autoCompleteProps.maxSelections || values.length + 1;
  var focusedIndex = filteredList.findIndex(function (i) {
    return i.value === focusedValue;
  });
  var nextItem = utils.getNextItem(focusedIndex, filteredList, !!autoCompleteProps.rollNavigation);
  var prevItem = utils.getPrevItem(focusedIndex, filteredList, !!autoCompleteProps.rollNavigation);
  var firstItem = utils.getFirstItem(filteredList);
  var lastItem = utils.getLastItem(filteredList);
  react.useUpdateEffect(function () {
    setFocusedValue(firstItem == null ? void 0 : firstItem.value);
  }, [query]);
  React.useEffect(function () {
    var focusedItem = itemList.find(function (i) {
      return i.value === focusedValue;
    });
    utils.runIfFn(autoCompleteProps.onOptionFocus, {
      item: focusedItem,
      focusMethod: interactionRef.current,
      isNewInput: focusedItem == null ? void 0 : focusedItem.creatable
    });
  }, [focusedValue, autoCompleteProps.onOptionFocus]);

  var selectItem = function selectItem(optionValue) {
    var _inputRef$current2;

    if (!values.includes(optionValue) && values.length < maxSelections) {
      setValues(function (v) {
        return multiple ? [].concat(v, [optionValue]) : [optionValue];
      });
    }

    var option = filteredList.find(function (i) {
      return i.value === optionValue;
    });

    if (multiple) {
      var _inputRef$current;

      (_inputRef$current = inputRef.current) == null ? void 0 : _inputRef$current.focus();
    }

    if (autoCompleteProps.focusInputOnSelect) (_inputRef$current2 = inputRef.current) == null ? void 0 : _inputRef$current2.focus();
    utils.runIfFn(autoCompleteProps.onSelectOption, {
      item: option,
      selectMethod: interactionRef.current,
      isNewInput: option == null ? void 0 : option.creatable
    });

    if (option != null && option.creatable) {
      utils.runIfFn(autoCompleteProps.onCreateOption, {
        item: utils.omit(option, ["noFilter"]),
        selectMethod: interactionRef.current
      });
    }

    var optionLabel = (option == null ? void 0 : option.label) || (option == null ? void 0 : option.value);
    setQuery(function () {
      return multiple ? "" : optionLabel != null ? optionLabel : "";
    });
    if (closeOnSelect) onClose();
  };

  var removeItem = function removeItem(itemValue, focusInput) {
    var _inputRef$current3;

    setValues(function (prevValues) {
      var item = itemList.find(function (opt) {
        return opt.value === itemValue;
      });
      utils.runIfFn(autoCompleteProps.onTagRemoved, itemValue, item, prevValues);
      return prevValues.filter(function (i) {
        return i !== itemValue;
      });
    });
    if (query === itemValue) setQuery("");
    if (focusInput) (_inputRef$current3 = inputRef.current) == null ? void 0 : _inputRef$current3.focus();
  };

  var resetItems = function resetItems(focusInput) {
    var _inputRef$current4;

    setValues([]);
    if (focusInput) (_inputRef$current4 = inputRef.current) == null ? void 0 : _inputRef$current4.focus();
  };

  var tags = multiple ? values.map(function (tag) {
    var _itemList$find;

    return {
      label: ((_itemList$find = itemList.find(function (item) {
        return item.value === tag;
      })) == null ? void 0 : _itemList$find.label) || tag,
      onRemove: function onRemove() {
        return removeItem(tag);
      }
    };
  }) : [];
  React.useEffect(function () {
    utils.runIfFn(onReady, {
      tags: tags
    });
  }, [values]);

  var getInputProps = function getInputProps(props, themeInput) {
    var _onBlur = props.onBlur,
        _onChange = props.onChange,
        _onFocus = props.onFocus,
        _onKeyDown = props.onKeyDown,
        variant = props.variant,
        rest = _objectWithoutPropertiesLoose(props, _excluded);

    return {
      wrapper: _extends({
        ref: inputWrapperRef,
        onClick: function onClick() {
          var _inputRef$current5;

          inputRef == null ? void 0 : (_inputRef$current5 = inputRef.current) == null ? void 0 : _inputRef$current5.focus();
        }
      }, getMultipleWrapStyles(themeInput, multiple), rest),
      input: _extends({
        isReadOnly: isReadOnly,
        onFocus: function onFocus(e) {
          utils.runIfFn(_onFocus, e);
          if (autoCompleteProps.openOnFocus && !isReadOnly) onOpen();
          if (autoCompleteProps.selectOnFocus) e.target.select();
          if (listAllValuesOnFocus) setListAll(true);
        },
        onBlur: function onBlur(e) {
          var _inputWrapperRef$curr;

          utils.runIfFn(_onBlur, e);
          var listIsFocused = e.relatedTarget === (listRef == null ? void 0 : listRef.current);
          var inputWrapperIsFocused = (_inputWrapperRef$curr = inputWrapperRef.current) == null ? void 0 : _inputWrapperRef$curr.contains(e.relatedTarget);

          if (!listIsFocused && !inputWrapperIsFocused) {
            if (closeOnBlur) onClose();

            if (!values.includes(e.target.value) && restoreOnBlurIfEmpty) {
              var latestValue = utils.getLastItem(values);
              var latestValueItem = itemList.find(function (i) {
                return i.value === latestValue;
              });
              var latestValueLabel = (latestValueItem == null ? void 0 : latestValueItem.label) || (latestValueItem == null ? void 0 : latestValueItem.value) || "";
              setQuery(latestValueLabel);
            }
          }
        },
        onChange: function onChange(e) {
          var newValue = e.target.value;
          utils.runIfFn(_onChange, e);
          setQuery(newValue);
          var queryIsEmpty = utils.isEmpty(newValue);
          if (utils.runIfFn(shouldRenderSuggestions, newValue) && (!queryIsEmpty || suggestWhenEmpty)) onOpen();else onClose();
          setListAll(false);
        },
        onKeyDown: function onKeyDown(e) {
          utils.runIfFn(_onKeyDown, e);
          interactionRef.current = "keyboard";
          var key = e.key;
          var focusedItem = filteredList[focusedIndex];

          if (["Enter"].concat(submitKeys).includes(key)) {
            var _inputRef$current6;

            if (focusedItem && !(focusedItem != null && focusedItem.disabled)) selectItem(focusedItem == null ? void 0 : focusedItem.value);else (_inputRef$current6 = inputRef.current) == null ? void 0 : _inputRef$current6.focus();
            e.preventDefault();
            return;
          }

          if (key === "ArrowDown") {
            setFocusedValue(nextItem == null ? void 0 : nextItem.value);
            e.preventDefault();
            return;
          }

          if (key === "ArrowUp") {
            setFocusedValue(prevItem == null ? void 0 : prevItem.value);
            e.preventDefault();
            return;
          }

          if (key === "Tab") {
            setFocusedValue(nextItem == null ? void 0 : nextItem.value);
            if (isOpen) e.preventDefault();
            return;
          }

          if (key === "Home") {
            setFocusedValue(firstItem == null ? void 0 : firstItem.value);
            e.preventDefault();
            return;
          }

          if (key === "End") {
            setFocusedValue(lastItem == null ? void 0 : lastItem.value);
            e.preventDefault();
            return;
          }

          if (key === "Escape") {
            utils.callAll(onClose, e.preventDefault);
          }
        },
        value: query,
        variant: multiple ? "unstyled" : variant
      }, rest)
    };
  };

  var dim = react.useDimensions(inputWrapperRef, true);

  var getListProps = function getListProps() {
    var width = dim == null ? void 0 : dim.marginBox.width;
    return {
      width: width
    };
  };

  var getItemProps = function getItemProps(props, creatable) {
    var _getValue;

    var _fixed = props._fixed,
        _focus = props._focus,
        itemChild = props.children,
        disabled = props.disabled,
        label = props.label,
        valueProp = props.value,
        fixed = props.fixed,
        _props$getValue = props.getValue,
        getValue = _props$getValue === void 0 ? getDefItemValue : _props$getValue,
        _onClick = props.onClick,
        _onMouseOver = props.onMouseOver,
        sx = props.sx,
        rest = _objectWithoutPropertiesLoose(props, _excluded2);

    var value = creatable ? valueProp : (_getValue = getValue(valueProp)) == null ? void 0 : _getValue.toString();
    var isFocused = value === focusedValue;
    var isValidSuggestion = filteredList.findIndex(function (i) {
      return i.value === value;
    }) >= 0;
    var itemLabel = itemChild || label || value;
    return {
      item: _extends({}, typeof itemLabel !== "string" || !emphasize ? {
        children: itemLabel
      } : {
        dangerouslySetInnerHTML: {
          __html: setEmphasis(itemLabel, query)
        }
      }, {
        "aria-selected": values.includes(value),
        "aria-disabled": disabled,
        _disabled: {
          opacity: 0.4,
          cursor: "not-allowed",
          userSelect: "none"
        },
        onClick: function onClick(e) {
          var _inputRef$current7;

          utils.runIfFn(_onClick, e);
          if (!disabled) selectItem(value);else (_inputRef$current7 = inputRef.current) == null ? void 0 : _inputRef$current7.focus();
        },
        onMouseOver: function onMouseOver(e) {
          utils.runIfFn(_onMouseOver, e);
          setFocusedValue(value);
          interactionRef.current = "mouse";
        },
        sx: _extends({}, sx, {
          mark: _extends({
            color: "inherit",
            bg: "transparent"
          }, utils.isObject(emphasize) ? emphasize : {
            fontWeight: emphasize ? "extrabold" : "inherit"
          })
        })
      }, isFocused && (_focus || getFocusedStyles()), fixed && _fixed, rest),
      root: {
        isValidSuggestion: isValidSuggestion,
        value: value
      }
    };
  };

  var getGroupProps = function getGroupProps(props) {
    var hasItems = hasChildren(props.children, filteredList);
    return {
      divider: {
        hasFirstChild: hasFirstItem(props.children, firstItem),
        hasLastChild: hasLastItem(props.children, utils.getLastItem(filteredList.filter(function (i) {
          return utils.isUndefined(i == null ? void 0 : i.noFilter);
        })))
      },
      group: {
        display: hasItems ? "initial" : "none"
      }
    };
  };

  var getEmptyStateProps = function getEmptyStateProps(defaultEmptyState) {
    var noSuggestions = filteredList.every(function (i) {
      return i.noFilter;
    });

    if (noSuggestions && emptyState && !creatable) {
      return typeof emptyState === "boolean" ? defaultEmptyState : utils.runIfFn(emptyState, {
        query: query
      });
    }
  };

  return {
    autoCompleteProps: autoCompleteProps,
    children: children,
    filteredList: filteredList,
    filteredResults: filteredResults,
    focusedValue: focusedValue,
    getEmptyStateProps: getEmptyStateProps,
    getGroupProps: getGroupProps,
    getInputProps: getInputProps,
    getItemProps: getItemProps,
    getListProps: getListProps,
    inputRef: inputRef,
    interactionRef: interactionRef,
    isOpen: isOpen,
    itemList: itemList,
    listRef: listRef,
    onClose: onClose,
    onOpen: onOpen,
    query: query,
    removeItem: removeItem,
    resetItems: resetItems,
    setQuery: setQuery,
    tags: tags,
    values: values
  };
}

var AutoComplete = /*#__PURE__*/react.forwardRef(function (props, ref) {
  var context = useAutoComplete(props);
  var children = context.children,
      isOpen = context.isOpen,
      onClose = context.onClose,
      onOpen = context.onOpen,
      resetItems = context.resetItems,
      removeItem = context.removeItem;
  React.useImperativeHandle(ref, function () {
    return {
      resetItems: resetItems,
      removeItem: removeItem
    };
  });
  return React__default.createElement(AutoCompleteProvider, {
    value: context
  }, React__default.createElement(react.Popover, {
    isLazy: true,
    isOpen: isOpen,
    onClose: onClose,
    onOpen: onOpen,
    autoFocus: false,
    placement: "bottom",
    closeOnBlur: true
  }, React__default.createElement(react.chakra.div, {
    sx: {
      ".chakra-popover__popper": {
        position: "unset !important"
      }
    },
    w: "full",
    ref: ref
  }, children)));
});
AutoComplete.displayName = "AutoComplete";

var _excluded$1 = ["children", "dangerouslySetInnerHTML"];
var AutoCompleteItem = /*#__PURE__*/react.forwardRef(function (props, forwardedRef) {
  var _useAutoCompleteConte = useAutoCompleteContext(),
      focusedValue = _useAutoCompleteConte.focusedValue,
      getItemProps = _useAutoCompleteConte.getItemProps,
      interactionRef = _useAutoCompleteConte.interactionRef;

  var itemRef = React.useRef();
  var ref = react.useMergeRefs(forwardedRef, itemRef);
  var itemProps = getItemProps(props);
  var _itemProps$root = itemProps.root,
      isValidSuggestion = _itemProps$root.isValidSuggestion,
      value = _itemProps$root.value;
  var isFocused = focusedValue === value;
  React.useEffect(function () {
    var _itemRef$current;

    if (isFocused && interactionRef.current === "keyboard") itemRef == null ? void 0 : (_itemRef$current = itemRef.current) == null ? void 0 : _itemRef$current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }, [isFocused, interactionRef]);
  React.useEffect(function () {
    if (typeof value !== "string") console.warn("wow");
    if (typeof value !== "string" && utils.isUndefined(props.getValue)) console.error("You must define the `getValue` prop, when an Item's value is not a string");
  }, []);

  var _itemProps$item = itemProps.item,
      children = _itemProps$item.children,
      dangerouslySetInnerHTML = _itemProps$item.dangerouslySetInnerHTML,
      restProps = _objectWithoutPropertiesLoose(_itemProps$item, _excluded$1);

  var rest = utils.omit(restProps, ["groupId"]);
  return isValidSuggestion ? React__default.createElement(react.Flex, Object.assign({
    ref: ref
  }, baseItemStyles, rest), children ? children : React__default.createElement("span", {
    dangerouslySetInnerHTML: dangerouslySetInnerHTML
  })) : null;
});
AutoCompleteItem.displayName = "AutoCompleteItem";
var baseItemStyles = {
  mx: "2",
  px: "2",
  py: "2",
  rounded: "md",
  cursor: "pointer"
};

var _excluded$2 = ["children"],
    _excluded2$1 = ["children"];
function AutoCompleteCreatable(props) {
  var childrenProp = props.children,
      rest = _objectWithoutPropertiesLoose(props, _excluded$2);

  var _useAutoCompleteConte = useAutoCompleteContext(),
      autoCompleteProps = _useAutoCompleteConte.autoCompleteProps,
      getItemProps = _useAutoCompleteConte.getItemProps,
      query = _useAutoCompleteConte.query,
      filteredResults = _useAutoCompleteConte.filteredResults;

  var queryValue = React__default.createElement("mark", null, query);

  var _getItemProps$item = getItemProps(_extends({}, props, {
    value: query,
    children: utils.runIfFn(childrenProp, {
      value: queryValue
    })
  }), true).item,
      children = _getItemProps$item.children,
      itemProps = _objectWithoutPropertiesLoose(_getItemProps$item, _excluded2$1);

  var queryExistsInList = filteredResults.some(function (i) {
    return i.value === query;
  });
  var showCreatable = autoCompleteProps.creatable && !utils.isEmpty(query) && !queryExistsInList;
  return showCreatable ? React__default.createElement(react.Flex, Object.assign({}, baseItemStyles, itemProps, rest), children || "Add " + query) : null;
}
AutoCompleteCreatable.displayName = "AutoCompleteCreatable";

var _excluded$3 = ["children", "showDivider"];
var AutoCompleteGroup = /*#__PURE__*/react.forwardRef(function (props, ref) {
  var children = props.children,
      restProps = _objectWithoutPropertiesLoose(props, _excluded$3);

  var rest = utils.omit(restProps, ["groupSibling"]);

  var _useAutoCompleteConte = useAutoCompleteContext(),
      getGroupProps = _useAutoCompleteConte.getGroupProps;

  var _getGroupProps = getGroupProps(props),
      group = _getGroupProps.group;

  var dividerStyles = useDividerStyles(props);
  return React__default.createElement(react.Box, Object.assign({
    ref: ref
  }, group, rest), React__default.createElement(react.Divider, Object.assign({}, dividerStyles.top)), children, React__default.createElement(react.Divider, Object.assign({}, dividerStyles.bottom)));
});
var AutoCompleteGroupTitle = /*#__PURE__*/react.forwardRef(function (props, ref) {
  return React__default.createElement(react.Flex, Object.assign({}, baseTitleStyles, props, {
    ref: ref
  }));
});
AutoCompleteGroup.displayName = "AutoCompleteGroup";
AutoCompleteGroupTitle.displayName = "AutoCompleteGroupTitle";
var baseTitleStyles = {
  ml: 5,
  my: 1,
  fontSize: "xs",
  letterSpacing: "wider",
  fontWeight: "extrabold",
  textTransform: "uppercase"
};

var useDividerStyles = function useDividerStyles(props) {
  var _useAutoCompleteConte2 = useAutoCompleteContext(),
      getGroupProps = _useAutoCompleteConte2.getGroupProps;

  var hasGroupSibling = props.groupSibling;

  var _getGroupProps2 = getGroupProps(props),
      _getGroupProps2$divid = _getGroupProps2.divider,
      hasFirstChild = _getGroupProps2$divid.hasFirstChild,
      hasLastChild = _getGroupProps2$divid.hasLastChild;

  var baseStyles = {
    my: 2,
    borderColor: props.dividerColor
  };

  var top = _extends({}, baseStyles, {
    mb: 4,
    display: !props.showDivider || hasFirstChild ? "none" : ""
  });

  var bottom = _extends({}, baseStyles, {
    display: !props.showDivider || hasLastChild || hasGroupSibling ? "none" : ""
  });

  return {
    top: top,
    bottom: bottom
  };
};

var _excluded$4 = ["children"],
    _excluded2$2 = ["ref"];
var AutoCompleteInput = /*#__PURE__*/react.forwardRef(function (props, forwardedRef) {
  var _useAutoCompleteConte = useAutoCompleteContext(),
      inputRef = _useAutoCompleteConte.inputRef,
      getInputProps = _useAutoCompleteConte.getInputProps,
      tags = _useAutoCompleteConte.tags; // const ref = useMergeRefs(forwardedRef, inputRef);


  var childrenProp = props.children,
      rest = _objectWithoutPropertiesLoose(props, _excluded$4);

  var themeInput = react.useMultiStyleConfig("Input", props);

  var _getInputProps = getInputProps(rest, themeInput),
      wrapper = _getInputProps.wrapper,
      inputProps = _getInputProps.input;

  var wrapperRef = wrapper.ref,
      wrapperProps = _objectWithoutPropertiesLoose(wrapper, _excluded2$2);

  var ref = react.useMergeRefs(forwardedRef, inputRef);
  var children = utils.runIfFn(childrenProp, {
    tags: tags
  });
  return React__default.createElement(react.Wrap, Object.assign({}, wrapperProps, {
    ref: wrapperRef
  }), children, React__default.createElement(react.WrapItem, Object.assign({
    as: react.Input
  }, inputProps, {
    ref: ref
  })));
});
AutoCompleteInput.displayName = "Input";
AutoCompleteInput.id = "Input";

var EmptyState = function EmptyState(props) {
  var _useAutoCompleteConte = useAutoCompleteContext(),
      getEmptyStateProps = _useAutoCompleteConte.getEmptyStateProps;

  var emptyState = getEmptyStateProps(React__default.createElement(layout.Flex, Object.assign({}, emptyStyles), "No options found!"));
  return React__default.createElement(layout.Box, Object.assign({}, props), emptyState);
};
var emptyStyles = {
  fontSize: "sm",
  align: "center",
  justify: "center",
  fontWeight: "bold",
  fontStyle: "italic"
};

var siblingInfo = function siblingInfo(children) {
  return React__default.Children.map(children, function (child, i) {
    if (child.type.displayName === "AutoCompleteGroup") {
      var sibling = React__default.Children.toArray(children)[i + 1];
      return React__default.cloneElement(child, {
        groupSibling: sibling ? sibling.type.displayName === "AutoCompleteGroup" : false
      });
    }

    return child;
  });
};

var _excluded$5 = ["children"];
var AutoCompleteList = /*#__PURE__*/react.forwardRef(function (props, forwardedRef) {
  var children = props.children,
      rest = _objectWithoutPropertiesLoose(props, _excluded$5);

  var _useAutoCompleteConte = useAutoCompleteContext(),
      listRef = _useAutoCompleteConte.listRef,
      getListProps = _useAutoCompleteConte.getListProps;

  var ref = react.useMergeRefs(forwardedRef, listRef);
  var listProps = getListProps();
  return React__default.createElement(react.PopoverContent, Object.assign({
    ref: ref
  }, baseStyles, listProps, rest), siblingInfo(children), React__default.createElement(EmptyState, null));
});
AutoCompleteList.displayName = "AutoCompleteList";
var baseStyles = {
  mt: "4",
  py: "4",
  opacity: "0",
  bg: "#232934",
  rounded: "md",
  maxH: "350px",
  border: "none",
  shadow: "base",
  pos: "absolute",
  zIndex: "popover",
  overflowY: "auto",
  _light: {
    bg: "#ffffff"
  },
  _focus: {
    boxShadow: "none"
  }
};

var _excluded$6 = ["label", "onRemove", "disabled"];
var AutoCompleteTag = /*#__PURE__*/React.memo(function (props) {
  var label = props.label,
      onRemove = props.onRemove,
      disabled = props.disabled,
      rest = _objectWithoutPropertiesLoose(props, _excluded$6);

  return React__default.createElement(layout.WrapItem, null, React__default.createElement(tag.Tag, Object.assign({
    borderRadius: "md",
    fontWeight: "normal"
  }, disabled && disabledStyles, rest), React__default.createElement(tag.TagLabel, null, label), React__default.createElement(tag.TagCloseButton, Object.assign({
    onClick: function onClick() {
      return !disabled && utils.runIfFn(onRemove);
    },
    cursor: "pointer"
  }, disabled && disabledStyles))));
});
var disabledStyles = {
  cursor: "text",
  userSelect: "none",
  opacity: 0.4,
  _focus: {
    boxShadow: "none"
  }
};

exports.AutoComplete = AutoComplete;
exports.AutoCompleteCreatable = AutoCompleteCreatable;
exports.AutoCompleteGroup = AutoCompleteGroup;
exports.AutoCompleteGroupTitle = AutoCompleteGroupTitle;
exports.AutoCompleteInput = AutoCompleteInput;
exports.AutoCompleteItem = AutoCompleteItem;
exports.AutoCompleteList = AutoCompleteList;
exports.AutoCompleteProvider = AutoCompleteProvider;
exports.AutoCompleteTag = AutoCompleteTag;
exports.baseItemStyles = baseItemStyles;
exports.useAutoComplete = useAutoComplete;
exports.useAutoCompleteContext = useAutoCompleteContext;
//# sourceMappingURL=chakra-autocomplete.cjs.development.js.map
