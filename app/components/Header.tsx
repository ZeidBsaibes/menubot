import React from "react";

function Header() {
  return (
    <header class="bg-gray-800 text-white py-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="text-xl font-bold">
          <a href="/">OpenMenu AI</a>
        </div>
        <nav>
          <ul class="flex space-x-4">
            <li>
              <a href="/upload" class="hover:text-gray-300">
                Upload
              </a>
            </li>
            <li>
              <a href="/" class="hover:text-gray-300">
                Chat
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
