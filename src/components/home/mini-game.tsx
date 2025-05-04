"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Trophy, RefreshCw } from "lucide-react"

export function MiniGame() {
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [gameActive, setGameActive] = useState(false)
  const [highScore, setHighScore] = useState(0)
  const [batPosition, setBatPosition] = useState({ x: 50, y: 80 }) // Start bat at bottom center
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 20 }) // Start ball at top center
  const [ballDirection, setBallDirection] = useState({ x: 1.5, y: 2 })
  const [difficulty, setDifficulty] = useState(1)
  const gameAreaRef = useRef<HTMLDivElement>(null)

  // Timer countdown
  useEffect(() => {
    if (gameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            setGameActive(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameActive])

  // Game loop
  useEffect(() => {
    if (!gameActive) return

    const gameLoop = setInterval(() => {
      setBallPosition((prev) => {
        // Calculate new position
        const newX = prev.x + ballDirection.x
        const newY = prev.y + ballDirection.y

        // Check boundaries and handle bouncing
        let newDirX = ballDirection.x
        let newDirY = ballDirection.y

        // Bounce off left and right walls
        if (newX <= 2.5 || newX >= 97.5) {
          newDirX = -ballDirection.x
        }

        // Bounce off top wall only
        if (newY <= 2.5) {
          newDirY = Math.abs(ballDirection.y) // Always move down after hitting top
        }

        // Ball goes out of bounds at bottom - reset ball
        if (newY >= 97.5) {
          return { x: 50, y: 20 }
        }

        // Check collision with bat - improved detection
        const batWidth = 15
        const batHeight = 4
        const ballSize = 4

        if (
          newX >= batPosition.x - batWidth / 2 - ballSize / 2 &&
          newX <= batPosition.x + batWidth / 2 + ballSize / 2 &&
          newY >= batPosition.y - batHeight / 2 - ballSize / 2 &&
          newY <= batPosition.y + batHeight / 2 + ballSize / 2
        ) {
          // Calculate bounce angle based on where ball hits the bat
          const hitPosition = (newX - batPosition.x) / (batWidth / 2)
          newDirX = hitPosition * 3 // -3 to 3 depending on where it hits
          
          // Always bounce upward off bat, slightly faster with each hit
          newDirY = -Math.abs(ballDirection.y) * (1 + difficulty * 0.05)
          
          // Increase score
          setScore((prev) => prev + 1)
          
          // Increase difficulty after certain score thresholds
          if (score > 0 && score % 5 === 0) {
            setDifficulty((prev) => Math.min(prev + 0.2, 2.5))
          }
        }

        setBallDirection({ x: newDirX, y: newDirY })
        return { x: newX, y: newY }
      })
    }, 30)

    return () => clearInterval(gameLoop)
  }, [gameActive, batPosition, ballDirection, difficulty, score])

  const startGame = () => {
    setScore(0)
    setTimeLeft(15)
    setGameActive(true)
    setBallPosition({ x: 50, y: 20 })
    setBallDirection({ x: Math.random() > 0.5 ? 1.5 : -1.5, y: 2 })
    setBatPosition({ x: 50, y: 80 })
    setDifficulty(1)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!gameActive || !gameAreaRef.current) return

    const gameArea = gameAreaRef.current.getBoundingClientRect()
    const x = ((e.clientX - gameArea.left) / gameArea.width) * 100
    // Keep bat at fixed height but move horizontally
    setBatPosition((prev) => ({ x: Math.max(7.5, Math.min(92.5, x)), y: prev.y }))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!gameActive || !gameAreaRef.current) return
    e.preventDefault()

    const touch = e.touches[0]
    const gameArea = gameAreaRef.current.getBoundingClientRect()
    const x = ((touch.clientX - gameArea.left) / gameArea.width) * 100
    // Keep bat at fixed height but move horizontally
    setBatPosition((prev) => ({ x: Math.max(7.5, Math.min(92.5, x)), y: prev.y }))
  }

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  return (
    <section className="py-12 md:py-16 bg-gray-50">
           <div className="container max-w-8xl mx-auto px-4 md:px-6 2xl:px-8">

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6 md:mb-8">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">Test Your Cricket Skills</h2>
            <p className="max-w-[600px] text-sm sm:text-base text-gray-500">
              Play this mini-game to see if you have what it takes to be a cricket champion
            </p>
          </div>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex justify-between items-center text-lg md:text-xl">
              <span>Cricket Mini-Game</span>
              <div className="flex items-center gap-1 md:gap-2">
                <Trophy className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                <span className="text-sm md:text-base">High Score: {highScore}</span>
              </div>
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Move your mouse/finger left and right to hit the ball with the bat. Score runs by preventing the ball from falling.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              ref={gameAreaRef}
              className="relative w-full h-64 md:h-80 bg-gradient-to-b from-green-100 to-green-200 rounded-lg border overflow-hidden"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchMove}
            >
              {/* Cricket pitch lines */}
              <div className="absolute left-1/2 top-0 w-16 -ml-8 h-full bg-green-50/30"></div>
              
              {/* Ball */}
              <div
                className="absolute bg-red-600 rounded-full w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 shadow-md"
                style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
              ></div>

              {/* Cricket bat */}
              <div
                className="absolute rounded-md transform -translate-x-1/2 -translate-y-1/2 shadow-md"
                style={{ 
                  left: `${batPosition.x}%`, 
                  top: `${batPosition.y}%`,
                  width: '15%',
                  height: '4%',
                  background: 'linear-gradient(to right, #8B4513, #D2B48C)'
                }}
              ></div>

              {/* Overlay */}
              {!gameActive && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center flex-col gap-4">
                  <div className="text-white text-lg md:text-2xl font-bold">
                    {timeLeft === 0 ? `Game Over! Score: ${score}` : "Cricket Mini-Game"}
                  </div>
                  <Button onClick={startGame} className="bg-blue-700 hover:bg-blue-800 text-sm md:text-base px-6">
                    {timeLeft === 0 ? "Play Again" : "Start Game"}
                  </Button>
                </div>
              )}

              {/* HUD */}
              <div className="absolute top-2 left-2 bg-white/80 rounded px-2 py-1 text-xs md:text-sm font-medium">
                Time: {timeLeft}s
              </div>
              <div className="absolute top-2 right-2 bg-white/80 rounded px-2 py-1 text-xs md:text-sm font-medium">
                Score: {score}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs md:text-sm text-gray-500">Win real prizes in our fantasy cricket games!</p>
            <Button
              variant="outline"
              size="sm"
              onClick={startGame}
              disabled={gameActive}
              className="gap-1 text-xs md:text-sm"
            >
              <RefreshCw className="h-3 w-3 md:h-4 md:w-4" /> Reset
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}