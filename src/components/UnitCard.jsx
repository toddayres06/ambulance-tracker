import { Link } from 'react-router-dom'

const UnitCard = ({ unit }) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Unit {unit.id}</h2>
            <p className="text-gray-600 mb-1"><strong>Status:</strong> {unit.status}</p>
            <p className="text-gray-600 mb-3"><strong>Location:</strong> {unit.location}</p>
            <Link
                to={`/unit/${unit.id}`}
                className="text-blue-500 hover:underline"
            >
                View Details 
            </Link>
        </div>
    )
}

export default UnitCard