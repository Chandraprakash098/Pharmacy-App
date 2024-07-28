import React from 'react'

function Footer() {
  return (
    <footer className="mt-auto bg-red-200 text-center py-4 text-black font-bold">
      <p>Made with 😍 © {new Date().getFullYear()} Chandra Prakash</p>
    </footer>
  );
}

export default Footer