require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"input-framer/input":[function(require,module,exports){
var _inputStyle, calculatePixelRatio, growthRatio, imageHeight,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

_inputStyle = Object.assign({}, Framer.LayerStyle, calculatePixelRatio = function(layer, value) {
  return (value * layer.context.pixelMultiplier) + "px";
}, {
  fontSize: function(layer) {
    return calculatePixelRatio(layer, layer._properties.fontSize);
  },
  lineHeight: function(layer) {
    return layer._properties.lineHeight + "em";
  },
  padding: function(layer) {
    var padding, paddingValue, paddingValues, pixelMultiplier;
    pixelMultiplier = layer.context.pixelMultiplier;
    padding = [];
    paddingValue = layer._properties.padding;
    if (Number.isInteger(paddingValue)) {
      return calculatePixelRatio(layer, paddingValue);
    }
    paddingValues = layer._properties.padding.split(" ");
    switch (paddingValues.length) {
      case 4:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[3]);
        break;
      case 3:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[2]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      case 2:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[1]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[1]);
        break;
      default:
        padding.top = parseFloat(paddingValues[0]);
        padding.right = parseFloat(paddingValues[0]);
        padding.bottom = parseFloat(paddingValues[0]);
        padding.left = parseFloat(paddingValues[0]);
    }
    return (padding.top * pixelMultiplier) + "px " + (padding.right * pixelMultiplier) + "px " + (padding.bottom * pixelMultiplier) + "px " + (padding.left * pixelMultiplier) + "px";
  }
});

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    this.enable = bind(this.enable, this);
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "rgba(255, 255, 255, .01)";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    if (options.autoCorrect == null) {
      options.autoCorrect = "on";
    }
    if (options.autoComplete == null) {
      options.autoComplete = "on";
    }
    if (options.autoCapitalize == null) {
      options.autoCapitalize = "on";
    }
    if (options.spellCheck == null) {
      options.spellCheck = "on";
    }
    if (options.autofocus == null) {
      options.autofocus = false;
    }
    if (options.textColor == null) {
      options.textColor = "#000";
    }
    if (options.fontFamily == null) {
      options.fontFamily = "-apple-system";
    }
    if (options.fontWeight == null) {
      options.fontWeight = "500";
    }
    if (options.submit == null) {
      options.submit = false;
    }
    if (options.tabIndex == null) {
      options.tabIndex = 0;
    }
    if (options.textarea == null) {
      options.textarea = false;
    }
    if (options.disabled == null) {
      options.disabled = false;
    }
    Input.__super__.constructor.call(this, options);
    this._properties.fontSize = options.fontSize;
    this._properties.lineHeight = options.lineHeight;
    this._properties.padding = options.padding;
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement(options.textarea ? 'textarea' : 'input');
    this.input.id = "input-" + (_.now());
    this.input.style.width = _inputStyle["width"](this);
    this.input.style.height = _inputStyle["height"](this);
    this.input.style.fontSize = _inputStyle["fontSize"](this);
    this.input.style.lineHeight = _inputStyle["lineHeight"](this);
    this.input.style.outline = "none";
    this.input.style.border = "none";
    this.input.style.backgroundColor = options.backgroundColor;
    this.input.style.padding = _inputStyle["padding"](this);
    this.input.style.fontFamily = options.fontFamily;
    this.input.style.color = options.textColor;
    this.input.style.fontWeight = options.fontWeight;
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.input.setAttribute("tabindex", options.tabindex);
    this.input.setAttribute("autocorrect", options.autoCorrect);
    this.input.setAttribute("autocomplete", options.autoComplete);
    this.input.setAttribute("autocapitalize", options.autoCapitalize);
    if (options.disabled === true) {
      this.input.setAttribute("disabled", true);
    }
    if (options.autofocus === true) {
      this.input.setAttribute("autofocus", true);
    }
    this.input.setAttribute("spellcheck", options.spellCheck);
    this.form = document.createElement("form");
    if ((options.goButton && !options.submit) || !options.submit) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.stateCycle();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.animate("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.unfocus = function() {
    return this.input.blur();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onUnfocus = Input.onBlur;

  Input.prototype.disable = function() {
    return this.input.setAttribute("disabled", true);
  };

  Input.prototype.enable = function() {
    return this.input.removeAttribute("disabled", true);
  };

  return Input;

})(Layer);


},{}],"myModule":[function(require,module,exports){
exports.myVar = "myVariable";

exports.myFunction = function() {
  return print("myFunction is running");
};

exports.myArray = [1, 2, 3];


},{}],"symbols/Symbol":[function(require,module,exports){
var copySourceToTarget, copyStatesFromTarget, removeIds,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

removeIds = function(htmlString) {
  var i, id, ids, len;
  ids = Utils.getIdAttributesFromString(htmlString);
  for (i = 0, len = ids.length; i < len; i++) {
    id = ids[i];
    htmlString = htmlString.replace(/ id="(.*?)"/g, "");
  }
  return htmlString;
};

copySourceToTarget = function(source, target) {
  var i, len, ref, results, subLayer, svgCopy;
  if (target == null) {
    target = false;
  }
  if (source.children.length > 0) {
    ref = source.descendants;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      subLayer = ref[i];
      if (subLayer.constructor.name === "SVGLayer") {
        if ((subLayer.html != null) && (subLayer.svg != null)) {
          delete subLayer.svg;
        }
        subLayer.html = removeIds(subLayer.html);
        target[subLayer.name] = subLayer.copy();
      } else if (subLayer.constructor.name === "SVGPath" || subLayer.constructor.name === "SVGGroup") {
        svgCopy = subLayer._svgLayer.copy();
        target[subLayer.name] = svgCopy;
      } else {
        target[subLayer.name] = subLayer.copySingle();
      }
      target[subLayer.name].name = subLayer.name;
      if (subLayer.parent === source) {
        target[subLayer.name].parent = target;
      } else {
        target[subLayer.name].parent = target[subLayer.parent.name];
      }
      if (target[subLayer.name].constructor.name !== "SVGLayer") {
        target[subLayer.name].constraintValues = subLayer.constraintValues;
        target[subLayer.name].layout();
      }
      results.push(target[subLayer.name]._instance = target);
    }
    return results;
  }
};

copyStatesFromTarget = function(source, target, stateName, animationOptions, ignoredProps, stateProps) {
  var descendantProp, descendantVal, i, ignoredProp, ignoredVal, j, layer, len, len1, ref, ref1, stateProp, stateVal, subLayer, targets;
  if (animationOptions == null) {
    animationOptions = false;
  }
  if (ignoredProps == null) {
    ignoredProps = false;
  }
  if (stateProps == null) {
    stateProps = false;
  }
  targets = [];
  ref = target.descendants;
  for (i = 0, len = ref.length; i < len; i++) {
    layer = ref[i];
    if (layer.constraintValues) {
      layer.frame = Utils.calculateLayoutFrame(layer.parent.frame, layer);
    }
    targets[layer.name] = layer;
  }
  ref1 = source.descendants;
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    subLayer = ref1[j];
    if (subLayer.constructor.name === "SVGLayer") {
      delete targets[subLayer.name].states["default"].html;
    }
    if (subLayer.constructor.name === "SVGPath" || subLayer.constructor.name === "SVGGroup") {
      subLayer._svgLayer.states["" + stateName] = targets[subLayer.name]._svgLayer.states["default"];
    }
    if (ignoredProps) {
      for (ignoredProp in ignoredProps) {
        ignoredVal = ignoredProps[ignoredProp];
        if (targets[subLayer.name].name === ignoredProp) {
          for (descendantProp in ignoredVal) {
            descendantVal = ignoredVal[descendantProp];
            targets[subLayer.name].states["default"][descendantProp] = descendantVal;
          }
        }
      }
    }
    if (stateProps) {
      for (stateProp in stateProps) {
        stateVal = stateProps[stateProp];
        if (targets[subLayer.name].name === stateProp) {
          for (descendantProp in stateVal) {
            descendantVal = stateVal[descendantProp];
            targets[subLayer.name].states["default"][descendantProp] = descendantVal;
          }
        }
      }
    }
    if (stateName !== "default" || (subLayer.constructor.name === "SVGPath" || subLayer.constructor.name === "SVGGroup" || subLayer.constructor.name === "SVGLayer")) {
      subLayer.states["" + stateName] = targets[subLayer.name].states["default"];
    }
    if (animationOptions) {
      subLayer.states["" + stateName].animationOptions = animationOptions;
      if (subLayer.constructor.name === "SVGPath" || subLayer.constructor.name === "SVGGroup") {
        subLayer._svgLayer.states["" + stateName].animationOptions = animationOptions;
      }
    }
    if (targets[subLayer.name].constructor.name !== "SVGPath" || targets[subLayer.name].constructor.name !== "SVGGroup") {
      targets[subLayer.name].layout();
    }
  }
  return target.destroy();
};

