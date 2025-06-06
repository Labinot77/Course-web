import React from 'react'

const Custom404 = () => {
  return (
    <main className="h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Oops! Page not found.</p>
        <a
          href="/"
          className="text-blue-500 hover:underline font-medium"
        >
          Go back home
        </a>
      </div>
    </main>
  )
}

export default Custom404