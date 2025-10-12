"use client"

import { memo } from "react"

export const FloatingShapes = memo(function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Circle 1 */}
      <div
        className="absolute top-20 left-10 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl animate-float will-change-transform"
        style={{ animationDelay: "0s", animationDuration: "20s" }}
      />

      {/* Circle 2 */}
      <div
        className="absolute top-1/3 right-20 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl animate-float-slow will-change-transform"
        style={{ animationDelay: "2s", animationDuration: "25s" }}
      />

      {/* Circle 3 */}
      <div
        className="absolute bottom-32 left-1/4 w-80 h-80 bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-3xl animate-float will-change-transform"
        style={{ animationDelay: "4s", animationDuration: "22s" }}
      />

      {/* Triangle shape */}
      <div
        className="absolute top-1/2 right-1/3 w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[260px] border-b-cyan-500/10 dark:border-b-cyan-500/20 blur-2xl animate-float-slow will-change-transform"
        style={{ animationDelay: "1s", animationDuration: "18s" }}
      />

      {/* Small accent circles */}
      <div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-violet-500/10 dark:bg-violet-500/20 rounded-full blur-2xl animate-float will-change-transform"
        style={{ animationDelay: "3s", animationDuration: "15s" }}
      />

      <div
        className="absolute top-2/3 left-1/3 w-48 h-48 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-2xl animate-float-slow will-change-transform"
        style={{ animationDelay: "5s", animationDuration: "28s" }}
      />
    </div>
  )
})
