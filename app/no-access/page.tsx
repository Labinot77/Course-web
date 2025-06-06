import Link from 'next/link'
import React from 'react'

const NotAuthenticated = () => {
  return (
    <main>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="text-lg mb-6">You must be logged in to view this page.</p>
            <Link href="/auth/sign-in" className="text-blue-500 hover:underline">
            Go to Login
            </Link>
        </div>
    </main>
  )
}

export default NotAuthenticated