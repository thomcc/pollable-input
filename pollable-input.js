var Input = (function() {
	'use strict';

	var KEYS = [];
	var MOUSE_BUTTONS = [];

	var mouseRootElement = null;

	function Button() {
		this.isDown = false;
		this.transitions = 0;
		this.defaultPrevented = false;
	}

	Button.prototype.testDown = function() {
		return this.isDown && this.transitions > 0;
	};

	Button.prototype.testUp = function() {
		return !this.isDown && this.transitions > 0;
	};

	for (var i = 0; i < 256; ++i) {
		KEYS[i] = new Button();
		KEYS[i].defaultPrevented = true;
	}

	for (var i = 0; i < 5; ++i) {
		MOUSE_BUTTONS[i] = new Button();
	}

	var Keycodes = {};
	var KeycodeInverse = {};
	var KnownKeys = {};

	(function() {
		var keysToCodes = {
			A: 65, B: 66, C: 67, D: 68, E: 69, F: 70, G: 71, H: 72, I: 73, J: 74, K: 75, L: 76, M: 77, N: 78, O: 79, P: 80, Q: 81, R: 82, S: 83, T: 84, U: 85, V: 86, W: 87, X: 88, Y: 89, Z: 90,
			Left: 37, Up: 38, Right: 39, Down: 40,
			Escape: 27, Return: 13, Backspace: 8, Space: 32, Tab: 9,
			Num0: 48, Num1: 49, Num2: 50, Num3: 51, Num4: 52, Num5: 53, Num6: 54, Num7: 55, Num8: 56, Num9: 57,
			Numpad0: 96, Numpad1: 97, Numpad2: 98, Numpad3: 99, Numpad4: 100, Numpad5: 101, Numpad6: 102, Numpad7: 103, Numpad8: 104, Numpad9: 105,
			NumpadMinus: 109, NumpadPlus: 107, NumpadEqual: 12, NumpadSlash: 111,
			F1: 112, F2: 113, F3: 114, F4: 115, F5: 116, F6: 117, F7: 118, F8: 119, F9: 120, F10: 121, F11: 122, F12: 123,
			Tilde: 192, Shift: 16, Ctrl: 17, Alt: 18,
			Colon: 186, Equals: 187, Comma: 188, Minus: 189, Period: 190, Slash: 191, OpenBracket: 219, CloseBracket: 221, Backslash: 220, Quote: 222
		};

		var kcAliases = {
			Tilde: ['Backtick'],
			Return: ['Enter'],
			Escape: ['Esc'],
			Ctrl: ['Control'],
			Alt: ['Meta'],
			Num0: ['Zero'],
			Num1: ['One'],
			Num2: ['Two'],
			Num3: ['Three'],
			Num4: ['Four'],
			Num5: ['Five'],
			Num6: ['Six'],
			Num7: ['Seven'],
			Num8: ['Eight'],
			Num9: ['Nine'],
		};

		Object.keys(keysToCodes).forEach(function(key) {
			var code = keysToCodes[key];
			KnownKeys[code] = true;
			KeycodeInverse[code] = key;
			var keys = [key].concat(kcAliases[key] || []);
			keys.forEach(function(keyName) {

				Keycodes[keyName] = code;
				Keycodes[keyName.toLowerCase()] = code;

				var camelCase = keyName[0].toLowerCase()+keyName.slice(1);
				Keycodes[camelCase] = code;

				var capCase = keyName.replace(/([a-z])([A-Z])/g, '$1_$2').toUpperCase()
				Keycodes[capCase] = code;
			});
		});

		for (var i = 1; i <= 12; ++i) {
			KEYS[Keycodes["F"+i]].defaultPrevented = false;
		}
	}());



	function keyToCode(key) {
		var code = 0;
		if (typeof key === 'number') {
			code = key|0;
			if (!KnownKeys[code]) {
				console.error && console.error("Keycode "+key+" is not mapped to any known key");
				return 0;
			}
		}
		else {
			code = Keycodes[key]|0;
			if (code === 0) {
				console.error && console.error("Unknown key: "+key);
				return 0;
			}
		}
		if (code >= KEYS.length || code === 0) {
			console.error && console.error("Keycode "+key+" is outside valid range: "+code);
			return 0;
		}
		return code;
	}


	function initKeyboard() {
		window.addEventListener('keydown', function(e) {
			var kc = e.keyCode >>> 0;
			if (kc > KEYMAX || kc === 0) {
				console.warn && console.warn("Unknown keycode value from DOM event.", e, kc);
				return;
			}
			var key = KEYS[kc];
			if (!key) {
				return;
			}
			if (!key.isDown) {
				key.isDown = true;
				++key.transitions;
			}
			if (key.defaultPrevented) {
				e.preventDefault();
			}
		});

		window.addEventListener('keyup', function(e) {
			var kc = e.keyCode >>> 0;
			if (kc > KEYMAX || kc === 0) {
				console.warn && console.warn("Unknown keycode value from DOM event.", e, kc);
				return;
			}
			var key = KEYS[kc];
			if (!key) {
				return;
			}
			if (key.isDown) {
				key.isDown = false;
				++key.transitions;
			}
			if (key.defaultPrevented) {
				e.preventDefault();
			}
		});
	}

	function doMouseMove(x, y) {
		if (!mouseRootElement) {
			return;
		}
		var rect = mouseRootElement.getBoundingClientRect();
		var mx = x - rect.left;
		var my = y - rect.top;
		Input.mousePos[0] = mx;
		Input.mousePos[1] = my;
		Input.mouseDelta[0] = mx-Input.mouseLastPos[0];
		Input.mouseDelta[1] = my-Input.mouseLastPos[1];
	}

	function doMouseDown(btn, x, y) {
		var b = MOUSE_BUTTONS[btn];
		if (!b) {
			console.warn && console.warn("Unknown button ", btn);
		}
		else {
			if (b.isDown) {
				b.isDown = false;
				++b.transitions;
			}
			if (b.defaultPrevented) {
				e.preventDefault();
			}
		}
		doMouseMove(x, y);
	}

	function doMouseUp(btn, x, y) {
		var b = MOUSE_BUTTONS[btn];
		if (!b) {
			console.warn && console.warn("Unknown button ", btn);
		}
		else {
			if (b.isDown) {
				b.isDown = false;
				++b.transitions;
			}
			if (b.defaultPrevented) {
				e.preventDefault();
			}
		}
		doMouseMove(x, y);
	}

	function onMouseDown(e) { doMouseDown(e.which||0, e.clientX, e.clientY); }
	function onMouseMove(e) { doMouseMove(e.clientX, e.clientY); }
	function onMouseUp(e) { doMouseUp(e.which||0, e.clientX, e.clientY); }

	function onTouchBegin(e) { doMouseDown(0, e.touches[0].clientX, e.touches[0].clientY); }
	function onTouchMove(e) { doMouseMove(e.touches[0].clientX, e.touches[0].clientY); }
	function onTouchEnd(e) { doMouseUp(0, e.touches[0].clientX, e.touches[0].clientY); }

	var Input = {
		mousePos: [0, 0],
		mouseLastPos: [0, 0],
		mouseDelta: [0, 0],

		mouseButtons: MOUSE_BUTTONS,
		keys: KEYS,

		KEY_CODES: Keycodes,
		INVERSE_KEY_CODES: KeycodeInverse,

		testMouse: function testMouse(btn) {
			var b = MOUSE_BUTTONS[btn || 0];
			return !!b && b.isDown;
		},

		testMouseDown: function testMouseDown(btn) {
			var b = MOUSE_BUTTONS[btn || 0];
			return !!b && b.testDown();
		},

		testMouseUp: function testMouseUp(btn) {
			var b = MOUSE_BUTTONS[btn || 0];
			return !!b && b.testUp();
		},

		testKey: function testKey(btn) {
			var k = KEYS[keyToCode(btn)];
			return !!k && k.isDown;
		},

		testKeyDown: function testKeyDown(btn) {
			var k = KEYS[keyToCode(btn)];
			return !!k && k.testDown();
		},

		testKeyUp: function testKeyUp(btn) {
			var k = KEYS[keyToCode(btn)];
			return !!k && k.testUp();
		},

		update: function update() {
			MOUSE_BUTTONS.forEach(function(b) {
				b.transitions = 0;
			});

			Input.mouseLastPos[0] = Input.mousePos[0];
			Input.mouseLastPos[1] = Input.mousePos[1];

			KEYS.forEach(function(k) {
				k.transitions = 0;
			});
		},

		setMouseRootElement: function setMouseRootElement(elem) {
			if (mouseRootElement != null) {
				mouseRootElement.removeEventListener('mousedown', onMouseDown);
				mouseRootElement.removeEventListener('mouseup', onMouseUp);
				mouseRootElement.removeEventListener('mousemove', onMouseMove);

				mouseRootElement.removeEventListener('touchstart', onTouchBegin);
				mouseRootElement.removeEventListener('touchend', onTouchEnd);
				mouseRootElement.removeEventListener('touchmove', onTouchMove);
			}
			mouseRootElement = elem;
			mouseRootElement.addEventListener('mousedown', onMouseDown);
			mouseRootElement.addEventListener('mouseup', onMouseUp);
			mouseRootElement.addEventListener('mousemove', onMouseMove);

			mouseRootElement.addEventListener('touchstart', onTouchBegin);
			mouseRootElement.addEventListener('touchend', onTouchEnd);
			mouseRootElement.addEventListener('touchmove', onTouchMove);
		}
	};
	// wait a bit and then bind the root events to window if
	requestAnimationFrame(function() {
		initKeyboard();
		if (mouseRootElement == null) {
			console.log("Input: No root mouse element specified, using window");
			Input.setMouseRootElement(window);
		}

		window.addEventListener('blur', function() {
			KEYS.forEach(function(k) {
				k.isDown = false;
				k.transitions = 0;
			})
			MOUSE_BUTTONS.forEach(function(b) {
				b.isDown = false;
				b.transitions = 0;
			});
		});
	})

	return Input;

}());

if (typeof module != 'undefined' && module.exports) {
	module.exports = Input;
}
