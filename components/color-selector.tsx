"use client"

interface ColorSelectorProps {
  colors: string[]
  selectedColor: string
  onColorChange: (color: string) => void
}

const colorMap: Record<string, string> = {
  Black: "bg-gray-900",
  White: "bg-gray-100 border-2 border-gray-300",
  Red: "bg-red-500",
  Blue: "bg-blue-500",
  Green: "bg-green-500",
  Yellow: "bg-yellow-400",
  Purple: "bg-purple-500",
  Pink: "bg-pink-400",
  Orange: "bg-orange-500",
  "Space Gray": "bg-gray-600",
  "Rose Gold": "bg-rose-300",
  Gold: "bg-yellow-300",
  Silver: "bg-gray-200 border-2 border-gray-300",
  "Midnight Green": "bg-emerald-800",
  "Pacific Blue": "bg-blue-600",
  Graphite: "bg-gray-700",
  "Sierra Blue": "bg-sky-400",
  "Alpine Green": "bg-green-600",
  "Deep Purple": "bg-purple-700",
  "Dynamic Island": "bg-indigo-900",
  "Titanium Natural": "bg-gray-400",
  "Titanium Blue": "bg-blue-400",
  "Titanium White": "bg-gray-50 border-2 border-gray-300",
  "Titanium Black": "bg-gray-800",
}

export function ColorSelector({ colors, selectedColor, onColorChange }: ColorSelectorProps) {
  if (!colors || colors.length === 0) return null

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Color: {selectedColor}</h4>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`
              w-8 h-8 rounded-full border-2 transition-all duration-200
              ${colorMap[color] || "bg-gray-400"}
              ${selectedColor === color ? "ring-2 ring-blue-500 ring-offset-2 scale-110" : "hover:scale-105"}
            `}
            title={color}
            aria-label={`Select ${color} color`}
          />
        ))}
      </div>
    </div>
  )
}