Layer.prototype.replaceWithSymbol = function(symbol) {
  return Utils.throwInStudioOrWarnInProduction("Error: layer.replaceWithSymbol(symbolInstance) is deprecated - use symbolInstance.replaceLayer(layer) instead.");
};

exports.Symbol = function(layer, states, events) {
  var Symbol;
  if (states == null) {
    states = false;
  }
  if (events == null) {
    events = false;
  }
  return Symbol = (function(superClass) {
    extend(Symbol, superClass);

    function Symbol(options) {
      var action, actionProps, base, base1, base2, blacklist, child, descendant, i, j, k, key, l, len, len1, len2, len3, newStates, prop, props, ref, ref1, ref2, ref3, ref4, stateName, stateProps, trigger, triggerName, val, value;
      this.options = options != null ? options : {};
      if ((base = this.options).x == null) {
        base.x = 0;
      }
      if ((base1 = this.options).y == null) {
        base1.y = 0;
      }
      if ((base2 = this.options).replaceLayer == null) {
        base2.replaceLayer = false;
      }
      blacklist = ['parent', 'replaceLayer'];
      this.ignoredProps = {};
      ref = this.options;
      for (key in ref) {
        val = ref[key];
        this.ignoredProps[key] = val;
      }
      for (i = 0, len = blacklist.length; i < len; i++) {
        prop = blacklist[i];
        delete this.ignoredProps[prop];
      }
      Symbol.__super__.constructor.call(this, _.defaults(this.options, layer.props));
      ref1 = layer.descendants;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        child = ref1[j];
        this[child.name] = child;
        ref2 = this.options;
        for (key in ref2) {
          props = ref2[key];
          if (key === child.name) {
            for (prop in props) {
              value = props[prop];
              this[key][prop] = value;
            }
          }
        }
      }
      this.customProps = this.options.customProps;
      copySourceToTarget(layer, this);
      copyStatesFromTarget(this, layer, 'default', false, this.ignoredProps);
      if (this.options.replaceLayer) {
        this.replaceLayer(this.options.replaceLayer);
      }
      if (states) {
        newStates = _.cloneDeep(states);
        for (stateName in newStates) {
          stateProps = newStates[stateName];
          if (stateName === "animationOptions") {
            this.animationOptions = stateProps;
            ref3 = this.descendants;
            for (k = 0, len2 = ref3.length; k < len2; k++) {
              descendant = ref3[k];
              descendant.animationOptions = this.animationOptions;
            }
          } else {
            if (!stateProps.template) {
              stateProps.template = layer;
            }
            this.addSymbolState(stateName, stateProps.template, stateProps.animationOptions, this.ignoredProps, stateProps);
          }
        }
      }
      if (events) {
        for (trigger in events) {
          action = events[trigger];
          if (_.isFunction(action)) {
            if (Events[trigger]) {
              this.on(Events[trigger], action);
            }
          } else {
            if (this[trigger]) {
              for (triggerName in action) {
                actionProps = action[triggerName];
                if (Events[triggerName]) {
                  this[trigger].on(Events[triggerName], actionProps);
                }
              }
            }
          }
        }
      }
      ref4 = this.descendants;
      for (l = 0, len3 = ref4.length; l < len3; l++) {
        child = ref4[l];
        if (child.constructor.name === "SVGLayer" || child.constructor.name === "SVGPath" || child.constructor.name === "SVGGroup") {
          child.stateSwitch("default");
        }
      }
      this.on(Events.StateSwitchStart, function(from, to) {
        var len4, m, ref5, results;
        if (from === to) {
          return;
        }
        ref5 = this.descendants;
        results = [];
        for (m = 0, len4 = ref5.length; m < len4; m++) {
          child = ref5[m];
          if (child.constructor.name === "TextLayer") {
            child.states[to].text = child.text;
            child.states[to].textAlign = child.props.styledTextOptions.alignment;
            if (child.template && Object.keys(child.template).length > 0) {
              child.states[to].template = child.template;
            }
          } else {
            if (child.image && (child.states[to].image !== child.image)) {
              child.states[to].image = child.image;
            }
          }
          results.push(child.animate(to));
        }
        return results;
      });
      if (states) {
        for (stateName in states) {
          stateProps = states[stateName];
          if (stateProps.template) {
            stateProps.template.destroy();
          }
        }
      }
      layer.destroy();
    }

    Symbol.prototype.addSymbolState = function(stateName, target, animationOptions, ignoredProps, stateProps) {
      var descendant, i, j, k, len, len1, len2, newTarget, prop, ref, ref1, ref2, stateProp, stateVal, targets;
      if (animationOptions == null) {
        animationOptions = false;
      }
      if (ignoredProps == null) {
        ignoredProps = false;
      }
      if (stateProps == null) {
        stateProps = false;
      }
      newTarget = target.copy();
      targets = [];
      ref = target.descendants;
      for (i = 0, len = ref.length; i < len; i++) {
        descendant = ref[i];
        targets[descendant.name] = descendant;
      }
      ref1 = newTarget.descendants;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        descendant = ref1[j];
        descendant.constraintValues = targets[descendant.name].constraintValues;
        if (descendant.constructor.name === "SVGPath" || descendant.constructor.name === "SVGGroup") {
          descendant.states["default"] = targets[descendant.name].states["default"];
        }
      }
      if (ignoredProps.width) {
        newTarget.width = ignoredProps.width;
      }
      if (ignoredProps.height) {
        newTarget.height = ignoredProps.height;
      }
      ref2 = ['x', 'y'];
      for (k = 0, len2 = ref2.length; k < len2; k++) {
        prop = ref2[k];
        delete newTarget.states["default"][prop];
      }
      if (ignoredProps) {
        for (prop in ignoredProps) {
          delete newTarget.states["default"][prop];
        }
      }
      if (stateProps.width) {
        newTarget.width = stateProps.width;
      }
      if (stateProps.height) {
        newTarget.height = stateProps.height;
      }
      if (stateProps) {
        for (stateProp in stateProps) {
          stateVal = stateProps[stateProp];
          if (typeof newTarget.props[stateProp] !== 'undefined') {
            newTarget.states["default"][stateProp] = stateVal;
            delete stateProps[stateProp];
          }
        }
      }
      this.states["" + stateName] = newTarget.states["default"];
      if (animationOptions) {
        this.states["" + stateName].animationOptions = animationOptions;
      }
      return copyStatesFromTarget(this, newTarget, stateName, animationOptions, ignoredProps, stateProps);
    };

    Symbol.prototype.replaceLayer = function(layer, resize) {
      var i, len, ref, stateName;
      if (resize == null) {
        resize = false;
      }
      this.parent = layer.parent;
      this.x = layer.x;
      this.y = layer.y;
      if (resize) {
        this.width = layer.width;
        this.height = layer.height;
      }
      ref = this.stateNames;
      for (i = 0, len = ref.length; i < len; i++) {
        stateName = ref[i];
        this.states[stateName].x = layer.x;
        this.states[stateName].y = layer.y;
        if (resize) {
          this.states[stateName].width = layer.width;
          this.states[stateName].height = layer.height;
        }
      }
      return layer.destroy();
    };

    return Symbol;

  })(Layer);
};

