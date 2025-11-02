export default function ProgressBar({ current, total }) {
  const percent = Math.round((current / total) * 100)
  return (
    <div className="w-full bg-gray-200 h-3 rounded-full mt-6">
      <div
        className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
