# Pollable Input

Library for polling input from the keyboard or the mouse in JavaScript. Intended to be used in games or simulations, or anything thats already running at 60fps and needs more fine grained control in how input is handled than provided by callback-style APIs.

## Usage

Npm module, or just use pollable-input.js as a file in the browser.

## API

- `Input.setMouseRootElement`: Typically called with a canvas as an argument. If you don't call it, it will use `window`.
- `Input.update()`: Call this function every frame after you've done all of your work. It's used to track the mouse delta and the key/button `testUp`, `testDown`, etc.
- `Input.mousePos`: 2 element array, storing the current position of mouse relative to the mouse root as [x, y].
- `Input.mouseLastPos`: 2 element array, storing the previous position of mouse relative to the mouse root as [x, y]. Previous being the current position before the last update() call.
- `Input.mouseDelta`: Delta between `Input.mouseLastPos` and `Input.mousePos`.
- `Input.testMouse(btn=0)`: Returns true if the specified button is down.
- `Input.testMouseDown(btn=0)`: Returns true if the specified button was pressed between the previous frame and the current frame.
- `Input.testMouseUp(btn=0)`: Returns true if the specified button was released between the previous frame and the current frame.
- `Input.testKey(keyCodeOrName)`: Returns true if the specified key is down. This can take a key code or the name of a key. See [KEYNAMES.md](./KEYNAMES.md) for key names.
- `Input.testKeyDown(keyCodeOrName)`: Returns true if the specified key was pressed between the previous frame and the current frame. This can take a key code or the name of a key. See [KEYNAMES.md](./KEYNAMES.md) for key names.
- `Input.testKeyUp(keyCodeOrName)`: Returns true if the specified key was released between the previous frame and the current frame. This can take a key code or the name of a key. See [KEYNAMES.md](./KEYNAMES.md) for key names.
- `Input.mouseButtons`: direct access to our array of mouse button states. Each button contains properties `isDown`, `defaultPrevented`, and `transitions`, and support the methods `testDown()` and `testUp()`.
- `Input.keys`: direct access to our array of key states. Each key contains properties `isDown`, `defaultPrevented`, and `transitions`, and support the methods `testDown()` and `testUp()`.
- `Input.KEY_CODES`: Maps key names to key codes.
- `Input.INVERSE_KEY_CODES`: Inverse of the above table.

## License

The MIT License (MIT)

Copyright (c) 2016 Thom Chiovoloni

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
