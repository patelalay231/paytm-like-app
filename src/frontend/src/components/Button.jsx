
function Button({label,type}) {
  return (
    <button
        type={type}
        className="w-full bg-gray-800 text-white p-3 rounded-lg font-medium hover:bg-gray-900">
        {label}
    </button>
  )
}

export default Button