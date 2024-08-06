"use client"
import React, { useState, useEffect } from "react"

interface CourseProgressProps {
  progress: number
  setProgress: React.Dispatch<React.SetStateAction<number>>
}

export function CourseProgress({ progress, setProgress }: CourseProgressProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < progress) {
          return prevProgress + 5
        } else {
          clearInterval(interval)
          return progress
        }
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-full max-w-md rounded-full bg-zinc-800">
        <div className="h-4 rounded-full bg-[#FF25CF] transition-all duration-500" style={{ width: `${progress}%` }} />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
          {progress}% completed
        </div>
      </div>
    </div>
  )
}
