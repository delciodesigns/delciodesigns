import React from 'react'
import { Star, MapPin, MessageCircle } from 'lucide-react'

const TutorCard = ({ tutor, onView, onBook }) => {
  return (
    <div className="card p-4">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
            {tutor.avatar}
          </div>
          {tutor.online && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 truncate">
                {tutor.name}
              </h3>
              {tutor.verified && (
                <span className="text-secondary text-sm">🏅</span>
              )}
            </div>
            <div className="text-lg font-bold text-primary">
              {tutor.price}MT/h
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium ml-1">{tutor.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              • {tutor.reviewCount} avaliações
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{tutor.location}</span>
            <span className="ml-2 text-secondary">📍 A {tutor.distance} de si</span>
          </div>

          {/* Subjects */}
          <div className="flex flex-wrap gap-1 mb-3">
            {tutor.subjects.slice(0, 3).map((subject, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {subject}
              </span>
            ))}
            {tutor.subjects.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{tutor.subjects.length - 3}
              </span>
            )}
          </div>

          {/* Status */}
          {tutor.online && (
            <div className="text-sm text-secondary font-medium mb-3">
              🟢 Disponível agora
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-2">
            <button
              onClick={onView}
              className="btn-secondary flex-1 text-sm py-2"
            >
              Ver Perfil
            </button>
            <button
              onClick={onBook}
              className="btn-primary flex-1 text-sm py-2"
            >
              Ver Disponibilidade
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TutorCard