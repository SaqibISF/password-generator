"use client"

import { useCallback, useEffect, useRef, useState } from "react";

export default function Home() {

  const [length, setLength] = useState<number>(8)
  const [isNumberAllowed, setIsNumberAllowed] = useState<boolean>(false)
  const [isCharAllowed, setIsCharAllowed] = useState<boolean>(false)

  const [password, setPassword] = useState<string>("")

  const passwordInput = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let passwd: string = "";

    let str: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (isNumberAllowed) str += "0123456789"

    if (isCharAllowed) str += "!@#$%^&*()_+-={}[]<>~`"

    for (let i = 1; i <= length; i++) {
      const index: number = Math.floor(Math.random() * str.length + 1)
      passwd += str.charAt(index)
    }

    setPassword(passwd)

  }, [length, isNumberAllowed, isCharAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordInput.current?.select()
    passwordInput.current?.setSelectionRange(0, length)
    window.navigator.clipboard.writeText(password)
  }, [password, length])

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator])

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

      <h1 className="text-white text-center my-3">Password Generator</h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          ref={passwordInput}
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
        />
        <button
          onClick={copyPassword}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >copy</button>
      </div>

      <div className="flex text-sm gap-x-2">

        <div className="flex item-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex item-center gap-x-1">
          <input
            id="is_number_allowed"
            type="checkbox"
            defaultChecked={isNumberAllowed}
            onChange={() => {
              setIsNumberAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="is_number_allowed">Numbers</label>
        </div>

        <div className="flex item-center gap-x-1">
          <input
            id="is_char_allowed"
            type="checkbox"
            defaultChecked={isCharAllowed}
            onChange={() => {
              setIsCharAllowed((prev) => !prev)
            }}
          />
          <label htmlFor="is_char_allowed">Characters</label>
        </div>

      </div>

    </div>
  );
}