exports.createSymbol = function(layer, states, events) {
  return exports.Symbol(layer, states, events);
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Bhd2VsL0RvY3VtZW50cy9HaXRIdWIvR0RTLUZyYW1lci9Ccm9kaWNrLmZyYW1lci9tb2R1bGVzL3N5bWJvbHMvU3ltYm9sLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Bhd2VsL0RvY3VtZW50cy9HaXRIdWIvR0RTLUZyYW1lci9Ccm9kaWNrLmZyYW1lci9tb2R1bGVzL215TW9kdWxlLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL3Bhd2VsL0RvY3VtZW50cy9HaXRIdWIvR0RTLUZyYW1lci9Ccm9kaWNrLmZyYW1lci9tb2R1bGVzL2lucHV0LWZyYW1lci9pbnB1dC5jb2ZmZWUiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiMgUmVtb3ZlcyBJRHMgZnJvbSBTVkdcbnJlbW92ZUlkcyA9IChodG1sU3RyaW5nKSAtPlxuICBpZHMgPSBVdGlscy5nZXRJZEF0dHJpYnV0ZXNGcm9tU3RyaW5nKGh0bWxTdHJpbmcpXG4gIGZvciBpZCBpbiBpZHNcbiAgICBodG1sU3RyaW5nID0gaHRtbFN0cmluZy5yZXBsYWNlKC8gaWQ9XCIoLio/KVwiL2csIFwiXCIpIDtcbiAgcmV0dXJuIGh0bWxTdHJpbmdcblxuIyBDb3BpZXMgYWxsIGRlc2NlbmRhbnRzIG9mIGEgbGF5ZXJcbmNvcHlTb3VyY2VUb1RhcmdldCA9IChzb3VyY2UsIHRhcmdldCA9IGZhbHNlKSAtPlxuICBpZiBzb3VyY2UuY2hpbGRyZW4ubGVuZ3RoID4gMFxuICAgIGZvciBzdWJMYXllciBpbiBzb3VyY2UuZGVzY2VuZGFudHNcbiAgICAgIGlmIHN1YkxheWVyLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdMYXllclwiXG4gICAgICAgIGlmIHN1YkxheWVyLmh0bWw/IGFuZCBzdWJMYXllci5zdmc/XG4gICAgICAgICAgZGVsZXRlIHN1YkxheWVyLnN2Z1xuICAgICAgICBzdWJMYXllci5odG1sID0gcmVtb3ZlSWRzKHN1YkxheWVyLmh0bWwpXG4gICAgICAgIHRhcmdldFtzdWJMYXllci5uYW1lXSA9IHN1YkxheWVyLmNvcHkoKVxuICAgICAgZWxzZSBpZiBzdWJMYXllci5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU1ZHUGF0aFwiIG9yIHN1YkxheWVyLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdHcm91cFwiXG4gICAgICAgIHN2Z0NvcHkgPSBzdWJMYXllci5fc3ZnTGF5ZXIuY29weSgpXG4gICAgICAgIHRhcmdldFtzdWJMYXllci5uYW1lXSA9IHN2Z0NvcHlcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0W3N1YkxheWVyLm5hbWVdID0gc3ViTGF5ZXIuY29weVNpbmdsZSgpXG5cbiAgICAgIHRhcmdldFtzdWJMYXllci5uYW1lXS5uYW1lID0gc3ViTGF5ZXIubmFtZVxuXG4gICAgICBpZiBzdWJMYXllci5wYXJlbnQgaXMgc291cmNlXG4gICAgICAgIHRhcmdldFtzdWJMYXllci5uYW1lXS5wYXJlbnQgPSB0YXJnZXRcbiAgICAgIGVsc2VcbiAgICAgICAgdGFyZ2V0W3N1YkxheWVyLm5hbWVdLnBhcmVudCA9IHRhcmdldFtzdWJMYXllci5wYXJlbnQubmFtZV1cblxuICAgICAgaWYgdGFyZ2V0W3N1YkxheWVyLm5hbWVdLmNvbnN0cnVjdG9yLm5hbWUgaXNudCBcIlNWR0xheWVyXCJcbiAgICAgICAgdGFyZ2V0W3N1YkxheWVyLm5hbWVdLmNvbnN0cmFpbnRWYWx1ZXMgPSBzdWJMYXllci5jb25zdHJhaW50VmFsdWVzXG4gICAgICAgIHRhcmdldFtzdWJMYXllci5uYW1lXS5sYXlvdXQoKVxuXG4gICAgICAjIENyZWF0ZSByZWZlcmVuY2UgdG8gdGhlIHN5bWJvbCBpbnN0YW5jZVxuICAgICAgdGFyZ2V0W3N1YkxheWVyLm5hbWVdLl9pbnN0YW5jZSA9IHRhcmdldFxuXG4jIENvcGllcyBkZWZhdWx0LXN0YXRlIG9mIHRhcmdldCBhbmQgYXBwbGllcyBpdCB0byB0aGUgc3ltYm9sJ3MgZGVzY2VuZGFudHNcbmNvcHlTdGF0ZXNGcm9tVGFyZ2V0ID0gKHNvdXJjZSwgdGFyZ2V0LCBzdGF0ZU5hbWUsIGFuaW1hdGlvbk9wdGlvbnMgPSBmYWxzZSwgaWdub3JlZFByb3BzID0gZmFsc2UsIHN0YXRlUHJvcHMgPSBmYWxzZSkgLT5cbiAgdGFyZ2V0cyA9IFtdXG5cbiAgZm9yIGxheWVyIGluIHRhcmdldC5kZXNjZW5kYW50c1xuICAgIGlmIGxheWVyLmNvbnN0cmFpbnRWYWx1ZXNcbiAgICAgIGxheWVyLmZyYW1lID0gVXRpbHMuY2FsY3VsYXRlTGF5b3V0RnJhbWUobGF5ZXIucGFyZW50LmZyYW1lLCBsYXllcilcbiAgICB0YXJnZXRzW2xheWVyLm5hbWVdID0gbGF5ZXJcblxuICBmb3Igc3ViTGF5ZXIgaW4gc291cmNlLmRlc2NlbmRhbnRzXG4gICAgaWYgc3ViTGF5ZXIuY29uc3RydWN0b3IubmFtZSBpcyBcIlNWR0xheWVyXCJcbiAgICAgIGRlbGV0ZSB0YXJnZXRzW3N1YkxheWVyLm5hbWVdLnN0YXRlcy5kZWZhdWx0Lmh0bWxcblxuICAgIGlmIHN1YkxheWVyLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdQYXRoXCIgb3Igc3ViTGF5ZXIuY29uc3RydWN0b3IubmFtZSBpcyBcIlNWR0dyb3VwXCJcbiAgICAgIHN1YkxheWVyLl9zdmdMYXllci5zdGF0ZXNbXCIje3N0YXRlTmFtZX1cIl0gPSB0YXJnZXRzW3N1YkxheWVyLm5hbWVdLl9zdmdMYXllci5zdGF0ZXMuZGVmYXVsdFxuXG4gICAgaWYgaWdub3JlZFByb3BzXG4gICAgICAjIENoYW5nZSB0aGUgcHJvcHMgb2YgdGhlIGRlc2NlbmRhbnRzIG9mIGEgc3ltYm9sIGluc2lkZSBjb21tb25TdGF0ZXNcbiAgICAgIGZvciBpZ25vcmVkUHJvcCwgaWdub3JlZFZhbCBvZiBpZ25vcmVkUHJvcHNcbiAgICAgICAgaWYgdGFyZ2V0c1tzdWJMYXllci5uYW1lXS5uYW1lIGlzIGlnbm9yZWRQcm9wXG4gICAgICAgICAgZm9yIGRlc2NlbmRhbnRQcm9wLCBkZXNjZW5kYW50VmFsIG9mIGlnbm9yZWRWYWxcbiAgICAgICAgICAgIHRhcmdldHNbc3ViTGF5ZXIubmFtZV0uc3RhdGVzLmRlZmF1bHRbZGVzY2VuZGFudFByb3BdID0gZGVzY2VuZGFudFZhbFxuXG4gICAgaWYgc3RhdGVQcm9wc1xuICAgICAgIyBDaGFuZ2UgdGhlIHByb3BzIG9mIHRoZSBkZXNjZW5kYW50cyBvZiBhIHN5bWJvbCBpbnNpZGUgY29tbW9uU3RhdGVzXG4gICAgICBmb3Igc3RhdGVQcm9wLCBzdGF0ZVZhbCBvZiBzdGF0ZVByb3BzXG4gICAgICAgIGlmIHRhcmdldHNbc3ViTGF5ZXIubmFtZV0ubmFtZSBpcyBzdGF0ZVByb3BcbiAgICAgICAgICBmb3IgZGVzY2VuZGFudFByb3AsIGRlc2NlbmRhbnRWYWwgb2Ygc3RhdGVWYWxcbiAgICAgICAgICAgIHRhcmdldHNbc3ViTGF5ZXIubmFtZV0uc3RhdGVzLmRlZmF1bHRbZGVzY2VuZGFudFByb3BdID0gZGVzY2VuZGFudFZhbFxuXG4gICAgaWYgc3RhdGVOYW1lIGlzbnQgXCJkZWZhdWx0XCIgb3IgKHN1YkxheWVyLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdQYXRoXCIgb3Igc3ViTGF5ZXIuY29uc3RydWN0b3IubmFtZSBpcyBcIlNWR0dyb3VwXCIgb3Igc3ViTGF5ZXIuY29uc3RydWN0b3IubmFtZSBpcyBcIlNWR0xheWVyXCIpXG4gICAgICBzdWJMYXllci5zdGF0ZXNbXCIje3N0YXRlTmFtZX1cIl0gPSB0YXJnZXRzW3N1YkxheWVyLm5hbWVdLnN0YXRlcy5kZWZhdWx0XG5cbiAgICBpZiBhbmltYXRpb25PcHRpb25zXG4gICAgICBzdWJMYXllci5zdGF0ZXNbXCIje3N0YXRlTmFtZX1cIl0uYW5pbWF0aW9uT3B0aW9ucyA9IGFuaW1hdGlvbk9wdGlvbnNcblxuICAgICAgIyBBbHNvIGFkZCB0aGUgYW5pbWF0aW9uT3B0aW9ucyB0byB0aGUgXCJwYXJlbnRcIiBTVkdMYXllciBvZiBhIFNWR1BhdGggb3IgU1ZHR3JvdXBcbiAgICAgIGlmIHN1YkxheWVyLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdQYXRoXCIgb3Igc3ViTGF5ZXIuY29uc3RydWN0b3IubmFtZSBpcyBcIlNWR0dyb3VwXCJcbiAgICAgICAgc3ViTGF5ZXIuX3N2Z0xheWVyLnN0YXRlc1tcIiN7c3RhdGVOYW1lfVwiXS5hbmltYXRpb25PcHRpb25zID0gYW5pbWF0aW9uT3B0aW9uc1xuXG4gICAgaWYgdGFyZ2V0c1tzdWJMYXllci5uYW1lXS5jb25zdHJ1Y3Rvci5uYW1lIGlzbnQgXCJTVkdQYXRoXCIgb3IgdGFyZ2V0c1tzdWJMYXllci5uYW1lXS5jb25zdHJ1Y3Rvci5uYW1lIGlzbnQgXCJTVkdHcm91cFwiXG4gICAgICB0YXJnZXRzW3N1YkxheWVyLm5hbWVdLmxheW91dCgpXG5cbiAgdGFyZ2V0LmRlc3Ryb3koKVxuXG5MYXllcjo6cmVwbGFjZVdpdGhTeW1ib2wgPSAoc3ltYm9sKSAtPlxuICBVdGlscy50aHJvd0luU3R1ZGlvT3JXYXJuSW5Qcm9kdWN0aW9uIFwiRXJyb3I6IGxheWVyLnJlcGxhY2VXaXRoU3ltYm9sKHN5bWJvbEluc3RhbmNlKSBpcyBkZXByZWNhdGVkIC0gdXNlIHN5bWJvbEluc3RhbmNlLnJlcGxhY2VMYXllcihsYXllcikgaW5zdGVhZC5cIlxuICAjIHN5bWJvbC5yZXBsYWNlTGF5ZXIgQFxuXG5leHBvcnRzLlN5bWJvbCA9IChsYXllciwgc3RhdGVzID0gZmFsc2UsIGV2ZW50cyA9IGZhbHNlKSAtPlxuICBjbGFzcyBTeW1ib2wgZXh0ZW5kcyBMYXllclxuICAgIGNvbnN0cnVjdG9yOiAoQG9wdGlvbnMgPSB7fSkgLT5cbiAgICAgIEBvcHRpb25zLnggPz0gMFxuICAgICAgQG9wdGlvbnMueSA/PSAwXG4gICAgICBAb3B0aW9ucy5yZXBsYWNlTGF5ZXIgPz0gZmFsc2VcblxuICAgICAgYmxhY2tsaXN0ID0gWydwYXJlbnQnLCAncmVwbGFjZUxheWVyJ11cbiAgICAgIEAuaWdub3JlZFByb3BzID0ge31cblxuICAgICAgZm9yIGtleSwgdmFsIG9mIEBvcHRpb25zXG4gICAgICAgIEAuaWdub3JlZFByb3BzW2tleV0gPSB2YWxcblxuICAgICAgZm9yIHByb3AgaW4gYmxhY2tsaXN0XG4gICAgICAgIGRlbGV0ZSBALmlnbm9yZWRQcm9wc1twcm9wXVxuXG4gICAgICBzdXBlciBfLmRlZmF1bHRzIEBvcHRpb25zLCBsYXllci5wcm9wc1xuXG4gICAgICBmb3IgY2hpbGQgaW4gbGF5ZXIuZGVzY2VuZGFudHNcbiAgICAgICAgQFtjaGlsZC5uYW1lXSA9IGNoaWxkXG5cbiAgICAgICAgZm9yIGtleSwgcHJvcHMgb2YgQG9wdGlvbnNcbiAgICAgICAgICBpZiBrZXkgaXMgY2hpbGQubmFtZVxuICAgICAgICAgICAgZm9yIHByb3AsIHZhbHVlIG9mIHByb3BzXG4gICAgICAgICAgICAgIEBba2V5XVtwcm9wXSA9IHZhbHVlXG5cbiAgICAgIEAuY3VzdG9tUHJvcHMgPSBAb3B0aW9ucy5jdXN0b21Qcm9wc1xuXG4gICAgICBjb3B5U291cmNlVG9UYXJnZXQobGF5ZXIsIEApXG4gICAgICBjb3B5U3RhdGVzRnJvbVRhcmdldChALCBsYXllciwgJ2RlZmF1bHQnLCBmYWxzZSwgQC5pZ25vcmVkUHJvcHMpXG5cbiAgICAgIGlmIEBvcHRpb25zLnJlcGxhY2VMYXllclxuICAgICAgICBALnJlcGxhY2VMYXllciBAb3B0aW9ucy5yZXBsYWNlTGF5ZXJcblxuICAgICAgIyBBcHBseSBzdGF0ZXMgdG8gc3ltYm9sIGlmIHN1cHBsaWVkXG4gICAgICBpZiBzdGF0ZXNcbiAgICAgICAgbmV3U3RhdGVzID0gXy5jbG9uZURlZXAoc3RhdGVzKVxuICAgICAgICBmb3Igc3RhdGVOYW1lLCBzdGF0ZVByb3BzIG9mIG5ld1N0YXRlc1xuICAgICAgICAgICMgRmlsdGVyIGFuaW1hdGlvbk9wdGlvbnMgb3V0IG9mIHN0YXRlcyBhbmQgYXBwbHkgdGhlbSB0byBzeW1ib2xcbiAgICAgICAgICBpZiBzdGF0ZU5hbWUgaXMgXCJhbmltYXRpb25PcHRpb25zXCJcbiAgICAgICAgICAgIEAuYW5pbWF0aW9uT3B0aW9ucyA9IHN0YXRlUHJvcHNcbiAgICAgICAgICAgIGZvciBkZXNjZW5kYW50IGluIEAuZGVzY2VuZGFudHNcbiAgICAgICAgICAgICAgZGVzY2VuZGFudC5hbmltYXRpb25PcHRpb25zID0gQC5hbmltYXRpb25PcHRpb25zXG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgIXN0YXRlUHJvcHMudGVtcGxhdGVcbiAgICAgICAgICAgICAgc3RhdGVQcm9wcy50ZW1wbGF0ZSA9IGxheWVyXG5cbiAgICAgICAgICAgIEAuYWRkU3ltYm9sU3RhdGUoc3RhdGVOYW1lLCBzdGF0ZVByb3BzLnRlbXBsYXRlLCBzdGF0ZVByb3BzLmFuaW1hdGlvbk9wdGlvbnMsIEAuaWdub3JlZFByb3BzLCBzdGF0ZVByb3BzKVxuXG4gICAgICAjIEFwcGx5IGV2ZW50cyB0byBzeW1ib2wgaWYgc3VwcGxpZWRcbiAgICAgIGlmIGV2ZW50c1xuICAgICAgICBmb3IgdHJpZ2dlciwgYWN0aW9uIG9mIGV2ZW50c1xuICAgICAgICAgICMgaWYgZXZlbnQgbGlzdGVuZXIgaXMgYXBwbGllZCB0byB0aGUgc3ltYm9sLWluc3RhbmNlXG4gICAgICAgICAgaWYgXy5pc0Z1bmN0aW9uKGFjdGlvbilcbiAgICAgICAgICAgIGlmIEV2ZW50c1t0cmlnZ2VyXVxuICAgICAgICAgICAgICBAb24gRXZlbnRzW3RyaWdnZXJdLCBhY3Rpb25cbiAgICAgICAgICAjIGlmIGV2ZW50IGxpc3RlbmVyIGlzIGFwcGxpZWQgdG8gYSBzeW1ib2wncyBkZXNjZW5kYW50XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgaWYgQFt0cmlnZ2VyXVxuICAgICAgICAgICAgICBmb3IgdHJpZ2dlck5hbWUsIGFjdGlvblByb3BzIG9mIGFjdGlvblxuICAgICAgICAgICAgICAgIGlmIEV2ZW50c1t0cmlnZ2VyTmFtZV1cbiAgICAgICAgICAgICAgICAgIEBbdHJpZ2dlcl0ub24gRXZlbnRzW3RyaWdnZXJOYW1lXSwgYWN0aW9uUHJvcHNcblxuICAgICAgIyBQcmV2ZW50IHdlaXJkIGdsaXRjaGVzIGJ5IHN3aXRjaGluZyBTVkdzIHRvIFwiZGVmYXVsdFwiIHN0YXRlIGRpcmVjdGx5XG4gICAgICBmb3IgY2hpbGQgaW4gQC5kZXNjZW5kYW50c1xuICAgICAgICBpZiBjaGlsZC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU1ZHTGF5ZXJcIiBvciBjaGlsZC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU1ZHUGF0aFwiIG9yIGNoaWxkLmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdHcm91cFwiXG4gICAgICAgICAgY2hpbGQuc3RhdGVTd2l0Y2ggXCJkZWZhdWx0XCJcblxuICAgICAgIyBIYW5kbGUgdGhlIHN0YXRlU3dpdGNoIGZvciBhbGwgZGVzY2VuZGFudHNcbiAgICAgIEAub24gRXZlbnRzLlN0YXRlU3dpdGNoU3RhcnQsIChmcm9tLCB0bykgLT5cbiAgICAgICAgaWYgZnJvbSBpcyB0b1xuICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIGZvciBjaGlsZCBpbiBALmRlc2NlbmRhbnRzXG4gICAgICAgICAgIyBTcGVjaWFsIGhhbmRsaW5nIGZvciBUZXh0TGF5ZXJzXG4gICAgICAgICAgaWYgY2hpbGQuY29uc3RydWN0b3IubmFtZSBpcyBcIlRleHRMYXllclwiXG4gICAgICAgICAgICBjaGlsZC5zdGF0ZXNbdG9dLnRleHQgPSBjaGlsZC50ZXh0XG4gICAgICAgICAgICBjaGlsZC5zdGF0ZXNbdG9dLnRleHRBbGlnbiA9IGNoaWxkLnByb3BzLnN0eWxlZFRleHRPcHRpb25zLmFsaWdubWVudFxuXG4gICAgICAgICAgICBpZiBjaGlsZC50ZW1wbGF0ZSBhbmQgT2JqZWN0LmtleXMoY2hpbGQudGVtcGxhdGUpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgY2hpbGQuc3RhdGVzW3RvXS50ZW1wbGF0ZSA9IGNoaWxkLnRlbXBsYXRlXG5cbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBpZiBjaGlsZC5pbWFnZSBhbmQgKGNoaWxkLnN0YXRlc1t0b10uaW1hZ2UgaXNudCBjaGlsZC5pbWFnZSlcbiAgICAgICAgICAgICAgY2hpbGQuc3RhdGVzW3RvXS5pbWFnZSA9IGNoaWxkLmltYWdlXG5cbiAgICAgICAgICAjIEtpY2tzdGFydCB0aGUgc3RhdGVTd2l0Y2hcbiAgICAgICAgICBjaGlsZC5hbmltYXRlIHRvXG5cbiAgICAgICMgRGVzdHJveSBzdGF0ZSB0ZW1wbGF0ZSBsYXllcnNcbiAgICAgIGlmIHN0YXRlc1xuICAgICAgICBmb3Igc3RhdGVOYW1lLCBzdGF0ZVByb3BzIG9mIHN0YXRlc1xuICAgICAgICAgIGlmIHN0YXRlUHJvcHMudGVtcGxhdGVcbiAgICAgICAgICAgIHN0YXRlUHJvcHMudGVtcGxhdGUuZGVzdHJveSgpXG5cbiAgICAgIGxheWVyLmRlc3Ryb3koKVxuXG4gICAgIyBBZGRzIGEgbmV3IHN0YXRlXG4gICAgYWRkU3ltYm9sU3RhdGU6IChzdGF0ZU5hbWUsIHRhcmdldCwgYW5pbWF0aW9uT3B0aW9ucyA9IGZhbHNlLCBpZ25vcmVkUHJvcHMgPSBmYWxzZSwgc3RhdGVQcm9wcyA9IGZhbHNlKSAtPlxuICAgICAgbmV3VGFyZ2V0ID0gdGFyZ2V0LmNvcHkoKVxuICAgICAgdGFyZ2V0cyA9IFtdXG5cbiAgICAgIGZvciBkZXNjZW5kYW50IGluIHRhcmdldC5kZXNjZW5kYW50c1xuICAgICAgICB0YXJnZXRzW2Rlc2NlbmRhbnQubmFtZV0gPSBkZXNjZW5kYW50XG5cbiAgICAgIGZvciBkZXNjZW5kYW50IGluIG5ld1RhcmdldC5kZXNjZW5kYW50c1xuICAgICAgICBkZXNjZW5kYW50LmNvbnN0cmFpbnRWYWx1ZXMgPSB0YXJnZXRzW2Rlc2NlbmRhbnQubmFtZV0uY29uc3RyYWludFZhbHVlc1xuICAgICAgICBpZiBkZXNjZW5kYW50LmNvbnN0cnVjdG9yLm5hbWUgaXMgXCJTVkdQYXRoXCIgb3IgZGVzY2VuZGFudC5jb25zdHJ1Y3Rvci5uYW1lIGlzIFwiU1ZHR3JvdXBcIlxuICAgICAgICAgIGRlc2NlbmRhbnQuc3RhdGVzLmRlZmF1bHQgPSB0YXJnZXRzW2Rlc2NlbmRhbnQubmFtZV0uc3RhdGVzLmRlZmF1bHRcblxuICAgICAgIyBSZXNpemUgdGhlIHRlbXBsYXRlIGJlZm9yZSB1c2luZyBpdHMgdmFsdWVzIHRvIHJlc3BlY3QgY29uc3RyYWludC1jaGFuZ2VzXG4gICAgICBpZiBpZ25vcmVkUHJvcHMud2lkdGhcbiAgICAgICAgbmV3VGFyZ2V0LndpZHRoID0gaWdub3JlZFByb3BzLndpZHRoXG4gICAgICBpZiBpZ25vcmVkUHJvcHMuaGVpZ2h0XG4gICAgICAgIG5ld1RhcmdldC5oZWlnaHQgPSBpZ25vcmVkUHJvcHMuaGVpZ2h0XG5cbiAgICAgICMgRGVsZXRlIHgseSBwcm9wcyBmcm9tIHRlbXBsYXRlcyBkZWZhdWx0IHN0YXRlXG4gICAgICBkZWxldGUgbmV3VGFyZ2V0LnN0YXRlcy5kZWZhdWx0W3Byb3BdIGZvciBwcm9wIGluIFsneCcsICd5J11cblxuICAgICAgIyBBcHBseSBhbGwgb3RoZXIgcHJvcHMgdGhhdCBzaG91bGQgc3RheSB0aGUgc2FtZSBmb3IgYWxsIHN0YXRlc1xuICAgICAgaWYgaWdub3JlZFByb3BzXG4gICAgICAgIGRlbGV0ZSBuZXdUYXJnZXQuc3RhdGVzLmRlZmF1bHRbcHJvcF0gZm9yIHByb3Agb2YgaWdub3JlZFByb3BzXG5cbiAgICAgIGlmIHN0YXRlUHJvcHMud2lkdGhcbiAgICAgICAgbmV3VGFyZ2V0LndpZHRoID0gc3RhdGVQcm9wcy53aWR0aFxuICAgICAgaWYgc3RhdGVQcm9wcy5oZWlnaHRcbiAgICAgICAgbmV3VGFyZ2V0LmhlaWdodCA9IHN0YXRlUHJvcHMuaGVpZ2h0XG5cbiAgICAgIGlmIHN0YXRlUHJvcHNcbiAgICAgICAgIyBDaGFuZ2UgdGhlIHByb3BzIG9mIGEgc3ltYm9sIGluc2lkZSBjb21tb25TdGF0ZXNcbiAgICAgICAgZm9yIHN0YXRlUHJvcCwgc3RhdGVWYWwgb2Ygc3RhdGVQcm9wc1xuICAgICAgICAgICMgQ2hlY2sgaWYgaXQncyBhIHByb3BlcnR5XG4gICAgICAgICAgaWYgdHlwZW9mIG5ld1RhcmdldC5wcm9wc1tzdGF0ZVByb3BdIGlzbnQgJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgIG5ld1RhcmdldC5zdGF0ZXMuZGVmYXVsdFtzdGF0ZVByb3BdID0gc3RhdGVWYWxcblxuICAgICAgICAgICAgZGVsZXRlIHN0YXRlUHJvcHNbc3RhdGVQcm9wXVxuXG4gICAgICAjIENyZWF0ZSBhIG5ldyBzdGF0ZSBmb3IgdGhlIHN5bWJvbCBhbmQgYXNzaWduIHJlbWFpbmluZyBwcm9wc1xuICAgICAgQC5zdGF0ZXNbXCIje3N0YXRlTmFtZX1cIl0gPSBuZXdUYXJnZXQuc3RhdGVzLmRlZmF1bHRcblxuICAgICAgIyBBc3NpZ24gYW5pbWF0aW9uT3B0aW9ucyB0byB0aGUgc3RhdGUgaWYgc3VwcGxpZWRcbiAgICAgIGlmIGFuaW1hdGlvbk9wdGlvbnNcbiAgICAgICAgQC5zdGF0ZXNbXCIje3N0YXRlTmFtZX1cIl0uYW5pbWF0aW9uT3B0aW9ucyA9IGFuaW1hdGlvbk9wdGlvbnNcblxuICAgICAgY29weVN0YXRlc0Zyb21UYXJnZXQoQCwgbmV3VGFyZ2V0LCBzdGF0ZU5hbWUsIGFuaW1hdGlvbk9wdGlvbnMsIGlnbm9yZWRQcm9wcywgc3RhdGVQcm9wcylcblxuICAgICMgUmVwbGFjZW1lbnQgZm9yIHJlcGxhY2VXaXRoU3ltYm9sKClcbiAgICByZXBsYWNlTGF5ZXI6IChsYXllciwgcmVzaXplID0gZmFsc2UpIC0+XG4gICAgICBALnBhcmVudCA9IGxheWVyLnBhcmVudFxuICAgICAgQC54ID0gbGF5ZXIueFxuICAgICAgQC55ID0gbGF5ZXIueVxuXG4gICAgICBpZiByZXNpemVcbiAgICAgICAgQC53aWR0aCA9IGxheWVyLndpZHRoXG4gICAgICAgIEAuaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cbiAgICAgIGZvciBzdGF0ZU5hbWUgaW4gQC5zdGF0ZU5hbWVzXG4gICAgICAgIEAuc3RhdGVzW3N0YXRlTmFtZV0ueCA9IGxheWVyLnhcbiAgICAgICAgQC5zdGF0ZXNbc3RhdGVOYW1lXS55ID0gbGF5ZXIueVxuXG4gICAgICAgIGlmIHJlc2l6ZVxuICAgICAgICAgIEAuc3RhdGVzW3N0YXRlTmFtZV0ud2lkdGggPSBsYXllci53aWR0aFxuICAgICAgICAgIEAuc3RhdGVzW3N0YXRlTmFtZV0uaGVpZ2h0ID0gbGF5ZXIuaGVpZ2h0XG5cbiAgICAgIGxheWVyLmRlc3Ryb3koKVxuXG4jIEEgYmFja3VwIGZvciB0aGUgZGVwcmVjYXRlZCB3YXkgb2YgY2FsbGluZyB0aGUgY2xhc3NcbmV4cG9ydHMuY3JlYXRlU3ltYm9sID0gKGxheWVyLCBzdGF0ZXMsIGV2ZW50cykgLT4gZXhwb3J0cy5TeW1ib2wobGF5ZXIsIHN0YXRlcywgZXZlbnRzKVxuIiwiIyBBZGQgdGhlIGZvbGxvd2luZyBsaW5lIHRvIHlvdXIgcHJvamVjdCBpbiBGcmFtZXIgU3R1ZGlvLiBcbiMgbXlNb2R1bGUgPSByZXF1aXJlIFwibXlNb2R1bGVcIlxuIyBSZWZlcmVuY2UgdGhlIGNvbnRlbnRzIGJ5IG5hbWUsIGxpa2UgbXlNb2R1bGUubXlGdW5jdGlvbigpIG9yIG15TW9kdWxlLm15VmFyXG5cbmV4cG9ydHMubXlWYXIgPSBcIm15VmFyaWFibGVcIlxuXG5leHBvcnRzLm15RnVuY3Rpb24gPSAtPlxuXHRwcmludCBcIm15RnVuY3Rpb24gaXMgcnVubmluZ1wiXG5cbmV4cG9ydHMubXlBcnJheSA9IFsxLCAyLCAzXSIsImV4cG9ydHMua2V5Ym9hcmRMYXllciA9IG5ldyBMYXllclxuXHR4OjAsIHk6U2NyZWVuLmhlaWdodCwgd2lkdGg6U2NyZWVuLndpZHRoLCBoZWlnaHQ6NDMyXG5cdGh0bWw6XCI8aW1nIHN0eWxlPSd3aWR0aDogMTAwJTsnIHNyYz0nbW9kdWxlcy9rZXlib2FyZC5wbmcnLz5cIlxuXG4jc2NyZWVuIHdpZHRoIHZzLiBzaXplIG9mIGltYWdlIHdpZHRoXG5ncm93dGhSYXRpbyA9IFNjcmVlbi53aWR0aCAvIDczMlxuaW1hZ2VIZWlnaHQgPSBncm93dGhSYXRpbyAqIDQzMlxuXG4jIEV4dGVuZHMgdGhlIExheWVyU3R5bGUgY2xhc3Mgd2hpY2ggZG9lcyB0aGUgcGl4ZWwgcmF0aW8gY2FsY3VsYXRpb25zIGluIGZyYW1lclxuX2lucHV0U3R5bGUgPVxuXHRPYmplY3QuYXNzaWduKHt9LCBGcmFtZXIuTGF5ZXJTdHlsZSxcblx0XHRjYWxjdWxhdGVQaXhlbFJhdGlvID0gKGxheWVyLCB2YWx1ZSkgLT5cblx0XHRcdCh2YWx1ZSAqIGxheWVyLmNvbnRleHQucGl4ZWxNdWx0aXBsaWVyKSArIFwicHhcIlxuXG5cdFx0Zm9udFNpemU6IChsYXllcikgLT5cblx0XHRcdGNhbGN1bGF0ZVBpeGVsUmF0aW8obGF5ZXIsIGxheWVyLl9wcm9wZXJ0aWVzLmZvbnRTaXplKVxuXG5cdFx0bGluZUhlaWdodDogKGxheWVyKSAtPlxuXHRcdFx0KGxheWVyLl9wcm9wZXJ0aWVzLmxpbmVIZWlnaHQpICsgXCJlbVwiXG5cblx0XHRwYWRkaW5nOiAobGF5ZXIpIC0+XG5cdFx0XHR7IHBpeGVsTXVsdGlwbGllciB9ID0gbGF5ZXIuY29udGV4dFxuXHRcdFx0cGFkZGluZyA9IFtdXG5cdFx0XHRwYWRkaW5nVmFsdWUgPSBsYXllci5fcHJvcGVydGllcy5wYWRkaW5nXG5cblx0XHRcdCMgQ2hlY2sgaWYgd2UgaGF2ZSBhIHNpbmdsZSBudW1iZXIgYXMgaW50ZWdlclxuXHRcdFx0aWYgTnVtYmVyLmlzSW50ZWdlcihwYWRkaW5nVmFsdWUpXG5cdFx0XHRcdHJldHVybiBjYWxjdWxhdGVQaXhlbFJhdGlvKGxheWVyLCBwYWRkaW5nVmFsdWUpXG5cblx0XHRcdCMgSWYgd2UgaGF2ZSBtdWx0aXBsZSB2YWx1ZXMgdGhleSBjb21lIGFzIHN0cmluZyAoZS5nLiBcIjEgMiAzIDRcIilcblx0XHRcdHBhZGRpbmdWYWx1ZXMgPSBsYXllci5fcHJvcGVydGllcy5wYWRkaW5nLnNwbGl0KFwiIFwiKVxuXG5cdFx0XHRzd2l0Y2ggcGFkZGluZ1ZhbHVlcy5sZW5ndGhcblx0XHRcdFx0d2hlbiA0XG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1syXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbM10pXG5cblx0XHRcdFx0d2hlbiAzXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1syXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cblx0XHRcdFx0d2hlbiAyXG5cdFx0XHRcdFx0cGFkZGluZy50b3AgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5yaWdodCA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1sxXSlcblx0XHRcdFx0XHRwYWRkaW5nLmJvdHRvbSA9IHBhcnNlRmxvYXQocGFkZGluZ1ZhbHVlc1swXSlcblx0XHRcdFx0XHRwYWRkaW5nLmxlZnQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMV0pXG5cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHBhZGRpbmcudG9wID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXHRcdFx0XHRcdHBhZGRpbmcucmlnaHQgPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5ib3R0b20gPSBwYXJzZUZsb2F0KHBhZGRpbmdWYWx1ZXNbMF0pXG5cdFx0XHRcdFx0cGFkZGluZy5sZWZ0ID0gcGFyc2VGbG9hdChwYWRkaW5nVmFsdWVzWzBdKVxuXG5cdFx0XHQjIFJldHVybiBhcyA0LXZhbHVlIHN0cmluZyAoZS5nIFwiMXB4IDJweCAzcHggNHB4XCIpXG5cdFx0XHRcIiN7cGFkZGluZy50b3AgKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLnJpZ2h0ICogcGl4ZWxNdWx0aXBsaWVyfXB4ICN7cGFkZGluZy5ib3R0b20gKiBwaXhlbE11bHRpcGxpZXJ9cHggI3twYWRkaW5nLmxlZnQgKiBwaXhlbE11bHRpcGxpZXJ9cHhcIlxuXHQpXG5cbmV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMgPVxuXHRzaG93bjpcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIC4wMSlcIiAjIFwidHJhbnNwYXJlbnRcIiBzZWVtcyB0byBjYXVzZSBhIGJ1ZyBpbiBsYXRlc3Qgc2FmYXJpIHZlcnNpb25cblx0XHRvcHRpb25zLmZvbnRTaXplID89IDMwXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDFcblx0XHRvcHRpb25zLnBhZGRpbmcgPz0gMTBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJcIlxuXHRcdG9wdGlvbnMucGxhY2Vob2xkZXIgPz0gXCJcIlxuXHRcdG9wdGlvbnMudmlydHVhbEtleWJvYXJkID89IGlmIFV0aWxzLmlzTW9iaWxlKCkgdGhlbiBmYWxzZSBlbHNlIHRydWVcblx0XHRvcHRpb25zLnR5cGUgPz0gXCJ0ZXh0XCJcblx0XHRvcHRpb25zLmdvQnV0dG9uID89IGZhbHNlXG5cdFx0b3B0aW9ucy5hdXRvQ29ycmVjdCA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9Db21wbGV0ZSA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9DYXBpdGFsaXplID89IFwib25cIlxuXHRcdG9wdGlvbnMuc3BlbGxDaGVjayA/PSBcIm9uXCJcblx0XHRvcHRpb25zLmF1dG9mb2N1cyA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGV4dENvbG9yID89IFwiIzAwMFwiXG5cdFx0b3B0aW9ucy5mb250RmFtaWx5ID89IFwiLWFwcGxlLXN5c3RlbVwiXG5cdFx0b3B0aW9ucy5mb250V2VpZ2h0ID89IFwiNTAwXCJcblx0XHRvcHRpb25zLnN1Ym1pdCA/PSBmYWxzZVxuXHRcdG9wdGlvbnMudGFiSW5kZXggPz0gMFxuXHRcdG9wdGlvbnMudGV4dGFyZWEgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmRpc2FibGVkID89IGZhbHNlXG5cblx0XHRzdXBlciBvcHRpb25zXG5cblx0XHQjIEFkZCBhZGRpdGlvbmFsIHByb3BlcnRpZXNcblx0XHRAX3Byb3BlcnRpZXMuZm9udFNpemUgPSBvcHRpb25zLmZvbnRTaXplXG5cdFx0QF9wcm9wZXJ0aWVzLmxpbmVIZWlnaHQgPSBvcHRpb25zLmxpbmVIZWlnaHRcblx0XHRAX3Byb3BlcnRpZXMucGFkZGluZyA9IG9wdGlvbnMucGFkZGluZ1xuXG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBvcHRpb25zLnBsYWNlaG9sZGVyQ29sb3IgaWYgb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yP1xuXHRcdEBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaWYgb3B0aW9ucy50ZXh0YXJlYSB0aGVuICd0ZXh0YXJlYScgZWxzZSAnaW5wdXQnXG5cdFx0QGlucHV0LmlkID0gXCJpbnB1dC0je18ubm93KCl9XCJcblxuXHRcdCMgQWRkIHN0eWxpbmcgdG8gdGhlIGlucHV0IGVsZW1lbnRcblx0XHRAaW5wdXQuc3R5bGUud2lkdGggPSBfaW5wdXRTdHlsZVtcIndpZHRoXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmhlaWdodCA9IF9pbnB1dFN0eWxlW1wiaGVpZ2h0XCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRTaXplID0gX2lucHV0U3R5bGVbXCJmb250U2l6ZVwiXShAKVxuXHRcdEBpbnB1dC5zdHlsZS5saW5lSGVpZ2h0ID0gX2lucHV0U3R5bGVbXCJsaW5lSGVpZ2h0XCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIlxuXHRcdEBpbnB1dC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIlxuXHRcdEBpbnB1dC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJhY2tncm91bmRDb2xvclxuXHRcdEBpbnB1dC5zdHlsZS5wYWRkaW5nID0gX2lucHV0U3R5bGVbXCJwYWRkaW5nXCJdKEApXG5cdFx0QGlucHV0LnN0eWxlLmZvbnRGYW1pbHkgPSBvcHRpb25zLmZvbnRGYW1pbHlcblx0XHRAaW5wdXQuc3R5bGUuY29sb3IgPSBvcHRpb25zLnRleHRDb2xvclxuXHRcdEBpbnB1dC5zdHlsZS5mb250V2VpZ2h0ID0gb3B0aW9ucy5mb250V2VpZ2h0XG5cblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwidGFiaW5kZXhcIiwgb3B0aW9ucy50YWJpbmRleFxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY29ycmVjdFwiLCBvcHRpb25zLmF1dG9Db3JyZWN0XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImF1dG9jb21wbGV0ZVwiLCBvcHRpb25zLmF1dG9Db21wbGV0ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvY2FwaXRhbGl6ZVwiLCBvcHRpb25zLmF1dG9DYXBpdGFsaXplXG5cdFx0aWYgb3B0aW9ucy5kaXNhYmxlZCA9PSB0cnVlXG5cdFx0XHRAaW5wdXQuc2V0QXR0cmlidXRlIFwiZGlzYWJsZWRcIiwgdHJ1ZVxuXHRcdGlmIG9wdGlvbnMuYXV0b2ZvY3VzID09IHRydWVcblx0XHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJhdXRvZm9jdXNcIiwgdHJ1ZVxuXHRcdEBpbnB1dC5zZXRBdHRyaWJ1dGUgXCJzcGVsbGNoZWNrXCIsIG9wdGlvbnMuc3BlbGxDaGVja1xuXHRcdEBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcImZvcm1cIlxuXG5cdFx0aWYgKG9wdGlvbnMuZ29CdXR0b24gJiYgIW9wdGlvbnMuc3VibWl0KSB8fCAhb3B0aW9ucy5zdWJtaXRcblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZUN5Y2xlKClcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiYmx1clwiLCAtPlxuXHRcdFx0XHRleHBvcnRzLmtleWJvYXJkTGF5ZXIuYW5pbWF0ZShcImRlZmF1bHRcIilcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0dW5mb2N1czogKCkgLT5cblx0XHRAaW5wdXQuYmx1cigpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuXG5cdG9uVW5mb2N1czogdGhpcy5vbkJsdXJcblx0XG5cdGRpc2FibGU6ICgpIC0+XG5cdFx0QGlucHV0LnNldEF0dHJpYnV0ZSBcImRpc2FibGVkXCIsIHRydWVcblxuXHRlbmFibGU6ICgpID0+XG5cdFx0QGlucHV0LnJlbW92ZUF0dHJpYnV0ZSBcImRpc2FibGVkXCIsIHRydWVcblx0XG4iLCIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoi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
